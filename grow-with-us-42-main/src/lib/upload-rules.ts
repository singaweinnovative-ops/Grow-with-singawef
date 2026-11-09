/**
 * Upload limits for the application forms (ID copy and CV). The same values
 * are enforced in three places: the browser (instant feedback), the
 * /api/submit server route, and the `form-uploads` storage bucket itself
 * (supabase/schema.sql) — keep all three in step if you change them.
 */
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB

export const UPLOAD_RULES = {
  idCopy: {
    label: "ID copy",
    accept: ".pdf,.jpg,.jpeg,.png,.webp,.heic,image/jpeg,image/png,image/webp,image/heic",
    mimeTypes: [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/heic",
      "image/heif",
    ],
    hint: "PDF, JPG, PNG, WEBP or HEIC, up to 5 MB.",
  },
  cv: {
    label: "CV",
    accept: ".pdf,.doc,.docx",
    mimeTypes: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    hint: "PDF, DOC or DOCX, up to 5 MB.",
  },
} as const;

export type UploadField = keyof typeof UPLOAD_RULES;

const EXTENSION_TYPES: Record<string, string> = {
  pdf: "application/pdf",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  heic: "image/heic",
  heif: "image/heif",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

/** Browsers sometimes report an empty type (notably for HEIC and DOCX) — fall back to the extension. */
export function resolveMimeType(file: { name: string; type: string }): string {
  if (file.type) return file.type.toLowerCase();
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return EXTENSION_TYPES[ext] ?? "application/octet-stream";
}

/** Returns a visitor-friendly problem with the file, or null when it is acceptable. */
export function checkUpload(
  field: UploadField,
  file: { name: string; type: string; size: number },
) {
  const rule = UPLOAD_RULES[field];
  if (file.size > MAX_UPLOAD_BYTES) {
    return `Your ${rule.label} is larger than 5 MB. Please upload a smaller file or a clear photo of it.`;
  }
  if (!(rule.mimeTypes as readonly string[]).includes(resolveMimeType(file))) {
    return `That ${rule.label} file type isn't accepted. ${rule.hint}`;
  }
  return null;
}
