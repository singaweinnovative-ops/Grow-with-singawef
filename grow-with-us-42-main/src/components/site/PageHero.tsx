import type { ReactNode } from "react";

export function PageHero({
  image,
  alt,
  children,
}: {
  image: string;
  alt: string;
  children: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <img src={image} alt={alt} className="absolute inset-0 h-full w-full object-cover" loading="eager" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/45" />
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 text-cream lg:px-10 lg:pt-28 lg:pb-20">
        {children}
      </div>
    </section>
  );
}
