/** Helpers for documents linked from content (resources, press). */

const KINDS: Record<string, string> = {
  pdf: "PDF",
  doc: "Word",
  docx: "Word",
  xls: "Excel",
  xlsx: "Excel",
  ppt: "PowerPoint",
  pptx: "PowerPoint",
  zip: "ZIP",
  jpg: "Image",
  jpeg: "Image",
  png: "Image",
  webp: "Image",
};

function extension(url: string): string {
  const path = url.split(/[?#]/)[0] ?? "";
  return path.split(".").pop()?.toLowerCase() ?? "";
}

/** "PDF", "Word", … for the label on a document card. */
export function fileKind(url: string): string {
  return KINDS[extension(url)] ?? "File";
}

/** Browsers can show PDFs inline; other formats are downloaded instead. */
export function canPreview(url: string): boolean {
  return extension(url) === "pdf";
}

/**
 * The `download` attribute is ignored for files on another domain, so for
 * Supabase Storage URLs ask Supabase to send the file as a download.
 */
export function downloadUrl(url: string): string {
  if (!url.includes("/storage/v1/object/public/")) return url;
  const name = decodeURIComponent(url.split(/[?#]/)[0]!.split("/").pop() ?? "");
  return `${url}${url.includes("?") ? "&" : "?"}download=${encodeURIComponent(name)}`;
}
