import steam from "@/assets/steam.jpg";
import mentorship from "@/assets/mentorship.jpg";
import taca3 from "@/assets/TACA/IMG-20260814-WA0008.jpg";
import hack3 from "@/assets/Indigenous Language Innovation Week Hackathon/IMG-20260529-WA0279.jpg";

// No real photo exists yet for these two — generated illustrations stand in.
import singaweb from "@/assets/illustrations/singaweb.svg";
import sisterhood from "@/assets/illustrations/sisterhood.svg";

const PROGRAMME_IMAGES: Record<string, string> = {
  singaweb,
  sisterhood,
  taca: taca3,
  comhack: hack3,
  mentored: mentorship,
};

export function getProgrammeImage(slug: string): string {
  return PROGRAMME_IMAGES[slug] ?? steam;
}
