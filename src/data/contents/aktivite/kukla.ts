import puppetIcon from "@/assets/icons/puppet-logo-01.svg";
import type { CardData } from "../../../types/types";

// const images = import.meta.glob(
//   "@/assets/images/kukla/*.{png,jpg,jpeg,svg,JPG}",
//   {
//     eager: true,
//     import: "default",
//   },
// );

const imageLoaders = import.meta.glob("@/assets/images/kukla/webp/*.webp", {
  eager: false,
  import: "default",
});

export const kuklaAtolyesi: CardData = {
  id: 5, // uygun ID ver
  title: "Kukla Atölyesi",
  description: "Kendi kuklanı yap, ona hayat ver ve sahneye taşı",
  logo: puppetIcon,
  images: Object.values(imageLoaders) as (() => Promise<string>)[], // string[] yerine

  content: `
  <p>
  Otto Doğa Okulu Kukla Atölyesi, çocukların oyun ve doğaçlama yoluyla kendilerini özgürce ifade
edebilecekleri eğlenceli bir deneyim sunar. Atölye, çocukların izlediği <strong>mini bir kukla gösterisi</strong> ile
başlar; bu gösteri, hayal gücünü harekete geçirir ve sahneyle güvenli bir bağ kurmalarını sağla
  </p>
  <p>
  Ardından çocuklar kendi kuklalarını tasarlar ve ikişerli gruplar halinde, bir moderatör eşliğinde
sahneye çıkarak <strong>doğaçlama drama çalışmaları</strong> yapar. Bu süreçte çocuklar, düşüncelerini ve
duygularını eğlenerek ifade eder; birlikte üretmenin ve sahnede olmanın keyfini yaşar.
  </p>
<p>
Atölyenin temel kazanımı, çocuğun kendini rahatça ifade edebilmesi ve bunu yaparken
eğlenmesidir. Kukla Atölyesi ürünlü bir atölyedir; her çocuk, finalde kendi tasarladığı kuklayla
birlikte evine döner.
</p>

  `.trim(),
};
