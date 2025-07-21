import type { CardData } from "../types/CardData";

import dramaLogo from "@/assets/otto-category-drama.png";
import kuklaLogo from "@/assets/otto-category-kukla.png";
import comlekLogo from "@/assets/otto-category-comlek.png";
import ciftciLogo from "@/assets/otto-category-ciftci.png";
import yazOkuluLogo from "@/assets/otto-category-yaz-okulu.png";

export const workshops: CardData[] = [
  {
    id: 1,
    title: "Online Drama Eğitimi",
    description: "Hayal gücünü keşfet, rol yaparak ifade becerini geliştir.",
    image: dramaLogo,
  },
  {
    id: 2,
    title: "Çömlek Atölyesi",
    description: "Toprakla şekil ver, ellerinle hayalini yoğur.",
    image: comlekLogo,
  },
  {
    id: 3,
    title: "Çiftçi Çocuk Atölyesi",
    description: "Toprağa dokun, doğayla dost ol, üretmenin keyfini yaşa.",
    image: ciftciLogo,
  },
  {
    id: 4,
    title: "Kukla Atölyesi",
    description: "Kendi kuklanı yap, ona hayat ver ve sahneye taşı.",
    image: kuklaLogo,
  },
  {
    id: 5,
    title: "Yaz Okulu",
    description: "Dolu dolu bir yaz: keşif, doğa, oyun ve yeni arkadaşlar.",
    image: yazOkuluLogo,
  },
  {
    id: 6,
    title: "Mutfak Atölyesi",
    description: "Minik aşçılar için eğlenceli ve sağlıklı tarifler.",
    image: yazOkuluLogo,
  },
  {
    id: 7,
    title: "Binicilik Atölyesi",
    description: "Atlarla tanış, doğayla uyum içinde denge kur.",
    image: yazOkuluLogo,
  },
  {
    id: 8,
    title: "Kamp ve Çadır Atölyesi",
    description: "Doğada kamp kur, ekip ol ve birlikte yaşamayı öğren.",
    image: yazOkuluLogo,
  },
];
