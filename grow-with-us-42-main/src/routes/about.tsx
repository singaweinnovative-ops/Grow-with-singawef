import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { VideoFrame } from "@/components/site/VideoFrame";
import { PageHero } from "@/components/site/PageHero";
import { PRINCIPLES, VALUES } from "@/lib/site-content";
import community from "@/assets/community.jpg";
import heroPortrait from "@/assets/hero-portrait.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SINGAWE Foundation — Purpose, Vision & Values" },
      {
        name: "description",
        content:
          "Why SINGAWE Foundation NPC exists: our vision, mission, philosophy, ten principles and six values, drawn from the Foundation Charter.",
      },
      { property: "og:title", content: "About SINGAWE Foundation" },
      {
        property: "og:description",
        content:
          "SINGAWE means 'We Are For You.' Read our vision, mission, philosophy, principles and values.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero image={heroPortrait} alt="A young South African student, SINGAWE Foundation">
        <Reveal>
          <p className="eyebrow text-gold">About the Foundation</p>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.4rem,5.4vw,4.4rem)] leading-[1]">
            An institution built on a single belief: opportunity should never be decided by
            circumstance.
          </h1>
          <div className="mt-8 h-px w-40 rule-draw bg-gold" />
        </Reveal>
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <Reveal className="grid gap-10 lg:grid-cols-2">
          <p className="text-lg leading-relaxed text-muted-foreground">
            Across communities there are children and young people with exceptional talent, ideas
            and determination whose potential goes unrealised — not from lack of ability, but from
            lack of access to guidance, exposure and mentorship. Too often ability is overlooked,
            confidence is diminished, and dreams are abandoned simply because no one was there to
            open the first door.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            SINGAWE Foundation NPC exists to change that reality. We do not only create
            opportunities — we make sure people are genuinely prepared to seize them, and we stay
            beside them while they do. Our commitment does not end at an achievement, because
            leadership is developed over time and those who have been empowered are best placed to
            empower others.
          </p>
        </Reveal>
      </section>

      <section className="border-y border-border bg-sand">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-2 lg:px-10">
          <Reveal>
            <p className="eyebrow text-clay">Vision</p>
            <p className="mt-5 font-display text-[clamp(1.5rem,2.8vw,2.2rem)] leading-[1.25]">
              To cultivate a world where creating opportunities, empowering others and unlocking
              human potential become a shared culture, passed from one generation to the next.
            </p>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Success will not be measured by the size of our organisation, but by how deeply the
              values of service, opportunity, innovation and empowerment become embedded in society.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow text-clay">Mission</p>
            <p className="mt-5 font-display text-[clamp(1.5rem,2.8vw,2.2rem)] leading-[1.25]">
              To empower individuals and strengthen communities by expanding access to opportunity,
              mentorship, education, innovation and leadership.
            </p>
            <ul className="mt-6 space-y-2 leading-relaxed text-muted-foreground">
              {[
                "Expanding awareness of educational and developmental opportunities.",
                "Connecting people to programmes, competitions, scholarships and fellowships.",
                "Providing mentorship before, during and after participation.",
                "Advancing STEAM education, innovation and entrepreneurship.",
                "Building partnerships that remove barriers to participation.",
              ].map((m) => (
                <li key={m} className="slash">
                  {m}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-clay">The SINGAWE Philosophy</p>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] leading-[1.05]">
            Identify potential. Remove barriers. Stay.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            We believe every individual possesses the potential to achieve meaningful success, and
            that potential most often stalls at a barrier — information, resources, networks,
            guidance, confidence. We name those barriers honestly and work to reduce them, rather
            than creating dependency.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p} delay={i * 45} className="bg-background">
              <div className="flex h-full flex-col justify-between gap-8 p-6 transition-colors duration-500 hover:bg-sand">
                <span className="font-display text-2xl text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-display text-lg leading-snug">{p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-ink text-cream">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold">Our Values</p>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] leading-[1.05]">
              Six commitments, and what each one is not.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.name} delay={i * 80}>
                <div className="flex h-full flex-col rounded-sm border border-cream/12 p-8 transition-colors duration-500 hover:border-gold/60">
                  <h3 className="font-display text-3xl text-gold">{v.name}</h3>
                  <p className="mt-4 leading-relaxed text-cream/75">{v.body}</p>
                  <p className="mt-6 border-t border-cream/12 pt-4 text-sm text-cream/45">
                    {v.isNot}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center lg:px-10">
        <Reveal>
          <img
            src={community}
            alt="Young community members standing together outdoors at golden hour"
            width={1808}
            height={1008}
            loading="lazy"
            className="h-80 w-full rounded-sm object-cover lg:h-[26rem]"
          />
        </Reveal>
        <Reveal delay={120}>
          <p className="eyebrow text-clay">The legacy we seek</p>
          <h2 className="mt-4 text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.08]">
            Measured in people, not programmes.
          </h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            Our greatest achievement will be realised when those we have empowered become mentors,
            innovators, entrepreneurs, educators and community leaders who open doors for others
            without waiting for us to do it.
          </p>
          <Link
            to="/get-involved"
            className="slash mt-8 inline-block text-sm font-semibold transition-colors hover:text-clay"
          >
            Be part of it
          </Link>
        </Reveal>
      </section>

      <section className="border-t border-border bg-sand">
        <div className="mx-auto max-w-4xl px-6 py-24 lg:px-10">
          <Reveal>
            <p className="eyebrow text-clay">Governance</p>
            <h2 className="mt-4 text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.08]">
              The Foundation Charter, SF-001.
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Our highest institutional document defines our identity, purpose, philosophy, values
              and long-term commitments. It complements our Memorandum of Incorporation, guides
              every policy we write and binds every Director, employee, volunteer, intern, Guide and
              partner who represents us.
            </p>
            <p className="mt-6 font-display text-xl">
              “Governance is the faithful stewardship of purpose, people and public trust.”
            </p>
          </Reveal>
          <Reveal delay={120} className="mt-12">
            <VideoFrame
              label="Founder's message · space reserved"
              caption="A short address from our Founder & Executive Director will live here."
              ratio="16 / 9"
            />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border bg-ink text-cream">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center lg:px-10">
          <Reveal>
            <p className="eyebrow text-gold">Get Involved</p>
            <h2 className="mx-auto mt-5 max-w-xl text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.06]">
              Whoever you are, there is a place for you in this journey.
            </h2>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                to="/get-involved"
                className="rounded-sm bg-gold px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-gold-soft"
              >
                Explore how to get involved
              </Link>
              <Link
                to="/get-involved/journeyer"
                className="rounded-sm border border-cream/40 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:border-gold hover:text-gold"
              >
                Apply now
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
