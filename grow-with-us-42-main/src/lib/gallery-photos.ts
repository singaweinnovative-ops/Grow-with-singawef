import hero from "@/assets/hero-portrait.jpg";
import mentorship from "@/assets/mentorship.jpg";
import steam from "@/assets/steam.jpg";
import community from "@/assets/community.jpg";

// Eskom Expo for Young Scientists — Makers Lab coaching session
import eskom1 from "@/assets/IMG-20260516-WA0014.jpg";
import eskom2 from "@/assets/IMG-20260516-WA0016.jpg";
import eskom3 from "@/assets/IMG-20260516-WA0024.jpg";
import eskom4 from "@/assets/IMG-20260516-WA0025.jpg";
import eskom5 from "@/assets/IMG-20260516-WA0026.jpg";
import eskom6 from "@/assets/IMG-20260516-WA0029.jpg";
import eskom7 from "@/assets/IMG-20260516-WA0030.jpg";
import eskom8 from "@/assets/IMG-20260516-WA0032.jpg";

// Indigenous Language Innovation Week Hackathon — with Isabelo Sempumelelo Foundation, DUT
import hack1 from "@/assets/Indigenous Language Innovation Week Hackathon/IMG-20260529-WA0003.jpg";
import hack2 from "@/assets/Indigenous Language Innovation Week Hackathon/IMG-20260529-WA0038.jpg";
import hack3 from "@/assets/Indigenous Language Innovation Week Hackathon/IMG-20260529-WA0279.jpg";
import hack4 from "@/assets/Indigenous Language Innovation Week Hackathon/IMG-20260529-WA0341.jpg";
import hack5 from "@/assets/Indigenous Language Innovation Week Hackathon/IMG-20260529-WA0344.jpg";
import hack6 from "@/assets/Indigenous Language Innovation Week Hackathon/IMG-20260529-WA0365.jpg";
import hack7 from "@/assets/Indigenous Language Innovation Week Hackathon/IMG-20260529-WA0399.jpg";
import hack8 from "@/assets/Indigenous Language Innovation Week Hackathon/IMG-20260530-WA0459.jpg";

// TACA — classroom and outreach sessions
import taca1 from "@/assets/TACA/IMG-20260812-WA0018.jpg";
import taca2 from "@/assets/TACA/IMG-20260814-WA0007.jpg";
import taca3 from "@/assets/TACA/IMG-20260814-WA0008.jpg";
import taca4 from "@/assets/TACA/IMG-20260814-WA0009.jpg";
import taca5 from "@/assets/TACA/IMG-20260822-WA0024.jpg";
import taca6 from "@/assets/TACA/IMG-20260822-WA0042.jpg";
import tacaFilm from "@/assets/TACA/VID-20260816-WA0000.mp4";

// Learning Pathways — real photos for the age-banded homepage cards
import pathwayLittle from "@/assets/pathway-little.jpg";
import pathwayExplorers from "@/assets/pathway-explorers.jpg";

export const GALLERY_PHOTOS: Record<string, string> = {
  hero,
  mentorship,
  steam,
  community,
  eskom1,
  eskom2,
  eskom3,
  eskom4,
  eskom5,
  eskom6,
  eskom7,
  eskom8,
  hack1,
  hack2,
  hack3,
  hack4,
  hack5,
  hack6,
  hack7,
  hack8,
  taca1,
  taca2,
  taca3,
  taca4,
  taca5,
  taca6,
  pathwayLittle,
  pathwayExplorers,
};

export const TACA_FILM_VIDEO = tacaFilm;

export function galleryPhoto(key: string) {
  return GALLERY_PHOTOS[key] ?? hero;
}
