export const SITE = {
  name: "SINGAWE Foundation",
  legal: "SINGAWE Foundation NPC",
  meaning: "We Are For You.",
  tagline: "Your Journey. Our Commitment.",
  email: "singawefoundation@gmail.com",
  phone: "+27 60 303 1263",
  location: "Durban, South Africa",
  registration: {
    cipcNumber: "2026/566758/08",
    taxRefNumber: "9817822191",
    registeredAddressLines: ["70 Steve Biko Rd", "Durban", "Durban", "KwaZulu-Natal", "4001"],
  },
};

/**
 * Social media presence. Replace each URL with the Foundation's real page —
 * these are the handles that render in the footer's icon row.
 */
export const SOCIAL = {
  instagram: "https://instagram.com/singawefoundation",
  facebook: "https://facebook.com/singawefoundation",
  linkedin: "https://www.linkedin.com/company/singawe-foundation",
  whatsapp: "https://whatsapp.com/channel/0029VacWj707T8bQRQn2zv0v",
  tiktok: "https://www.tiktok.com/@singawe_f?_r=1&_t=ZS-98zZeea4VnO",
};

/**
 * Naming language for the people in our ecosystem.
 * Mentors = Guides. Mentees = Journeyers. Board = Stewards.
 */
export const LEXICON = [
  {
    term: "Journeyers",
    formerly: "Mentees",
    body: "The individuals at the centre of our work. Not beneficiaries, not recipients — people walking a journey we have chosen to walk with them.",
  },
  {
    term: "Guides",
    formerly: "Mentors",
    body: "Professionals, students and community leaders who walk beside a Journeyer. They do not carry people. They light the path and stay until it is walked.",
  },
  {
    term: "Torchbearers",
    formerly: "Alumni",
    body: "Journeyers who have completed a programme and now open doors for the next person. Our legacy is measured in Torchbearers.",
  },
  {
    term: "Stewards",
    formerly: "Board & Executive",
    body: "Those entrusted with the Foundation's purpose, resources and public trust. Temporary custodians of a much greater vision.",
  },
  {
    term: "Visionaries",
    formerly: "Founders & Patrons",
    body: "Those who saw what was possible before it existed, and committed their names, time and resources to it.",
  },
  {
    term: "Companions",
    formerly: "Volunteers & Partners",
    body: "Schools, businesses, institutions and individuals who make the journey shorter, safer and wider for everyone on it.",
  },
];

export const PRINCIPLES = [
  "Every Individual Matters",
  "Opportunity Changes Lives",
  "Empowerment Creates Independence",
  "Learning Never Ends",
  "Innovation Drives Progress",
  "Leadership Is Service",
  "Collaboration Multiplies Impact",
  "Integrity Builds Trust",
  "Safeguarding Is Non-Negotiable",
  "Legacy Is Measured by Those We Empower",
];

export const VALUES = [
  {
    name: "Integrity",
    body: "We do what is right, especially when no one is watching and when it costs us something.",
    isNot: "Integrity is not convenience.",
  },
  {
    name: "Service",
    body: "Leadership begins with service. We listen before we act and place people before recognition.",
    isNot: "Service is not charity performed for applause.",
  },
  {
    name: "Respect",
    body: "Every person is treated with dignity and fairness, regardless of background or circumstance.",
    isNot: "Respect is not selective politeness.",
  },
  {
    name: "Excellence",
    body: "We hold ourselves to a standard worthy of the people who trust us with their journey.",
    isNot: "Excellence is not perfectionism.",
  },
  {
    name: "Collaboration",
    body: "Meaningful impact is shared. We build with families, schools, communities and partners.",
    isNot: "Collaboration is not credit-taking.",
  },
  {
    name: "Innovation",
    body: "We look for better ways to reduce barriers, and we are not afraid to change our own methods.",
    isNot: "Innovation is not novelty for its own sake.",
  },
];

/**
 * "Our Work" — the five pillars behind every programme and initiative.
 */
export const OUR_WORK_PILLARS = [
  {
    title: "Mentorship",
    body: "One-to-one and group mentorship before, during and after every opportunity — not a one-time intervention, but a relationship.",
  },
  {
    title: "Education & Lifelong Learning",
    body: "Expanding access to educational, leadership and developmental opportunities, and supporting the pathways that connect people to them.",
  },
  {
    title: "STEAM & Innovation",
    body: "Advancing STEAM education and entrepreneurship through practical learning, creative problem-solving and hands-on collaboration.",
  },
  {
    title: "Leadership Development",
    body: "Cultivating leaders who understand that leadership is service — developed over time, not conferred by a title.",
  },
  {
    title: "Community Partnerships",
    body: "Working alongside families, schools, communities, government, businesses and academic institutions to remove barriers to opportunity.",
  },
];

/**
 * "Who We Serve" — everyone SINGAWE works alongside.
 */
export const WHO_WE_SERVE_GROUPS = [
  {
    title: "Young People",
    body: "Children and young people with exceptional talent, ideas and determination whose potential often goes unrealised for lack of exposure, guidance or access. Every individual matters, and every person's journey is different — we don't measure success by identical outcomes.",
  },
  {
    title: "Families & Communities",
    body: "Families and communities play a vital role in the growth and success of every individual. We work alongside parents, guardians, educators and local organisations to strengthen the environments in which people learn, grow and lead.",
  },
  {
    title: "Schools & Educators",
    body: "We partner with schools to expand awareness of opportunity and support environments where learners can thrive, building on the relationships educators already hold with young people.",
  },
  {
    title: "Partners & Stakeholders",
    body: "Government, businesses, civil society organisations, donors and academic institutions who share our belief that meaningful impact is strengthened through collaboration.",
  },
];

export const PROGRAMMES = [
  {
    id: "pathfinder",
    label: "01",
    name: "Pathfinder",
    kicker: "Access & Awareness",
    body: "We find the opportunities — scholarships, competitions, fellowships, bursaries, programmes — and we bring them to the people who would never have heard of them. Then we help prepare the application, not just announce the deadline.",
    points: [
      "Opportunity discovery and alerts",
      "Application and interview preparation",
      "Documents, funding and logistics support",
    ],
  },
  {
    id: "walkalong",
    label: "02",
    name: "Walk-Along",
    kicker: "Mentorship",
    body: "Every Journeyer is matched with a Guide for a structured relationship that begins before the opportunity, continues through it, and does not end when it does.",
    points: [
      "Structured Guide–Journeyer matching",
      "Monthly sessions and check-ins",
      "Safeguarding-first, always",
    ],
  },
  {
    id: "makers",
    label: "03",
    name: "Makers Lab",
    kicker: "STEAM & Innovation",
    body: "Practical science, technology, engineering, arts and mathematics — built with hands, in real rooms, with real materials. Curiosity turned into capability.",
    points: [
      "School and community STEAM workshops",
      "Innovation challenges and showcases",
      "Entrepreneurship and prototyping support",
    ],
  },
  {
    id: "torch",
    label: "04",
    name: "Torch",
    kicker: "Leadership Development",
    body: "Leadership at SINGAWE is service. Torch develops young leaders who understand that influence is measured by the impact created through people.",
    points: [
      "Leadership labs and service projects",
      "Public speaking and civic literacy",
      "Torchbearer pathway into guiding others",
    ],
  },
];

export const JOURNEY_STEPS = [
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
];

export const STEWARDS = [
  {
    name: "Kwanele Ayanda Mazibuko",
    role: "Founder & Executive Director",
    circle: "Visionary",
    initials: "KM",
    note: "Signed the Foundation Charter on 07 August 2026 and holds the Foundation to it.",
  },
  {
    name: "Board Seat — Governance",
    role: "Non-Executive Director",
    circle: "Steward",
    initials: "SF",
    note: "Oversees compliance, risk and the Memorandum of Incorporation.",
  },
  {
    name: "Board Seat — Programmes",
    role: "Non-Executive Director",
    circle: "Steward",
    initials: "SF",
    note: "Oversees programme quality, safeguarding and impact reporting.",
  },
  {
    name: "Board Seat — Partnerships",
    role: "Non-Executive Director",
    circle: "Steward",
    initials: "SF",
    note: "Oversees collaboration with schools, business and institutions.",
  },
];

export const GUIDES = [
  { name: "Guide Seat Open", field: "Engineering & Technology", initials: "01" },
  { name: "Guide Seat Open", field: "Education & Academia", initials: "02" },
  { name: "Guide Seat Open", field: "Business & Entrepreneurship", initials: "03" },
  { name: "Guide Seat Open", field: "Health & Wellbeing", initials: "04" },
  { name: "Guide Seat Open", field: "Law & Governance", initials: "05" },
  { name: "Guide Seat Open", field: "Creative Arts & Media", initials: "06" },
];

export const FAQS = [
  {
    q: "Who can join a SINGAWE programme?",
    a: "Our work begins with the individual. Programmes are open to learners, students and young people across South Africa, regardless of geography, circumstance or socioeconomic background. Specific programmes may carry age or phase requirements, which are always published with the intake.",
  },
  {
    q: "Does it cost anything to be a Journeyer?",
    a: "No. SINGAWE Foundation NPC is a registered Non-Profit Company established for public benefit. We never charge an individual for access to mentorship, guidance or opportunity support.",
  },
  {
    q: "What does a Guide actually commit to?",
    a: "A structured relationship, usually monthly contact over a programme cycle, within our safeguarding framework. Guides are screened, briefed and supported. They are not asked to fund anyone — they are asked to be consistent.",
  },
  {
    q: "How do you keep young people safe?",
    a: "Safeguarding is non-negotiable. All Guides and representatives are screened and bound by the Foundation Charter and our safeguarding policy. Contact happens through recorded, accountable channels, and concerns can be raised confidentially at any time.",
  },
  {
    q: "Is the Foundation politically affiliated?",
    a: "No. The Foundation operates independently, without political affiliation, in accordance with the Companies Act, 2008 (Act No. 71 of 2008), its Memorandum of Incorporation and this Charter.",
  },
  {
    q: "How can an organisation partner with SINGAWE?",
    a: "Through funding, opportunity pipelines, venues, equipment, expertise or Guide participation from your team. Partnerships are documented and aligned to our public benefit purpose before they begin.",
  },
];

/**
 * Named initiatives — the specific, running projects of the Foundation.
 */
export const INITIATIVES = [
  {
    id: "singaweb",
    name: "SINGAWEB",
    kicker: "Digital Presence for Schools",
    body: "We design, build and hand over free websites for schools that have never had one — so that every learner, parent and partner can find them, and so that opportunity notices them too.",
    points: [
      "Free school websites",
      "Training for staff to maintain them",
      "Hosting and handover support",
    ],
    image: "steam",
  },
  {
    id: "sisterhood",
    name: "Sisterhood of SINGAWE",
    kicker: "Women Who Became Mothers Under 25",
    body: "A circle for women who became mothers before 25 — built around mental health, physical wellbeing and economic footing. The work is confidence: helping a young woman move forward after pregnancy without shrinking her own future.",
    points: [
      "Mental health circles and counselling referrals",
      "Physical wellbeing, health access and childcare-aware scheduling",
      "Economic independence: return-to-study, skills and income pathways",
    ],
    image: "hero",
  },
  {
    id: "taca",
    name: "TACA",
    kicker: "Technology Awareness & Career Advisory",
    body: "TACA helps people understand the changing world of technology and careers, discover their options and navigate pathways toward their aspirations. Through school visits and partner-led sessions, learners explore emerging fields, education routes and practical next steps.",
    points: [
      "Explore technology, STEAM, entrepreneurship and future-work fields",
      "Understand qualifications, skills, institutions and alternative pathways",
      "Connect with students, professionals and partners, then take a clear next step",
    ],
    image: "tacaDut2",
  },

  {
    id: "comhack",
    name: "COMHACK",
    kicker: "Finding Opportunities",
    body: "A community hack on the opportunity gap. We surface scholarships, bursaries, competitions and fellowships, then run sprints where people apply together instead of alone.",
    points: [
      "Live opportunity board",
      "Group application sprints",
      "Deadline alerts and document help",
    ],
    image: "comhack3",
  },
  {
    id: "mentored",
    name: "MENTORED",
    kicker: "Mentorship",
    body: "Our mentorship engine. Every Journeyer matched with a Guide, every relationship structured, safeguarded and recorded — consistency is the product.",
    points: [
      "Guide–Journeyer matching",
      "Structured monthly sessions",
      "Safeguarding-first framework",
    ],
    image: "mentored3",
  },
];

/**
 * Age-banded programming shown in the "Growing With SINGAWE" section on the
 * homepage. Pictures are placeholders — swap them for real programme photos
 * as they become available.
 */
export const LEARNING_PATHWAYS = [
  {
    id: "little-innovators",
    name: "Little Innovators",
    ages: "Ages 3–7",
    image: "pathwayLittle",
    points: ["Interactive storytelling", "Basic robotics", "Art", "Simple coding games"],
  },
  {
    id: "young-explorers",
    name: "Young Explorers",
    ages: "Ages 8–15",
    image: "pathwayExplorers",
    points: ["Coding basics", "Science experiments", "Robotics", "Digital art"],
  },
  {
    id: "future-leaders",
    name: "Future Leaders",
    ages: "Ages 16–25",
    image: "hack7",
    points: [
      "Advanced programming",
      "Research & innovation projects",
      "Leadership & public speaking",
      "Entrepreneurship basics",
    ],
  },
];

/**
 * The application-to-portal process shown on the homepage.
 */
export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Register your interest",
    body: "Tell us who you are and what you are hoping to find — as a mentee, mentor, partner or volunteer.",
  },
  {
    step: "02",
    title: "We review your application",
    body: "Every application is read by a real person on our team, with safeguarding and fit front of mind.",
  },
  {
    step: "03",
    title: "You receive your login",
    body: "Once approved, we send you secure credentials by email so you can log in as yourself, not a form submission.",
  },
  {
    step: "04",
    title: "Your journey begins",
    body: "You step into the SINGAWE portal, where your journey with us continues — this is where the walking-alongside starts.",
  },
];

export const WALK_STAGES = [
  {
    time: "Month 00",
    title: "The first conversation",
    body: "No forms first. A conversation about where you are, what you want, and what is actually in the way.",
  },
  {
    time: "Month 01",
    title: "Matched with a Guide",
    body: "You are introduced to someone in your field who has agreed to stay for the whole cycle.",
  },
  {
    time: "Monthly",
    title: "The session",
    body: "One structured hour. Progress, obstacles, next steps — written down, followed up, never dropped.",
  },
  {
    time: "Ongoing",
    title: "The barriers",
    body: "Transport, data, documents, application fees, confidence. We name them and reduce them one by one.",
  },
  {
    time: "The door",
    title: "The opportunity",
    body: "You apply prepared, not hopeful. And whatever the outcome, the relationship continues.",
  },
  {
    time: "After",
    title: "You become the Guide",
    body: "Journeyers become Torchbearers. The walk continues, in the other direction.",
  },
];

/**
 * Where we operate, and who has carried us this far.
 */
export const FOOTPRINT = {
  since: "2024",
  province: "KwaZulu-Natal",
  areas: ["Estcourt", "Loskop"],
  anchorSchool: "Phuthini Secondary School",
  anchorSupporter: "Durban University of Technology",
  openness:
    "We are open to work with any province and any area. Where there are people, there is a journey worth walking.",
};

/**
 * Movements and projects we are part of but do not own.
 */
export const MOVEMENTS = [
  {
    id: "phuthini",
    name: "Phuthini Secondary School",
    kind: "Anchor school",
    place: "Loskop, KwaZulu-Natal",
    body: "The school where SINGAWE began in 2024. Their teachers opened the door, their learners kept it open. Everything we know about walking with someone, we learned here first.",
    role: "We support, we do not run it.",
    url: "https://phuthini-secondary-school-main.vercel.app/" as string | null,
  },
  {
    id: "dut",
    name: "Durban University of Technology",
    kind: "Anchor supporter",
    place: "Durban, KwaZulu-Natal",
    body: "DUT inspired the journey into existence and has supported it to this point — people, rooms, credibility and belief when there was nothing else to show.",
    role: "They carried us before anyone knew our name.",
    url: "https://www.dut.ac.za",
  },
  {
    id: "estcourt",
    name: "Estcourt Youth Collective",
    kind: "Community movement",
    place: "Estcourt, KwaZulu-Natal",
    body: "Local youth structures already doing the work in Estcourt. We plug our Guides and opportunity pipeline into what they run, rather than starting a parallel version of it.",
    role: "We join their table.",
    url: null as string | null,
  },
  {
    id: "openopp",
    name: "Open Opportunity Network",
    kind: "Shared pipeline",
    place: "National",
    body: "A loose network of bursary offices, NGOs and student bodies who share deadlines and application help. We contribute what we find and take what others share.",
    role: "We contribute, we do not own.",
    url: null as string | null,
  },
];

export const COLLAB_CREED = [
  "South Africa has already built extraordinary things.",
  "We keep rebuilding them, separately, in parallel.",
  "SINGAWE exists to appreciate what already exists and bring it together.",
  "You do not need to start another initiative. You need to be found, and joined.",
];

export const PARTNERS = [
  {
    name: "Durban University of Technology",
    short: "DUT",
    url: "https://www.dut.ac.za",
    note: "Anchor supporter",
  },
  {
    name: "Phuthini Secondary School",
    short: "PSS",
    url: "https://phuthini-secondary-school-main.vercel.app/",
    note: "Anchor school",
  },
  {
    name: "Department of Basic Education",
    short: "DBE",
    url: "https://www.education.gov.za",
    note: "Schools access",
  },
  { name: "NSFAS", short: "NSFAS", url: "https://www.nsfas.org.za", note: "Funding pathways" },
  { name: "SAYouth", short: "SAY", url: "https://www.sayouth.mobi", note: "Work opportunities" },
  {
    name: "Universities South Africa",
    short: "USAf",
    url: "https://www.usaf.ac.za",
    note: "Applications",
  },
  {
    name: "Estcourt Youth Collective",
    short: "EYC",
    url: "https://www.sayouth.mobi",
    note: "Community",
  },
  { name: "Partner seat open", short: "YOU", url: "/get-involved", note: "SINGAWE needs you" },
];

export type SchoolPhoto = { src: string; caption: string; year: number };

export type PartnerSchool = {
  id: string;
  name: string;
  websiteUrl: string;
  photos: SchoolPhoto[];
};

/**
 * Schools with a live website built and handed over by SINGAWEB. Each
 * school's `photos` fills its own "View gallery" dialog on the SINGAWEB
 * programme page — leave empty until real event photos exist.
 */
export const SINGAWEB_SCHOOLS: PartnerSchool[] = [
  {
    id: "enkomokazini",
    name: "Enkomokazini Technical School",
    websiteUrl: "https://enkomokazini-technical-school-main.vercel.app/",
    photos: [
      { src: "enkomokazini1", caption: "Three learners on the school grounds", year: 2026 },
      {
        src: "enkomokazini4",
        caption: "DUT Student Course Guides, handed out and read",
        year: 2026,
      },
      {
        src: "enkomokazini3",
        caption: "A classroom session, listening and reading along",
        year: 2026,
      },
      { src: "enkomokazini2", caption: "Between sessions at Enkomokazini", year: 2026 },
      { src: "enkomokazini5", caption: "The Enkomokazini group, together", year: 2026 },
    ],
  },
  {
    id: "phuthini",
    name: "Phuthini Secondary School",
    websiteUrl: "https://phuthini-secondary-school-main.vercel.app/",
    photos: [
      {
        src: "phuthini2",
        caption: "Learners and a Guide gathered outside the classrooms",
        year: 2026,
      },
      { src: "phuthini1", caption: "Two learners between sessions", year: 2026 },
      {
        src: "phuthini3",
        caption: 'The Phuthini crest — "Creating an educated citizenry"',
        year: 2026,
      },
      { src: "phuthini4", caption: "A Guide with Journeyers outside the school", year: 2026 },
      { src: "phuthini5", caption: "Four Journeyers together on campus", year: 2026 },
    ],
  },
];

/**
 * Career Yum — external careers guidance platform linked from TACA.
 */
export const CAREER_YUM = {
  label: "Career Yum",
  blurb: "Explore career paths, industries and practical next steps.",
  websiteUrl: "https://careeryum.co.za/",
  // TODO: replace with Career Yum's actual guide-page URL once confirmed —
  // points at the homepage for now.
  guideUrl: "https://careeryum.co.za/",
};

/** External tool linked from the TACA programme page. */
export const TACA_MATRIC_SYSTEM = {
  label: "TACA Matric Management System",
  url: "https://taca-matric-management-system.vercel.app/",
};

/**
 * `opens`/`closes` are ISO dates (YYYY-MM-DD) used to compute a live
 * days-remaining countdown — see getOpportunityStatus in
 * @/lib/opportunity-dates. Leave both null for a rolling opportunity with no
 * fixed deadline.
 */
export const OPPORTUNITIES = [
  {
    id: "nsfas",
    title: "NSFAS Bursary",
    org: "National Student Financial Aid Scheme",
    category: "Funding",
    opens: "2026-09-01",
    closes: "2027-01-31",
    body: "Full funding for tuition, accommodation and allowances for qualifying students at public universities and TVET colleges.",
    url: "https://www.nsfas.org.za",
  },
  {
    id: "dut-apply",
    title: "DUT Undergraduate Applications",
    org: "Durban University of Technology",
    category: "Study",
    opens: "2026-04-01",
    // Closed — update to next intake's real dates once DUT publishes them.
    closes: "2026-10-05",
    body: "Applications into DUT's engineering, health, arts and management faculties. TACA runs sit-down sessions to complete these together.",
    url: "https://www.dut.ac.za/apply-online/",
  },
  {
    id: "cacs",
    title: "Central Applications Clearing House",
    org: "Universities South Africa",
    category: "Study",
    opens: "2027-01-06",
    closes: "2027-01-31",
    body: "For learners who did not get a place — a second route into an institution with space available.",
    url: "https://www.usaf.ac.za",
  },
  {
    id: "sayouth",
    title: "SA Youth Work Opportunities",
    org: "SAYouth.mobi",
    category: "Work",
    opens: null,
    closes: null,
    body: "Zero-rated platform listing learnerships, internships and work opportunities across every province.",
    url: "https://www.sayouth.mobi",
  },
  {
    id: "funza",
    title: "Funza Lushaka Bursary",
    org: "Department of Basic Education",
    category: "Funding",
    opens: "2026-10-01",
    closes: "2027-03-31",
    body: "Full-cost bursary for students who commit to teaching in a public school after graduating.",
    url: "https://www.funzalushaka.doe.gov.za",
  },
  {
    id: "ecomp",
    title: "Eskom Expo for Young Scientists",
    org: "Eskom Development Foundation",
    category: "Competition",
    opens: "2027-02-01",
    closes: "2027-05-29",
    body: "National science fair for learners. Makers Lab prepares projects, posters and presentations with Journeyers.",
    url: "https://www.exposcience.co.za",
  },
];

/**
 * "Get help applying" forms, one per opportunity category. When someone on
 * the homepage carousel asks for help, the form shown matches the kind of
 * opportunity they clicked — funding, study, work or a competition — rather
 * than one generic enquiry form.
 * These built-in forms submit directly to the shared Supabase inbox.
 */
export const OPPORTUNITY_HELP_FORMS: Record<
  "Funding" | "Study" | "Work" | "Competition",
  { title: string; blurb: string }
> = {
  Funding: {
    title: "Funding application help",
    blurb:
      "Bursaries, scholarships and financial aid — we help you gather documents and submit before the deadline.",
  },
  Study: {
    title: "Study application help",
    blurb:
      "University, TVET college and clearing-house applications — TACA sits beside you until submit is pressed.",
  },
  Work: {
    title: "Work opportunity help",
    blurb:
      "CVs, applications and interview preparation for learnerships, internships and work opportunities.",
  },
  Competition: {
    title: "Competition entry help",
    blurb:
      "Projects, entries and presentations for competitions and science fairs — Makers Lab helps you prepare.",
  },
};

export const NEWS = [
  {
    slug: "phuthini-2024",
    date: "2024-03-18",
    label: "Where it started",
    title: "SINGAWE walks into Phuthini Secondary School for the first time",
    excerpt:
      "One classroom, one afternoon, twenty-three learners and a whiteboard. No programme names yet — only a promise that we would come back.",
    body: [
      "We arrived with no funding, no brochure and no title. What we had was a question: what is actually standing between you and the opportunity that already exists for you?",
      "The answers were not motivational. They were transport money, a missing ID document, no data to submit an online application, and nobody at home who had ever filled one in before.",
      "We came back the next month. And the month after that. That is the whole method.",
    ],
  },
  {
    slug: "dut-support",
    date: "2024-08-02",
    label: "Partnership",
    title: "Durban University of Technology backs the journey",
    excerpt:
      "DUT inspired the founding of SINGAWE and has supported the work since — rooms, people and belief before there was anything to show.",
    body: [
      "SINGAWE was born out of what the Durban University of Technology made possible for one student who then decided nobody should walk it alone.",
      "Their continued support gives our Journeyers something rare: a real institution on the other side of the application, and people inside it who answer.",
    ],
  },
  {
    slug: "taca-applications",
    date: "2025-09-10",
    label: "TACA",
    title: "TACA opens university and college application sessions",
    excerpt:
      "Technology awareness became something more practical: sitting beside a learner while they apply to university, and staying until submit is pressed.",
    body: [
      "TACA now covers digital literacy, online safety and hands-on application support for universities, TVET colleges and funding schemes.",
      "Every session ends with a submitted application or a written next step. Nobody leaves with only advice.",
    ],
  },
  {
    slug: "sisterhood-launch",
    date: "2026-02-14",
    label: "Sisterhood",
    title: "Sisterhood of SINGAWE opens its first circle",
    excerpt:
      "For women who became mothers under 25 — mental health, physical wellbeing, economic footing and the confidence to move forward after pregnancy.",
    body: [
      "The Sisterhood is not a support group people are sent to. It is a circle women choose, run by women who have walked the same road.",
      "The work is mental health, physical wellbeing and economic independence — and above all, restoring the confidence that pregnancy so often costs a young woman.",
    ],
  },
  {
    slug: "charter-signed",
    date: "2026-08-07",
    label: "Governance",
    title: "The Foundation Charter is signed",
    excerpt:
      "SINGAWE Foundation NPC formally commits its purpose, principles and safeguarding standards to paper.",
    body: [
      "The Charter binds the Foundation to its principles: every individual matters, leadership is service, safeguarding is non-negotiable.",
      "It also binds us to something harder — a legacy measured only by the people we empower.",
    ],
  },
];

/**
 * Gallery events. Each event is a real moment with an overview, a set of
 * photos and an auto-generated "highlights film" (see GalleryFilm) built
 * straight from the `photos` list below — add a photo here and it appears
 * in the film with no other code change.
 * `src` keys map through GALLERY_PHOTOS in @/lib/gallery-photos.
 */
export type GalleryPhoto = { src: string; caption: string };

export type GalleryEvent = {
  id: string;
  title: string;
  theme: string;
  year: number;
  /** 1 (January) – 12 (December) — the month this event started, for month-level filtering. */
  month: number;
  date: string;
  overview: string;
  photos: GalleryPhoto[];
  /** true when this event has a real video (see TACA_FILM_VIDEO in @/lib/gallery-photos) */
  hasVideo?: boolean;
  /** Links this event to a programme/initiative detail page's Gallery section. */
  programmeSlug?: string;
};

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const GALLERY_EVENTS: GalleryEvent[] = [
  {
    id: "indigenous-language-hackathon",
    title: "Indigenous Language Innovation Week Hackathon",
    theme: "MENTORED",
    year: 2026,
    month: 5,
    date: "29–30 May 2026",
    programmeSlug: "mentored",
    overview:
      "A 48-hour hackathon at Durban University of Technology, co-hosted with the Isabelo Sempumelelo Foundation: teams building proof-of-concept ideas at the intersection of indigenous language and technology, coached and judged over two days on campus.",
    photos: [
      { src: "hack1", caption: "The Indigenous Language Innovation Week Hackathon 2026 programme" },
      { src: "hack2", caption: "Teams settling in for a working session" },
      { src: "hack3", caption: "Coding through the brief, table by table" },
      { src: "hack4", caption: "Two participants deep into their proof of concept" },
      { src: "hack5", caption: "A quick huddle between sessions" },
      { src: "hack6", caption: "Working through the isiZulu language content behind the brief" },
      { src: "hack7", caption: "Refining the idea before judging" },
      { src: "hack8", caption: "The room, mid-sprint" },
    ],
  },
  {
    id: "taca-sessions",
    title: "TACA in the classroom",
    theme: "TACA",
    year: 2026,
    month: 8,
    date: "August 2026",
    programmeSlug: "taca",
    overview:
      "Technology Awareness Career Advisory in the classroom: learners explore technology and career pathways through school visits and partner-led sessions. This session's short film is a real clip from the day, not a placeholder.",
    hasVideo: true,
    photos: [
      { src: "taca1", caption: "Learners together for a TACA session" },
      { src: "taca2", caption: "A full classroom, notebooks ready" },
      { src: "taca3", caption: "Working through the material together" },
      { src: "taca4", caption: "Questions after the session" },
      { src: "taca5", caption: "A moment after class" },
      { src: "taca6", caption: "The group, outside after the session" },
      { src: "tacaDut1", caption: "Learners set off for DUT Student Recruitment Day" },
      { src: "tacaDut2", caption: "At the DUT Student Recruitment backdrop" },
      { src: "tacaDut3", caption: "Learners with their course guides" },
      { src: "tacaDut4", caption: "The group at the university open day" },
      { src: "enkomokazini1", caption: "Learners at the TACA school session" },
      { src: "enkomokazini2", caption: "Preparing for the research and careers session" },
      { src: "enkomokazini3", caption: "A classroom session at the partner school" },
      { src: "enkomokazini4", caption: "Reading the DUT Student Course Guides" },
      { src: "enkomokazini5", caption: "The school group between sessions" },
    ],
  },
  {
    id: "eskom-expo-prep",
    title: "Eskom Expo for Young Scientists — Q&A prep",
    theme: "Makers Lab",
    year: 2026,
    month: 5,
    date: "May 2026",
    overview:
      "Before a learner stands in front of an Eskom Expo judging panel, Makers Lab runs the Q&A first — the questions, the pressure and the confidence to answer both, rehearsed in the classroom.",
    photos: [
      { src: "eskom1", caption: "The Q&A briefing begins" },
      { src: "eskom2", caption: "Listening to what the judges will ask" },
      { src: "eskom3", caption: "Working through the expo requirements" },
      { src: "eskom4", caption: "Notes on the judging criteria" },
      { src: "eskom5", caption: "Rehearsing an answer" },
      { src: "eskom6", caption: "Ready for the next round of questions" },
      { src: "eskom7", caption: "The session continues" },
      { src: "eskom8", caption: "Preparing for the panel" },
    ],
  },
  {
    id: "mentored-eskom-expo",
    title: "Guides at the Eskom Expo for Young Scientists",
    theme: "MENTORED",
    year: 2026,
    month: 10,
    date: "October 2026",
    programmeSlug: "mentored",
    overview:
      "Guides travelled with Journeyers to the Eskom Expo for Young Scientists — the same stage a former mentee, Olwethu, has since returned to as a judge. This is mentorship measured the way SINGAWE counts it: in people who come back.",
    photos: [
      { src: "mentored1", caption: "A Journeyer at the Expo, lanyard on and ready to present" },
      { src: "mentored2", caption: "Four Journeyers together on the Expo grounds" },
      { src: "mentored3", caption: "A Guide with the group between sessions" },
      { src: "mentored4", caption: "Reviewing a presentation before judging" },
      { src: "mentored5", caption: "Breakfast with the Guides before the day begins" },
    ],
  },
  {
    id: "comhack-ai-and-opportunity",
    title: "Eskom Expo and the ETAIN AI panel",
    theme: "COMHACK",
    year: 2026,
    month: 10,
    date: "October 2026",
    programmeSlug: "comhack",
    overview:
      "From the Eskom Expo opportunity floor to a panel on where artificial intelligence is taking KwaZulu-Natal — COMHACK followed the opportunities, then sat in the room where the next ones are being built.",
    photos: [
      { src: "comhack1", caption: "Two attendees with their Eskom Expo programme" },
      { src: "comhack2", caption: "A media interview recorded on the sidelines" },
      { src: "comhack3", caption: "The ETAIN panel on AI in KwaZulu-Natal" },
      { src: "comhack4", caption: "Taking notes during the panel discussion" },
    ],
  },
  {
    id: "pts-capacity-building-workshop",
    title: "Practitioner-to-Scholar Capacity Building Workshop",
    theme: "COMHACK",
    year: 2026,
    month: 8,
    date: "7–8 August 2026",
    programmeSlug: "comhack",
    overview:
      "SINGAWE was represented at the Practitioner-to-Scholar Programme's Capacity Building Workshop at SICAS Guest House, Westridge — themed 'From Community Practice to Scholarly Knowledge.' Two days turning what we do on the ground into research other practitioners can use.",
    photos: [
      {
        src: "comhackPts1",
        caption: "The workshop floor, DUT's Practitioner-to-Scholar Programme in session",
      },
      { src: "comhackPts2", caption: "Presenting at the Capacity Building Workshop" },
      { src: "comhackPts3", caption: "A portrait break on the SICAS Guest House terrace" },
      { src: "comhackPts4", caption: "Between sessions, Westridge" },
    ],
  },
];

export const GALLERY_THEMES = [
  "Journeyers",
  "Walk-Along",
  "MENTORED",
  "TACA",
  "Makers Lab",
  "Sisterhood",
  "SINGAWEB",
  "Torchbearers",
  "COMHACK",
];

export const GALLERY_EVENT_YEARS = Array.from(new Set(GALLERY_EVENTS.map((e) => e.year))).sort();

export function getGalleryEvent(id: string) {
  return GALLERY_EVENTS.find((e) => e.id === id);
}

export type PersonCircle =
  | "Journeyer"
  | "Guide"
  | "Torchbearer"
  | "Steward"
  | "Visionary"
  | "Companion"
  | "Team"
  | "Community";

export type PersonLink = { label: string; url: string };

export const PERSON_CIRCLES: PersonCircle[] = [
  "Visionary",
  "Steward",
  "Guide",
  "Journeyer",
  "Torchbearer",
  "Companion",
  "Team",
  "Community",
];

const PEOPLE_SOURCE: {
  slug: string;
  name: string;
  circle: PersonCircle;
  field: string;
  place: string;
  initials: string;
  /** Omit when no real photo exists — the card then shows initials, never a stand-in photo. */
  photo?: string;
  year: number | null;
  /** Month and year this person joined, or took up this specific role. */
  joined?: string;
  brief: string;
  story: string[];
  quote?: string;
  links?: PersonLink[];
}[] = [
  {
    slug: "kwanele-mazibuko",
    joined: "January 2024",
    name: "Kwanele Ayanda Mazibuko",
    circle: "Visionary",
    field: "Founder & Executive Director",
    place: "KwaZulu-Natal",
    initials: "KM",
    photo: "founder1",
    year: 2024,
    brief: "Founded SINGAWE in 2024.",
    story: [
      "SINGAWE started with one person who got through a door and refused to let it close behind them.",
      "The Durban University of Technology made that door possible. The Foundation exists so that the next person does not need luck to find it.",
    ],
    quote:
      "We are not building another initiative. We are building the habit of joining each other.",
  },
  {
    slug: "nokwanda-ngubane",
    circle: "Steward",
    name: "Nokwanda Ngubane",
    field: "Founding Director · CFO, Treasurer & Secretary",
    place: "Durban, KwaZulu-Natal",
    initials: "NN",
    photo: "nokwanda-ngubane",
    year: null,
    brief:
      "A founding director who supports SINGAWE's financial and administrative stewardship.",
    story: [
      "Nokwanda studies Internet of Things at Durban University of Technology and serves as SINGAWE's CFO, Treasurer and Secretary.",
      "Her interests include artificial intelligence, machine learning, automation and embedded systems. She brings experience in volunteering, public speaking, entrepreneurship and community engagement.",
    ],
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/nokwanda-ngubane-01327a331" }],
  },
  {
    slug: "nwabisa-maqakamba",
    joined: "Early 2026",
    name: "Nwabiswa Maqakamba",
    circle: "Steward",
    field: "Co-Executive Director & Deputy Chairperson · Business Analyst",
    place: "KwaZulu-Natal",
    initials: "NM",
    photo: "nwabiswa-maqakamba",
    year: 2026,
    brief: "A SINGAWE co-executive director with a background in ICT business intelligence.",
    story: [
      "Nwabiswa is an aspiring Business Intelligence professional interested in data analysis, reporting and turning information into meaningful insight.",
      "She holds a Diploma in ICT Business Analysis and an Advanced Diploma in ICT Business Intelligence.",
    ],
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/nwabiswa-maqakamba-6a9b14305/" }],
  },
  {
    slug: "olwethu-mswane",
    joined: "2026",
    name: "Olwethu Mswane",
    circle: "Torchbearer",
    field: "BCom Accounting Student · Eskom Expo Alumna & Judge",
    place: "KwaZulu-Natal",
    initials: "OM",
    photo: "olwethu-mswane",
    year: 2026,
    brief:
      "A former Eskom Expo participant who returned to support young innovators as a judge and mentor.",
    story: [
      "Olwethu is pursuing a BCom in Accounting Extended at the University of KwaZulu-Natal. Her journey through the Eskom Expo developed her leadership, research and problem-solving skills.",
      "In 2026, she returned to the Expo as a judge, supporting learners in the same community where she once competed.",
    ],
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/olwethu-mswane-0224a0349" },
      { label: "Portfolio", url: "https://olwethus-financial-spark.lovable.app" },
    ],
    quote:
      "Being a judge at the Eskom Expo Regionals was a wonderful and meaningful experience. I represented Singawe Foundation and judged projects in Computer Science and Software Development, the same category I competed in last year. I was impressed by the amazing projects and the creativity of the learners. Oh I also met new friends from DUT and UKZN, which made the experience even more special. I decided to become a judge because I wanted to give back to the Expo community and support other young innovators. I feel proud and grateful to have experienced the Expo from a different perspective this year. I would encourage anyone considering becoming a judge or participating next year to go for it, it is a great opportunity to learn, meet new people and be inspired by amazing ideas.",
  },
  {
    slug: "charlene-makwara",
    joined: "2025",
    name: "Charlene Chay Makwara",
    circle: "Guide",
    field: "Software Developer · Technology & Youth Development",
    place: "Durban, KwaZulu-Natal",
    initials: "CM",
    photo: "charlene-makwara",
    year: 2025,
    brief:
      "A software developer interested in using technology and innovation to solve real-world problems.",
    story: [
      "Charlene works across software development, AI-driven solutions and digital innovation. Charlene also contributes to sports management and youth development.",
      "At SINGAWE, Charlene brings a practical technology perspective to work with young people.",
    ],
    links: [
      { label: "Portfolio", url: "https://charlene-makwara-portfolio.vercel.app" },
      { label: "GitHub", url: "https://github.com/MakChay" },
    ],
  },
  {
    slug: "ict-mandisa-biyela",
    joined: "2025",
    name: "Mandisa Biyela",
    circle: "Guide",
    field: "Mentor · ICT Graduate · Robotics & AI Research",
    place: "Durban, KwaZulu-Natal",
    initials: "MB",
    photo: "mandisa-biyela",
    year: 2025,
    brief: "An ICT graduate and SINGAWE mentor who supports young people in technology and research.",
    story: [
      "Mandisa holds a Bachelor of Information and Communication Technology from Durban University of Technology and works in ICT solutions.",
      "She is part of DUT's Advanced Robotics and Mechatronic Systems Lab, where her interests include robotics, AI, IoT and smart systems. She enjoys helping young people build confidence in research and technical skills.",
    ],
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/nokuphila-mandisa-biyela-4573b0293/" },
      { label: "GitHub", url: "https://github.com/MandisaBiyela" },
    ],
  },
  {
    slug: "amahle-dunge",
    joined: "2026",
    name: "Amahle Lethukuthula Asanda Dunge",
    circle: "Team",
    field: "Head of Partnerships, KZN-ZASDC · ICT Application Development",
    place: "KwaZulu-Natal",
    initials: "AD",
    photo: "amahle-dunge",
    year: 2026,
    brief:
      "A final-year ICT student who brings a strategic, solutions-focused approach to partnerships.",
    story: [
      "Amahle is Head of Partnerships at KZN-ZASDC and studies ICT Application Development.",
      "He is interested in connecting technology, people and opportunity through collaboration and sustainable growth.",
    ],
  },
  {
    slug: "amanda-kunene",
    joined: "2026",
    name: "Amanda Bongi Owami Kunene",
    circle: "Team",
    field: "Head of Schools & Outreach · ICT Student",
    place: "Durban, KwaZulu-Natal",
    initials: "AK",
    photo: "amanda-kunene",
    year: 2026,
    brief: "An ICT student leading school and community outreach at SINGAWE.",
    story: [
      "Amanda is a second-year Bachelor of ICT student at Durban University of Technology and SINGAWE's Head of Schools and Outreach.",
      "Her interests include innovation, communication and community engagement. She has presented the Idioms Alive project at DUT's DataScientia Living Lab.",
    ],
  },
  {
    slug: "azania-zwane",
    joined: "2026",
    name: "Azania Zwane",
    circle: "Team",
    field: "ICT Application Development · Logistics & Operations",
    place: "KwaZulu-Natal",
    initials: "AZ",
    photo: "azania-zwane",
    year: 2026,
    brief: "A final-year ICT student who enjoys turning ideas into working digital tools.",
    story: [
      "Azania is an aspiring full-stack developer and logistics and operations coordinator at KZN-ZASDC.",
      "Azania enjoys building websites and making complex information easier to understand, and is proud to be part of the SINGAWE team.",
    ],
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/azania-zwane-4591bb334" }],
  },
  {
    slug: "buhlebendalo-mazibuko",
    name: "Buhlebendalo Mawande Mazibuko",
    circle: "Community",
    field: "Mechanical Engineering Student",
    place: "KwaZulu-Natal",
    initials: "BM",
    photo: "buhlebendalo-mazibuko",
    year: null,
    brief: "A mechanical engineering student at the University of Zululand.",
    story: [
      "Buhlebendalo is from the Estcourt, Loskop and Emandabeni area and studies Mechanical Engineering at the University of Zululand's Richards Bay campus.",
    ],
  },
  {
    slug: "masixole-mabhoza",
    joined: "2026",
    name: "Masixole Mabhoza",
    circle: "Team",
    field: "ICT Student · Operations Volunteer",
    place: "Durban, KwaZulu-Natal",
    initials: "MM",
    photo: "masixole-mabhoza",
    year: 2026,
    brief: "An ICT student contributing to operations and community initiatives.",
    story: [
      "Masixole is an Information and Communication Technology student at Durban University of Technology and a volunteer supporting operations at KZN-ZASDC.",
      "He brings experience in administration, data capture, communications and design, and is committed to creating opportunities for young people.",
    ],
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/masixole-mabhoza-466658377/" }],
  },
  {
    slug: "ntokozo-mazibuko",
    joined: "2026",
    name: "Ntokozo Zizile Mazibuko",
    circle: "Team",
    field: "Agriculture · Personal Development · Community Empowerment",
    place: "KwaZulu-Natal",
    initials: "NZ",
    photo: "ntokozo-mazibuko",
    year: 2026,
    brief: "An agriculture enthusiast committed to learning and community growth.",
    story: [
      "Ntokozo is interested in livestock production, personal development and community empowerment.",
      "Ntokozo's guiding motto is 'Doing it scared' — a reminder that growth often begins outside our comfort zones.",
    ],
    links: [{ label: "TikTok", url: "https://www.tiktok.com/@ntomazibuko" }],
  },
  {
    slug: "phumelele-kubheka",
    joined: "September 2026",
    name: "Phumelele Kubheka",
    circle: "Team",
    field: "ICT Student · Aspiring Business Analyst",
    place: "Durban, KwaZulu-Natal",
    initials: "PK",
    photo: "phumelele-kubheka",
    year: 2026,
    brief: "An ICT student building practical digital solutions and working toward a career in business analysis.",
    story: [
      "Phumelele is a second-year Bachelor of Information and Communications Technology student at Durban University of Technology.",
      "Her experience includes workplace-learning platforms, software development and database architecture. She joined the SINGAWE team in September 2026.",
    ],
    links: [{ label: "TikTok", url: "https://www.tiktok.com/@eyakokhathide" }],
  },
  {
    slug: "vhulenda-nefolovhodwe",
    joined: "2026",
    name: "Vhulenda Innocentia Nefolovhodwe",
    circle: "Team",
    field: "Developer · Aspiring Software Tester",
    place: "South Africa",
    initials: "VN",
    photo: "vhulenda-nefolovhodwe",
    year: 2026,
    brief: "A SINGAWE developer with a strong interest in software quality and data analytics.",
    story: [
      "Vhulenda has an academic background in Information and Communication Technology and is developing her skills in software testing, data analytics and software development.",
      "She is passionate about problem-solving, continuous learning and building reliable, efficient digital solutions.",
    ],
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/innocentia-nefolovhodwe/" },
      { label: "GitHub", url: "https://github.com/Centia-0113" },
    ],
  },
  {
    slug: "thandolenkosi-hadebe",
    name: "Thandolenkosi Candy Hadebe",
    circle: "Guide",
    field: "Incoming Guide · Mentor",
    place: "South Africa",
    initials: "TH",
    year: null,
    brief: "Joining SINGAWE in January 2027 to support people through mentorship and personal development.",
    story: [
      "Thandolenkosi is committed to helping people build confidence, grow through guidance and realise their potential.",
      "Thandolenkosi values collaboration, continuous learning and the opportunity to contribute meaningfully to the community.",
    ],
    links: [
      { label: "Instagram", url: "https://www.instagram.com/itss.candyy_" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/thandolenkosi-hadebe-5b0b30370/" },
      { label: "Portfolio", url: "https://hadebethandolenkosiportfolio.lovable.app" },
    ],
  },
];

export const PEOPLE = PEOPLE_SOURCE;
export const PEOPLE_YEARS = Array.from(
  new Set(PEOPLE.flatMap((person) => (person.year === null ? [] : [person.year]))),
).sort((a, b) => a - b);

/** Enquiry forms submitted directly to the shared Supabase inbox. */
export const FORMS: Record<
  "journeyer" | "guide" | "companion" | "collaborate" | "newsTip",
  { title: string; blurb: string }
> = {
  journeyer: {
    title: "Journeyer interest form",
    blurb: "Tell us where you are and what is in the way. No cost, ever.",
  },
  guide: {
    title: "Guide interest form",
    blurb: "One structured hour a month, inside our safeguarding framework.",
  },
  companion: {
    title: "Companion & partnership form",
    blurb: "Funding, venues, equipment, expertise or opportunity pipelines.",
  },
  collaborate: {
    title: "Collaboration form",
    blurb: "Already running something? Bring it — we would rather join than duplicate.",
  },
  newsTip: {
    title: "Media & press enquiry form",
    blurb: "Journalists, editors and partners: request an interview or assets.",
  },
};

/**
 * Press releases and downloadable media. Drop files into /public/press/ and
 * point `file` at them (e.g. "/press/sf-2026-charter.pdf").
 */
export const PRESS: {
  id: string;
  date: string;
  kind: "Press release" | "Statement" | "Media kit" | "Report";
  title: string;
  summary: string;
  file: string | null;
  fileLabel?: string;
}[] = [
  {
    id: "charter-release",
    date: "2026-08-07",
    kind: "Press release",
    title: "SINGAWE Foundation NPC signs its Foundation Charter",
    summary:
      "The Charter commits the Foundation to its principles, safeguarding standards and a legacy measured only by the people it empowers.",
    file: null,
    fileLabel: "PDF · coming",
  },
  {
    id: "sisterhood-release",
    date: "2026-02-14",
    kind: "Press release",
    title: "Sisterhood of SINGAWE opens its first circle in Estcourt",
    summary:
      "A programme for women who became mothers under 25, built on mental health, physical wellbeing and economic independence.",
    file: null,
    fileLabel: "PDF · coming",
  },
  {
    id: "media-kit",
    date: "2026-08-07",
    kind: "Media kit",
    title: "SINGAWE Foundation media kit",
    summary:
      "Logos, brand colours, approved boilerplate, founder biography and high-resolution photography for editorial use.",
    file: null,
    fileLabel: "ZIP · on request",
  },
  {
    id: "impact-2025",
    date: "2025-12-01",
    kind: "Report",
    title: "Walking the road: 2025 impact note",
    summary:
      "Where we worked, who we walked with, and what we learned in KwaZulu-Natal — published plainly, including what did not work.",
    file: null,
    fileLabel: "PDF · coming",
  },
];

export const MEDIA_CONTACT = {
  name: "Media & Communications",
  email: "media@singawefoundation.org",
  boilerplate:
    "SINGAWE Foundation NPC is a South African Non-Profit Company working in KwaZulu-Natal and beyond. SINGAWE means “We Are For You.” The Foundation identifies talent, removes barriers and walks alongside individuals through mentorship, education, STEAM, entrepreneurship and leadership.",
};

/**
 * Downloadable / viewable documents for the Resources library. Files live in
 * /public/resources — add a PDF there and an entry here to publish it.
 */
export type Resource = {
  id: string;
  title: string;
  category: "Guides" | "Policies";
  description: string;
  file: string;
};

export const RESOURCES: Resource[] = [
  {
    id: "singawe-foundation-guide",
    title: "The SINGAWE Foundation Guide",
    category: "Guides",
    description:
      "Who we are, what we believe, and how the walk works — our philosophy, language and four programmes in one document.",
    file: "/resources/singawe-foundation-guide.pdf",
  },
  {
    id: "opportunity-application-guide",
    title: "Opportunity Application Guide",
    category: "Guides",
    description:
      "A step-by-step guide to applying for bursaries, study places, work and competitions.",
    file: "/resources/opportunity-application-guide.pdf",
  },
  {
    id: "guide-handbook",
    title: "The Guide Handbook",
    category: "Guides",
    description: "What SINGAWE Guides commit to, and how a mentorship cycle runs, month by month.",
    file: "/resources/guide-handbook.pdf",
  },
  {
    id: "journeyer-handbook",
    title: "The Journeyer Handbook",
    category: "Guides",
    description: "What to expect once you reach out to SINGAWE — at no cost, ever.",
    file: "/resources/journeyer-handbook.pdf",
  },
  {
    id: "safeguarding-policy-summary",
    title: "Safeguarding Policy Summary",
    category: "Policies",
    description:
      "Our commitments to every Journeyer, Guide and Companion, and how to raise a concern.",
    file: "/resources/safeguarding-policy-summary.pdf",
  },
];

export type ProgrammeDetail = {
  slug: string;
  name: string;
  kicker: string;
  body: string;
  points: string[];
  family: "Programme" | "Initiative";
};

export const ALL_PROGRAMMES: ProgrammeDetail[] = [
  ...PROGRAMMES.map((p) => ({
    slug: p.id,
    name: p.name,
    kicker: p.kicker,
    body: p.body,
    points: p.points,
    family: "Programme" as const,
  })),
  ...INITIATIVES.map((i) => ({
    slug: i.id,
    name: i.name,
    kicker: i.kicker,
    body: i.body,
    points: i.points,
    family: "Initiative" as const,
  })),
];

export function getProgramme(slug: string) {
  return ALL_PROGRAMMES.find((p) => p.slug === slug);
}

export function getPerson(slug: string) {
  return PEOPLE.find((p) => p.slug === slug);
}

export function getNews(slug: string) {
  return NEWS.find((n) => n.slug === slug);
}
