import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import {
  ALL_PROGRAMMES,
  CAREER_YUM,
  GALLERY_EVENTS,
  MONTH_NAMES,
  SINGAWEB_SCHOOLS,
  TACA_MATRIC_SYSTEM,
  getProgramme,
  SITE,
} from "@/lib/site-content";
import { getBrand } from "@/lib/programme-brands";
import { getProgrammeImage } from "@/lib/programme-images";
import { ProgrammeNav } from "@/components/site/ProgrammeNav";
import { getDossier } from "@/lib/programme-teams";
import { InitiativeJoinForm } from "@/components/site/InitiativeJoinForm";
import { InitiativeCollaborateForm } from "@/components/site/InitiativeCollaborateForm";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { galleryPhoto } from "@/lib/gallery-photos";

export const Route = createFileRoute("/programmes/$slug")({
  loader: ({ params }) => {
    const programme = getProgramme(params.slug);
    if (!programme) throw notFound();
    return { programme };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Programme not found — SINGAWE Foundation" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { programme: p } = loaderData;
    const title = `${p.name} — ${p.kicker} | SINGAWE Foundation`;
    const description = p.body.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ProgrammeMissing,
  component: ProgrammeDetailPage,
});

function ProgrammeMissing() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-32 text-center lg:px-10">
      <p className="eyebrow text-clay">Not found</p>
      <h1 className="mt-5 text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.05]">
        We could not find that programme.
      </h1>
      <Link
        to="/programmes"
        className="mt-10 inline-block rounded-sm bg-ink px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-clay"
      >
        See all programmes
      </Link>
    </section>
  );
}

function ProgrammeDetailPage() {
  const { programme: p } = Route.useLoaderData();
  const others = ALL_PROGRAMMES.filter((x) => x.slug !== p.slug).slice(0, 4);
  const brand = getBrand(p.slug, p.name, p.family);
  const dossier = getDossier(p.slug);
  const [joinOpen, setJoinOpen] = useState(false);
  const [collabOpen, setCollabOpen] = useState(false);
  const [openSchoolId, setOpenSchoolId] = useState<string | null>(null);
  const [selectedSchoolId, setSelectedSchoolId] = useState(SINGAWEB_SCHOOLS[0]?.id ?? "");
  const [galleryRevealedFor, setGalleryRevealedFor] = useState<string | null>(null);
  const galleryRevealed = galleryRevealedFor === p.slug;
  const [galleryYear, setGalleryYear] = useState("All");
  const [galleryMonth, setGalleryMonth] = useState("All");
  const allProgrammeGalleryEvents = GALLERY_EVENTS.filter((e) => e.programmeSlug === p.slug);
  const currentYear = new Date().getFullYear();
  const galleryYears = Array.from({ length: currentYear - 2024 + 1 }, (_, i) => 2024 + i);
  const galleryMonths = Array.from({ length: 12 }, (_, i) => i + 1);
  const programmeGalleryEvents = allProgrammeGalleryEvents.filter(
    (e) =>
      (galleryYear === "All" || String(e.year) === galleryYear) &&
      (galleryMonth === "All" || String(e.month) === galleryMonth),
  );
  const [schoolGalleryYear, setSchoolGalleryYear] = useState("All");
  const openSchool = SINGAWEB_SCHOOLS.find((s) => s.id === openSchoolId);
  const selectedSchool = SINGAWEB_SCHOOLS.find((s) => s.id === selectedSchoolId);
  const schoolGalleryYears = Array.from(
    new Set((openSchool?.photos ?? []).map((photo) => photo.year)),
  ).sort((a, b) => b - a);
  const schoolGalleryPhotos = (openSchool?.photos ?? []).filter(
    (photo) => schoolGalleryYear === "All" || String(photo.year) === schoolGalleryYear,
  );

  return (
    <>
      <ProgrammeNav
        brand={brand}
        name={p.name}
        family={p.family}
        slug={p.slug}
        onSectionClick={(id) => {
          if (id === "gallery") setGalleryRevealedFor(p.slug);
        }}
      />
      <section
        id="overview"
        className="relative scroll-mt-40 overflow-hidden border-b"
        style={{ borderColor: `${brand.accent}26` }}
      >
        <img
          src={getProgrammeImage(p.slug)}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ backgroundColor: `${brand.tint}B8` }} />
        <div className="relative mx-auto max-w-7xl px-6 pt-14 pb-20 lg:px-10 lg:pt-20">
          <Reveal>
            <Link to="/programmes" className="slash text-sm text-muted-foreground hover:text-clay">
              Back to programmes
            </Link>
            <p className="eyebrow mt-8" style={{ color: brand.accent }}>
              {p.family} · {p.kicker}
            </p>
            <h1 className="mt-5 max-w-4xl text-[clamp(2.4rem,5.4vw,4.4rem)] leading-[1]">
              {p.name}
            </h1>
            <div className="mt-8 h-px w-40 rule-draw" style={{ backgroundColor: brand.accent }} />
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">{p.body}</p>
          </Reveal>
        </div>
      </section>

      {p.slug === "taca" ? (
        <section
          className="border-b"
          style={{ borderColor: `${brand.accent}26`, backgroundColor: brand.tint }}
        >
          <div className="mx-auto grid max-w-7xl gap-5 px-6 py-5 sm:grid-cols-2 lg:px-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-display text-lg" style={{ color: brand.accent }}>
                  Explore careers
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {CAREER_YUM.blurb}
                </p>
              </div>
              <a
                href={CAREER_YUM.websiteUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="shrink-0 rounded-sm border px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-80"
                style={{ borderColor: brand.accent, color: brand.accent }}
              >
                Visit {CAREER_YUM.label} ↗
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-display text-lg" style={{ color: brand.accent }}>
                  Application support
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Track every learner's progress in one place.
                </p>
              </div>
              <a
                href={TACA_MATRIC_SYSTEM.url}
                target="_blank"
                rel="noreferrer noopener"
                className="shrink-0 rounded-sm px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: brand.accent, color: brand.onAccent }}
              >
                Open the {TACA_MATRIC_SYSTEM.label} ↗
              </a>
            </div>
          </div>
        </section>
      ) : null}

      <section
        id="includes"
        className="mx-auto max-w-7xl scroll-mt-40 px-6 py-20 lg:px-10 lg:py-28"
      >
        <Reveal className="max-w-2xl">
          <p className="eyebrow" style={{ color: brand.accent }}>
            {brand.sections[1]?.label ?? "What this includes"}
          </p>
          <h2 className="mt-4 text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.08]">
            Practical, not promotional.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-3">
          {p.points.map((pt, i) => (
            <Reveal key={pt} delay={i * 80} className="bg-background">
              <div className="group h-full p-8 transition-colors duration-500 hover:bg-sand">
                <span className="font-display text-3xl" style={{ color: brand.accent }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-5 leading-relaxed">{pt}</p>
                <div
                  className="mt-8 h-px w-8 transition-all duration-500 group-hover:w-20"
                  style={{ backgroundColor: brand.accent }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {p.slug === "singaweb" ? (
        <section
          id="schools"
          className="scroll-mt-40 border-y"
          style={{ borderColor: `${brand.accent}26`, backgroundColor: brand.tint }}
        >
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
            <Reveal className="max-w-2xl">
              <p className="eyebrow" style={{ color: brand.accent }}>
                Schools
              </p>
              <h2 className="mt-4 text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.08]">
                Live sites, and where to point learners next.
              </h2>
            </Reveal>

            <Reveal delay={90} className="mt-6">
              <div
                className="rounded-sm border bg-background p-6"
                style={{ borderColor: `${brand.accent}33` }}
              >
                <label
                  className="eyebrow block"
                  style={{ color: brand.accent }}
                  htmlFor="school-select"
                >
                  Choose a school
                </label>
                <div className="mt-3">
                  <Select value={selectedSchoolId} onValueChange={setSelectedSchoolId}>
                    <SelectTrigger id="school-select" className="w-full sm:w-80">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SINGAWEB_SCHOOLS.map((school) => (
                        <SelectItem key={school.id} value={school.id}>
                          {school.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedSchool ? (
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <p className="font-display text-xl leading-tight">{selectedSchool.name}</p>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={selectedSchool.websiteUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="rounded-sm border px-4 py-2 text-xs font-semibold transition-colors hover:opacity-80"
                        style={{ borderColor: brand.accent, color: brand.accent }}
                      >
                        Visit website ↗
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setSchoolGalleryYear("All");
                          setOpenSchoolId(selectedSchool.id);
                        }}
                        className="rounded-sm px-4 py-2 text-xs font-semibold transition-opacity hover:opacity-90"
                        style={{ backgroundColor: brand.accent, color: brand.onAccent }}
                      >
                        View gallery
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* VISION & MISSION */}
      <section
        className="border-y border-border"
        style={{ backgroundColor: brand.tint }}
      >
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="max-w-3xl">
            <Reveal>
              <p className="eyebrow" style={{ color: brand.accent }}>
                {p.name}
              </p>
              <h2 className="mt-4 text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.08]">
                Vision and mission.
              </h2>
              <div className="mt-10 space-y-6">
                <div>
                  <p className="eyebrow" style={{ color: brand.accent }}>
                    Vision
                  </p>
                  <p className="mt-2 font-display text-xl leading-snug">{dossier.vision}</p>
                </div>
                <div>
                  <p className="eyebrow" style={{ color: brand.accent }}>
                    Mission
                  </p>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{dossier.mission}</p>
                </div>
                <ul className="space-y-2">
                  {dossier.commitments.map((c) => (
                    <li key={c} className="flex gap-3 text-sm leading-relaxed">
                      <span style={{ color: brand.accent }}>/</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="walk" className="scroll-mt-40 border-y border-border bg-ink text-cream">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center lg:px-10">
          <Reveal>
            <p className="eyebrow" style={{ color: brand.accent }}>
              The walk inside {p.name}
            </p>
            <h2 className="mt-4 text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.08]">
              How someone moves through it.
            </h2>
            <ol className="mt-8 space-y-6">
              {dossier.walk.map((s) => (
                <li key={s.step} className="flex gap-5 border-b border-cream/12 pb-6">
                  <span className="font-display text-xl" style={{ color: brand.accent }}>
                    {s.step}
                  </span>
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
              src={getProgrammeImage(p.slug)}
              alt={
                p.slug === "taca"
                  ? "TACA learners exploring education and career opportunities"
                  : `${p.name} in session — people working together at a table`
              }
              width={1200}
              height={1200}
              loading="lazy"
              className="h-full max-h-[32rem] w-full rounded-sm object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section id="impact" className="mx-auto max-w-7xl scroll-mt-40 px-6 py-20 lg:px-10 lg:py-24">
        <Reveal className="max-w-2xl">
          <p className="eyebrow" style={{ color: brand.accent }}>
            Where {p.name} stands
          </p>
          <h2 className="mt-4 text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.08]">
            Numbers we can stand behind.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {dossier.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 70} className="bg-background">
              <div className="p-8">
                <p
                  className="font-display text-[clamp(2.2rem,4vw,3.2rem)] leading-none"
                  style={{ color: brand.accent }}
                >
                  {s.value}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PARTNERS */}
      <section
        id="allies"
        className="scroll-mt-40 border-y"
        style={{ borderColor: `${brand.accent}26`, backgroundColor: brand.tint }}
      >
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
          <Reveal className="max-w-2xl">
            <p className="eyebrow" style={{ color: brand.accent }}>
              Partners of {p.name}
            </p>
            <h2 className="mt-4 text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.08]">
              Nobody does this alone.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dossier.allies.map((a, i) => {
              const external = a.url.startsWith("http");
              return (
                <Reveal key={a.short} delay={i * 70}>
                  <a
                    href={a.url}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer noopener" : undefined}
                    className="lift flex h-full flex-col items-center justify-center gap-2 rounded-sm border bg-background px-5 py-10 text-center"
                    style={{ borderColor: `${brand.accent}33` }}
                  >
                    <span
                      className="font-display text-3xl leading-none"
                      style={{ color: brand.accent }}
                    >
                      {a.short}
                    </span>
                    <span className="text-xs leading-snug text-muted-foreground">{a.name}</span>
                    <span className="eyebrow mt-1 text-[0.55rem]" style={{ color: brand.accent }}>
                      {a.note}
                    </span>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {p.family === "Initiative" && galleryRevealed ? (
        <section
          id="gallery"
          className="mx-auto max-w-7xl scroll-mt-40 px-6 py-20 lg:px-10 lg:py-24"
        >
          <Reveal className="flex max-w-2xl flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow" style={{ color: brand.accent }}>
                Gallery
              </p>
              <h2 className="mt-4 text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.08]">
                {p.name}, in the room.
              </h2>
            </div>
            <Link to="/gallery" className="slash text-sm" style={{ color: brand.accent }}>
              See the full gallery
            </Link>
          </Reveal>

          <>
              {allProgrammeGalleryEvents.length > 0 ? (
                <Reveal delay={40} className="mt-8 flex flex-wrap items-center gap-3">
                  <span className="eyebrow" style={{ color: brand.accent }}>
                    Year
                  </span>
                  <Select value={galleryYear} onValueChange={setGalleryYear}>
                    <SelectTrigger className="w-32" style={{ borderColor: `${brand.accent}40` }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      {galleryYears.map((y) => (
                        <SelectItem key={y} value={String(y)}>
                          {y}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span className="eyebrow" style={{ color: brand.accent }}>
                    Month
                  </span>
                  <Select value={galleryMonth} onValueChange={setGalleryMonth}>
                    <SelectTrigger className="w-40" style={{ borderColor: `${brand.accent}40` }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      {galleryMonths.map((m) => (
                        <SelectItem key={m} value={String(m)}>
                          {MONTH_NAMES[m - 1]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Reveal>
              ) : null}

              {programmeGalleryEvents.length > 0 ? (
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {programmeGalleryEvents.map((e, i) => (
                    <Reveal key={e.id} delay={i * 90}>
                      <Link
                        to="/gallery/$eventId"
                        params={{ eventId: e.id }}
                        className="lift group block overflow-hidden rounded-sm border border-border bg-card"
                      >
                        <div className="overflow-hidden">
                          <img
                            src={galleryPhoto(e.photos[0]!.src)}
                            alt={e.title}
                            width={1200}
                            height={900}
                            loading="lazy"
                            className="h-56 w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                          />
                        </div>
                        <div className="p-5">
                          <div className="flex items-baseline justify-between gap-3">
                            <span className="eyebrow" style={{ color: brand.accent }}>
                              {e.theme}
                            </span>
                            <span className="text-xs text-muted-foreground">{e.date}</span>
                          </div>
                          <h3 className="mt-2 font-display text-lg leading-tight">{e.title}</h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {e.photos.length} photo{e.photos.length === 1 ? "" : "s"}
                          </p>
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              ) : (
                <Reveal delay={60} className="mt-10">
                  <div
                    className="rounded-sm border px-8 py-14 text-center"
                    style={{ borderColor: `${brand.accent}33`, backgroundColor: brand.tint }}
                  >
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {allProgrammeGalleryEvents.length === 0
                        ? `Photos from ${p.name} are coming soon — check back after the next session.`
                        : "No events listed for that combination yet."}
                    </p>
                  </div>
                </Reveal>
              )}
          </>
        </section>
      ) : null}

      <section id="join" className="mx-auto max-w-7xl scroll-mt-40 px-6 py-24 lg:px-10">
        <Reveal
          className="rounded-sm border px-8 py-14 text-center md:px-16"
          style={{ borderColor: `${brand.accent}33`, backgroundColor: brand.tint }}
        >
          <p className="eyebrow" style={{ color: brand.accent }}>
            {SITE.meaning}
          </p>
          <h2 className="mx-auto mt-5 max-w-2xl text-[clamp(1.8rem,3.8vw,2.8rem)] leading-[1.06]">
            Want to join {p.name}, or bring it to your school?
          </h2>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setJoinOpen(true)}
              className="rounded-sm px-7 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: brand.accent, color: brand.onAccent }}
            >
              {brand.cta.label}
            </button>
            <button
              type="button"
              onClick={() => setCollabOpen(true)}
              className="rounded-sm border px-7 py-3.5 text-sm font-semibold transition-colors hover:opacity-80"
              style={{ borderColor: brand.accent, color: brand.accent }}
            >
              Collaborate with us
            </button>
          </div>
        </Reveal>

        <div className="mt-16">
          <p className="eyebrow text-clay">Continue</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={i * 70}>
                <Link
                  to="/programmes/$slug"
                  params={{ slug: o.slug }}
                  className="lift flex h-full flex-col rounded-sm border border-border bg-card p-6 transition-colors duration-300 hover:border-gold hover:bg-gold-soft focus-visible:border-gold focus-visible:bg-gold-soft focus-visible:outline-none"
                >
                  <span className="eyebrow text-gold">{o.family}</span>
                  <h3 className="mt-3 font-display text-2xl leading-tight">{o.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{o.kicker}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Sheet open={joinOpen} onOpenChange={setJoinOpen}>
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
          <InitiativeJoinForm brand={brand} programmeName={p.name} />
        </SheetContent>
      </Sheet>

      <Sheet open={collabOpen} onOpenChange={setCollabOpen}>
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
          <InitiativeCollaborateForm brand={brand} programmeName={p.name} />
        </SheetContent>
      </Sheet>

      <Dialog open={openSchoolId !== null} onOpenChange={(open) => !open && setOpenSchoolId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{openSchool?.name}</DialogTitle>
            <DialogDescription>Photos from this school's events and programmes.</DialogDescription>
          </DialogHeader>
          {openSchool && openSchool.photos.length > 0 ? (
            <>
              {schoolGalleryYears.length > 1 ? (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="eyebrow text-clay">Year</span>
                  <button
                    type="button"
                    onClick={() => setSchoolGalleryYear("All")}
                    className={`rounded-sm border px-3 py-1 text-xs transition-colors ${
                      schoolGalleryYear === "All"
                        ? "border-ink bg-ink text-cream"
                        : "border-border text-muted-foreground hover:border-gold hover:text-clay"
                    }`}
                  >
                    All
                  </button>
                  {schoolGalleryYears.map((y) => (
                    <button
                      key={y}
                      type="button"
                      onClick={() => setSchoolGalleryYear(String(y))}
                      className={`rounded-sm border px-3 py-1 text-xs transition-colors ${
                        schoolGalleryYear === String(y)
                          ? "border-ink bg-ink text-cream"
                          : "border-border text-muted-foreground hover:border-gold hover:text-clay"
                      }`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              ) : null}
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {schoolGalleryPhotos.map((photo) => (
                  <figure
                    key={photo.src}
                    className="overflow-hidden rounded-sm border border-border"
                  >
                    <img
                      src={galleryPhoto(photo.src)}
                      alt={photo.caption}
                      width={800}
                      height={600}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <figcaption className="p-3 text-xs text-muted-foreground">
                      {photo.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
              {schoolGalleryPhotos.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  No photos from {schoolGalleryYear} yet.
                </p>
              ) : null}
            </>
          ) : (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Photos coming soon — check back after the next event at this school.
            </p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
