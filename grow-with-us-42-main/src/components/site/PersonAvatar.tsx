import { personPhoto } from "@/lib/people-photos";
import { cn } from "@/lib/utils";

/**
 * Renders a real photo when one exists. Without one, shows the person's
 * initials on a plain tint — never a generated stand-in photo.
 */
export function PersonAvatar({
  photo,
  initials,
  name,
  className,
}: {
  photo?: string | undefined;
  initials: string;
  name: string;
  className?: string | undefined;
}) {
  if (photo) {
    return (
      <img
        src={personPhoto(photo)}
        alt={name}
        loading="lazy"
        className={cn("w-full object-cover", className)}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={name}
      className={cn("flex w-full items-center justify-center bg-sand text-clay", className)}
    >
      <span className="font-display text-3xl tracking-wide">{initials}</span>
    </div>
  );
}
