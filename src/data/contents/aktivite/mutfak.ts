import cookingIcon from "@/assets/icons/cooking-logo-01.svg";
import type { CardData } from "../../../types/types";

// const images = import.meta.glob(
//   "@/assets/images/mutfak/*.{png,jpg,jpeg,svg,JPG}",
//   {
//     eager: true,
//     import: "default",
//   },
// );

const images = import.meta.glob("@/assets/images/mutfak/webp/*.webp", {
  eager: true,
  import: "default",
});

export const mutfakAtolyesi: CardData = {
  id: 6, // uygun ID ver
  title: "Mutfak Atölyesi",
  description: "Minik aşçılar için eğlenceli ve sağlıklı tarifler.",
  logo: cookingIcon,

  images: Object.values(images) as string[],
  content: `
    <p>Minik aşçılar için eğlenceli ve sağlıklı tarifler.</p>
    <p>Minik eller karıştırıyor, doğa mutfağa giriyor!</p>
    <p>Otto’nun Mutfak Atölyesi’nde çocuklar doğadan gelen malzemelerle kendi tariflerini yaratıyor.</p>
    <p>Bu atölyede çocuklar:</p>
    <ul>
      <li>Doğal ve mevsimsel malzemelerle çalışır,</li>
      <li>Topraktan tabağa süreci öğrenir,</li>
      <li>Güvenli ve eğlenceli bir ortamda temel mutfak becerilerini keşfeder.</li>
    </ul>
  `.trim(),
};
