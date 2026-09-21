import { createFileRoute, Link } from "@tanstack/react-router";
import { EmbeddedForm } from "@/components/site/EmbeddedForm";
import { PartnerMarquee } from "@/components/site/PartnerMarquee";
import { Reveal } from "@/components/site/Reveal";
import { COLLAB_CREED, FOOTPRINT, MOVEMENTS, PRINCIPLES } from "@/lib/site-content";
import community from "@/assets/community.jpg";

export const Route = createFileRoute("/collaborate")({
  head: () => ({
    meta: [
      { title: "Collaborate — SINGAWE Needs You" },
      {
        name: "description",
        content:
          "SINGAWE Foundation joins movements rather than duplicating them. Meet the projects we are part of, our partners, and how to bring your initiative to the table.",
      },
      { property: "og:title", content: "Collaborate with SINGAWE Foundation" },
      {
        property: "og:description",
        content:
          "You do not need to start another initiative. You need to be found, and joined. SINGAWE needs you.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Collaborate,
});

function Collaborate() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-16 lg:px-10 lg:pt-24">
        <Reveal>
          <p className="eyebrow text-clay">Collaboration</p>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.4rem,5.4vw,4.4rem)] leading-[1]">
            SINGAWE needs you.
          </h1>
          <div className="mt-8 h-px w-40 rule-draw bg-gold" />
        </Reveal>

        <div className="mt-12 grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <ol className="space-y-6">
            {COLLAB_CREED.map((line, i) => (
              <Reveal key={line} delay={i * 110} as="li">
                <p className="flex gap-5 font-display text-[clamp(1.3rem,2.4vw,2rem)] leading-[1.25]">
                  <span className="mt-2 text-sm text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <span className={i === COLLAB_CREED.length - 1 ? "text-clay" : ""}>{line}</span>
                </p>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={160}>
            <img
              src={community}
              alt="Community members gathered together in conversation"
              width={1808}
              height={1008}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-sm object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* COLLABORATE WITH US MARQUEE */}
      <section className="overflow-hidden border-y border-border bg-black py-14 text-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="eyebrow text-gold">Collaborate with us</p>
        </div>
        <div className="marquee-track mt-6 flex w-max gap-10 whitespace-nowrap">
          {[...PRINCIPLES, ...PRINCIPLES].map((p, i) => (
            <span key={`${p}-${i}`} className="font-display text-2xl text-cream/70 md:text-3xl">
              {p}
              <span className="ml-10 text-gold">/</span>
            </span>
          ))}
        </div>
      </section>

      {/* MOVEMENTS */}
      <section id="movements" className="scroll-mt-24 border-y border-border bg-sand">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-clay">Movements we are part of</p>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] leading-[1.05]">
              Not ours. We simply showed up and stayed.
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              These projects are owned, led and carried by other people. We are part of the
              movement, not the masthead.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2">
            {MOVEMENTS.map((m, i) => {
              const inner = (
                <div className="group flex h-full flex-col p-8 transition-colors duration-500 hover:bg-gold-soft/50 lg:p-10">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="eyebrow text-gold">{m.kind}</span>
                    <span className="text-xs text-muted-foreground">{m.place}</span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl leading-tight">{m.name}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
                  <p className="mt-6 border-t border-border pt-4 font-display text-lg text-clay">
                    {m.role}
                  </p>
                  <div className="mt-6 h-px w-8 bg-gold transition-all duration-500 group-hover:w-24" />
                </div>
              );
              return (
                <Reveal key={m.id} delay={(i % 2) * 80} className="bg-background">
                  {m.url ? (
                    <a href={m.url} target="_blank" rel="noreferrer noopener" className="block h-full">
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="border-b border-border bg-black text-cream">
        <div className="mx-auto max-w-7xl px-6 pt-24 lg:px-10">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold">Partners & Companions</p>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] leading-[1.05]">
              Hover to hold one still. Click to go to them.
            </h2>
            <p className="mt-6 leading-relaxed text-cream/70">
              Every name here made the journey shorter for someone. {FOOTPRINT.anchorSupporter} carried
              us before anyone knew our name, and {FOOTPRINT.anchorSchool} opened the first door in{" "}
              {FOOTPRINT.since}.
            </p>
          </Reveal>
        </div>
        <div className="pb-16">
          <PartnerMarquee tone="black" />
        </div>
      </section>

      {/* FOOTPRINT + FORM */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1fr]">
          <Reveal>
            <p className="eyebrow text-clay">Where we are</p>
            <h2 className="mt-4 text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.08]">
              {FOOTPRINT.province} today. Anywhere you are, next.
            </h2>
            <ul className="mt-8 space-y-3 text-muted-foreground">
              <li className="slash">Operating since {FOOTPRINT.since}</li>
              {FOOTPRINT.areas.map((a) => (
                <li key={a} className="slash">
                  {a}, {FOOTPRINT.province}
                </li>
              ))}
              <li className="slash">Anchor school: {FOOTPRINT.anchorSchool}</li>
              <li className="slash">Anchor supporter: {FOOTPRINT.anchorSupporter}</li>
            </ul>
            <p className="mt-8 max-w-md font-display text-xl leading-snug text-clay">
              {FOOTPRINT.openness}
            </p>
            <Link to="/get-involved" className="slash mt-8 inline-block text-sm font-semibold">
              Other ways to join
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <EmbeddedForm form="collaborate" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
