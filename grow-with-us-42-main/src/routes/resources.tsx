import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Download, Eye } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { RESOURCES, type Resource } from "@/lib/site-content";
import mentorship from "@/assets/mentorship.jpg";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — Guides, Handbooks & Policies | SINGAWE Foundation" },
      {
        name: "description",
        content:
          "Download or view SINGAWE Foundation guides, handbooks and policy documents — the opportunity application guide, Guide and Journeyer handbooks, and our safeguarding policy.",
      },
      { property: "og:title", content: "SINGAWE Foundation Resources" },
      {
        property: "og:description",
        content: "Every guide and policy document in one library — download it, or read it right here.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Resources,
});

const chip = "rounded-sm border px-3 py-1.5 text-xs transition-colors";

function Resources() {
  const categories = ["All", ...Array.from(new Set(RESOURCES.map((r) => r.category)))];
  const [active, setActive] = useState("All");
  const [viewing, setViewing] = useState<Resource | null>(null);
  const shown = active === "All" ? RESOURCES : RESOURCES.filter((r) => r.category === active);

  return (
    <>
      <PageHero image={mentorship} alt="A Guide and a Journeyer working through documents together">
        <Reveal>
          <p className="eyebrow text-gold">Resources</p>
          <h1 className="mt-4 max-w-3xl text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.02]">
            The document library.
          </h1>
          <div className="mt-6 h-px w-28 rule-draw bg-gold" />
          <p className="mt-6 max-w-xl leading-relaxed text-cream/80">
            Every guide and policy in one place — as a PDF you can download, or read right here
            without leaving the page.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-8 flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={`${chip} ${
                active === c
                  ? "border-gold bg-gold text-ink"
                  : "border-cream/25 text-cream/85 hover:border-gold hover:text-gold"
              }`}
            >
              {c}
            </button>
          ))}
        </Reveal>
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((r, i) => (
            <Reveal key={r.id} delay={(i % 3) * 90}>
              <div className="lift flex h-full flex-col rounded-sm border border-border bg-card p-7">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-sm bg-gold-soft/60 text-clay">
                    <FileText className="size-5" />
                  </span>
                  <span className="eyebrow text-gold">{r.category} · PDF</span>
                </div>
                <h2 className="mt-5 font-display text-xl leading-tight">{r.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {r.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setViewing(r)}
                    className="inline-flex items-center gap-1.5 rounded-sm border border-border px-4 py-2 text-xs font-semibold transition-colors hover:border-gold hover:text-clay"
                  >
                    <Eye className="size-3.5" />
                    View
                  </button>
                  <a
                    href={r.file}
                    download
                    className="inline-flex items-center gap-1.5 rounded-sm bg-ink px-4 py-2 text-xs font-semibold text-cream transition-colors hover:bg-clay"
                  >
                    <Download className="size-3.5" />
                    Download
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        {shown.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            No resources listed for that category yet.
          </p>
        ) : null}
      </section>

      <Dialog open={!!viewing} onOpenChange={(open) => !open && setViewing(null)}>
        <DialogContent className="flex h-[85vh] w-[92vw] max-w-4xl flex-col p-4 sm:p-6">
          {viewing && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-xl">{viewing.title}</DialogTitle>
                <DialogDescription>{viewing.description}</DialogDescription>
              </DialogHeader>
              <iframe
                src={viewing.file}
                title={viewing.title}
                className="mt-2 w-full flex-1 rounded-sm border border-border"
              >
                Your browser cannot preview this PDF —{" "}
                <a href={viewing.file} download>
                  download it instead
                </a>
                .
              </iframe>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
