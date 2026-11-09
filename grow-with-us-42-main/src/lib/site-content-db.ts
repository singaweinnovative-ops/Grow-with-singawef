import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import {
  DEFAULT_SITE_CONTENT,
  OPPORTUNITIES,
  PEOPLE,
  type GalleryEvent,
  type NewsItem,
  type PressItem,
  type ProgrammeItem,
  type Resource,
  type SiteContent,
  BLOCK_KEYS,
} from "@/lib/site-content";
import type { Database } from "@/lib/supabase-types";

type Tables = Database["public"]["Tables"];
type OpportunityRow = Tables["site_opportunities"]["Row"];
type PersonRow = Tables["site_people"]["Row"];
type BlockRow = Tables["site_blocks"]["Row"];
type NewsRow = Tables["site_news"]["Row"];
type ProgrammeRow = Tables["site_programmes"]["Row"];
type GalleryRow = Tables["site_gallery_events"]["Row"];
type PressRow = Tables["site_press"]["Row"];
type ResourceRow = Tables["site_resources"]["Row"];

/** A slow database must never hang a page render — fall back instead. */
const QUERY_TIMEOUT_MS = 4000;

export type SiteOpportunity = {
  id: string;
  title: string;
  org: string;
  category: (typeof OPPORTUNITIES)[number]["category"];
  opens: string | null;
  closes: string | null;
  body: string;
  url: string;
  image_url?: string | null;
};

export type SitePerson = (typeof PEOPLE)[number];

export async function getPublishedOpportunities(): Promise<SiteOpportunity[]> {
  try {
    const { data, error } = await getSupabaseBrowserClient()
      .from("site_opportunities")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true })
      .abortSignal(AbortSignal.timeout(QUERY_TIMEOUT_MS));

    if (error) throw error;
    return (data as OpportunityRow[]).map((row) => ({
      id: row.id,
      title: row.title,
      org: row.org,
      category: row.category as SiteOpportunity["category"],
      opens: row.opens,
      closes: row.closes,
      body: row.body,
      url: row.url,
      image_url: row.image_url,
    }));
  } catch {
    return OPPORTUNITIES;
  }
}

export async function getPublishedPeople(): Promise<SitePerson[]> {
  try {
    const { data, error } = await getSupabaseBrowserClient()
      .from("site_people")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true })
      .abortSignal(AbortSignal.timeout(QUERY_TIMEOUT_MS));

    if (error) throw error;
    return (data as PersonRow[]).map((row) => ({
      slug: row.slug,
      name: row.name,
      circle: row.circle as SitePerson["circle"],
      field: row.field,
      place: row.place,
      initials: row.initials,
      ...(row.photo ? { photo: row.photo } : {}),
      year: row.year,
      ...(row.joined ? { joined: row.joined } : {}),
      brief: row.brief,
      story: row.story,
      ...(row.quote ? { quote: row.quote } : {}),
      ...(row.links.length > 0 ? { links: row.links } : {}),
    }));
  } catch {
    return PEOPLE;
  }
}

/* ------------------------------------------------------------------ */
/* Page content (news, programmes, gallery, press, resources, blocks) */
/* ------------------------------------------------------------------ */

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Merges one `site_blocks` row over its bundled default. Arrays replace the
 * default outright; objects are merged field-by-field (one level deep) so a
 * block that only sets `email` keeps every other default field. A value of
 * the wrong shape is ignored rather than allowed to break the page.
 */
function mergeBlock<T>(fallback: T, value: unknown): T {
  if (Array.isArray(fallback)) return (Array.isArray(value) ? value : fallback) as T;
  if (!isPlainObject(fallback) || !isPlainObject(value)) return fallback;

  const merged: Record<string, unknown> = { ...fallback };
  for (const [key, next] of Object.entries(value)) {
    const current = (fallback as Record<string, unknown>)[key];
    merged[key] = isPlainObject(current) && isPlainObject(next) ? { ...current, ...next } : next;
  }
  return merged as T;
}

type BlockName = keyof typeof BLOCK_KEYS;

const opt = <K extends string, V>(key: K, value: V | null | undefined) =>
  (value === null || value === undefined || value === "" ? {} : { [key]: value }) as Partial<
    Record<K, V>
  >;

function mapNews(row: NewsRow): NewsItem {
  return {
    slug: row.slug,
    date: row.date,
    label: row.label,
    title: row.title,
    excerpt: row.excerpt,
    body: row.body,
    ...opt("image", row.image_url),
  };
}

function mapProgramme(row: ProgrammeRow): ProgrammeItem {
  return {
    id: row.slug,
    ...opt("label", row.label),
    name: row.name,
    kicker: row.kicker,
    body: row.body,
    points: row.points,
    ...opt("image", row.image),
    ...opt("logo", row.logo),
    ...(isPlainObject(row.dossier)
      ? { dossier: row.dossier as NonNullable<ProgrammeItem["dossier"]> }
      : {}),
    ...(isPlainObject(row.brand)
      ? { brand: row.brand as NonNullable<ProgrammeItem["brand"]> }
      : {}),
  };
}

function mapGallery(row: GalleryRow): GalleryEvent {
  return {
    id: row.id,
    title: row.title,
    theme: row.theme,
    year: row.year,
    month: row.month,
    date: row.date,
    overview: row.overview,
    photos: Array.isArray(row.photos)
      ? row.photos.filter((p) => isPlainObject(p) && typeof p.src === "string")
      : [],
    ...(row.has_video ? { hasVideo: true } : {}),
    ...opt("videoUrl", row.video_url),
    ...opt("programmeSlug", row.programme_slug),
  };
}

function mapPress(row: PressRow): PressItem {
  return {
    id: row.id,
    date: row.date,
    kind: row.kind as PressItem["kind"],
    title: row.title,
    summary: row.summary,
    file: row.file_url,
    ...opt("fileLabel", row.file_label),
  };
}

function mapResource(row: ResourceRow): Resource {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    description: row.description,
    file: row.file_url,
  };
}

/**
 * Reads one published collection. Returns `null` — "use the bundled
 * default" — when the table is missing, the query fails or times out, or
 * nothing is published yet (so a fresh database never blanks the site).
 */
async function readCollection<Row>(
  table: "site_news" | "site_programmes" | "site_gallery_events" | "site_press" | "site_resources",
  order: { column: string; ascending: boolean },
): Promise<Row[] | null> {
  try {
    const { data, error } = await getSupabaseBrowserClient()
      .from(table)
      .select("*")
      .eq("is_published", true)
      .order(order.column, { ascending: order.ascending })
      .abortSignal(AbortSignal.timeout(QUERY_TIMEOUT_MS));
    if (error || !data || data.length === 0) return null;
    return data as Row[];
  } catch {
    return null;
  }
}

async function readBlocks(): Promise<Map<string, unknown>> {
  try {
    const { data, error } = await getSupabaseBrowserClient()
      .from("site_blocks")
      .select("key, data")
      .abortSignal(AbortSignal.timeout(QUERY_TIMEOUT_MS));
    if (error || !data) return new Map();
    return new Map((data as Pick<BlockRow, "key" | "data">[]).map((row) => [row.key, row.data]));
  } catch {
    return new Map();
  }
}

async function fetchSiteContent(): Promise<SiteContent> {
  const sort = { column: "sort_order", ascending: true };
  const [blocks, news, programmes, gallery, press, resources] = await Promise.all([
    readBlocks(),
    readCollection<NewsRow>("site_news", { column: "date", ascending: false }),
    readCollection<ProgrammeRow>("site_programmes", sort),
    readCollection<GalleryRow>("site_gallery_events", sort),
    readCollection<PressRow>("site_press", { column: "date", ascending: false }),
    readCollection<ResourceRow>("site_resources", sort),
  ]);

  const content: SiteContent = { ...DEFAULT_SITE_CONTENT };
  for (const name of Object.keys(BLOCK_KEYS) as BlockName[]) {
    const key = BLOCK_KEYS[name];
    if (blocks.has(key)) {
      (content as Record<BlockName, unknown>)[name] = mergeBlock(
        DEFAULT_SITE_CONTENT[name],
        blocks.get(key),
      );
    }
  }

  if (news) content.NEWS = news.map(mapNews);
  if (programmes) {
    const programmeRows = programmes.filter((p) => p.family === "Programme");
    const initiativeRows = programmes.filter((p) => p.family === "Initiative");
    if (programmeRows.length > 0) content.PROGRAMMES = programmeRows.map(mapProgramme);
    if (initiativeRows.length > 0) content.INITIATIVES = initiativeRows.map(mapProgramme);
  }
  if (gallery) content.GALLERY_EVENTS = gallery.map(mapGallery);
  if (press) content.PRESS = press.map(mapPress);
  if (resources) content.RESOURCES = resources.map(mapResource);

  return content;
}

/*
 * Short-lived cache. On the server it is shared by every request in the
 * worker, so edits made on the management site appear within a minute
 * without a redeploy. In the browser it avoids refetching on every click.
 */
const CACHE_TTL_MS = typeof window === "undefined" ? 60_000 : 5 * 60_000;
let cached: { at: number; promise: Promise<SiteContent> } | undefined;

export function loadSiteContent(): Promise<SiteContent> {
  const now = Date.now();
  if (!cached || now - cached.at > CACHE_TTL_MS) {
    const promise = fetchSiteContent();
    cached = { at: now, promise };
    // Never cache a rejected promise.
    promise.catch(() => {
      if (cached?.promise === promise) cached = undefined;
    });
  }
  return cached.promise;
}

/** Seeds the browser cache with the content the server already rendered. */
export function primeSiteContent(content: SiteContent) {
  if (typeof window === "undefined") return;
  if (!cached) cached = { at: Date.now(), promise: Promise.resolve(content) };
}
