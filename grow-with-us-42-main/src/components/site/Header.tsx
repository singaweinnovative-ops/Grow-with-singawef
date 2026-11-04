import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import logoLight from "@/assets/logo-light-trim.png";
import { cn } from "@/lib/utils";
import { SiteSearch } from "@/components/site/SiteSearch";

type Item = { to: string; label: string };
type Group = { label: string; items: Item[] };

const GROUPS: Group[] = [
  {
    label: "Foundation",
    items: [
      { to: "/about", label: "About" },
      { to: "/our-work", label: "Our Work" },
      { to: "/who-we-serve", label: "Who We Serve" },
      { to: "/people", label: "Our People" },
      { to: "/gallery", label: "Gallery" },
      { to: "/resources", label: "Resources" },
    ],
  },
  {
    label: "Work",
    items: [
      { to: "/programmes", label: "Programmes" },
      { to: "/collaborate", label: "Collaborate" },
      { to: "/opportunities", label: "Opportunities" },
    ],
  },
  {
    label: "News",
    items: [
      { to: "/news", label: "News & Media" },
      { to: "/contact", label: "Contact" },
    ],
  },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3 lg:px-10">
        <Link to="/" className="shrink-0" onClick={() => setOpen(false)}>
          <img
            src={logoLight}
            alt="SINGAWE Foundation"
            width={220}
            height={44}
            className="h-9 w-auto object-contain object-left sm:h-11"
          />
          <span className="sr-only">SINGAWE Foundation — Your Journey. Our Commitment.</span>
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 lg:flex">
          {GROUPS.map((g) => (
            <div key={g.label} className="group relative">
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-sm px-3 py-2 text-[0.78rem] font-medium text-foreground/75 transition-colors group-hover:text-foreground"
              >
                {g.label}
                <span className="text-[0.6rem] text-gold">▾</span>
              </button>
              <div className="invisible absolute left-0 top-full w-52 translate-y-1 rounded-sm border border-border bg-background p-1.5 opacity-0 shadow-[0_20px_50px_-30px_oklch(0.19_0.014_60/0.6)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                {g.items.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="block rounded-sm px-3 py-2 text-[0.8rem] text-foreground/75 transition-colors hover:bg-sand hover:text-clay"
                    activeProps={{ className: "text-clay" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <SiteSearch />
          <Link
            to="/get-involved"
            hash="journeyer"
            className="group hidden items-center gap-1.5 rounded-sm bg-ink px-4 py-2 text-[0.78rem] font-semibold text-cream transition-colors hover:bg-clay lg:inline-flex"
          >
            Join Us Now
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex size-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={cn(
              "h-px w-6 bg-foreground transition-transform duration-300",
              open && "translate-y-[3.5px] rotate-45",
            )}
          />
          <span
            className={cn(
              "h-px w-6 bg-foreground transition-transform duration-300",
              open && "-translate-y-[3.5px] -rotate-45",
            )}
          />
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background transition-[max-height] duration-500 lg:hidden",
          open ? "max-h-[46rem]" : "max-h-0 border-transparent",
        )}
      >
        <nav className="flex flex-col px-6 py-4">
          {GROUPS.map((g) => (
            <div key={g.label} className="py-2">
              <p className="eyebrow text-gold">{g.label}</p>
              <div className="mt-2 flex flex-col">
                {g.items.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="slash border-b border-border/60 py-2.5 text-sm"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <Link
            to="/get-involved"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-sm bg-ink px-5 py-3 text-center text-sm font-semibold text-cream"
          >
            Join Us Now
            <ArrowRight className="size-3.5" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
