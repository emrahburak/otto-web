import gelenekselLogo from "@/assets/icons/geleneksel-sokak-logo-01.svg";
import type { CardData } from "../../../types/types";

// const images = import.meta.glob(
//   "@/assets/images/geleneksel/*.{png,jpg,jpeg,svg,JPG}",
//   {
//     eager: true,
//     import: "default",
//   },
// );

const imageLoaders = import.meta.glob(
  "@/assets/images/geleneksel/webp/*.webp",
  {
    eager: false,
    import: "default",
  },
);

export const gelenekselSokakOyunlariAtolyesi: CardData = {
  id: 11, // uygun ID ver
  title: "Geleneksel Sokak Oyunları Atölyesi",
  description: "Toprakla şekil ver, ellerinle hayalini yoğur.",
  logo: gelenekselLogo,
  images: Object.values(imageLoaders) as (() => Promise<string>)[], // string[] yerine
  content: `
    <p>Asfaltsız sokaklarda, ormanda mutluluğun peşindeyiz!</p>
    <p>
      Sek sek, yakan top, mendil kapmaca, çuval yarışı, halat çekme… Bu atölyede çocuklar geçmişin en eğlenceli oyunlarını keşfederken hem hareket ediyor hem de birlikte oynamanın keyfini yaşıyor.
    </p>
    <p>Bu atölyede çocuklar:</p>
    <ul>
      <li>🪁 Geleneksel sokak oyunlarını öğrenir ve dener,</li>
      <li>👫 Kurallı oyunlar yoluyla grup içinde iletişim kurar,</li>
      <li>🏃‍♀️ Denge, hız, dikkat ve refleks becerilerini geliştirir,</li>
      <li>🎉 Ekransız, doğal ve özgürce bir oyun alanında sosyalleşir.</li>
    </ul>
    <p>Oyunlar bazen neşeyle koşturmak, bazen de sabırla beklemektir. Ama hepsinin ortak noktası: birlikte gülmek!</p>
  `.trim(),
};
