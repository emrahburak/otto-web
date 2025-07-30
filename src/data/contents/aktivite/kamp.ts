import campingIcon from "@/assets/icons/camping-logo-03.svg";
import type { CardData } from "../../../types/types";

const images = import.meta.glob("@/assets/images/kamp/*.{png,jpg,jpeg,svg}", {
  eager: true,
  import: "default",
});

export const kampVeCadirAtolyesi: CardData = {
  id: 4, // uygun id ver
  title: "Kamp ve Çadır Atölyesi",
  description: "Doğada kamp kur, ekip ol ve birlikte yaşamayı öğren.",
  logo: campingIcon,
  images: Object.values(images) as string[],
  content: `
  
    <p>Doğada kamp kur, ekip ol ve birlikte yaşamayı öğren.</p>
    <p>Doğanın ortasında bir yuva kurmak… İşte asıl macera bu!</p>
    <p>Kamp ve Çadır Atölyesi'nde çocuklar kendi çadırlarını kurar, kamp alanını organize eder, ekip olmayı öğrenir.</p>
    <p>Bu atölyede çocuklar:</p>
    <ul>
      <li>Çadır kurmayı ve toplama tekniklerini öğrenir,</li>
      <li>Güvenli kamp alanı oluşturmayı deneyimler,</li>
      <li>Kampçılık malzemelerini tanır ve kullanmayı öğrenir,</li>
      <li>Doğada olmanın sorumluluğunu ve uyumunu keşfeder.</li>
    </ul>
  `.trim(),
};
