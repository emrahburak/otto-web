import type { CardData } from "../types/types";
import campingIcon from "@/assets/icons/camping-logo-03.svg";
import ridingIcon from "@/assets/icons/horse-riding-logo-01.svg";
import cookingIcon from "@/assets/icons/cooking-logo-01.svg";
import summerIcon from "@/assets/icons/summer-logo-02.svg";
import puppetIcon from "@/assets/icons/puppet-logo-01.svg";
import gardeningIcon from "@/assets/icons/gardening-logo-01.svg";
import potteryIcon from "@/assets/icons/pottery-logo-03.svg";
import dramaIcon from "@/assets/icons/drama-logo-01.svg";

export const workshops: CardData[] = [
  {
    id: 1,
    title: "Online Drama Eğitimi",
    description: "Hayal gücünü keşfet, rol yaparak ifade becerini geliştir.",
    image: dramaIcon,
  },
  {
    id: 2,
    title: "Çömlek Atölyesi",
    description: "Toprakla şekil ver, ellerinle hayalini yoğur.",
    image: potteryIcon,
  },
  {
    id: 3,
    title: "Çiftçi Çocuk Atölyesi",
    description: "Toprağa dokun, doğayla dost ol, üretmenin keyfini yaşa.",
    image: gardeningIcon,
  },
  {
    id: 4,
    title: "Kukla Atölyesi",
    description: "Kendi kuklanı yap, ona hayat ver ve sahneye taşı.",
    image: puppetIcon,
  },
  {
    id: 5,
    title: "Yaz Okulu",
    description: "Dolu dolu bir yaz: keşif, doğa, oyun ve yeni arkadaşlar.",
    image: summerIcon,
  },
  {
    id: 6,
    title: "Mutfak Atölyesi",
    description: "Minik aşçılar için eğlenceli ve sağlıklı tarifler.",
    image: cookingIcon,
  },
  {
    id: 7,
    title: "Binicilik Atölyesi",
    description: "Atlarla tanış, doğayla uyum içinde denge kur.",
    image: ridingIcon,
  },
  {
    id: 8,
    title: "Kamp ve Çadır Atölyesi",
    description: "Doğada kamp kur, ekip ol ve birlikte yaşamayı öğren.",
    image: campingIcon,
  },
];
