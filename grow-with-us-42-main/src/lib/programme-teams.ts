/**
 * Per-programme identity: who founded it, when, what it is for, how it is going,
 * and who stands with it. Keyed by programme / initiative slug.
 */
export type ProgrammeTeamMember = {
  name: string;
  role: string;
  photo: string;
  note: string;
};

export type ProgrammeStat = { value: string; label: string };

export type ProgrammeAlly = { name: string; short: string; note: string; url: string };

export type ProgrammeDossier = {
  founded: string;
  foundedNote: string;
  vision: string;
  mission: string;
  commitments: string[];
  team: ProgrammeTeamMember[];
  stats: ProgrammeStat[];
  allies: ProgrammeAlly[];
};

const CORE_ALLY: ProgrammeAlly = {
  name: "Durban University of Technology",
  short: "DUT",
  note: "Anchor supporter",
  url: "https://www.dut.ac.za",
};

const OPEN_SEAT: ProgrammeAlly = {
  name: "Partner seat open",
  short: "YOU",
  note: "SINGAWE needs you",
  url: "/collaborate",
};

const DEFAULT_DOSSIER: ProgrammeDossier = {
  founded: "2024",
  foundedNote: "Founded in Loskop, KwaZulu-Natal, inside the first SINGAWE cycle.",
  vision: "A South Africa where no one walks toward opportunity alone.",
  mission:
    "To remove the practical barriers between a person and the opportunity that already exists for them — and to stay until they are through the door.",
  commitments: [
    "Free for every individual, always.",
    "Structured, recorded and safeguarded.",
    "Built with what already exists, not in parallel to it.",
  ],
  team: [
    {
      name: "Kwanele Ayanda Mazibuko",
      role: "Founder & Executive Director",
      photo: "p1",
      note: "Started the Foundation in 2024 and still sits in the sessions.",
    },
    {
      name: "Nomsa Dlamini",
      role: "Governance & Safeguarding",
      photo: "p3",
      note: "Holds the Charter and the safeguarding framework.",
    },
    {
      name: "Programme Lead seat open",
      role: "Volunteer lead",
      photo: "p5",
      note: "This seat is open — SINGAWE needs you.",
    },
  ],
  stats: [
    { value: "2024", label: "Year founded" },
    { value: "1", label: "Anchor school" },
    { value: "KZN", label: "Home province" },
    { value: "0", label: "Cost to a Journeyer" },
  ],
  allies: [CORE_ALLY, OPEN_SEAT],
};

export const PROGRAMME_DOSSIERS: Record<string, ProgrammeDossier> = {
  singaweb: {
    founded: "March 2024",
    foundedNote:
      "Born at Phuthini Secondary School, Loskop — a school with everything to say and nowhere to say it.",
    vision: "Every school in South Africa findable, online, and proud of how it looks.",
    mission:
      "To design, build and hand over free websites for schools that have never had one, and to train the staff who will keep them alive.",
    commitments: [
      "The school owns the site. Always.",
      "Two staff members trained before handover.",
      "Hosting and support carried by the Foundation.",
    ],
    team: [
      {
        name: "Kwanele Ayanda Mazibuko",
        role: "Founder, SINGAWEB",
        photo: "p1",
        note: "Built the first school site by hand, after hours.",
      },
      {
        name: "Sibusiso Ndlovu",
        role: "Build lead",
        photo: "p2",
        note: "Turns a school's paper prospectus into pages that load on a phone.",
      },
      {
        name: "Thandeka Khumalo",
        role: "Training & handover",
        photo: "p4",
        note: "Sits with staff until they can post an announcement alone.",
      },
    ],
    stats: [
      { value: "2024", label: "Founded" },
      { value: "3", label: "Schools in build" },
      { value: "R0", label: "Cost to a school" },
      { value: "100%", label: "Ownership handed over" },
    ],
    allies: [
      CORE_ALLY,
      { name: "Phuthini Secondary School", short: "PSS", note: "First school online", url: "https://www.education.gov.za" },
      { name: "Department of Basic Education", short: "DBE", note: "Schools access", url: "https://www.education.gov.za" },
      OPEN_SEAT,
    ],
  },

  sisterhood: {
    founded: "August 2024",
    foundedNote:
      "Started as a Saturday circle of six women in Estcourt who were told their story was finished at nineteen.",
    vision: "A young mother's future stays her own size.",
    mission:
      "To walk with women who became mothers before 25 across mental health, physical wellbeing and economic footing — until confidence returns and income follows.",
    commitments: [
      "Childcare-aware scheduling, never a reason to drop out.",
      "Confidential by default, referral-backed where needed.",
      "Economic footing is part of healing, not separate from it.",
    ],
    team: [
      {
        name: "Zanele Mthembu",
        role: "Founder, Sisterhood of SINGAWE",
        photo: "p4",
        note: "Convened the first circle in her own living room.",
      },
      {
        name: "Nomsa Dlamini",
        role: "Wellbeing & safeguarding",
        photo: "p3",
        note: "Holds the referral network and the confidentiality line.",
      },
      {
        name: "Ayanda Zulu",
        role: "Economic pathways",
        photo: "p6",
        note: "Return-to-study, skills and first-income routes.",
      },
    ],
    stats: [
      { value: "2024", label: "Founded" },
      { value: "6→", label: "Women in the first circle" },
      { value: "3", label: "Pillars: mind, body, income" },
      { value: "<25", label: "Age at motherhood" },
    ],
    allies: [
      CORE_ALLY,
      { name: "SAYouth", short: "SAY", note: "Work opportunities", url: "https://www.sayouth.mobi" },
      { name: "Estcourt Youth Collective", short: "EYC", note: "Community reach", url: "https://www.sayouth.mobi" },
      OPEN_SEAT,
    ],
  },

  taca: {
    founded: "May 2024",
    foundedNote:
      "Began as one laptop in a school library during application season, and never left.",
    vision: "No one loses a place because of a form, a document or a data bundle.",
    mission:
      "To build technology confidence and sit beside people through university, TVET and funding applications until submit is pressed.",
    commitments: [
      "We do not fill it in for you. We do not leave you either.",
      "Documents, devices and data are our problem, not yours.",
      "Every application tracked to an outcome.",
    ],
    team: [
      {
        name: "Sibusiso Ndlovu",
        role: "Founder, TACA",
        photo: "p2",
        note: "Ran the first application desk out of a school library.",
      },
      {
        name: "Kwanele Ayanda Mazibuko",
        role: "Institution liaison",
        photo: "p1",
        note: "Keeps the DUT and CACH routes open.",
      },
      {
        name: "Lindiwe Mkhize",
        role: "Digital literacy",
        photo: "p5",
        note: "Online safety, email, uploads, passwords — the invisible barriers.",
      },
    ],
    stats: [
      { value: "2024", label: "Founded" },
      { value: "Sep–Jan", label: "Application season" },
      { value: "4", label: "Routes: varsity, TVET, NSFAS, CACH" },
      { value: "1:1", label: "Support ratio" },
    ],
    allies: [
      CORE_ALLY,
      { name: "NSFAS", short: "NSFAS", note: "Funding pathways", url: "https://www.nsfas.org.za" },
      { name: "Universities South Africa", short: "USAf", note: "Clearing house", url: "https://www.usaf.ac.za" },
      OPEN_SEAT,
    ],
  },

  comhack: {
    founded: "November 2024",
    foundedNote:
      "A weekend experiment: twelve people, one room, every open bursary on a whiteboard.",
    vision: "Opportunity stops being a secret.",
    mission:
      "To surface scholarships, bursaries, competitions and fellowships, then run sprints where people apply together instead of alone.",
    commitments: [
      "Everything we find is published, not hoarded.",
      "Sprints are group work with individual outcomes.",
      "Deadlines are tracked for you.",
    ],
    team: [
      {
        name: "Ayanda Zulu",
        role: "Founder, COMHACK",
        photo: "p6",
        note: "Ran the first opportunity sprint on a borrowed projector.",
      },
      {
        name: "Lindiwe Mkhize",
        role: "Opportunity board",
        photo: "p5",
        note: "Finds, verifies and publishes what is actually open.",
      },
      {
        name: "Sibusiso Ndlovu",
        role: "Sprint facilitation",
        photo: "p2",
        note: "Keeps a room of applicants moving to submit.",
      },
    ],
    stats: [
      { value: "2024", label: "Founded" },
      { value: "12", label: "In the first sprint" },
      { value: "Live", label: "Opportunity board" },
      { value: "0", label: "Applications sent alone" },
    ],
    allies: [
      CORE_ALLY,
      { name: "SAYouth", short: "SAY", note: "Work pipeline", url: "https://www.sayouth.mobi" },
      { name: "NSFAS", short: "NSFAS", note: "Funding", url: "https://www.nsfas.org.za" },
      OPEN_SEAT,
    ],
  },

  mentored: {
    founded: "January 2024",
    foundedNote:
      "The first thing SINGAWE ever did: one Guide, one Journeyer, one hour a month, written down.",
    vision: "Nobody walks the distance to their potential unaccompanied.",
    mission:
      "To match every Journeyer with a Guide inside a structured, safeguarded framework — and to make consistency, not charity, the product.",
    commitments: [
      "Guides are screened, briefed and supported.",
      "One structured hour a month, recorded and followed up.",
      "Journeyers become Torchbearers, and then Guides.",
    ],
    team: [
      {
        name: "Kwanele Ayanda Mazibuko",
        role: "Founder, MENTORED",
        photo: "p1",
        note: "Wrote the first session template that we still use.",
      },
      {
        name: "Nomsa Dlamini",
        role: "Safeguarding",
        photo: "p3",
        note: "Screening, records and confidential reporting.",
      },
      {
        name: "Thandeka Khumalo",
        role: "Matching & follow-up",
        photo: "p4",
        note: "Pairs field to person, then makes sure the hour happens.",
      },
    ],
    stats: [
      { value: "2024", label: "Founded" },
      { value: "1 hr", label: "Structured, monthly" },
      { value: "6", label: "Guide fields open" },
      { value: "100%", label: "Sessions recorded" },
    ],
    allies: [
      CORE_ALLY,
      { name: "Phuthini Secondary School", short: "PSS", note: "Anchor school", url: "https://www.education.gov.za" },
      OPEN_SEAT,
    ],
  },
};

export function getDossier(slug: string): ProgrammeDossier {
  return PROGRAMME_DOSSIERS[slug] ?? DEFAULT_DOSSIER;
}
