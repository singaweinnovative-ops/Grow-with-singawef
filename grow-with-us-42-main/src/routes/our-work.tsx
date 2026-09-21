import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { OUR_WORK_PILLARS } from "@/lib/site-content";
import { galleryPhoto } from "@/lib/gallery-photos";

export const Route = createFileRoute("/our-work")({
  head: () => ({
    meta: [
      { title: "Our Work — SINGAWE Foundation" },
      {
        name: "description",
        content:
          "Mentorship, education, STEAM, leadership development and community partnerships — how SINGAWE Foundation bridges the gap between potential and opportunity.",
      },
      { property: "og:title", content: "Our Work — SINGAWE Foundation" },
      {
        property: "og:description",
        content:
          "Talent is universal. Access to opportunity is not. Here is how we close that gap.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OurWork,
});

function OurWork() {
  return (
    <>
      <PageHero
        image={galleryPhoto("hack8")}
        alt="Participants working together at the Indigenous Language Innovation Week Hackathon"
      >
        <Reveal>
          <p className="eyebrow text-gold">What We Do</p>
          <h1 className="mt-5 max-w-3xl text-[clamp(2.2rem,5vw,4rem)] leading-[1.02]">Our Work</h1>
          <div className="mt-8 h-px w-40 rule-draw bg-gold" />
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-cream/80">
            SINGAWE Foundation NPC exists to bridge the gap between potential and opportunity.
            Talent is universal — access to opportunity is not. Our work identifies potential,
            removes barriers, and creates pathways that let people discover their strengths and
            contribute meaningfully to their communities.
          </p>
        </Reveal>
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          {OUR_WORK_PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 90}>
              <div className="lift h-full rounded-sm border border-border bg-card p-8">
                <h3 className="font-display text-2xl leading-tight">{p.title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-sand">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center lg:px-10">
          <Reveal>
            <h2 className="text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.08]">
              We equip people, not just introduce them to opportunity.
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Our commitment extends beyond creating awareness. We prepare individuals, connect
              them with opportunities, support them throughout their journey, and continue
              investing in their growth — so that they are empowered to become confident leaders,
              innovators, entrepreneurs and changemakers who go on to create opportunities for
              others.
            </p>
            <Link
              to="/get-involved"
              className="mt-10 inline-block rounded-sm bg-ink px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-clay"
            >
              See how to get involved
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
