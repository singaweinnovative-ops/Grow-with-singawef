import { createFileRoute, Link } from "@tanstack/react-router";
import { EmbeddedForm } from "@/components/site/EmbeddedForm";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { useSiteContent } from "@/lib/site-content-context";
import { downloadUrl } from "@/lib/file-links";
import community from "@/assets/community.jpg";
import steam from "@/assets/steam.jpg";

export const Route = createFileRoute("/news/")({
  head: () => ({
    meta: [
      { title: "News & Media — SINGAWE Foundation" },
      {
        name: "description",
        content:
          "Updates, press releases, statements and media resources from SINGAWE Foundation NPC — including our media kit and press contact.",
      },
      { property: "og:title", content: "SINGAWE Foundation News & Media" },
      {
        property: "og:description",
        content: "What we are doing, where, and with whom — plus press releases and media resources.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: News,
});

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });

function News() {
  const { MEDIA_CONTACT, NEWS, PRESS } = useSiteContent();
  const sorted = [...NEWS].sort((a, b) => (a.date < b.date ? 1 : -1));
  const [lead, ...rest] = sorted;

  return (
    <>
      <PageHero image={community} alt="Young community members gathered together">
        <Reveal>
          <p className="eyebrow text-gold">News & Media</p>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.4rem,5.4vw,4.4rem)] leading-[1]">
            What we are doing, where, and with whom.
          </h1>
          <div className="mt-8 h-px w-40 rule-draw bg-gold" />
        </Reveal>
      </PageHero>

      {lead ? (
        <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-10">
          <Reveal>
            <Link
              to="/news/$slug"
              params={{ slug: lead.slug }}
              className="lift block rounded-sm border border-border bg-sand p-8 lg:p-14"
            >
              <div className="flex flex-wrap items-center gap-4">
                <span className="eyebrow text-gold">{lead.label}</span>
                <span className="text-xs text-muted-foreground">{fmt(lead.date)}</span>
              </div>
              <h2 className="mt-6 max-w-3xl font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.08]">
                {lead.title}
              </h2>
              <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">{lead.excerpt}</p>
              <span className="slash mt-8 inline-block text-sm font-semibold">Read the story</span>
            </Link>
          </Reveal>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {rest.map((n, i) => (
            <Reveal key={n.slug} delay={(i % 3) * 80} className="bg-background">
              <Link
                to="/news/$slug"
                params={{ slug: n.slug }}
                className="group flex h-full flex-col p-8 transition-colors duration-500 hover:bg-sand"
              >
                <span className="eyebrow text-gold">{n.label}</span>
                <span className="mt-2 text-xs text-muted-foreground">{fmt(n.date)}</span>
                <h3 className="mt-5 font-display text-2xl leading-tight">{n.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{n.excerpt}</p>
                <span className="mt-auto block h-px w-8 bg-gold pt-8 transition-all duration-500 group-hover:w-20" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRESS ROOM */}
      <section id="press" className="relative scroll-mt-24 overflow-hidden border-y border-border bg-ink text-cream">
        <img
          src={steam}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/95 to-ink" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold">Press room</p>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] leading-[1.05]">
              Press releases, statements and media resources.
            </h2>
            <p className="mt-6 leading-relaxed text-cream/70">
              Everything here is free to quote and reproduce with attribution to SINGAWE Foundation
              NPC.
            </p>
          </Reveal>

          <div className="mt-14 divide-y divide-cream/12 border-y border-cream/12">
            {PRESS.map((p, i) => (
              <Reveal key={p.id} delay={i * 70}>
                <article className="group grid gap-6 py-8 md:grid-cols-[10rem_1fr_10rem] md:items-baseline">
                  <div>
                    <span className="eyebrow text-gold">{p.kind}</span>
                    <p className="mt-2 text-xs text-cream/50">{fmt(p.date)}</p>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl leading-tight">{p.title}</h3>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-cream/65">
                      {p.summary}
                    </p>
                  </div>
                  {p.file ? (
                    <a
                      href={downloadUrl(p.file)}
                      download
                      className="slash text-sm font-semibold text-gold md:text-right"
                    >
                      Download
                    </a>
                  ) : (
                    <span className="text-xs text-cream/40 md:text-right">{p.fileLabel}</span>
                  )}
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1fr]">
            <Reveal>
              <p className="eyebrow text-gold">Boilerplate</p>
              <p className="mt-4 max-w-xl leading-relaxed text-cream/75">
                {MEDIA_CONTACT.boilerplate}
              </p>
              <p className="mt-8 text-sm text-cream/60">
                {MEDIA_CONTACT.name} ·{" "}
                <a href={`mailto:${MEDIA_CONTACT.email}`} className="text-gold hover:underline">
                  {MEDIA_CONTACT.email}
                </a>
              </p>
            </Reveal>
            <Reveal delay={120}>
              <EmbeddedForm form="newsTip" tone="dark" />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
