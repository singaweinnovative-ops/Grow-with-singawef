import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { VideoFrame } from "@/components/site/VideoFrame";
import { ALL_PROGRAMMES, getProgramme, JOURNEY_STEPS, SITE } from "@/lib/site-content";
import { getBrand } from "@/lib/programme-brands";
import { getProgrammeImage } from "@/lib/programme-images";
import { ProgrammeNav } from "@/components/site/ProgrammeNav";
import { getDossier } from "@/lib/programme-teams";
import { personPhoto } from "@/lib/people-photos";
import { InitiativeJoinForm } from "@/components/site/InitiativeJoinForm";
import { InitiativeCollaborateForm } from "@/components/site/InitiativeCollaborateForm";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { TACA_FILM_VIDEO } from "@/lib/gallery-photos";

export const Route = createFileRoute("/programmes/$slug")({
  loader: ({ params }) => {
    const programme = getProgramme(params.slug);
    if (!programme) throw notFound();
    return { programme };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Programme not found — SINGAWE Foundation" }, { name: "robots", content: "noindex" }],
      };
    }
    const { programme: p } = loaderData;
    const title = `${p.name} — ${p.kicker} | SINGAWE Foundation`;
    const description = p.body.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ProgrammeMissing,
  component: ProgrammeDetailPage,
});

function ProgrammeMissing() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-32 text-center lg:px-10">
      <p className="eyebrow text-clay">Not found</p>
      <h1 className="mt-5 text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.05]">
        We could not find that programme.
      </h1>
      <Link
        to="/programmes"
        className="mt-10 inline-block rounded-sm bg-ink px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-clay"
      >
        See all programmes
      </Link>
    </section>
  );
}

function ProgrammeDetailPage() {
  const { programme: p } = Route.useLoaderData();
  const others = ALL_PROGRAMMES.filter((x) => x.slug !== p.slug).slice(0, 4);
  const brand = getBrand(p.slug, p.name);
  const dossier = getDossier(p.slug);
  const [joinOpen, setJoinOpen] = useState(false);
  const [collabOpen, setCollabOpen] = useState(false);

  return (
    <>
      <ProgrammeNav brand={brand} name={p.name} family={p.family} />
      <section
        id="overview"
        className="relative scroll-mt-40 overflow-hidden border-b"
        style={{ borderColor: `${brand.accent}26` }}
      >
        <img
          src={getProgrammeImage(p.slug)}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ backgroundColor: `${brand.tint}B8` }} />
        <div className="relative mx-auto max-w-7xl px-6 pt-14 pb-20 lg:px-10 lg:pt-20">
          <Reveal>
            <Link to="/programmes" className="slash text-sm text-muted-foreground hover:text-clay">
              Back to programmes
            </Link>
            <p className="eyebrow mt-8" style={{ color: brand.accent }}>
              {p.family} · {p.kicker}
            </p>
            <h1 className="mt-5 max-w-4xl text-[clamp(2.4rem,5.4vw,4.4rem)] leading-[1]">{p.name}</h1>
            <div
              className="mt-8 h-px w-40 rule-draw"
              style={{ backgroundColor: brand.accent }}
            />
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">{p.body}</p>
          </Reveal>
        </div>
      </section>

      <section id="includes" className="mx-auto max-w-7xl scroll-mt-40 px-6 py-20 lg:px-10 lg:py-28">
        <Reveal className="max-w-2xl">
          <p className="eyebrow" style={{ color: brand.accent }}>
            {brand.sections[1]?.label ?? "What this includes"}
          </p>
          <h2 className="mt-4 text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.08]">
            Practical, not promotional.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-3">
          {p.points.map((pt, i) => (
            <Reveal key={pt} delay={i * 80} className="bg-background">
              <div className="group h-full p-8 transition-colors duration-500 hover:bg-sand">
                <span className="font-display text-3xl" style={{ color: brand.accent }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-5 leading-relaxed">{pt}</p>
                <div
                  className="mt-8 h-px w-8 transition-all duration-500 group-hover:w-20"
                  style={{ backgroundColor: brand.accent }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* VISION, MISSION & TEAM */}
      <section
        id="team"
        className="scroll-mt-40 border-y border-border"
        style={{ backgroundColor: brand.tint }}
      >
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <p className="eyebrow" style={{ color: brand.accent }}>
                Founded {dossier.founded}
              </p>
              <h2 className="mt-4 text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.08]">
                Who started {p.name}, and why.
              </h2>
              <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
                {dossier.foundedNote}
              </p>
              <div className="mt-10 space-y-6">
                <div>
                  <p className="eyebrow" style={{ color: brand.accent }}>
                    Vision
                  </p>
                  <p className="mt-2 font-display text-xl leading-snug">{dossier.vision}</p>
                </div>
                <div>
                  <p className="eyebrow" style={{ color: brand.accent }}>
                    Mission
                  </p>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{dossier.mission}</p>
                </div>
                <ul className="space-y-2">
                  {dossier.commitments.map((c) => (
                    <li key={c} className="flex gap-3 text-sm leading-relaxed">
                      <span style={{ color: brand.accent }}>/</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-3">
              {dossier.team.map((m, i) => (
                <Reveal key={m.name} delay={i * 90}>
                  <figure className="lift h-full overflow-hidden rounded-sm border bg-background" style={{ borderColor: `${brand.accent}26` }}>
                    <img
                      src={personPhoto(m.photo)}
                      alt={`${m.name}, ${m.role}`}
                      width={800}
                      height={800}
                      loading="lazy"
                      className="aspect-square w-full object-cover"
                    />
                    <figcaption className="p-5">
                      <p className="eyebrow text-[0.6rem]" style={{ color: brand.accent }}>
                        {m.role}
                      </p>
                      <p className="mt-2 font-display text-lg leading-tight">{m.name}</p>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{m.note}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="walk" className="scroll-mt-40 border-y border-border bg-ink text-cream">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center lg:px-10">
          <Reveal>
            <p className="eyebrow" style={{ color: brand.accent }}>
              The walk inside {p.name}
            </p>
            <h2 className="mt-4 text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.08]">
              How someone moves through it.
            </h2>
            <ol className="mt-8 space-y-6">
              {JOURNEY_STEPS.map((s) => (
                <li key={s.step} className="flex gap-5 border-b border-cream/12 pb-6">
                  <span className="font-display text-xl" style={{ color: brand.accent }}>
                    {s.step}
                  </span>
                  <div>
                    <h3 className="text-lg">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream/70">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={120}>
            <img
              src={getProgrammeImage(p.slug)}
              alt={`${p.name} in session — people working together at a table`}
              width={1200}
              height={1200}
              loading="lazy"
              className="h-full max-h-[32rem] w-full rounded-sm object-cover"
            />
            <div className="mt-6">
              {p.slug === "taca" ? (
                <VideoFrame
                  className="border-cream/15"
                  videoSrc={TACA_FILM_VIDEO}
                  poster={getProgrammeImage(p.slug)}
                  label="TACA · real footage from a session"
                  caption="A real clip from a TACA classroom session."
                />
              ) : (
                <VideoFrame
                  className="border-cream/15"
                  label={`${p.name} film · space reserved`}
                  caption="A short film from this programme will live here."
                />
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section id="impact" className="mx-auto max-w-7xl scroll-mt-40 px-6 py-20 lg:px-10 lg:py-24">
        <Reveal className="max-w-2xl">
          <p className="eyebrow" style={{ color: brand.accent }}>
            Where {p.name} stands
          </p>
          <h2 className="mt-4 text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.08]">
            Numbers we can stand behind.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {dossier.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 70} className="bg-background">
              <div className="p-8">
                <p
                  className="font-display text-[clamp(2.2rem,4vw,3.2rem)] leading-none"
                  style={{ color: brand.accent }}
                >
                  {s.value}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PARTNERS */}
      <section
        id="allies"
        className="scroll-mt-40 border-y"
        style={{ borderColor: `${brand.accent}26`, backgroundColor: brand.tint }}
      >
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <Reveal className="max-w-2xl">
            <p className="eyebrow" style={{ color: brand.accent }}>
              Partners of {p.name}
            </p>
            <h2 className="mt-4 text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.08]">
              Nobody does this alone.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dossier.allies.map((a, i) => {
              const external = a.url.startsWith("http");
              return (
                <Reveal key={a.short} delay={i * 70}>
                  <a
                    href={a.url}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer noopener" : undefined}
                    className="lift flex h-full flex-col items-center justify-center gap-2 rounded-sm border bg-background px-5 py-10 text-center"
                    style={{ borderColor: `${brand.accent}33` }}
                  >
                    <span className="font-display text-3xl leading-none" style={{ color: brand.accent }}>
                      {a.short}
                    </span>
                    <span className="text-xs leading-snug text-muted-foreground">{a.name}</span>
                    <span className="eyebrow mt-1 text-[0.55rem]" style={{ color: brand.accent }}>
                      {a.note}
                    </span>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="join" className="mx-auto max-w-7xl scroll-mt-40 px-6 py-24 lg:px-10">
        <Reveal
          className="rounded-sm border px-8 py-14 text-center md:px-16"
          style={{ borderColor: `${brand.accent}33`, backgroundColor: brand.tint }}
        >
          <p className="eyebrow" style={{ color: brand.accent }}>
            {SITE.meaning}
          </p>
          <h2 className="mx-auto mt-5 max-w-2xl text-[clamp(1.8rem,3.8vw,2.8rem)] leading-[1.06]">
            Want to join {p.name}, or bring it to your school?
          </h2>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setJoinOpen(true)}
              className="rounded-sm px-7 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: brand.accent, color: brand.onAccent }}
            >
              {brand.cta.label}
            </button>
            <button
              type="button"
              onClick={() => setCollabOpen(true)}
              className="rounded-sm border px-7 py-3.5 text-sm font-semibold transition-colors hover:opacity-80"
              style={{ borderColor: brand.accent, color: brand.accent }}
            >
              Collaborate with us
            </button>
          </div>
        </Reveal>

        <div className="mt-16">
          <p className="eyebrow text-clay">Continue</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={i * 70}>
                <Link
                  to="/programmes/$slug"
                  params={{ slug: o.slug }}
                  className="lift flex h-full flex-col rounded-sm border border-border bg-card p-6 transition-colors duration-300 hover:border-gold hover:bg-gold-soft focus-visible:border-gold focus-visible:bg-gold-soft focus-visible:outline-none"
                >
                  <span className="eyebrow text-gold">{o.family}</span>
                  <h3 className="mt-3 font-display text-2xl leading-tight">{o.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{o.kicker}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Sheet open={joinOpen} onOpenChange={setJoinOpen}>
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
          <InitiativeJoinForm brand={brand} programmeName={p.name} />
        </SheetContent>
      </Sheet>

      <Sheet open={collabOpen} onOpenChange={setCollabOpen}>
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
          <InitiativeCollaborateForm brand={brand} programmeName={p.name} />
        </SheetContent>
      </Sheet>
    </>
  );
}
