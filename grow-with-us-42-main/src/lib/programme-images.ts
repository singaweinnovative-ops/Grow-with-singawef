import steam from "@/assets/steam.jpg";
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

export function getProgrammeImage(slug: string): string {
  return PROGRAMME_IMAGES[slug] ?? steam;
}
