import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { SITE } from "@/lib/site-content";
import { personPhoto } from "@/lib/people-photos";
import { PersonAvatar } from "@/components/site/PersonAvatar";
import teamFallback from "@/assets/team-meeting-2.jpg";
import { getPublishedPeople } from "@/lib/site-content-db";

export const Route = createFileRoute("/people/$slug")({
  loader: async ({ params }) => {
    const people = await getPublishedPeople();
    const person = people.find((entry) => entry.slug === params.slug);
    if (!person) throw notFound();
    return { person, people };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Profile not found — SINGAWE Foundation" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { person } = loaderData;
    const title = `${person.name} — ${person.circle} | SINGAWE Foundation`;
    const description = person.brief.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: PersonMissing,
  component: PersonDetailPage,
});

function PersonMissing() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-32 text-center lg:px-10">
      <p className="eyebrow text-clay">Not found</p>
      <h1 className="mt-5 text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.05]">
        We could not find that person.
      </h1>
      <Link
        to="/people"
        className="mt-10 inline-block rounded-sm bg-ink px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-clay"
      >
        Meet our people
      </Link>
    </section>
  );
}

function PersonDetailPage() {
  const { person, people } = Route.useLoaderData();
  const others = people.filter((p) => p.slug !== person.slug).slice(0, 4);

  return (
    <>
      <PageHero
        image={person.photo ? personPhoto(person.photo) : teamFallback}
        alt={person.photo ? person.name : "The SINGAWE team"}
      >
        <Reveal>
          <Link to="/people" className="slash text-sm text-cream/70 hover:text-gold">
            Back to our people
          </Link>
        </Reveal>
        <div className="mt-10 grid gap-10 lg:grid-cols-[0.3fr_1fr] lg:items-start">
          <Reveal>
            <PersonAvatar
              photo={person.photo}
              initials={person.initials}
              name={person.name}
              className="size-32 rounded-full border-2 border-gold object-cover"
            />
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow text-gold">
              {person.circle} · {person.place}
            </p>
            <h1 className="mt-4 max-w-3xl text-[clamp(2.2rem,4.8vw,3.8rem)] leading-[1.02]">
              {person.name}
            </h1>
            <p className="mt-3 text-cream/80">{person.field}</p>
            {person.joined ? (
              <p className="mt-2 text-sm text-cream/60">
                In this role since <span className="text-gold">{person.joined}</span>
              </p>
            ) : null}
            <div className="mt-8 h-px w-40 rule-draw bg-gold" />
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-cream/85">{person.brief}</p>
          </Reveal>
        </div>
      </PageHero>

      <section className="mx-auto max-w-4xl px-6 py-20 lg:px-10 lg:py-28">
        <Reveal>
          <p className="eyebrow text-clay">Their story</p>
        </Reveal>
        <div className="mt-8 space-y-6">
          {person.story.map((para, i) => (
            <Reveal key={para} delay={i * 70}>
              <p className="text-lg leading-relaxed text-muted-foreground">{para}</p>
            </Reveal>
          ))}
        </div>

        {person.quote ? (
          <Reveal delay={140} className="mt-14">
            <blockquote className="border-l-2 border-gold pl-8 font-display text-[clamp(1.5rem,3vw,2.2rem)] leading-snug">
              “{person.quote}”
            </blockquote>
          </Reveal>
        ) : null}

        {person.links?.length ? (
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {person.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noreferrer noopener"
                className="slash text-sm font-semibold transition-colors hover:text-clay"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        ) : null}

      </section>

      <section className="border-t border-border bg-sand">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <Reveal>
            <p className="eyebrow text-clay">{SITE.meaning}</p>
            <h2 className="mt-4 text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.08]">
              More of our people.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={i * 70}>
                <Link
                  to="/people/$slug"
                  params={{ slug: o.slug }}
                  className="lift flex h-full flex-col rounded-sm border border-border bg-card p-6"
                >
                  <span className="flex size-12 items-center justify-center rounded-full bg-gold-soft font-display">
                    {o.initials}
                  </span>
                  <span className="eyebrow mt-5 text-gold">{o.circle}</span>
                  <h3 className="mt-2 font-display text-xl leading-tight">{o.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{o.field}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
