import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { VideoFrame } from "@/components/site/VideoFrame";
import { PageHero } from "@/components/site/PageHero";
import { INITIATIVES, JOURNEY_STEPS, PROGRAMMES } from "@/lib/site-content";
import { galleryPhoto } from "@/lib/gallery-photos";
import steam from "@/assets/steam.jpg";
import mentorship from "@/assets/mentorship.jpg";

export const Route = createFileRoute("/programmes/")({
  head: () => ({
    meta: [
      { title: "Programmes — Pathfinder, Walk-Along, Makers Lab & Torch" },
      {
        name: "description",
        content:
          "Four SINGAWE Foundation programmes: opportunity access, structured mentorship, STEAM innovation and leadership development for young South Africans.",
      },
      { property: "og:title", content: "SINGAWE Foundation Programmes" },
      {
        property: "og:description",
        content:
          "Pathfinder, Walk-Along, Makers Lab and Torch — four ways we reduce the distance to opportunity.",
      },
    ],
  }),
  component: Programmes,
});

function Programmes() {
  return (
    <>
      <PageHero image={mentorship} alt="A Guide and a Journeyer working through an application together">
        <Reveal>
          <p className="eyebrow text-gold">Programmes</p>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.4rem,5.4vw,4.4rem)] leading-[1]">
            Preparation, mentorship, making and leadership — in that order, and all at once.
          </h1>
          <div className="mt-8 h-px w-40 rule-draw bg-gold" />
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-cream/80">
            Every programme is designed around one question: what is standing between this person
            and the opportunity that already exists for them? We answer that question practically.
          </p>
        </Reveal>
      </PageHero>

      {PROGRAMMES.map((p, i) => (
        <section
          key={p.id}
          id={p.id}
          className={`scroll-mt-24 border-t border-border ${i % 2 === 1 ? "bg-sand" : ""}`}
        >
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.4fr_1fr] lg:px-10 lg:py-28">
            <Reveal>
              <span className="font-display text-[clamp(4rem,9vw,7rem)] leading-none text-gold-soft">
                {p.label}
              </span>
              <p className="eyebrow mt-4 text-clay">{p.kicker}</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.05]">{p.name}</h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {p.body}
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                {p.points.map((pt) => (
                  <li
                    key={pt}
                    className="rounded-sm border border-border bg-background p-5 text-sm leading-relaxed"
                  >
                    {pt}
                  </li>
                ))}
              </ul>
              <Link
                to="/get-involved"
                className="slash mt-8 inline-block text-sm font-semibold transition-colors hover:text-clay"
              >
                Apply or refer someone
              </Link>
            </Reveal>
          </div>
        </section>
      ))}

      {/* NAMED INITIATIVES */}
      <section id="initiatives" className="scroll-mt-24 border-t border-border bg-sand">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-28">
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-clay">Named initiatives</p>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] leading-[1.05]">
              Five projects, each born from a real barrier.
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Our programmes are the framework. These are the rooms people actually walk into.
            </p>
          </Reveal>

          <div className="mt-16 space-y-px overflow-hidden rounded-sm border border-border bg-border">
            {INITIATIVES.map((it, i) => (
              <Reveal key={it.id} delay={i * 70} className="bg-background">
                <Link
                  to="/programmes/$slug"
                  params={{ slug: it.id }}
                  className="group grid scroll-mt-24 gap-8 p-8 transition-colors duration-500 hover:bg-gold-soft/40 lg:grid-cols-[0.42fr_1fr] lg:p-12"
                >
                  <div>
                    <img
                      src={galleryPhoto(it.image)}
                      alt={it.name}
                      loading="lazy"
                      className="h-32 w-full rounded-sm object-cover"
                    />
                    <span className="mt-5 block font-display text-xs tracking-[0.3em] text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-display text-3xl leading-tight">{it.name}</h3>
                    <p className="eyebrow mt-3 text-clay">{it.kicker}</p>
                    <div className="mt-6 h-px w-10 bg-gold transition-all duration-500 group-hover:w-24" />
                  </div>
                  <div>
                    <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                      {it.body}
                    </p>
                    <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                      {it.points.map((pt) => (
                        <li
                          key={pt}
                          className="rounded-sm border border-border bg-background p-5 text-sm leading-relaxed"
                        >
                          {pt}
                        </li>
                      ))}
                    </ul>
                    <span className="slash mt-8 inline-block text-sm font-semibold transition-colors group-hover:text-clay">
                      Explore {it.name}
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="mt-12">
            <VideoFrame
              label="Initiative films · space reserved"
              caption="Short films from SINGAWEB handovers, Sisterhood circles and COMHACK sprints."
            />
          </Reveal>
        </div>
      </section>


      <section className="border-y border-border bg-ink text-cream">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center lg:px-10">
          <Reveal>
            <p className="eyebrow text-gold">Inside a programme</p>
            <h2 className="mt-4 text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.08]">
              What the journey actually looks like.
            </h2>
            <ol className="mt-8 space-y-6">
              {JOURNEY_STEPS.map((s) => (
                <li key={s.step} className="flex gap-5 border-b border-cream/12 pb-6">
                  <span className="font-display text-xl text-gold">{s.step}</span>
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
              src={steam}
              alt="Students collaborating on a hands-on engineering project"
              width={1200}
              height={1200}
              loading="lazy"
              className="h-full max-h-[34rem] w-full rounded-sm object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24 lg:px-10">
        <Reveal>
          <VideoFrame
            label="Programme walkthrough · space reserved"
            caption="A short film showing a Walk-Along session from start to finish."
          />
        </Reveal>
      </section>
    </>
  );
}
