import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

export type FilmSlide = { src: string; caption: string };

const SLIDE_MS = 4200;

/**
 * A video-player-styled reel built straight from whatever slides are passed
 * in — add a photo to an event's `photos` array and it appears here on the
 * next render, no separate video file required. Play/pause and a scrubbing
 * progress bar give it the feel of watching a film rather than a slideshow.
 */
export function GalleryFilm({
  slides,
  label = "Highlights film",
  videoSrc,
}: {
  slides: FilmSlide[];
  label?: string;
  videoSrc?: string;
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>();
  const startRef = useRef<number>(0);

  useEffect(() => {
    if (videoSrc || !playing || slides.length <= 1) return;

    startRef.current = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const pct = Math.min(1, elapsed / SLIDE_MS);
      setProgress(pct);
      if (pct >= 1) {
        setIndex((i) => (i + 1) % slides.length);
        startRef.current = now;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playing, slides.length, index]);

  const goTo = (i: number) => {
    setIndex(i);
    setProgress(0);
    startRef.current = performance.now();
  };

  if (videoSrc) {
    return (
      <div className="overflow-hidden rounded-sm bg-ink">
        <video
          src={videoSrc}
          poster={slides[0]?.src}
          controls
          playsInline
          className="aspect-video w-full bg-ink object-cover"
        >
          Your browser does not support the video tag.
        </video>
        <p className="px-1 py-3 text-xs text-muted-foreground">
          <span className="eyebrow text-clay">{label}</span> — a real clip from this event.
        </p>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-sm border border-border bg-sand text-sm text-muted-foreground">
        No photos yet for this film.
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-sm bg-ink">
      {slides.map((s, i) => (
        <img
          key={`${s.src}-${i}`}
          src={s.src}
          alt={s.caption}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />

      <button
        type="button"
        aria-label={playing ? "Pause film" : "Play film"}
        onClick={() => setPlaying((p) => !p)}
        className="absolute inset-0 flex items-center justify-center"
      >
        <span
          className={`flex size-16 items-center justify-center rounded-full bg-cream/90 text-ink shadow-lg transition-opacity duration-300 ${
            playing ? "opacity-0 hover:opacity-100" : "opacity-100"
          }`}
        >
          {playing ? <Pause className="size-6" /> : <Play className="ml-0.5 size-6" />}
        </span>
      </button>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="mb-3 flex h-1 gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Play slide ${i + 1}`}
              onClick={() => goTo(i)}
              className="relative h-1 flex-1 overflow-hidden rounded-full bg-cream/30"
            >
              <span
                className="absolute inset-y-0 left-0 rounded-full bg-gold"
                style={{
                  width: i < index ? "100%" : i === index ? `${progress * 100}%` : "0%",
                }}
              />
            </button>
          ))}
        </div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-gold">{label}</p>
            <p className="mt-1 text-sm text-cream">{slides[index].caption}</p>
          </div>
          <button
            type="button"
            aria-label={playing ? "Pause film" : "Play film"}
            onClick={() => setPlaying((p) => !p)}
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-cream/15 text-cream transition-colors hover:bg-cream/25"
          >
            {playing ? <Pause className="size-3.5" /> : <Play className="ml-0.5 size-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
