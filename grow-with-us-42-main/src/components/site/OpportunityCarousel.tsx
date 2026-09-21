import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { HelpApplyingForm } from "@/components/site/HelpApplyingForm";
import { OpportunityWindow } from "@/components/site/OpportunityWindow";
import { OPPORTUNITIES } from "@/lib/site-content";
import mentorship from "@/assets/mentorship.jpg";
import steam from "@/assets/steam.jpg";
import community from "@/assets/community.jpg";
import heroPortrait from "@/assets/hero-portrait.jpg";
import heroStudent from "@/assets/hero-student.jpg";

type Opportunity = (typeof OPPORTUNITIES)[number];

const SLIDE_IMAGES: Record<string, string> = {
  nsfas: mentorship,
  "dut-apply": heroStudent,
  cacs: heroPortrait,
  sayouth: community,
  funza: mentorship,
  ecomp: steam,
};

const AUTOPLAY_MS = 6000;

export function OpportunityCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [active, setActive] = useState<Opportunity | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api || paused) return;
    const id = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [api, paused]);

  return (
    <>
      <div
        className="relative mt-14"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <Carousel opts={{ align: "start", loop: true }} setApi={setApi}>
          <CarouselContent className="-ml-0">
            {OPPORTUNITIES.map((o) => (
              <CarouselItem key={o.id} className="basis-full pl-0">
                <div className="relative h-[28rem] overflow-hidden rounded-sm sm:h-[26rem] md:h-[32rem]">
                  <img
                    src={SLIDE_IMAGES[o.id]}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
                  <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-14">
                    <div className="flex items-start justify-between gap-4">
                      <span className="eyebrow text-gold">{o.category}</span>
                      <OpportunityWindow opens={o.opens} closes={o.closes} tone="dark" align="end" />
                    </div>
                    <h3 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-cream md:text-4xl">
                      {o.title}
                    </h3>
                    <p className="mt-2 text-sm text-cream/75">{o.org}</p>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream/80 md:text-base">
                      {o.body}
                    </p>
                    <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                      <a
                        href={o.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-sm font-semibold text-cream underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-gold"
                      >
                        Apply directly
                      </a>
                      <button
                        type="button"
                        onClick={() => setActive(o)}
                        className="rounded-sm bg-gold px-5 py-2.5 text-xs font-semibold text-ink transition-colors hover:bg-cream"
                      >
                        Get help applying
                      </button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <button
          type="button"
          aria-label="Previous opportunity"
          onClick={() => api?.scrollPrev()}
          className="absolute left-3 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-ink shadow-lg transition-colors hover:bg-cream md:left-5"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Next opportunity"
          onClick={() => api?.scrollNext()}
          className="absolute right-3 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-ink shadow-lg transition-colors hover:bg-cream md:right-5"
        >
          <ChevronRight className="size-5" />
        </button>

        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {OPPORTUNITIES.map((o, i) => (
            <button
              key={o.id}
              type="button"
              aria-label={`Go to ${o.title}`}
              onClick={() => api?.scrollTo(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === selected ? "w-6 bg-gold" : "w-1.5 bg-cream/50 hover:bg-cream/80"
              }`}
            />
          ))}
        </div>
      </div>

      <Sheet open={!!active} onOpenChange={(next) => !next && setActive(null)}>
        <SheetContent side="right" className="flex w-full flex-col overflow-y-auto sm:max-w-lg">
          {active && (
            <>
              <SheetHeader>
                <p className="eyebrow text-gold">Help applying</p>
                <SheetTitle className="font-display text-2xl leading-tight">
                  {active.title}
                </SheetTitle>
                <SheetDescription>
                  A form for exactly this kind of opportunity — {active.category.toLowerCase()}.
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6">
                <HelpApplyingForm opportunity={active} />
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
