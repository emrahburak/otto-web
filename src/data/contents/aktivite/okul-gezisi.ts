import okulGeziIcon from "@/assets/icons/okul-gezi-logo-01.svg";
import type { CardData } from "../../../types/types";

// const images = import.meta.glob(
//   "@/assets/images/okul-gezisi/*.{png,jpg,jpeg,svg,JPG}",
//   {
//     eager: true,
//     import: "default",
//   },
// );

const images = import.meta.glob("@/assets/images/okul-gezisi/webp/*.webp", {
  eager: true,
  import: "default",
});

export const okulGezisi: CardData = {
  id: 14,
  title: "Okul Gezisi",
  description: "Sınıfınızı alın, doğanın kalbine davetlisiniz!",
  logo: okulGeziIcon,
  images: Object.values(images) as string[],
  content: `
    <p>Okullar için hazırladığımız günübirlik doğa gezilerinde çocuklar, doğanın içinde özgürce oynuyor, öğreniyor ve keşfediyor.</p>
    <p>Survivor, Bowling, zipline, doğa yürüyüşü, drama ve atölye çalışmalarıyla dolu bu özel gün; çocuklara unutulmaz bir deneyim sunarken, öğretmenler için de keyifli ve dinlendirici bir mola oluyor.</p>
    <p>Hem eğlenceli hem öğretici bir gün için doğaya bekliyoruz!</p>
    <ul>
      <li>Survivor-zipline</li>
      <li>Futbol-Voleybol</li>
      <li>Bowling- Atış Oyunları</li>
      <li>Doğada Drama</li>
      <li>Orman Eğitimi</li>
      <li>Müzikli Eğlence</li>
      <li>Kamp Ateşi</li>
    </ul>
  `.trim(),
};
