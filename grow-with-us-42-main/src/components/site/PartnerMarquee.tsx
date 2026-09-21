import { useEffect, useRef, useState } from "react";
import { PARTNERS } from "@/lib/site-content";
import { cn } from "@/lib/utils";

/**
 * Partner logos drift across the screen. Hover one and it freezes in place and
 * grows while the rest of the row keeps moving behind it. Click opens their site.
 */
export function PartnerMarquee({ tone = "light" }: { tone?: "light" | "dark" | "black" }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const frame = useRef<number | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    if (!hovered) return;
    const track = trackRef.current;
    const el = itemRefs.current[hovered];
    if (!track || !el) return;

    const startX = track.getBoundingClientRect().left;

    const tick = () => {
      const drift = track.getBoundingClientRect().left - startX;
      el.style.transform = `translateX(${-drift}px) scale(1.45)`;
      frame.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      el.style.transform = "";
    };
  }, [hovered]);

  const row = [...PARTNERS, ...PARTNERS];
  const dark = tone === "dark" || tone === "black";
  const black = tone === "black";

  return (
    <div
      className={cn(
        "group/marquee relative overflow-hidden py-8",
        dark ? "text-cream" : "text-foreground",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 z-20 w-24",
          black
            ? "bg-gradient-to-r from-black to-transparent"
            : dark
              ? "bg-gradient-to-r from-ink to-transparent"
              : "bg-gradient-to-r from-background to-transparent",
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 z-20 w-24",
          black
            ? "bg-gradient-to-l from-black to-transparent"
            : dark
              ? "bg-gradient-to-l from-ink to-transparent"
              : "bg-gradient-to-l from-background to-transparent",
        )}
      />

      <div ref={trackRef} className="marquee-track flex w-max items-center gap-4">
        {row.map((p, i) => {
          const key = `${p.short}-${i}`;
          const isExternal = p.url.startsWith("http");
          return (
            <a
              key={key}
              ref={(node) => {
                itemRefs.current[key] = node;
              }}
              href={p.url}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer noopener" : undefined}
              onMouseEnter={() => setHovered(key)}
              onMouseLeave={() => setHovered((h) => (h === key ? null : h))}
              onFocus={() => setHovered(key)}
              onBlur={() => setHovered((h) => (h === key ? null : h))}
              aria-label={`${p.name} — ${p.note}`}
              className={cn(
                "relative flex h-28 w-56 shrink-0 flex-col items-center justify-center gap-2 rounded-sm border transition-[box-shadow,background-color,border-color,z-index] duration-300",
                hovered === key ? "z-30 shadow-xl" : "z-10",
                dark
                  ? "border-cream/15 bg-cream/[0.04] hover:border-gold/60 hover:bg-cream/[0.08]"
                  : "border-border bg-card hover:border-gold",
              )}
              style={{ willChange: "transform" }}
            >
              <span className="font-display text-2xl leading-none tracking-tight">{p.short}</span>
              <span
                className={cn(
                  "px-4 text-center text-[0.65rem] leading-snug",
                  dark ? "text-cream/60" : "text-muted-foreground",
                )}
              >
                {p.name}
              </span>
              <span
                className={cn(
                  "eyebrow text-[0.55rem] transition-opacity duration-300",
                  hovered === key ? "opacity-100" : "opacity-0",
                )}
              >
                {p.note}
              </span>
              <span className="absolute bottom-3 left-1/2 h-px w-10 -translate-x-1/2 bg-gold" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
