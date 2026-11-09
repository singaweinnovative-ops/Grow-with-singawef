import {
  DEFAULT_SITE_CONTENT,
  OPPORTUNITIES,
  PEOPLE,
  buildAllProgrammes,
  type SiteContent,
} from "@/lib/site-content";
import { isOpportunityActive } from "@/lib/opportunity-dates";

export type SearchItem = {
  id: string;
  title: string;
  subtitle?: string;
  /** Extra text cmdk fuzzy-matches against, beyond the visible title/subtitle. */
  keywords?: string;
  to: string;
  params?: Record<string, string>;
};

export type SearchGroup = {
  label: string;
  items: SearchItem[];
};

type SearchPerson = Pick<(typeof PEOPLE)[number], "slug" | "name" | "circle" | "field" | "brief">;
type SearchOpportunity = Pick<
  (typeof OPPORTUNITIES)[number],
  "id" | "title" | "org" | "category" | "opens" | "closes" | "body"
>;

const PAGES: SearchItem[] = [
  { id: "page-home", title: "Home", to: "/" },
  { id: "page-about", title: "About the Foundation", to: "/about" },
  { id: "page-our-work", title: "Our Work", to: "/our-work" },
  { id: "page-who-we-serve", title: "Who We Serve", to: "/who-we-serve" },
  { id: "page-programmes", title: "Programmes", to: "/programmes" },
  { id: "page-people", title: "Our People", to: "/people" },
  { id: "page-collaborate", title: "Collaborate", to: "/collaborate" },
  { id: "page-opportunities", title: "Opportunities", to: "/opportunities" },
  { id: "page-gallery", title: "Gallery", to: "/gallery" },
  { id: "page-resources", title: "Resources", to: "/resources" },
  { id: "page-news", title: "News & Media", to: "/news" },
  { id: "page-get-involved", title: "Get Involved", to: "/get-involved" },
  { id: "page-contact", title: "Contact", to: "/contact" },
  { id: "page-faq", title: "FAQ", to: "/faq" },
  { id: "page-safety", title: "Safety & Safeguarding", to: "/safety" },
  { id: "page-privacy", title: "Privacy Policy", to: "/privacy" },
];

export function getSearchGroups(
  peopleSource: SearchPerson[] = PEOPLE,
  opportunitySource: SearchOpportunity[] = OPPORTUNITIES,
  content: SiteContent = DEFAULT_SITE_CONTENT,
): SearchGroup[] {
  const { FAQS, GALLERY_EVENTS, NEWS, RESOURCES } = content;
  const ALL_PROGRAMMES = buildAllProgrammes(content.PROGRAMMES, content.INITIATIVES);
  const programmes = ALL_PROGRAMMES.filter((p) => p.family === "Programme").map((p) => ({
    id: `programme-${p.slug}`,
    title: p.name,
    subtitle: p.kicker,
    keywords: p.body,
    to: "/programmes/$slug",
    params: { slug: p.slug },
  }));

  const initiatives = ALL_PROGRAMMES.filter((p) => p.family === "Initiative").map((p) => ({
    id: `initiative-${p.slug}`,
    title: p.name,
    subtitle: p.kicker,
    keywords: p.body,
    to: "/programmes/$slug",
    params: { slug: p.slug },
  }));

  const people = peopleSource.map((person) => ({
    id: `person-${person.slug}`,
    title: person.name,
    subtitle: `${person.field} · ${person.circle}`,
    to: "/people/$slug",
    params: { slug: person.slug },
  }));

  const news = NEWS.map((n) => ({
    id: `news-${n.slug}`,
    title: n.title,
    subtitle: n.label,
    keywords: n.excerpt,
    to: "/news/$slug",
    params: { slug: n.slug },
  }));

  const resources = RESOURCES.map((r) => ({
    id: `resource-${r.id}`,
    title: r.title,
    subtitle: r.category,
    keywords: r.description,
    to: "/resources",
  }));

  const faqs = FAQS.map((f, i) => ({
    id: `faq-${i}`,
    title: f.q,
    keywords: f.a,
    to: "/faq",
  }));

  const opportunities = opportunitySource
    .filter((o) => isOpportunityActive(o.opens, o.closes))
    .map((o) => ({
      id: `opportunity-${o.id}`,
      title: o.title,
      subtitle: o.org,
      keywords: o.body,
      to: "/opportunities",
    }));

  const gallery = GALLERY_EVENTS.map((e) => ({
    id: `gallery-${e.id}`,
    title: e.title,
    subtitle: `${e.theme} · ${e.date}`,
    keywords: e.overview,
    to: "/gallery/$eventId",
    params: { eventId: e.id },
  }));

  return [
    { label: "Pages", items: PAGES },
    { label: "Programmes", items: programmes },
    { label: "Initiatives", items: initiatives },
    { label: "People", items: people },
    { label: "Opportunities", items: opportunities },
    { label: "Gallery", items: gallery },
    { label: "News", items: news },
    { label: "Resources", items: resources },
    { label: "FAQ", items: faqs },
  ].filter((group) => group.items.length > 0);
}

export type SearchResult = SearchItem & { group: string };

/** Plain case-insensitive substring match across title, subtitle and keywords. */
export function searchItems(
  query: string,
  peopleSource: SearchPerson[] = PEOPLE,
  opportunitySource: SearchOpportunity[] = OPPORTUNITIES,
  content: SiteContent = DEFAULT_SITE_CONTENT,
): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResult[] = [];
  for (const group of getSearchGroups(peopleSource, opportunitySource, content)) {
    for (const item of group.items) {
      const haystack = [item.title, item.subtitle, item.keywords]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (haystack.includes(q)) {
        results.push({ ...item, group: group.label });
      }
    }
  }
  return results;
}
