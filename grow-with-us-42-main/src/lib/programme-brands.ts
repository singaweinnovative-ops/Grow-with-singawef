export type ProgrammeBrand = {
  accent: string;
  tint: string;
  onAccent: string;
  short: string;
  tagline: string;
  sections: { id: string; label: string }[];
  cta: { label: string; hash: string };
  /** The one field that makes this initiative's join form different from the others. */
  joinField: { label: string; options: string[] };
};

const BASE_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "includes", label: "What's included" },
  { id: "walk", label: "The walk" },
  { id: "join", label: "Join" },
];

const DEFAULT_BRAND: ProgrammeBrand = {
  accent: "#B58A3C",
  tint: "#F7F1E4",
  onAccent: "#FBF8F1",
  short: "Programme",
  tagline: "Your journey. Our commitment.",
  sections: BASE_SECTIONS,
  cta: { label: "Join as a Journeyer", hash: "journeyer" },
  joinField: { label: "Tell us more", options: [] },
};

export const PROGRAMME_BRANDS: Record<string, ProgrammeBrand> = {
  singaweb: {
    accent: "#1F6F6B",
    tint: "#E8F2F1",
    onAccent: "#F4FBFA",
    short: "SINGAWEB",
    tagline: "Every school deserves to be found.",
    sections: [
      { id: "overview", label: "Overview" },
      { id: "includes", label: "What we build" },
      { id: "schools", label: "Schools" },
      { id: "walk", label: "Build process" },
      { id: "join", label: "Request a site" },
    ],
    cta: { label: "Request a school website", hash: "companion" },
    joinField: {
      label: "Does your school already have a domain name?",
      options: ["Yes", "No", "Not sure"],
    },
  },
  sisterhood: {
    accent: "#9B3F8F",
    tint: "#F6E7F5",
    onAccent: "#FDF6FC",
    short: "Sisterhood",
    tagline: "Move forward without shrinking your future.",
    sections: [
      { id: "overview", label: "Overview" },
      { id: "includes", label: "The circle" },
      { id: "walk", label: "The walk" },
      { id: "join", label: "Join the circle" },
    ],
    cta: { label: "Join the Sisterhood", hash: "journeyer" },
    joinField: {
      label: "Which best describes you right now?",
      options: ["Currently pregnant", "Parenting under 25", "Supporting someone who is"],
    },
  },
  taca: {
    accent: "#2E5C9A",
    tint: "#E8EEF7",
    onAccent: "#F5F9FF",
    short: "TACA",
    tagline: "Career pathways for a changing world.",
    sections: [
      { id: "overview", label: "Overview" },
      { id: "includes", label: "Support offered" },
      { id: "walk", label: "The journey" },
      { id: "join", label: "Get guidance" },
    ],
    cta: { label: "Get career guidance", hash: "journeyer" },
    joinField: {
      label: "What would you like guidance with?",
      options: [
        "Career and technology fields",
        "Study options and entry requirements",
        "Applications or funding pathways",
        "Career talks or technology exposure",
      ],
    },
  },
  comhack: {
    accent: "#C2622B",
    tint: "#FAEDE3",
    onAccent: "#FFF7F1",
    short: "COMHACK",
    tagline: "Apply together, not alone.",
    sections: [
      { id: "overview", label: "Overview" },
      { id: "includes", label: "How it runs" },
      { id: "walk", label: "Sprint flow" },
      { id: "join", label: "Join a sprint" },
    ],
    cta: { label: "Join a sprint", hash: "journeyer" },
    joinField: {
      label: "Preferred sprint format",
      options: ["In-person", "Virtual", "Either works"],
    },
  },
  mentored: {
    accent: "#4C6B3C",
    tint: "#EAF1E5",
    onAccent: "#F7FBF4",
    short: "MENTORED",
    tagline: "Consistency is the product.",
    sections: [
      { id: "overview", label: "Overview" },
      { id: "includes", label: "The framework" },
      { id: "walk", label: "Match to milestone" },
      { id: "join", label: "Be matched" },
    ],
    cta: { label: "Be matched with a Guide", hash: "guide" },
    joinField: {
      label: "I am joining as",
      options: ["A Journeyer seeking a Guide", "A Guide offering to mentor"],
    },
  },
};

/** Sections every programme page carries, inserted before the closing "join". */
const EXTRA_SECTIONS = [
  { id: "team", label: "Team" },
  { id: "impact", label: "Impact" },
  { id: "allies", label: "Partners" },
];

export function getBrand(
  slug: string,
  name?: string,
  family?: "Programme" | "Initiative",
): ProgrammeBrand {
  const base = PROGRAMME_BRANDS[slug] ?? { ...DEFAULT_BRAND, short: name ?? DEFAULT_BRAND.short };
  const sections = [...base.sections];
  const extra =
    family === "Initiative"
      ? [...EXTRA_SECTIONS, { id: "gallery", label: "Gallery" }]
      : EXTRA_SECTIONS;
  const joinIndex = sections.findIndex((s) => s.id === "join");
  const at = joinIndex === -1 ? sections.length : joinIndex;
  sections.splice(at, 0, ...extra);
  return { ...base, sections };
}
