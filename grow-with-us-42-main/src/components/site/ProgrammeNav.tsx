import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { ProgrammeBrand } from "@/lib/programme-brands";
import { getInitiativeLogo } from "@/lib/initiative-logos";

type Props = {
  brand: ProgrammeBrand;
  name: string;
  family: string;
  slug: string;
  onSectionClick?: (id: string) => void;
};

export function ProgrammeNav({ brand, name, family, slug, onSectionClick }: Props) {
  const logo = getInitiativeLogo(slug);
  const [active, setActive] = useState(brand.sections[0]?.id ?? "");

  useEffect(() => {
    const els = brand.sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.2, 0.6] },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [brand.sections]);

  return (
    <div
      className="sticky top-[3.5rem] z-40 border-y backdrop-blur-md sm:top-[4.25rem]"
      style={{
        borderColor: `${brand.accent}33`,
        backgroundColor: `${brand.tint}f2`,
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-3 lg:px-10">
        <Link
          to="/programmes"
          className="flex shrink-0 items-center gap-2.5 text-sm font-semibold"
          style={{ color: brand.accent }}
        >
          {logo ? (
            <img
              src={logo}
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 shrink-0 rounded-sm bg-white object-contain p-0.5"
            />
          ) : (
            <span
              className="grid h-7 w-7 place-items-center rounded-sm text-[0.7rem] font-bold"
              style={{ backgroundColor: brand.accent, color: brand.onAccent }}
            >
              {brand.short.slice(0, 2).toUpperCase()}
            </span>
          )}
          <span className="hidden sm:inline">{brand.short}</span>
        </Link>

        <span
          className="hidden h-4 w-px shrink-0 lg:block"
          style={{ backgroundColor: `${brand.accent}40` }}
        />

        <p
          className="hidden shrink-0 text-xs italic lg:block"
          style={{ color: `${brand.accent}cc` }}
        >
          {brand.tagline}
        </p>

        <div className="ml-auto flex min-w-0 items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {brand.sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => onSectionClick?.(s.id)}
              className="shrink-0 rounded-sm px-3 py-1.5 text-xs font-semibold transition-colors"
              style={
                active === s.id
                  ? { backgroundColor: brand.accent, color: brand.onAccent }
                  : { color: `${brand.accent}b3` }
              }
            >
              {s.label}
            </a>
          ))}
          <Link
            to="/get-involved"
            hash={brand.cta.hash}
            className="ml-1 hidden shrink-0 rounded-sm border px-3 py-1.5 text-xs font-semibold transition-colors md:inline-block"
            style={{ borderColor: `${brand.accent}59`, color: brand.accent }}
          >
            {brand.cta.label}
          </Link>
        </div>
      </nav>
      <span className="sr-only">{`${family}: ${name}`}</span>
    </div>
  );
}
