import ebruIcon from "@/assets/icons/ebru-logo-01.svg";

import type { CardData } from "../../../types/types";

// const images = import.meta.glob(
//   "@/assets/images/ebru/*.{png,jpg,jpeg,svg,JPG}",
//   {
//     eager: true,
//     import: "default",
//   },
// );

const imageLoaders = import.meta.glob("@/assets/images/ebru/webp/*.webp", {
  eager: false,
  import: "default",
});

export const ebruAtolyesi: CardData = {
  id: 22,
  title: "Ebru Atölyesi",
  description: "Suyun üzerinde renklerle dans etmeye hazır mısınız?",
  logo: ebruIcon,
  images: Object.values(imageLoaders) as (() => Promise<string>)[], // string[] yerine
  content: `

<p>Ebru sanatı, sabır, dikkat ve hayal gücünün birleştiği büyülü bir yolculuktur.</p>

<p>Atölyemizde çocuklar, geleneksel Türk sanatlarından biri olan ebruyu doğayla iç içe deneyimlerken hem el becerilerini geliştiriyor hem de özgün tasarımlar ortaya koymanın keyfini yaşıyor</p>
  `.trim(),
};
