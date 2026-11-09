/**
 * Copies the content bundled in src/lib/site-content.ts into Supabase so
 * the team can edit it from the management website.
 *
 * Safe to rerun: rows that already exist are left untouched, so edits made
 * on the management site are never overwritten (except people with
 * --sync-people, see supabase/README.md).
 */
import { createClient } from "@supabase/supabase-js";
import {
  BLOCK_KEYS,
  DEFAULT_SITE_CONTENT,
  OPPORTUNITIES,
  PEOPLE,
} from "../src/lib/site-content.ts";
import type { Database } from "../src/lib/supabase-types.ts";
import { getDossier } from "../src/lib/programme-teams.ts";
import { getBrand } from "../src/lib/programme-brands.ts";

const url = process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"];
const serviceRoleKey = process.env["SUPABASE_SERVICE_ROLE_KEY"];

if (!url || !serviceRoleKey) {
  throw new Error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before running this seed.");
}

const supabase = createClient<Database>(url, serviceRoleKey, {
  auth: { persistSession: false },
});

const content = DEFAULT_SITE_CONTENT;

async function insertMissing<T extends keyof Database["public"]["Tables"]>(
  table: T,
  rows: Database["public"]["Tables"][T]["Insert"][],
  onConflict: string,
  overwrite = false,
) {
  const { error } = await supabase
    .from(table)
    .upsert(rows as never, { onConflict, ignoreDuplicates: !overwrite });
  if (error) throw new Error(`${table}: ${error.message}`);
  console.log(`  ${table}: ${rows.length} rows${overwrite ? " (synced)" : " (added if missing)"}`);
}

const syncExistingPeople = process.argv.includes("--sync-people");

console.log("Seeding Supabase content…");

await insertMissing(
  "site_opportunities",
  OPPORTUNITIES.map((o, sort_order) => ({ ...o, image_url: null, is_published: true, sort_order })),
  "id",
);

const people = PEOPLE.map((person, sort_order) => ({
  ...person,
  photo: person.photo ?? null,
  quote: person.quote ?? null,
  links: person.links ?? [],
  is_published: true,
  sort_order,
}));
await insertMissing("site_people", people, "slug", syncExistingPeople);

if (syncExistingPeople) {
  const includedSlugs = `(${people.map((person) => `"${person.slug}"`).join(",")})`;
  const { error } = await supabase
    .from("site_people")
    .update({ is_published: false })
    .not("slug", "in", includedSlugs);
  if (error) throw error;
}

await insertMissing(
  "site_blocks",
  Object.entries(BLOCK_KEYS).map(([name, key]) => ({
    key,
    data: content[name as keyof typeof BLOCK_KEYS] as unknown,
    description: `Seeded from ${name} in src/lib/site-content.ts`,
  })),
  "key",
);

await insertMissing(
  "site_news",
  content.NEWS.map((n, sort_order) => ({
    slug: n.slug,
    date: n.date,
    label: n.label,
    title: n.title,
    excerpt: n.excerpt,
    body: n.body,
    image_url: n.image ?? null,
    is_published: true,
    sort_order,
  })),
  "slug",
);

const programmeRows = [
  ...content.PROGRAMMES.map((p) => ({ ...p, family: "Programme" as const })),
  ...content.INITIATIVES.map((p) => ({ ...p, family: "Initiative" as const })),
];

/** The programme page's current look and story, as the editable starting point. */
function programmeDetails(slug: string, name: string, family: "Programme" | "Initiative") {
  const { accent, tint, onAccent, short, tagline, cta, joinField } = getBrand(slug, name, family);
  return {
    dossier: getDossier(slug) as unknown as Record<string, unknown>,
    brand: { accent, tint, onAccent, short, tagline, cta, joinField } as Record<string, unknown>,
  };
}

await insertMissing(
  "site_programmes",
  programmeRows.map((p, sort_order) => ({
    slug: p.id,
    family: p.family,
    label: p.label ?? null,
    name: p.name,
    kicker: p.kicker,
    body: p.body,
    points: p.points,
    image: p.image ?? null,
    ...programmeDetails(p.id, p.name, p.family),
    is_published: true,
    sort_order,
  })),
  "slug",
);

// Programmes seeded before dossier/brand existed: fill only empty details.
for (const p of programmeRows) {
  const { dossier, brand } = programmeDetails(p.id, p.name, p.family);
  for (const [column, value] of [
    ["dossier", dossier],
    ["brand", brand],
  ] as const) {
    const { error } = await supabase
      .from("site_programmes")
      .update({ [column]: value })
      .eq("slug", p.id)
      .is(column, null);
    if (error) throw new Error(`site_programmes.${column}: ${error.message}`);
  }
}

await insertMissing(
  "site_gallery_events",
  content.GALLERY_EVENTS.map((e, sort_order) => ({
    id: e.id,
    title: e.title,
    theme: e.theme,
    year: e.year,
    month: e.month,
    date: e.date,
    overview: e.overview,
    photos: e.photos,
    has_video: e.hasVideo ?? false,
    video_url: e.videoUrl ?? null,
    programme_slug: e.programmeSlug ?? null,
    is_published: true,
    sort_order,
  })),
  "id",
);

await insertMissing(
  "site_press",
  content.PRESS.map((p, sort_order) => ({
    id: p.id,
    date: p.date,
    kind: p.kind,
    title: p.title,
    summary: p.summary,
    file_url: p.file,
    file_label: p.fileLabel ?? null,
    is_published: true,
    sort_order,
  })),
  "id",
);

await insertMissing(
  "site_resources",
  content.RESOURCES.map((r, sort_order) => ({
    id: r.id,
    title: r.title,
    category: r.category,
    description: r.description,
    file_url: r.file,
    is_published: true,
    sort_order,
  })),
  "id",
);

console.log("Done.");
