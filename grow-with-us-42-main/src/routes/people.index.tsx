import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { VideoFrame } from "@/components/site/VideoFrame";
import { PageHero } from "@/components/site/PageHero";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LEXICON, PEOPLE, PERSON_CIRCLES, PEOPLE_YEARS } from "@/lib/site-content";
import { personPhoto } from "@/lib/people-photos";
import community from "@/assets/community.jpg";

export const Route = createFileRoute("/people/")({
  head: () => ({
    meta: [
      { title: "Our People — Guides, Journeyers, Torchbearers & Champions" },
      {
        name: "description",
        content:
          "The faces of SINGAWE Foundation: Visionaries, Stewards, Guides, Journeyers, Torchbearers and Champions. Filter by role and by year.",
      },
      { property: "og:title", content: "The People of SINGAWE Foundation" },
      {
        property: "og:description",
        content: "Filter our people by role and year — every face, every circle.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: People,
});

const CHIP = "rounded-sm border px-3 py-1.5 text-xs transition-colors";

function People() {
  const [role, setRole] = useState<string>("All");
  const [year, setYear] = useState<string>("All");

  const shown = PEOPLE.filter(
    (p) =>
      (role === "All" || p.circle === role) && (year === "All" || String(p.year) === year),
  );

  return (
    <>
      <PageHero image={community} alt="A group of SINGAWE community members standing together">
        <Reveal>
          <p className="eyebrow text-gold">Our People</p>
          <h1 className="mt-4 max-w-3xl text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.02]">
            Every face in the walk.
          </h1>
          <div className="mt-6 h-px w-28 rule-draw bg-gold" />
          <p className="mt-6 max-w-xl leading-relaxed text-cream/80">
            Filter by role or by year.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow mr-1 text-cream/70">Role</span>
            {["All", ...PERSON_CIRCLES].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`${CHIP} ${
                  role === r
                    ? "border-gold bg-gold text-ink"
                    : "border-cream/25 text-cream/85 hover:border-gold hover:text-gold"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow text-cream/70">Year</span>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-36 border-cream/25 bg-ink/40 text-cream">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["All", ...PEOPLE_YEARS.map(String)].map((y) => (
                  <SelectItem key={y} value={y}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Reveal>
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 70}>
              <Link
                to="/people/$slug"
                params={{ slug: p.slug }}
                className="lift group block overflow-hidden rounded-sm border border-border bg-card"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={personPhoto(p.photo)}
                    alt={`${p.name}, ${p.circle}`}
                    width={800}
                    height={1000}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-sm bg-background/90 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-clay">
                    {p.circle}
                  </span>
                  <span className="absolute right-3 top-3 rounded-sm bg-ink/80 px-2 py-1 text-[0.65rem] font-semibold text-cream">
                    {p.year}
                  </span>
                </div>
                <div className="p-4">
                  <h2 className="font-display text-lg leading-tight">{p.name}</h2>
                  <p className="mt-1 text-xs text-muted-foreground">{p.field}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        {shown.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            No one listed for that combination yet.
          </p>
        ) : null}
      </section>

      <section className="border-y border-border bg-sand">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <Reveal>
            <p className="eyebrow text-clay">Our language</p>
            <h2 className="mt-3 max-w-2xl text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.1]">
              We changed the words, because words change the relationship.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {LEXICON.map((l, i) => (
              <Reveal key={l.term} delay={i * 60} className="bg-background">
                <div className="h-full p-6 transition-colors duration-500 hover:bg-sand">
                  <h3 className="font-display text-xl">{l.term}</h3>
                  <p className="eyebrow mt-1 text-gold">formerly “{l.formerly}”</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20 lg:px-10">
        <Reveal className="text-center">
          <p className="eyebrow text-clay">In their words</p>
          <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.1]">
            Their stories belong to them.
          </h2>
        </Reveal>
        <Reveal delay={100} className="mt-10">
          <VideoFrame label="Journeyer films · space reserved" />
        </Reveal>
      </section>
    </>
  );
}
