import type { CardData } from "../../../types/types";

import gardeningIcon from "@/assets/icons/gardening-logo-01.svg";

// const images = import.meta.glob(
//   "@/assets/images/ciftci/*.{png,jpg,jpeg,svg,JPG}",
//   {
//     eager: true,
//     import: "default",
//   },
// );

const images = import.meta.glob("@/assets/images/ciftci/*.webp", {
  eager: true,
  import: "default",
});

export const ciftciCocukAtolyesi: CardData = {
  id: 2,
  title: "Çiftçi Çocuk Atölyesi",
  description: "Toprağa dokun, doğayla dost ol, üretmenin keyfini yaşa.",
  logo: gardeningIcon,
  images: Object.values(images) as string[],
  content: `

<p>Toprağa dokun, doğayla dost ol, üretmenin keyfini yaşa.</p>

<p>Minik eller toprağa değiyor, doğayla bağ güçleniyor!</p>

<p>Bu atölyede çocuklar toprağı tanır, tohumu sever, ekip biçmenin sabrını ve neşesini öğrenir. Doğayla iç içe, gerçek bir çiftçi gibi çalışır.</p>

<p>Çocuklar bu atölyede:</p>

<ul>
  <li>Toprakla temas ederek doğayı yakından tanır,</li>
  <li>Mevsimlere göre ekim-dikim yapar,</li>
  <li>Bahçecilik, sulama ve bakım süreçlerini öğrenir,</li>
  <li>Sabır, sorumluluk ve üretme becerileri geliştirir.</li>
</ul>
  `.trim(),
};
