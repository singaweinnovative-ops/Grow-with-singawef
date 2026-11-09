import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { useSiteContent } from "@/lib/site-content-context";
import mentorship from "@/assets/mentorship.jpg";
import heroStudent from "@/assets/hero-student.jpg";
import community from "@/assets/community.jpg";

export const Route = createFileRoute("/get-involved/")({
  head: () => ({
    meta: [
      { title: "Get Involved — Become a Journeyer, Guide, Volunteer or Companion" },
      {
        name: "description",
        content:
          "Join SINGAWE Foundation as a Journeyer seeking support, a Guide offering mentorship, or a Volunteer/Companion helping remove barriers for everyone else.",
      },
      { property: "og:title", content: "Get Involved with SINGAWE Foundation" },
      {
        property: "og:description",
        content:
          "Three ways in: be walked with, walk with someone, or make the walk shorter for everyone.",
      },
    ],
  }),
  component: GetInvolved,
});

const PATHS = [
  {
    id: "journeyer",
    to: "/get-involved/journeyer" as const,
    image: heroStudent,
    kicker: "For individuals",
    title: "Become a Journeyer",
    body: "You are looking for guidance, an opportunity, or someone in your corner. There is no cost, and there is no wrong time to reach out.",
    points: ["Tell us about yourself", "We name the barriers together", "You are matched with a Guide"],
    cta: "Start your application",
  },
  {
    id: "guide",
    to: "/get-involved/guide" as const,
    image: mentorship,
    kicker: "For professionals & students",
    title: "Become a Guide",
    body: "You have walked a path someone else is starting. Guides commit consistency, not money — usually monthly contact across a programme cycle.",
    points: ["Screening and safeguarding briefing", "Structured matching", "Ongoing support from us"],
    cta: "Offer your guidance",
  },
  {
    id: "companion",
    to: "/get-involved/companion" as const,
    image: community,
    kicker: "For individuals, groups & organisations",
    title: "Become a Volunteer / Companion",
    body: "Give an afternoon, a skill, or a partnership. Volunteers and Companions — individuals, schools, businesses and institutions — make the journey shorter for everyone on it.",
    points: ["Event and skills-based volunteering", "Funding, venues, equipment or expertise", "Documented before it begins"],
    cta: "Offer your help",
  },
];

function GetInvolved() {
  const { FAQS, SITE } = useSiteContent();
  return (
    <>
      <PageHero image={mentorship} alt="A Guide and a Journeyer working through an application together">
        <Reveal>
          <p className="eyebrow text-gold">Get Involved</p>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.4rem,5.4vw,4.4rem)] leading-[1]">
            Be walked with. Walk with someone. Or make the walk shorter for everyone.
          </h1>
          <div className="mt-8 h-px w-40 rule-draw bg-gold" />
        </Reveal>
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-3">
          {PATHS.map((p, i) => (
            <Reveal key={p.id} delay={i * 100}>
              <Link
                id={p.id}
                to={p.to}
                className="lift group flex h-full scroll-mt-24 flex-col overflow-hidden rounded-sm border border-border bg-card"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-44 w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-9">
                  <p className="eyebrow text-gold">{p.kicker}</p>
                  <h2 className="mt-4 font-display text-3xl">{p.title}</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{p.body}</p>
                  <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                    {p.points.map((pt) => (
                      <li key={pt} className="slash">
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-8 rounded-sm bg-ink px-6 py-3 text-center text-sm font-semibold text-cream transition-colors group-hover:bg-clay">
                    {p.cta}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-sand">
        <div className="mx-auto max-w-4xl px-6 py-24 lg:px-10">
          <Reveal>
            <p className="eyebrow text-clay">Questions</p>
            <h2 className="mt-4 text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.08]">
              Before you reach out.
            </h2>
          </Reveal>
          <div className="mt-12 divide-y divide-border border-y border-border">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <details className="group py-6">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-xl leading-snug">
                    {f.q}
                    <span className="mt-2 block h-px w-5 shrink-0 bg-gold transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-10">
        <Reveal>
          <p className="eyebrow text-clay">{SITE.meaning}</p>
          <h2 className="mt-5 text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.06]">
            Still unsure which path is yours? Write to us anyway.
          </h2>
          <Link
            to="/contact"
            className="mt-10 inline-block rounded-sm bg-ink px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-clay"
          >
            Contact the Foundation
          </Link>
        </Reveal>
      </section>
    </>
  );
}
