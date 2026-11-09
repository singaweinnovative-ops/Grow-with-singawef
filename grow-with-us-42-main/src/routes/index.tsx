import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { VideoFrame } from "@/components/site/VideoFrame";
import singaweIntro from "@/assets/singawe-f-intro-540p.mp4";
import introPoster from "@/assets/singawe-f-intro-poster.jpg";
import { OpportunityCarousel } from "@/components/site/OpportunityCarousel";
import { PartnerMarquee } from "@/components/site/PartnerMarquee";
import { useSiteContent } from "@/lib/site-content-context";
import { galleryPhoto } from "@/lib/gallery-photos";
import { getPublishedOpportunities } from "@/lib/site-content-db";
import heroStudent from "@/assets/hero-student.jpg";
import steam from "@/assets/steam.jpg";

export const Route = createFileRoute("/")({
  loader: () => getPublishedOpportunities(),
  head: () => ({
    meta: [
      { title: "SINGAWE Foundation — We Are For You" },
      {
        name: "description",
        content:
          "SINGAWE Foundation NPC unlocks human potential through mentorship, education, STEAM and leadership — walking alongside every individual we serve.",
      },
      { property: "og:title", content: "SINGAWE Foundation — We Are For You" },
      {
        property: "og:description",
        content:
          "Your Journey. Our Commitment. A South African NPC removing barriers and creating opportunity, one individual at a time.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const {
    INITIATIVES,
    JOURNEY_STEPS,
    LEARNING_PATHWAYS,
    MEDIA,
    PROCESS_STEPS,
    PROGRAMMES,
    SITE,
    WALK_STAGES,
  } = useSiteContent();
  const opportunities = Route.useLoaderData();
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gold-soft/50 via-gold-soft/15 to-background">
        <div className="pointer-events-none absolute -top-40 right-[-10%] size-[38rem] rounded-full bg-[radial-gradient(circle,var(--gold-soft),transparent_65%)] opacity-70" />
        <div className="pointer-events-none absolute -bottom-32 left-[-12%] size-[30rem] rounded-full bg-[radial-gradient(circle,var(--gold),transparent_70%)] opacity-25" />
        <div className="mx-auto grid max-w-7xl gap-14 px-6 pt-16 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:px-10 lg:pt-24 lg:pb-28">
          <div>
            <p
              className="eyebrow text-clay"
              style={{ animation: "sf-rise 0.8s cubic-bezier(0.16,1,0.3,1) both" }}
            >
              SINGAWE — “We Are For You.”
            </p>
            <h1
              className="mt-6 text-[clamp(2.7rem,6.4vw,5.2rem)] leading-[0.98]"
              style={{ animation: "sf-rise 0.9s 0.08s cubic-bezier(0.16,1,0.3,1) both" }}
            >
              Every person is born
              <br />
              with potential.
              <br />
              <span className="text-clay">Not everyone is born</span>
              <br />
              <span className="text-clay">with opportunity.</span>
            </h1>
            <div className="mt-8 h-px w-40 rule-draw bg-gold" />
            <p
              className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground"
              style={{ animation: "sf-rise 0.9s 0.2s cubic-bezier(0.16,1,0.3,1) both" }}
            >
              We exist to change that. SINGAWE Foundation identifies talent, removes barriers and
              walks alongside individuals through mentorship, education, STEAM, entrepreneurship and
              leadership — long after the first door opens.
            </p>
            <div
              className="mt-10 flex flex-wrap gap-3"
              style={{ animation: "sf-rise 0.9s 0.3s cubic-bezier(0.16,1,0.3,1) both" }}
            >
              <Link
                to="/get-involved"
                className="rounded-sm bg-ink px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-clay"
              >
                Begin your journey
              </Link>
              <Link
                to="/programmes"
                className="rounded-sm border border-ink/25 px-7 py-3.5 text-sm font-semibold transition-colors hover:border-gold hover:text-clay"
              >
                See our programmes
              </Link>
            </div>
          </div>

          <div
            className="relative"
            style={{ animation: "sf-rise 1s 0.15s cubic-bezier(0.16,1,0.3,1) both" }}
          >
            <img
              src={heroStudent}
              alt="A young South African student smiling in warm sunlight"
              width={1600}
              height={1808}
              className="relative w-full aspect-[4/5] object-cover"
            />
            <div className="absolute -bottom-4 -right-4 bg-[var(--ink)] text-white px-5 py-4 max-w-[220px]">
              <div className="eyebrow text-[var(--orange)]">Our Motto</div>
              <div className="mt-1 font-serif italic text-xl leading-tight">
                Your Journey.
                <br />
                Our Commitment.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATEMENT BAND */}
      <section className="border-y border-border bg-sand">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center lg:px-10">
          <Reveal>
            <p className="font-display text-[clamp(1.6rem,3.4vw,2.8rem)] leading-[1.28]">
              SINGAWE Foundation is an organisation of{" "}
              <span className="text-clay">opportunity</span>,{" "}
              <span className="text-clay">empowerment</span> and{" "}
              <span className="text-clay">lasting impact</span>. Our work begins with the individual
              — because investing in one person creates a ripple that strengthens families, schools
              and communities.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow mt-10 text-muted-foreground">Our Identity Statement</p>
          </Reveal>
        </div>
      </section>

      {/* LIVE OPPORTUNITIES — slideshow */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow text-clay">Opportunity board</p>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] leading-[1.05]">
              Open right now — apply yourself, or let us walk it with you.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Every slide links to the official page. Prefer to apply on your own? Go straight
              there. Want a hand? Get help applying and a form for exactly that kind of opportunity
              opens beside you.
            </p>
          </div>
          <Link
            to="/opportunities"
            className="slash text-sm font-semibold transition-colors hover:text-clay"
          >
            See the full opportunity board
          </Link>
        </Reveal>

        <OpportunityCarousel opportunities={opportunities} />
      </section>

      {/* THE JOURNEY */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-clay">How we work</p>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] leading-[1.05]">
            We do not hand out opportunity. We walk the whole way.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {JOURNEY_STEPS.map((s, i) => (
            <Reveal key={s.step} delay={i * 90} className="bg-background">
              <div className="group h-full p-8 transition-colors duration-500 hover:bg-sand">
                <span className="font-display text-4xl text-gold">{s.step}</span>
                <h3 className="mt-6 text-xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                <div className="mt-8 h-px w-8 bg-gold transition-all duration-500 group-hover:w-16" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* VIDEO SPACE */}
      <section className="border-y border-border bg-sand">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-10">
          <Reveal>
            <p className="eyebrow text-clay">In their words</p>
            <h2 className="mt-4 text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.08]">
              Stories from the people we walk with.
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
              Journeyers, Guides and Companions telling it themselves — no script, just the people
              we walk with.
            </p>
            <Link
              to="/people"
              className="slash mt-8 inline-block text-sm font-semibold transition-colors hover:text-clay"
            >
              Meet our people
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <VideoFrame
              label="In Their Words"
              caption="The SINGAWE Foundation, in the words of the people who walk it."
              videoSrc={MEDIA.introVideoUrl ?? singaweIntro}
              poster={MEDIA.introPosterUrl ?? introPoster}
            />
          </Reveal>
        </div>
      </section>

      {/* PROGRAMMES */}
      <section className="relative overflow-hidden border-y border-border">
        <img src={steam} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/92 via-background/80 to-background/95" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="eyebrow text-clay">Programmes</p>
              <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] leading-[1.05]">
                Four ways we reduce the distance to opportunity.
              </h2>
            </div>
            <Link
              to="/programmes"
              className="slash text-sm font-semibold transition-colors hover:text-clay"
            >
              All programmes
            </Link>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {PROGRAMMES.map((p, i) => (
              <Reveal key={p.id} delay={i * 90}>
                <Link
                  to="/programmes"
                  hash={p.id}
                  className="lift flex h-full flex-col rounded-sm border border-border bg-card p-9 transition-colors duration-300 hover:border-gold hover:bg-gold-soft focus-visible:border-gold focus-visible:bg-gold-soft focus-visible:outline-none"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="eyebrow text-gold">{p.kicker}</span>
                    <span className="font-display text-3xl text-border">{p.label}</span>
                  </div>
                  <h3 className="mt-5 font-display text-3xl">{p.name}</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{p.body}</p>
                  <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                    {p.points.map((pt) => (
                      <li key={pt} className="slash">
                        {pt}
                      </li>
                    ))}
                  </ul>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GROWING WITH SINGAWE */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-clay">Growing With SINGAWE</p>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] leading-[1.05]">Learning Pathways</h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            Every age group meets SINGAWE at a different stage — the focus grows with them.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {LEARNING_PATHWAYS.map((p, i) => (
            <Reveal key={p.id} delay={i * 100}>
              <div className="lift flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card">
                <img
                  src={galleryPhoto(p.image)}
                  alt={p.name}
                  loading="lazy"
                  className="h-48 w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-7">
                  <span className="eyebrow text-gold">{p.ages}</span>
                  <h3 className="mt-3 font-display text-2xl">{p.name}</h3>
                  <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                    {p.points.map((pt) => (
                      <li key={pt} className="slash">
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* NAMED INITIATIVES */}
      <section id="initiatives" className="scroll-mt-24 border-y border-border bg-sand">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-clay">Our initiatives</p>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] leading-[1.05]">
              Named projects, already in motion.
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Each one began with a real person and a real barrier. They run inside our programmes
              and carry their own names, because the people in them deserve somewhere to belong.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {INITIATIVES.map((it, i) => (
              <Reveal key={it.id} delay={i * 80} className="bg-background">
                <Link
                  to="/programmes/$slug"
                  params={{ slug: it.id }}
                  className="group relative flex h-full flex-col overflow-hidden p-8 text-cream"
                >
                  <img
                    src={galleryPhoto(it.image)}
                    alt={it.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/40 transition-colors duration-500 group-hover:from-ink/95" />
                  <div className="relative z-10 flex h-full flex-col">
                    <span className="eyebrow text-gold">{it.kicker}</span>
                    <h3 className="mt-4 font-display text-2xl">{it.name}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-cream/80">{it.body}</p>
                    <ul className="mt-6 space-y-2 text-sm text-cream/70">
                      {it.points.map((pt) => (
                        <li key={pt} className="slash">
                          {pt}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 h-px w-8 bg-gold transition-all duration-500 group-hover:w-20" />
                    <span className="slash mt-6 inline-block text-xs font-semibold">
                      Explore {it.name}
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
            <Reveal delay={400} className="bg-background">
              <Link
                to="/get-involved"
                className="flex h-full flex-col justify-between p-8 transition-colors duration-500 hover:bg-gold-soft"
              >
                <span className="eyebrow text-clay">Yours next</span>
                <p className="mt-6 font-display text-2xl leading-tight">
                  Have an initiative that belongs here? Bring it to us.
                </p>
                <span className="slash mt-8 text-sm font-semibold">Start a conversation</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* THE WALK — mentorship in motion */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="eyebrow text-clay">The walk</p>
              <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] leading-[1.05]">
                What mentorship looks like, month by month.
              </h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                Mentorship at SINGAWE is not a motivational talk. It is a person who shows up on the
                same date every month until the road is walked.
              </p>
              <img
                src={galleryPhoto("mentored4")}
                alt="A Guide reviewing a Journeyer's presentation before judging"
                width={1408}
                height={1008}
                loading="lazy"
                className="mt-10 aspect-[4/3] w-full rounded-sm object-cover"
              />
            </Reveal>
          </div>

          <ol className="relative border-l border-border pl-8">
            {WALK_STAGES.map((s, i) => (
              <Reveal key={s.title} delay={i * 70} as="li" className="relative pb-12 last:pb-0">
                <span className="absolute -left-[2.28rem] top-1.5 size-3 rounded-full border border-gold bg-background" />
                <span className="eyebrow text-gold">{s.time}</span>
                <h3 className="mt-3 font-display text-2xl">{s.title}</h3>
                <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* IMAGE MOSAIC */}
      <section className="border-y border-border bg-ink text-cream">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold">What makes us different</p>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] leading-[1.05]">
              Opportunity alone does not create transformation.
            </h2>
            <p className="mt-6 leading-relaxed text-cream/70">
              Transformation happens when people are prepared, supported and empowered to overcome
              the barriers standing between them and what is already available to them. So we stay.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              {
                src: galleryPhoto("phuthini2"),
                alt: "Journeyers and a Guide gathered at Phuthini Secondary School",
                w: 1600,
                h: 1259,
                span: "md:col-span-2",
              },
              {
                src: galleryPhoto("mentored3"),
                alt: "A Guide with Journeyers at the Eskom Expo for Young Scientists",
                w: 1280,
                h: 960,
                span: "",
              },
            ].map((img, i) => (
              <Reveal key={img.alt} delay={i * 120} className={img.span}>
                <img
                  src={img.src}
                  alt={img.alt}
                  width={img.w}
                  height={img.h}
                  loading="lazy"
                  className="h-72 w-full rounded-sm object-cover md:h-80"
                />
              </Reveal>
            ))}
            <Reveal delay={240} className="md:col-span-3">
              <img
                src={galleryPhoto("tacaDut2")}
                alt="Learners at Durban University of Technology's Student Recruitment Day"
                width={1200}
                height={1600}
                loading="lazy"
                className="h-72 w-full rounded-sm object-cover md:h-96"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="border-b border-border bg-sand">
        <div className="mx-auto max-w-7xl px-6 pt-20 lg:px-10">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-clay">Partners & supporters</p>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] leading-[1.05]">
              We build with what already exists.
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Hover a partner to hold it still. Click to visit them.
            </p>
          </Reveal>
        </div>
        <div className="pb-10">
          <PartnerMarquee />
        </div>
      </section>

      {/* THE PROCESS */}
      <section className="border-y border-border bg-sand">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-clay">The Process</p>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] leading-[1.05]">
              From application to portal.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((s, i) => (
              <Reveal key={s.step} delay={i * 90} className="bg-background">
                <div
                  tabIndex={0}
                  className="group h-full p-8 transition-colors duration-300 hover:bg-gold-soft focus-visible:bg-gold-soft focus-visible:outline-none"
                >
                  <span className="font-display text-4xl text-gold">{s.step}</span>
                  <h3 className="mt-6 text-xl">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                  <div className="mt-8 h-px w-8 bg-gold transition-all duration-500 group-hover:w-16 group-focus-visible:w-16" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal className="rounded-sm border border-border bg-sand px-8 py-16 text-center md:px-16">
          <p className="eyebrow text-clay">{SITE.meaning}</p>
          <h2 className="mx-auto mt-5 max-w-3xl text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.05]">
            Whether you need a door opened, or you are ready to open one —
            <span className="text-clay"> we are for you.</span>
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/get-involved"
              hash="journeyer"
              className="rounded-sm bg-ink px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-clay"
            >
              I am looking for support
            </Link>
            <Link
              to="/get-involved"
              hash="guide"
              className="rounded-sm border border-ink/25 px-7 py-3.5 text-sm font-semibold transition-colors hover:border-gold hover:text-clay"
            >
              I want to become a Guide
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
