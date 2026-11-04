import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

const RESERVED_KEYS = new Set([
  "form_type",
  "name",
  "email",
  "phone",
  "source",
  "_subject",
  "idCopy",
  "cv",
]);
const FILE_FIELDS = ["idCopy", "cv"] as const;

function buildPayload(formData: FormData) {
  const payload: Record<string, unknown> = {};
  const seen = new Set<string>();
  for (const key of formData.keys()) {
    if (seen.has(key) || RESERVED_KEYS.has(key)) continue;
    seen.add(key);
    const values = formData.getAll(key).filter((v): v is string => typeof v === "string");
    if (values.length === 0) continue;
    payload[key] = values.length === 1 ? values[0] : values;
  }
  return payload;
}

async function uploadFormFile(formType: string, field: string, file: File) {
  const supabase = getSupabaseBrowserClient();
  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  const path = `${formType}/${Date.now()}-${crypto.randomUUID()}-${field}-${safeName}`;
  const { error } = await supabase.storage
    .from("form-uploads")
    .upload(path, file, { contentType: file.type || "application/octet-stream" });
  if (error) throw new Error(`Failed to upload ${field}: ${error.message}`);
  return { path, name: file.name };
}

/**
 * Submits a form directly from the browser to Supabase using the public
 * anon key. Row Level Security (supabase/schema.sql) restricts the anon
 * role to INSERT only — it can never read, update or delete, so a
 * submission is write-only from the moment it leaves the browser.
 */
export async function submitFormToSupabase(formType: string, formData: FormData) {
  const supabase = getSupabaseBrowserClient();
  const payload = buildPayload(formData);

  for (const field of FILE_FIELDS) {
    const file = formData.get(field);
    if (file instanceof File && file.size > 0) {
      payload[field] = await uploadFormFile(formType, field, file);
    }
  }

  const name = formData.get("name")?.toString() || null;
  const email = formData.get("email")?.toString() || null;
  const phone = formData.get("phone")?.toString() || null;
  const source = formData.get("source")?.toString() || formType;

  const { error } = await supabase.from("form_submissions").insert({
    form_type: formType,
    name,
    email,
    phone,
    source,
    payload,
  });

  if (error) throw new Error(`Failed to save submission: ${error.message}`);
}
