import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Plays `videoSrc` when given (a real, functional video with controls).
 * Without one, shows an honest "reserved" placeholder — never a fake player.
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
  const [videoFrameReady, setVideoFrameReady] = useState(false);

  if (videoSrc) {
    return (
      <figure className={cn("w-full", className)}>
        <div
          style={{ aspectRatio: ratio }}
          className="group relative w-full overflow-hidden rounded-sm border border-border bg-ink"
        >
          <video
            src={videoSrc}
            poster={poster}
            controls
            autoPlay
            muted
            playsInline
            preload="metadata"
            onTimeUpdate={(event) => {
              if (event.currentTarget.currentTime >= 0.8 && event.currentTarget.videoWidth > 0) {
                setVideoFrameReady(true);
              }
            }}
            onError={() => setVideoFrameReady(false)}
            className="absolute inset-0 h-full w-full object-cover"
          >
            Your browser does not support the video tag.
          </video>
          {poster && !videoFrameReady ? (
            <img
              src={poster}
              alt=""
              className="pointer-events-none absolute inset-0 z-10 h-full w-full object-cover"
            />
          ) : null}
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
