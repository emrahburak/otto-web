import ridingIcon from "@/assets/icons/horse-riding-logo-01.svg";

import type { CardData } from "../../../types/types";

const images = import.meta.glob(
  `@/assets/images/binicilik/*.{png,jpg,jpeg,svg,JPG}`,
  {
    eager: true,
    import: "default",
  },
);

export const binicilikAtolyesi: CardData = {
  id: 1,
  title: "Binicilik Atölyesi",
  description: "Atlarla tanış, doğayla uyum içinde denge kur.",
  logo: ridingIcon,
  images: Object.values(images) as string[],
  content: `

<p>Atlarla tanış, doğayla uyum içinde denge kur.</p>

<p>Dengeyi yalnızca eyerin üstünde değil, kalbimizde de kurarız.</p>

<p>Binicilik Atölyesi’nde çocuklar atlarla tanışır, onların dilini öğrenir ve güven ilişkisi kurar.</p>

<p>Bu atölyede çocuklar:</p>

<ul>
  <li>Atları tanır, yaklaşmayı ve bakımını öğrenir,</li>
  <li>Temel binicilik tekniklerini dener,</li>
  <li>Doğayla ve hayvanla kurduğu iletişimi geliştirir,</li>
  <li>Denge, özgüven ve beden farkındalığı kazanır.</li>
</ul>
  `.trim(),
};
