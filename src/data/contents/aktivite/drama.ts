import type { CardData } from "../../../types/types";

import dramaIcon from "@/assets/icons/drama-logo-01.svg";

// const images = import.meta.glob(
//   "@/assets/images/drama/*.{png,jpg,jpeg,svg,JPG}",
//   {
//     eager: true,
//     import: "default",
//   },
// );

const images = import.meta.glob("@/assets/images/drama/webp/*.webp", {
  eager: true,
  import: "default",
});

export const dramaAtolyesi: CardData = {
  id: 11,
  title: "Drama Eğitimi",
  description: "Hayal gücünü keşfet, rol yaparak ifade becerini geliştir.",
  logo: dramaIcon,
  images: Object.values(images) as string[],
  content: `
    <p>Hayal gücünün sınırlarını zorla, sahnede kendini özgürce ifade et.</p>
    <p>Drama Atölyesi’nde çocuklar; rol yapmayı öğrenirken duygularını keşfeder, özgüvenlerini artırır ve iletişim becerilerini güçlendirir.</p>
    <p>Bu atölyede çocuklar:</p>
    <ul>
      <li>🎭 Temel drama tekniklerini uygular, sahne deneyimi kazanır,</li>
      <li>🗣️ İfade becerilerini geliştirir, beden dilini kullanmayı öğrenir,</li>
      <li>🤝 Takım çalışması yapar, empati kurmayı keşfeder,</li>
      <li>🌟 Yaratıcılıklarını sahne aracılığıyla dışa vurur.</li>
    </ul>
    <p>Online ortamda interaktif ve eğlenceli derslerle, çocukların sosyal ve duygusal gelişimini destekler.</p>
  `.trim(),
};
