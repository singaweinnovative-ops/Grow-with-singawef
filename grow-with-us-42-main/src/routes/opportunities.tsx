import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { OpportunityWindow } from "@/components/site/OpportunityWindow";
import { getPublishedOpportunities } from "@/lib/site-content-db";
import { isOpportunityActive } from "@/lib/opportunity-dates";
import steam from "@/assets/steam.jpg";

export const Route = createFileRoute("/opportunities")({
  loader: () => getPublishedOpportunities(),
  head: () => ({
    meta: [
      { title: "Opportunities — Bursaries, Study, Work & Competitions" },
      {
        name: "description",
        content:
          "A live board of South African bursaries, university applications, work opportunities and competitions — surfaced by SINGAWE Foundation and linked to their official pages.",
      },
      { property: "og:title", content: "Opportunity Board — SINGAWE Foundation" },
      {
        property: "og:description",
        content: "Opportunity is not scarce. It is unannounced. Here is what is open right now.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Opportunities,
});

function Opportunities() {
  const opportunities = Route.useLoaderData();
  const openOpportunities = opportunities.filter((o) => isOpportunityActive(o.opens, o.closes));
  const cats = ["All", ...Array.from(new Set(openOpportunities.map((o) => o.category)))];
  const [active, setActive] = useState("All");
  const shown =
    active === "All" ? openOpportunities : openOpportunities.filter((o) => o.category === active);

  return (
    <>
      <PageHero image={steam} alt="Students building a robotics project together">
        <Reveal>
          <p className="eyebrow text-gold">Opportunity board</p>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.4rem,5.4vw,4.4rem)] leading-[1]">
            Opportunity is not scarce. It is unannounced.
          </h1>
          <div className="mt-8 h-px w-40 rule-draw bg-gold" />
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-cream/80">
            Everything here belongs to someone else, and every link goes to their official page. We
            do not resell opportunity — we make sure you hear about it, and we help you apply.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-10 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={`rounded-sm border px-4 py-2 text-sm transition-colors ${
                active === c
                  ? "border-gold bg-gold text-ink"
                  : "border-cream/25 text-cream/85 hover:border-gold hover:text-gold"
              }`}
            >
              {c}
            </button>
          ))}
        </Reveal>
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2">
          {shown.map((o, i) => (
            <Reveal key={o.id} delay={(i % 2) * 80} className="bg-background">
              <a
                href={o.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex h-full flex-col p-8 transition-colors duration-500 hover:bg-gold-soft/50 lg:p-10"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="eyebrow text-gold">{o.category}</span>
                  <OpportunityWindow opens={o.opens} closes={o.closes} align="end" />
                </div>
                <h2 className="mt-5 font-display text-2xl leading-tight">{o.title}</h2>
                <p className="mt-1 text-sm text-clay">{o.org}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{o.body}</p>
                <span className="slash mt-auto pt-8 text-sm font-semibold">
                  Open the official page
                </span>
              </a>
            </Reveal>
          ))}
        </div>
        {shown.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            No open opportunities in this category right now — check back soon.
          </p>
        ) : null}

        <Reveal
          delay={120}
          className="mt-14 rounded-sm border border-border bg-sand p-10 text-center"
        >
          <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-tight">
            Do not apply alone.
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted-foreground">
            COMHACK runs group application sprints and TACA sits beside you until submit is pressed.
            Both are free.
          </p>
          <Link
            to="/get-involved"
            hash="journeyer"
            className="mt-8 inline-block rounded-sm bg-ink px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-clay"
          >
            Apply with us
          </Link>
        </Reveal>
      </section>
    </>
  );
}
