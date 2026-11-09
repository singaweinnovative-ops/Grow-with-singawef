import { createFileRoute } from "@tanstack/react-router";
import { loadSiteContent, getPublishedPeople } from "@/lib/site-content-db";
import { buildAllProgrammes } from "@/lib/site-content";
import { SITE_URL } from "@/lib/site-url";

/** Public pages that always exist. Search is excluded (it is noindex). */
const STATIC_PATHS = [
  "/",
  "/about",
  "/our-work",
  "/who-we-serve",
  "/programmes",
  "/people",
  "/collaborate",
  "/opportunities",
  "/gallery",
  "/resources",
  "/news",
  "/get-involved",
  "/get-involved/journeyer",
  "/get-involved/guide",
  "/get-involved/companion",
  "/contact",
  "/faq",
  "/safety",
  "/privacy",
];

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (c) => `&#${c.charCodeAt(0)};`);
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = SITE_URL || new URL(request.url).origin;
        const [content, people] = await Promise.all([loadSiteContent(), getPublishedPeople()]);

        const entries: { path: string; lastmod?: string }[] = [
          ...STATIC_PATHS.map((path) => ({ path })),
          ...buildAllProgrammes(content.PROGRAMMES, content.INITIATIVES).map((p) => ({
            path: `/programmes/${encodeURIComponent(p.slug)}`,
          })),
          ...people.map((p) => ({ path: `/people/${encodeURIComponent(p.slug)}` })),
          ...content.NEWS.map((n) => ({
            path: `/news/${encodeURIComponent(n.slug)}`,
            lastmod: n.date,
          })),
          ...content.GALLERY_EVENTS.map((e) => ({ path: `/gallery/${encodeURIComponent(e.id)}` })),
        ];

        const body = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...entries.map(
            (e) =>
              `  <url><loc>${escapeXml(origin + e.path)}</loc>${
                e.lastmod && /^\d{4}-\d{2}-\d{2}$/.test(e.lastmod)
                  ? `<lastmod>${e.lastmod}</lastmod>`
                  : ""
              }</url>`,
          ),
          "</urlset>",
        ].join("\n");

        return new Response(body, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
