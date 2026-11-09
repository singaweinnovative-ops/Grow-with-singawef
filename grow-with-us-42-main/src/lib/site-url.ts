/**
 * The public address of the site, e.g. https://singawefoundation.org — set
 * VITE_SITE_URL so share previews, the sitemap and structured data use
 * absolute links. Without it, links stay relative (fine for local dev).
 */
export const SITE_URL = ((import.meta.env["VITE_SITE_URL"] as string | undefined) ?? "").replace(
  /\/+$/,
  "",
);

export function absoluteUrl(path: string, origin: string = SITE_URL): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}
