import singaweb from "@/assets/logos/logo-singaweb.jpg";
import sisterhood from "@/assets/logos/logo-sos.jpg";
import taca from "@/assets/logos/logo-taca.jpg";
import comhack from "@/assets/logos/logo-comhack.jpg";
import mentored from "@/assets/logos/logo-mentored.jpg";

const INITIATIVE_LOGOS: Record<string, string> = {
  singaweb,
  sisterhood,
  taca,
  comhack,
  mentored,
};

/** A logo uploaded on the management site (`override`) wins over the bundled one. */
export function getInitiativeLogo(slug: string, override?: string | null): string | undefined {
  if (override && (/^https?:\/\//i.test(override) || override.startsWith("/"))) return override;
  return INITIATIVE_LOGOS[slug];
}
