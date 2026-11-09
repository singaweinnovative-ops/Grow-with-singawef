import { createFileRoute } from "@tanstack/react-router";
import {
  getSupabaseAdmin,
  isSameOrigin,
  json,
  verifyTurnstile,
  withinRateLimit,
} from "@/lib/server/security";
import { checkUpload, resolveMimeType, UPLOAD_RULES, type UploadField } from "@/lib/upload-rules";

/** Every form on the site. Anything else is rejected. */
const FORM_TYPES = new Set([
  "contact",
  "newsletter",
  "report_concern",
  "help_applying",
  "intake_journeyer",
  "intake_guide",
  "volunteer_companion",
  "initiative_join",
  "initiative_collaborate",
  "journeyer",
  "guide",
  "companion",
  "collaborate",
  "news_tip",
]);

const RESERVED_KEYS = new Set([
  "form_type",
  "name",
  "email",
  "phone",
  "source",
  "_subject",
  "company_website",
  "cf-turnstile-response",
  ...Object.keys(UPLOAD_RULES),
]);

const MAX_BODY_BYTES = 12 * 1024 * 1024; // two 5 MB files plus text
const MAX_FIELDS = 80;
const MAX_VALUE_LENGTH = 10_000;
const MAX_SHORT_LENGTH = 320;

/** First bytes of each accepted file type, so a renamed .exe can't pass as a PDF. */
async function looksLike(file: File, mimeType: string): Promise<boolean> {
  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const starts = (...sig: number[]) => sig.every((b, i) => bytes[i] === b);
  const ascii = (from: number, text: string) =>
    [...text].every((c, i) => bytes[from + i] === c.charCodeAt(0));
  switch (mimeType) {
    case "application/pdf":
      return ascii(0, "%PDF");
    case "image/jpeg":
      return starts(0xff, 0xd8, 0xff);
    case "image/png":
      return starts(0x89, 0x50, 0x4e, 0x47);
    case "image/webp":
      return ascii(0, "RIFF") && ascii(8, "WEBP");
    case "image/heic":
    case "image/heif":
      return ascii(4, "ftyp");
    case "application/msword":
      return starts(0xd0, 0xcf, 0x11, 0xe0);
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return starts(0x50, 0x4b, 0x03, 0x04);
    default:
      return false;
  }
}

function shortText(value: FormDataEntryValue | null): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().slice(0, MAX_SHORT_LENGTH);
  return trimmed || null;
}

export const Route = createFileRoute("/api/submit")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isSameOrigin(request)) return json({ error: "Forbidden." }, 403);

        const length = Number(request.headers.get("content-length") ?? 0);
        if (length > MAX_BODY_BYTES) {
          return json({ error: "That submission is too large. Files must be 5 MB or less." }, 413);
        }

        if (!(await withinRateLimit("submit", request, 8, 10 * 60))) {
          return json(
            {
              error:
                "Too many submissions from your connection. Please wait a few minutes and try again.",
            },
            429,
            { "retry-after": "600" },
          );
        }

        let form: FormData;
        try {
          form = await request.formData();
        } catch {
          return json({ error: "We couldn't read that submission." }, 400);
        }

        // Honeypot: real visitors never see this field. Pretend success so
        // bots don't learn they were caught.
        const honeypot = form.get("company_website");
        if (typeof honeypot === "string" && honeypot.trim() !== "") return json({ ok: true });

        if (!(await verifyTurnstile(form.get("cf-turnstile-response"), request))) {
          return json(
            { error: "We couldn't confirm you're human. Please refresh the page and try again." },
            403,
          );
        }

        const formType = form.get("form_type");
        if (typeof formType !== "string" || !FORM_TYPES.has(formType)) {
          return json({ error: "Unknown form." }, 400);
        }

        const payload: Record<string, unknown> = {};
        let fieldCount = 0;
        for (const key of new Set(form.keys())) {
          if (RESERVED_KEYS.has(key)) continue;
          if (++fieldCount > MAX_FIELDS || key.length > 100) {
            return json({ error: "That submission has too many fields." }, 400);
          }
          const values = form
            .getAll(key)
            .filter((v): v is string => typeof v === "string")
            .map((v) => v.slice(0, MAX_VALUE_LENGTH));
          if (values.length === 0) continue;
          payload[key] = values.length === 1 ? values[0] : values;
        }

        // Validate every file before uploading any, so a bad CV never leaves
        // an orphaned ID copy behind in storage.
        const uploads: { field: UploadField; file: File; mimeType: string }[] = [];
        for (const field of Object.keys(UPLOAD_RULES) as UploadField[]) {
          const file = form.get(field);
          if (!(file instanceof File) || file.size === 0) continue;

          const problem = checkUpload(field, file);
          const mimeType = resolveMimeType(file);
          if (problem) return json({ error: problem }, 400);
          if (!(await looksLike(file, mimeType))) {
            return json(
              {
                error: `That ${UPLOAD_RULES[field].label} doesn't look like a valid file. ${UPLOAD_RULES[field].hint}`,
              },
              400,
            );
          }
          uploads.push({ field, file, mimeType });
        }

        const supabase = getSupabaseAdmin();
        if (!supabase) {
          console.error("[submit] SUPABASE_SERVICE_ROLE_KEY is not configured on the server.");
          return json(
            { error: "The form inbox isn't configured yet. Please email us instead." },
            503,
          );
        }

        for (const { field, file, mimeType } of uploads) {
          const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_").slice(-80);
          const path = `${formType}/${Date.now()}-${crypto.randomUUID()}-${field}-${safeName}`;
          const { error } = await supabase.storage
            .from("form-uploads")
            .upload(path, file, { contentType: mimeType, upsert: false });
          if (error) {
            console.error(`[submit] upload of ${field} failed:`, error.message);
            return json({ error: "We couldn't save your file. Please try again." }, 502);
          }
          payload[field] = { path, name: file.name, size: file.size, type: mimeType };
        }

        const { error } = await supabase.from("form_submissions").insert({
          form_type: formType,
          name: shortText(form.get("name")),
          email: shortText(form.get("email")),
          phone: shortText(form.get("phone")),
          source: shortText(form.get("source")) ?? formType,
          payload,
        });

        if (error) {
          console.error("[submit] insert failed:", error.message);
          return json({ error: "We couldn't save your submission. Please try again." }, 502);
        }

        return json({ ok: true });
      },
    },
  },
});
