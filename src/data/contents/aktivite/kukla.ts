import puppetIcon from "@/assets/icons/puppet-logo-01.svg";
import type { CardData } from "../../../types/types";

const images = import.meta.glob(
  "@/assets/images/kukla/*.{png,jpg,jpeg,svg,JPG}",
  {
    eager: true,
    import: "default",
  },
);

export const kuklaAtolyesi: CardData = {
  id: 5, // uygun ID ver
  title: "Kukla Atölyesi",
  description: "Kendi kuklanı yap, ona hayat ver ve sahneye taşı",
  logo: puppetIcon,
  images: Object.values(images) as string[],
  content: `
    <p>Kendi kuklanı yap, ona hayat ver ve sahneye taşı.</p>
    <p>Bir ip, bir çorap, biraz hayal gücü… Ve sahne hazır!</p>
    <p>Kukla Atölyesi'nde çocuklar hem üretiyor, hem oynuyor, hem de anlatıyor. Kendi kuklalarını tasarlayan minikler, karakterlerine ses veriyor.</p>
    <p>Bu atölyede çocuklar:</p>
    <ul>
      <li>Doğadan ve geri dönüştürülebilir malzemelerle kuklalar yapar,</li>
      <li>Kukla oynatmayı, ses ve mimiklerle karakter yaratmayı öğrenir,</li>
      <li>Hikâye kurma ve anlatma becerilerini geliştirir,</li>
      <li>Kendini ifade ederken özgüven ve yaratıcılık kazanır.</li>
    </ul>
    <p><em>Not: Yapılan kuklalar katılımcılarda kalır.</em></p>
  `.trim(),
};
