import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** Visitors who asked their device for less motion or less data use. */
function prefersNoAutoplay(): boolean {
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    ?.saveData;
  return Boolean(reducedMotion || saveData);
}

/**
 * Plays `videoSrc` when given (a real, functional video with controls).
 * Without one, shows an honest "reserved" placeholder — never a fake player.
 *
 * The video autoplays muted once it scrolls into view and pauses when it
 * leaves, so it only downloads for visitors who actually reach it. Anyone
 * who turns the sound on or presses pause stays in control. Reduced-motion
 * and data-saver visitors get the play button instead of autoplay.
 */
export function VideoFrame({
  label = "Video coming soon",
  caption,
  className,
  ratio = "16 / 9",
  videoSrc,
  poster,
}: {
  label?: string;
  caption?: string;
  className?: string;
  ratio?: string;
  videoSrc?: string;
  poster?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pausedByVisitor = useRef(false);
  const autoPausing = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersNoAutoplay() || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          if (!pausedByVisitor.current && video.paused) {
            video.muted = true;
            // Browsers may still refuse; the controls remain available.
            void video.play().catch(() => {});
          }
        } else if (!video.paused) {
          autoPausing.current = true;
          video.pause();
        }
      },
      { threshold: [0, 0.5] },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [videoSrc]);

  if (videoSrc) {
    return (
      <figure className={cn("w-full", className)}>
        <div
          style={{ aspectRatio: ratio }}
          className="group relative w-full overflow-hidden rounded-sm border border-border bg-ink"
        >
          <video
            ref={videoRef}
            src={videoSrc}
            poster={poster}
            controls
            muted
            playsInline
            preload="none"
            onPause={(e) => {
              // Pauses from scrolling away are automatic; any other pause is the visitor's choice.
              if (autoPausing.current) autoPausing.current = false;
              else if (!e.currentTarget.ended) pausedByVisitor.current = true;
            }}
            onPlay={() => {
              pausedByVisitor.current = false;
            }}
            className="absolute inset-0 h-full w-full object-cover"
          >
            Your browser does not support the video tag.
          </video>
        </div>
        {caption ? (
          <figcaption className="mt-3 text-sm text-muted-foreground">{caption}</figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <figure className={cn("w-full", className)}>
      <div
        style={{ aspectRatio: ratio }}
        className="group relative w-full overflow-hidden rounded-sm border border-border bg-sand"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,var(--gold-soft),transparent_70%)] opacity-70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <span className="flex size-16 items-center justify-center rounded-full border border-ink/25 transition-transform duration-500 group-hover:scale-110">
            <span className="ml-1 block size-0 border-y-[9px] border-l-[15px] border-y-transparent border-l-ink/70" />
          </span>
          <span className="eyebrow text-muted-foreground">{label}</span>
        </div>
        <div className="absolute bottom-4 left-4 h-px w-24 origin-left bg-gold" />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-sm text-muted-foreground">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
