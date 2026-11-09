import steam from "@/assets/steam.jpg";
import { galleryPhoto } from "@/lib/gallery-photos";
import mentoredHero from "@/assets/mentored-3.jpg";
import tacaHero from "@/assets/Innitiatives/TACA/IMG-20261006-WA0111.jpg";
import comhackHero from "@/assets/comhack-3.jpg";

// No real photo exists yet for these two — generated illustrations stand in.
import singaweb from "@/assets/illustrations/singaweb.svg";
import sisterhood from "@/assets/illustrations/sisterhood.svg";

const PROGRAMME_IMAGES: Record<string, string> = {
  singaweb,
  sisterhood,
  taca: tacaHero,
  comhack: comhackHero,
  mentored: mentoredHero,
};

/**
 * The hero image for a programme page. An `image` set on the management
 * site (a URL or bundled photo key) wins over the built-in per-slug photo.
 */
export function getProgrammeImage(slug: string, image?: string | null): string {
  if (image) return galleryPhoto(image);
  return PROGRAMME_IMAGES[slug] ?? steam;
}
