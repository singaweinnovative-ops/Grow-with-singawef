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

export type ProgrammeWalkStep = { step: string; title: string; body: string };

export type ProgrammeDossier = {
  founded: string;
  foundedNote: string;
  vision: string;
  mission: string;
  commitments: string[];
  team: ProgrammeTeamMember[];
  stats: ProgrammeStat[];
  allies: ProgrammeAlly[];
  /** What actually happens, step by step, inside this specific programme. */
  walk: ProgrammeWalkStep[];
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
  walk: [
    {
      step: "01",
      title: "We see you",
      body: "Talent is identified through schools, communities and partners — and through people simply reaching out.",
    },
    {
      step: "02",
      title: "We prepare you",
      body: "Barriers are named honestly, then reduced: information, documents, confidence, transport, data, funding.",
    },
    {
      step: "03",
      title: "We walk with you",
      body: "A Guide is matched. The relationship is structured, safeguarded and consistent.",
    },
    {
      step: "04",
      title: "We keep going",
      body: "Our role does not end at an achievement. Growth continues, and Journeyers become Torchbearers.",
    },
  ],
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
      {
        name: "Phuthini Secondary School",
        short: "PSS",
        note: "First school online",
        url: "https://phuthini-secondary-school-main.vercel.app/",
      },
      {
        name: "Enkomokazini Technical School",
        short: "ETS",
        note: "Second school online",
        url: "https://enkomokazini-technical-school-main.vercel.app/",
      },
      {
        name: "Department of Basic Education",
        short: "DBE",
        note: "Schools access",
        url: "https://www.education.gov.za",
      },
      OPEN_SEAT,
    ],
    walk: [
      {
        step: "01",
        title: "A school says yes",
        body: "Through a Guide, a partner, or the school itself — no website yet, and a story worth telling online.",
      },
      {
        step: "02",
        title: "We map what they need",
        body: "Pages, photos, contact details and the things parents and learners actually search for.",
      },
      {
        step: "03",
        title: "We build it",
        body: "A working site takes shape, built to load on a phone first — not a desktop mock-up nobody on-site can open.",
      },
      {
        step: "04",
        title: "We train two staff",
        body: "Someone at the school learns to post, update and maintain it before we hand over anything.",
      },
      {
        step: "05",
        title: "We hand it over and keep hosting",
        body: "The school owns the site outright. The Foundation carries hosting and support so it never goes dark.",
      },
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
      {
        name: "SAYouth",
        short: "SAY",
        note: "Work opportunities",
        url: "https://www.sayouth.mobi",
      },
      {
        name: "Estcourt Youth Collective",
        short: "EYC",
        note: "Community reach",
        url: "https://www.sayouth.mobi",
      },
      OPEN_SEAT,
    ],
    walk: [
      {
        step: "01",
        title: "She reaches the circle",
        body: "Through a referral, a Guide, or walking in herself — no form before a conversation.",
      },
      {
        step: "02",
        title: "We listen first",
        body: "Mental health, physical wellbeing and the economic picture, named without judgment.",
      },
      {
        step: "03",
        title: "The circle meets",
        body: "Childcare-aware scheduling, confidential by default, as often as she needs it.",
      },
      {
        step: "04",
        title: "We open the next door",
        body: "Referrals, return-to-study routes or a first income pathway, matched to where she is right now.",
      },
      {
        step: "05",
        title: "She keeps her own future",
        body: "The circle stays open long after the first conversation — this isn't a programme with an end date.",
      },
    ],
  },

  taca: {
    founded: "2024",
    foundedNote:
      "Developed by Kwanele Ayanda Mazibuko and former Programme Manager Mandisa Visagie, TACA began its school work across Loskop, Estcourt and Bergville in 2024.",
    vision:
      "A future where every individual can understand, access and confidently navigate the opportunities created by technology and changing careers.",
    mission:
      "To connect individuals with relevant knowledge, people, institutions and opportunities that help them make informed education and career decisions in a changing world.",
    commitments: [
      "Make career information accessible and relevant to the people who need it.",
      "Turn exposure into practical next steps and meaningful connections.",
      "Support each person's path with continuity and room for different routes.",
    ],
    team: [
      {
        name: "Kwanele Ayanda Mazibuko",
        role: "Founder, SINGAWE Foundation",
        photo: "p1",
        note: "Developed TACA's early programme alongside former Programme Manager Mandisa Visagie.",
      },
    ],
    stats: [
      { value: "7", label: "Schools reached in 2024" },
      { value: "9", label: "Schools planned for TACA Week 2026" },
      { value: "5", label: "2026 schools in Loskop" },
      { value: "3rd", label: "Consecutive TACA Week in 2026" },
    ],
    allies: [
      CORE_ALLY,
      OPEN_SEAT,
    ],
    walk: [
      {
        step: "01",
        title: "Discover what exists",
        body: "Meet technology fields, careers, institutions and opportunities you may not have encountered before.",
      },
      {
        step: "02",
        title: "Understand the options",
        body: "Learn what different fields involve, which skills they use and where you can study them.",
      },
      {
        step: "03",
        title: "Explore what fits",
        body: "Connect possibilities to your interests, strengths and aspirations.",
      },
      {
        step: "04",
        title: "Navigate a route",
        body: "Understand entry requirements, applications, funding and alternative pathways.",
      },
      {
        step: "05",
        title: "Connect with people",
        body: "Get closer to institutions, students, professionals and partners who can help along the way.",
      },
      {
        step: "06",
        title: "Act, then pass it on",
        body: "Leave with a clear next step and the confidence to help someone else discover their path.",
      },
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
    walk: [
      {
        step: "01",
        title: "We find what's open",
        body: "Scholarships, bursaries, competitions and fellowships, published as soon as we verify them.",
      },
      {
        step: "02",
        title: "You join a sprint",
        body: "In-person or virtual, matched to the format that works for you.",
      },
      {
        step: "03",
        title: "We apply together",
        body: "A room of people working on their own applications, side by side — not alone at a kitchen table.",
      },
      {
        step: "04",
        title: "Deadlines are tracked for you",
        body: "Reminders and document checklists, so nothing is missed in the noise of a busy season.",
      },
      {
        step: "05",
        title: "You leave with a submission",
        body: "Every sprint ends with an application actually sent — not just started.",
      },
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
      {
        name: "Phuthini Secondary School",
        short: "PSS",
        note: "Anchor school",
        url: "https://phuthini-secondary-school-main.vercel.app/",
      },
      OPEN_SEAT,
    ],
    walk: [
      {
        step: "01",
        title: "You're matched to a field",
        body: "A Journeyer or a Guide, matched by field and availability — not at random.",
      },
      {
        step: "02",
        title: "The Guide is screened first",
        body: "Every Guide is screened, briefed and safeguarded before a single session happens.",
      },
      {
        step: "03",
        title: "One hour, every month",
        body: "Structured and recorded — never left to chance, never quietly dropped.",
      },
      {
        step: "04",
        title: "Obstacles get named and worked through",
        body: "Whatever stands in the way, written down and returned to at the next session.",
      },
      {
        step: "05",
        title: "You become the next Guide",
        body: "Journeyers who complete the walk often come back as Torchbearers, then Guides themselves.",
      },
    ],
  },
};

/**
 * The four framework programmes (as opposed to the five named initiatives)
 * don't have full dossiers — only their walk steps are specific, since
 * that's what visitors actually read on a first visit to the page.
 */
const FRAMEWORK_WALK_STEPS: Record<string, ProgrammeWalkStep[]> = {
  pathfinder: [
    {
      step: "01",
      title: "We scan for what's open",
      body: "Scholarships, competitions, fellowships, bursaries and programmes, tracked as they open — not discovered after the deadline.",
    },
    {
      step: "02",
      title: "We bring it to you",
      body: "Opportunity alerts reach Journeyers directly, matched to what they actually qualify for.",
    },
    {
      step: "03",
      title: "We prepare the application",
      body: "Documents, requirements and deadlines worked through together, not just announced.",
    },
    {
      step: "04",
      title: "We handle the logistics",
      body: "Funding gaps, transport and paperwork barriers named and reduced before they stop an application.",
    },
    {
      step: "05",
      title: "You apply, informed",
      body: "Every submission goes in with time to spare, not in a last-minute scramble.",
    },
  ],
  walkalong: [
    {
      step: "01",
      title: "You're matched to a Guide",
      body: "Paired by field and availability, not at random.",
    },
    {
      step: "02",
      title: "The Guide is screened first",
      body: "Every Guide is screened, briefed and safeguarded before a single session happens.",
    },
    {
      step: "03",
      title: "You meet, structured",
      body: "The same date, every month — progress, obstacles and next steps written down.",
    },
    {
      step: "04",
      title: "The relationship is followed up",
      body: "No session happens and then disappears — each one is checked on before the next.",
    },
    {
      step: "05",
      title: "It continues past the opportunity",
      body: "The walk doesn't end when the achievement does.",
    },
  ],
  makers: [
    {
      step: "01",
      title: "We bring the workshop to you",
      body: "School and community STEAM sessions, hands-on, with real materials.",
    },
    {
      step: "02",
      title: "You build something real",
      body: "Curiosity turned into a working prototype, not just a worksheet.",
    },
    {
      step: "03",
      title: "We prepare you for the stage",
      body: "Innovation challenges and showcases, rehearsed before the real judging happens.",
    },
    {
      step: "04",
      title: "We support the next step",
      body: "Entrepreneurship and prototyping help, once an idea is worth taking further.",
    },
    {
      step: "05",
      title: "The work gets seen",
      body: "From classroom project to expo floor, with the Foundation alongside it.",
    },
  ],
  torch: [
    {
      step: "01",
      title: "You join a leadership lab",
      body: "Structured sessions on service, not leadership theory for its own sake.",
    },
    {
      step: "02",
      title: "You practice speaking up",
      body: "Public speaking and civic literacy, built through repetition, not a single workshop.",
    },
    {
      step: "03",
      title: "You lead a service project",
      body: "Influence measured by what changes for the people around you.",
    },
    {
      step: "04",
      title: "You're matched to a cause",
      body: "Leadership applied somewhere specific, not left abstract.",
    },
    {
      step: "05",
      title: "You become a Torchbearer",
      body: "Returning to guide the next person through the same walk.",
    },
  ],
};

export function getDossier(slug: string): ProgrammeDossier {
  const base = PROGRAMME_DOSSIERS[slug] ?? DEFAULT_DOSSIER;
  const walk = FRAMEWORK_WALK_STEPS[slug] ?? base.walk;
  return { ...base, walk };
}
