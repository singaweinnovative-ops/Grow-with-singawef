import p1 from "@/assets/person-1.jpg";
import p2 from "@/assets/person-2.jpg";
import p3 from "@/assets/person-3.jpg";
import p4 from "@/assets/person-4.jpg";
import p5 from "@/assets/person-5.jpg";
import p6 from "@/assets/person-6.jpg";

export const PERSON_PHOTOS: Record<string, string> = { p1, p2, p3, p4, p5, p6 };

export function personPhoto(key: string) {
  return PERSON_PHOTOS[key] ?? p1;
}
