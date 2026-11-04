import founder1 from "@/assets/founder-1.jpg";
import amahleDunge from "@/assets/people-profiles/amahle-dunge.webp";
import amandaKunene from "@/assets/people-profiles/amanda-kunene.webp";
import azaniaZwane from "@/assets/people-profiles/azania-zwane.webp";
import buhlebendaloMazibuko from "@/assets/people-profiles/buhlebendalo-mazibuko.webp";
import charleneMakwara from "@/assets/people-profiles/charlene-makwara.webp";
import mandisaBiyela from "@/assets/people-profiles/mandisa-biyela.webp";
import masixoleMabhoza from "@/assets/people-profiles/masixole-mabhoza.webp";
import nokwandaNgubane from "@/assets/people-profiles/nokwanda-ngubane.webp";
import ntokozoMazibuko from "@/assets/people-profiles/ntokozo-mazibuko.webp";
import nwabiswaMaqakamba from "@/assets/people-profiles/nwabiswa-maqakamba.webp";
import olwethuMswane from "@/assets/people-profiles/olwethu-mswane.webp";
import phumeleleKubheka from "@/assets/people-profiles/phumelele-kubheka.webp";
import vhulendaNefolovhodwe from "@/assets/people-profiles/vhulenda-nefolovhodwe.webp";

export const PERSON_PHOTOS: Record<string, string> = {
  founder1,
  "amahle-dunge": amahleDunge,
  "amanda-kunene": amandaKunene,
  "azania-zwane": azaniaZwane,
  "buhlebendalo-mazibuko": buhlebendaloMazibuko,
  "charlene-makwara": charleneMakwara,
  "mandisa-biyela": mandisaBiyela,
  "masixole-mabhoza": masixoleMabhoza,
  "nokwanda-ngubane": nokwandaNgubane,
  "ntokozo-mazibuko": ntokozoMazibuko,
  "nwabiswa-maqakamba": nwabiswaMaqakamba,
  "olwethu-mswane": olwethuMswane,
  "phumelele-kubheka": phumeleleKubheka,
  "vhulenda-nefolovhodwe": vhulendaNefolovhodwe,
};

export function personPhoto(key: string) {
  return PERSON_PHOTOS[key] ?? key;
}
