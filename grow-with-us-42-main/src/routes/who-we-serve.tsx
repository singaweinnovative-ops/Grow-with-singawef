import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { useSiteContent } from "@/lib/site-content-context";
import { galleryPhoto } from "@/lib/gallery-photos";

export const Route = createFileRoute("/who-we-serve")({
  head: () => ({
    meta: [
      { title: "Who We Serve — SINGAWE Foundation" },
      {
        name: "description",
        content:
          "Young people, families, schools, communities and partners — everyone SINGAWE Foundation works alongside.",
      },
      { property: "og:title", content: "Who We Serve — SINGAWE Foundation" },
      {
        property: "og:description",
        content:
          "SINGAWE Foundation places the individual at the centre of its work — because investing in one person ripples outward.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WhoWeServe,
});

function WhoWeServe() {
  const { WHO_WE_SERVE_GROUPS } = useSiteContent();
  return (
    <>
      <PageHero
        image={galleryPhoto("eskom1")}
        alt="Learners at an Eskom Expo for Young Scientists coaching session"
      >
        <Reveal>
          <p className="eyebrow text-gold">Our Community</p>
          <h1 className="mt-5 max-w-3xl text-[clamp(2.2rem,5vw,4rem)] leading-[1.02]">
            Who We Serve
          </h1>
          <div className="mt-8 h-px w-40 rule-draw bg-gold" />
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-cream/80">
            SINGAWE Foundation places the individual at the centre of its work — recognising that
            investing in one person creates a ripple effect that strengthens families, schools,
            organisations and communities.
          </p>
        </Reveal>
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          {WHO_WE_SERVE_GROUPS.map((g, i) => (
            <Reveal key={g.title} delay={(i % 2) * 90}>
              <div className="lift h-full rounded-sm border border-border bg-card p-8">
                <h3 className="font-display text-2xl leading-tight">{g.title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{g.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-ink text-cream">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center lg:px-10">
          <Reveal>
            <h2 className="text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.08]">
              Do you see yourself here?
            </h2>
            <p className="mt-6 leading-relaxed text-cream/70">
              Whoever you are on this list, there is a place for you in this journey.
            </p>
            <Link
              to="/get-involved/journeyer"
              className="mt-10 inline-block rounded-sm bg-gold px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-gold-soft"
            >
              Start your application
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
