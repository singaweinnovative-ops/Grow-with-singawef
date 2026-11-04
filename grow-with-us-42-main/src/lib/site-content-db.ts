import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import { OPPORTUNITIES, PEOPLE } from "@/lib/site-content";
import type { Database } from "@/lib/supabase-types";

type OpportunityRow = Database["public"]["Tables"]["site_opportunities"]["Row"];
type PersonRow = Database["public"]["Tables"]["site_people"]["Row"];

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
      .order("sort_order", { ascending: true });

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
      .order("sort_order", { ascending: true });

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
