import type { CardData } from "../../../types/types";

import summerIcon from "@/assets/icons/summer-logo-02.svg";

// const images = import.meta.glob(
//   "@/assets/images/yaz-okulu/*.{png,jpg,jpeg,svg,JPG}",
//   {
//     eager: true,
//     import: "default",
//   },
// );

const images = import.meta.glob("@/assets/images/yaz-okulu/webp/*.webp", {
  eager: true,
  import: "default",
});

export const yazOkulu: CardData = {
  id: 12,
  title: "Yaz Okulu",
  description: "Doğanın kalbinde, oyunla öğrenmenin ve keşfetmenin tam zamanı!",
  logo: summerIcon,
  images: Object.values(images) as string[],
  content: `
    <p>Doğanın kalbinde, oyunla öğrenmenin ve keşfetmenin tam zamanı! Survivor parkuru, zipline, çömlek ve mutfak atölyeleri, doğada drama ve daha fazlasıyla dolu dolu bir yaz sizi bekliyor.</p>
    <h2>Yaz Okulumuzda neler mi var:</h2>
    <ul>
      <li>Çömlek Atölyesi</li>
      <li>Kukla Atölyesi</li>
      <li>Çadır Kamp Atölyesi</li>
      <li>Çiftçi Çocuk Atölyesi</li>
      <li>Mutfak Atölyesi</li>
      <li>Binicilik</li>
      <li>Doğada Drama</li>
      <li>Orman Eğitimi</li>
      <li>Survivor - Zipline</li>
      <li>Futbol - Voleybol</li>
      <li>Bowling - Atış Oyunları</li>
    </ul>
    <p>Yaz Okulu Kısa yazı - Eğlence, deneyim ve özgürlük.</p>
  `.trim(),
};
