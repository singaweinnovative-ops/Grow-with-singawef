import { TURNSTILE_RESET_EVENT } from "@/components/site/FormGuard";
import { checkUpload, UPLOAD_RULES, type UploadField } from "@/lib/upload-rules";

export class FormSubmitError extends Error {}

/**
 * Sends a form to the site's own /api/submit endpoint, which checks the
 * spam guard (honeypot + Cloudflare Turnstile), rate-limits, validates any
 * uploads and then stores the submission in the shared Supabase inbox.
 * The browser never writes to the database directly.
 *
 * Throws FormSubmitError with a message that is safe to show the visitor.
 */
export async function submitFormToSupabase(formType: string, formData: FormData) {
  formData.set("form_type", formType);

  for (const field of Object.keys(UPLOAD_RULES) as UploadField[]) {
    const file = formData.get(field);
    if (file instanceof File && file.size > 0) {
      const problem = checkUpload(field, file);
      if (problem) throw new FormSubmitError(problem);
    }
  }

  let response: Response;
  try {
    response = await fetch("/api/submit", { method: "POST", body: formData });
  } catch {
    throw new FormSubmitError("We couldn't reach the server. Check your connection and try again.");
  } finally {
    window.dispatchEvent(new Event(TURNSTILE_RESET_EVENT));
  }

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new FormSubmitError(body?.error ?? "Something went wrong saving your submission.");
  }
}
