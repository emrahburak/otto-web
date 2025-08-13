import potteryIcon from "@/assets/icons/pottery-logo-03.svg";
import type { CardData } from "../../../types/types";

// const images = import.meta.glob(
//   "@/assets/images/comlek/*.{png,jpg,jpeg,svg,JPG}",
//   {
//     eager: true,
//     import: "default",
//   },
// );

const images = import.meta.glob("@/assets/images/comlek/webp/*.webp", {
  eager: true,
  import: "default",
});

export const comlekAtolyesi: CardData = {
  id: 3, // uygun id ver
  title: "Çömlek Atölyesi",
  description: "Toprakla şekil ver, ellerinle hayalini yoğur.",
  logo: potteryIcon,
  images: Object.values(images) as string[],
  content: `
    <p>Toprakla şekil ver, ellerinle hayalini yoğur.</p>
    <p>Toprak avuçta döner, şekil alır... Sabırla, sevgiyle bir sanat doğar!</p>
    <p>Çömlek Atölyesi’nde çocuklar çamura ellerini sokar, hissetmeyi, şekil vermeyi ve beklemeyi öğrenir. Bu atölye sadece bir sanat çalışması değil; aynı zamanda toprakla kurulmuş derin bir bağdır.</p>
    <p>Atölyede çocuklar:</p>
    <ul>
      <li>Çamura dokunur, yoğurur, döndürür,</li>
      <li>Kendi tabaklarını, minik heykellerini yapar,</li>
      <li>Kurutma süreçlerini gözlemler,</li>
      <li>Sabır, el-göz koordinasyonu ve yaratıcılıklarını geliştirir.</li>
    </ul>
    <p><strong>Not:</strong> Torna da yapılan ürünler katılımcılarda kalır.</p>
  `.trim(),
};
