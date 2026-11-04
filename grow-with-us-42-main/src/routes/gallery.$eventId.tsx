import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { GalleryFilm } from "@/components/site/GalleryFilm";
import { GALLERY_EVENTS, getGalleryEvent } from "@/lib/site-content";
import { galleryPhoto, TACA_FILM_VIDEO } from "@/lib/gallery-photos";

export const Route = createFileRoute("/gallery/$eventId")({
  loader: ({ params }) => {
    const event = getGalleryEvent(params.eventId);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Event not found — SINGAWE Foundation" }, { name: "robots", content: "noindex" }],
      };
    }
    const { event } = loaderData;
    return {
      meta: [
        { title: `${event.title} — SINGAWE Foundation Gallery` },
        { name: "description", content: event.overview.slice(0, 155) },
        { property: "og:title", content: event.title },
        { property: "og:description", content: event.overview.slice(0, 155) },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: EventMissing,
  component: EventDetail,
});

function EventMissing() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-32 text-center lg:px-10">
      <p className="eyebrow text-clay">Not found</p>
      <h1 className="mt-5 text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.05]">
        We could not find that event.
      </h1>
      <Link
        to="/gallery"
        className="mt-10 inline-block rounded-sm bg-ink px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-clay"
      >
        Back to the gallery
      </Link>
    </section>
  );
}

function EventDetail() {
  const { event } = Route.useLoaderData();
  const others = GALLERY_EVENTS.filter((e) => e.id !== event.id).slice(0, 3);
  const slides = event.photos.map((p) => ({ src: galleryPhoto(p.src), caption: p.caption }));

  return (
    <>
      <section className="border-b border-border bg-sand">
        <div className="mx-auto max-w-5xl px-6 pt-14 pb-16 lg:px-10 lg:pt-20">
          <Reveal>
            <Link to="/gallery" className="slash text-sm text-muted-foreground hover:text-clay">
              Back to the gallery
            </Link>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-8 flex flex-wrap items-baseline justify-between gap-4">
              <p className="eyebrow text-clay">{event.theme}</p>
              <span className="text-sm text-muted-foreground">{event.date}</span>
            </div>
            <h1 className="mt-4 max-w-3xl text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.03]">
              {event.title}
            </h1>
            <div className="mt-8 h-px w-40 rule-draw bg-gold" />
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {event.overview}
            </p>
          </Reveal>
        </div>
      </section>

      {slides.length > 0 || event.hasVideo ? (
        <section className="mx-auto max-w-5xl px-6 py-16 lg:px-10 lg:py-20">
          <Reveal>
            <p className="eyebrow text-clay">Highlights</p>
            <h2 className="mt-3 font-display text-2xl leading-tight">The film from this event.</h2>
          </Reveal>
          <Reveal delay={100} className="mt-8">
            <GalleryFilm
              slides={slides}
              label={`${event.title} · highlights`}
              {...(event.hasVideo ? { videoSrc: TACA_FILM_VIDEO } : {})}
            />
          </Reveal>
        </section>
      ) : null}

      {event.photos.length > 0 ? (
        <section className="border-t border-border bg-sand">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <Reveal>
            <p className="eyebrow text-clay">Every photo</p>
            <h2 className="mt-3 font-display text-2xl leading-tight">
              All {event.photos.length} photo{event.photos.length === 1 ? "" : "s"} from{" "}
              {event.title}.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {event.photos.map((p, i) => (
              <Reveal key={`${p.src}-${i}`} delay={(i % 3) * 90}>
                <figure className="group overflow-hidden rounded-sm border border-border bg-card">
                  <div className="overflow-hidden">
                    <img
                      src={galleryPhoto(p.src)}
                      alt={p.caption}
                      width={1200}
                      height={900}
                      loading="lazy"
                      className="h-64 w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                    />
                  </div>
                  <figcaption className="p-5">
                    <p className="text-sm leading-relaxed text-muted-foreground">{p.caption}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <Reveal>
          <p className="eyebrow text-clay">More events</p>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {others.map((o, i) => (
            <Reveal key={o.id} delay={i * 80}>
              <Link
                to="/gallery/$eventId"
                params={{ eventId: o.id }}
                className="lift flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card"
              >
                {o.photos[0] ? (
                  <img
                    src={galleryPhoto(o.photos[0].src)}
                    alt={o.title}
                    width={1200}
                    height={900}
                    loading="lazy"
                    className="h-40 w-full object-cover"
                  />
                ) : (
                  <div aria-hidden="true" className="h-40 w-full bg-sand" />
                )}
                <div className="p-5">
                  <span className="eyebrow text-gold">{o.theme}</span>
                  <h3 className="mt-2 font-display text-lg leading-tight">{o.title}</h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
