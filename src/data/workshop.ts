import type { CardData } from "../types/CardData";

import dramaLogo from "@/assets/otto-category-01.jpg";
import comlekLogo from "@/assets/otto-category-03.jpg";
import kuklaLogo from "@/assets/otto-category-02.jpg";
import yazOkuluLogo from "@/assets/otto-category-05.jpg";
import ciftciLogo from "@/assets/otto-category-04.jpg";

export const workshops: CardData[] = [
  {
    id: 1,
    title: "Online Drama Eğitimi",
    description:
      "Nunc gravida turpis ullamcorper efficitur, molestie dignissim tortor dignissim arcu.",
    image: dramaLogo,
    variant: "default",
  },
  {
    id: 2,
    title: "Çömlek Atölyesi",
    description:
      "Rhoncus sapien lorem, diam nullam elit porta, consequat nulla aliquam.",
    image: comlekLogo,
    variant: "default",
  },
  {
    id: 3,
    title: "Çiftçi Çocuk Atölyesi",
    description:
      "Nunc, maecenas arcu at, vel phasellus nam integer venenatis cursus.  ",
    image: ciftciLogo,
    variant: "default",
  },
  {
    id: 4,
    title: "Kukla Atölyesi",
    description:
      "Vestibulum pharetra, tortor, cras consectetur parturient tempor nullam condimentum eu.",
    image: kuklaLogo,
    variant: "default",
  },
  {
    id: 5,
    title: "Yaz Okulu",
    description:
      "Est neque, nunc, eros turpis porta condimentum tortor sed nulla.",
    image: yazOkuluLogo,
    variant: "default",
  },
];
