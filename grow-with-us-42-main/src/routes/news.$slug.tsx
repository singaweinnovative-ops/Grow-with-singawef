import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { VideoFrame } from "@/components/site/VideoFrame";
import { PageHero } from "@/components/site/PageHero";
import { useSiteContent } from "@/lib/site-content-context";
import { galleryPhoto } from "@/lib/gallery-photos";
import { loadSiteContent } from "@/lib/site-content-db";
import { withDerived } from "@/lib/site-content";
import mentorship from "@/assets/mentorship.jpg";
import steam from "@/assets/steam.jpg";
import community from "@/assets/community.jpg";
import heroPortrait from "@/assets/hero-portrait.jpg";

const STORY_IMAGES: Record<string, string> = {
  "phuthini-2024": heroPortrait,
  "dut-support": community,
  "taca-applications": mentorship,
  "sisterhood-launch": community,
  "charter-signed": steam,
};

export const Route = createFileRoute("/news/$slug")({
  loader: async ({ params }) => {
    const article = withDerived(await loadSiteContent()).getNews(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Story not found — SINGAWE Foundation" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { article } = loaderData;
    return {
      meta: [
        { title: `${article.title} — SINGAWE Foundation` },
        { name: "description", content: article.excerpt },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: StoryNotFound,
  component: Story,
});

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });

function Story() {
  const { NEWS } = useSiteContent();
  const { article } = Route.useLoaderData();
  const more = NEWS.filter((n) => n.slug !== article.slug).slice(0, 3);

  return (
    <>
      <PageHero
        image={
          article.image ? galleryPhoto(article.image) : (STORY_IMAGES[article.slug] ?? heroPortrait)
        }
        alt={article.title}
      >
        <Reveal>
          <Link to="/news" className="slash text-sm text-cream/70 hover:text-gold">
            News & Media
          </Link>
          <p className="eyebrow mt-8 text-gold">{article.label}</p>
          <h1 className="mt-4 max-w-3xl text-[clamp(2.1rem,4.6vw,3.4rem)] leading-[1.05]">
            {article.title}
          </h1>
          <p className="mt-5 text-sm text-cream/70">{fmt(article.date)}</p>
          <div className="mt-8 h-px w-40 rule-draw bg-gold" />
        </Reveal>
      </PageHero>

      <article className="mx-auto max-w-3xl px-6 pt-16 pb-20 lg:pt-24">
        <Reveal delay={90}>
          <p className="mt-10 font-display text-xl leading-relaxed text-clay">{article.excerpt}</p>
          {article.body.map((p) => (
            <p key={p} className="mt-6 leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </Reveal>

        <Reveal delay={140} className="mt-14">
          <VideoFrame label="Story film · space reserved" />
        </Reveal>
      </article>

      <section className="border-t border-border bg-sand">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <p className="eyebrow text-clay">Keep reading</p>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {more.map((n, i) => (
              <Reveal key={n.slug} delay={i * 80}>
                <Link
                  to="/news/$slug"
                  params={{ slug: n.slug }}
                  className="lift flex h-full flex-col rounded-sm border border-border bg-background p-7"
                >
                  <span className="eyebrow text-gold">{n.label}</span>
                  <h3 className="mt-4 font-display text-xl leading-tight">{n.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{n.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function StoryNotFound() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-32 text-center">
      <p className="eyebrow text-clay">Not found</p>
      <h1 className="mt-4 text-4xl">That story is not here.</h1>
      <Link to="/news" className="slash mt-8 inline-block text-sm font-semibold">
        Back to News & Media
      </Link>
    </section>
  );
}
