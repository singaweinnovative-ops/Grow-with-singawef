import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { GalleryFilm } from "@/components/site/GalleryFilm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GALLERY_EVENTS, GALLERY_EVENT_YEARS } from "@/lib/site-content";
import { galleryPhoto } from "@/lib/gallery-photos";
import hero from "@/assets/hero-portrait.jpg";

export const Route = createFileRoute("/gallery/")({
  head: () => ({
    meta: [
      { title: "Gallery — SINGAWE Foundation in the Room" },
      {
        name: "description",
        content:
          "Photographs and highlight films from SINGAWE Foundation events across KwaZulu-Natal — Walk-Along sessions, Makers Lab builds, Sisterhood circles and TACA application days.",
      },
      { property: "og:title", content: "SINGAWE Foundation Gallery" },
      {
        property: "og:description",
        content: "The work, as it actually looks: classrooms, circles, builds and application days.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const themes = ["All", ...Array.from(new Set(GALLERY_EVENTS.map((e) => e.theme)))];
  const [theme, setTheme] = useState("All");
  const [year, setYear] = useState("All");
  const shown = GALLERY_EVENTS.filter(
    (e) => (theme === "All" || e.theme === theme) && (year === "All" || String(e.year) === year),
  );
  const chip = "rounded-sm border px-3 py-1.5 text-xs transition-colors";

  const allSlides = GALLERY_EVENTS.flatMap((e) =>
    e.photos.map((p) => ({ src: galleryPhoto(p.src), caption: `${e.title} — ${p.caption}` })),
  );

  return (
    <>
      <PageHero image={hero} alt="A young South African student, SINGAWE Foundation">
        <Reveal>
          <p className="eyebrow text-gold">Gallery</p>
          <h1 className="mt-4 max-w-3xl text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.02]">
            The work, as it actually looks.
          </h1>
          <div className="mt-6 h-px w-28 rule-draw bg-gold" />
          <p className="mt-6 max-w-xl leading-relaxed text-cream/80">
            Every card is an event. Click one to see its overview, its highlights film and every
            photo taken there.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-8 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow text-cream/70">Year</span>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-36 border-cream/25 bg-ink/40 text-cream">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["All", ...GALLERY_EVENT_YEARS.map(String)].map((y) => (
                  <SelectItem key={y} value={y}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow mr-1 text-cream/70">Theme</span>
            {themes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTheme(t)}
                className={`${chip} ${
                  theme === t
                    ? "border-gold bg-gold text-ink"
                    : "border-cream/25 text-cream/85 hover:border-gold hover:text-gold"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </Reveal>
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 pt-12 pb-24 lg:px-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((e, i) => (
            <Reveal key={e.id} delay={(i % 3) * 90}>
              <Link
                to="/gallery/$eventId"
                params={{ eventId: e.id }}
                className="lift group block overflow-hidden rounded-sm border border-border bg-card"
              >
                <div className="overflow-hidden">
                  <img
                    src={galleryPhoto(e.photos[0].src)}
                    alt={e.title}
                    width={1200}
                    height={900}
                    loading="lazy"
                    className="h-64 w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="eyebrow text-gold">{e.theme}</span>
                    <span className="text-xs text-muted-foreground">{e.date}</span>
                  </div>
                  <h2 className="mt-2 font-display text-xl leading-tight">{e.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {e.photos.length} photo{e.photos.length === 1 ? "" : "s"} · highlights film
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        {shown.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            No events listed for that combination yet.
          </p>
        ) : null}

        <Reveal delay={120} className="mt-16">
          <p className="eyebrow text-clay">Every event, one reel</p>
          <h2 className="mt-3 max-w-xl font-display text-2xl leading-tight">
            The rolling film of the Foundation's work.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Built automatically from every photo across every event above — add a new photo to any
            event and it plays here too.
          </p>
          <div className="mt-8">
            <GalleryFilm slides={allSlides} label="SINGAWE Foundation · the reel" />
          </div>
        </Reveal>
      </section>
    </>
  );
}
