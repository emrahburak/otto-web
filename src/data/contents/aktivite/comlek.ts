import potteryIcon from "@/assets/icons/pottery-logo-03.svg";
import type { CardData } from "../../../types/types";

// const images = import.meta.glob(
//   "@/assets/images/comlek/*.{png,jpg,jpeg,svg,JPG}",
//   {
//     eager: true,
//     import: "default",
//   },
// );

const imageLoaders = import.meta.glob("@/assets/images/comlek/webp/*.webp", {
  eager: false,
  import: "default",
});

export const comlekAtolyesi: CardData = {
  id: 3, // uygun id ver
  title: "Çömlek Atölyesi",
  description: "Toprakla şekil ver, ellerinle hayalini yoğur.",
  logo: potteryIcon,
  images: Object.values(imageLoaders) as (() => Promise<string>)[], // string[] yerine
  content: `
  <p>
  Otto Doğa Okulu’nda okul içi çömlek atölyeleri, çocukların toprağa dokunarak üretim sürecini
deneyimlediği uygulamalı etkinliklerdir. Atölye süreci, çocukların önce <strong>elle şekillendirme</strong>
çalışmalarıyla başlar; ardından çocuklar, <strong>torna başında profesyonel üretim sürecini deneyimler</strong>.
  </p>
<p>
Her çocuk, atölye boyunca birebir yönlendirilir ve kendi ürününü oluşturur. Üretilen çömlekler,
çocuklara ait özel kutularda saklanır ve süreç tamamlandıktan sonra <strong>boyama çalışmaları</strong> yapılır.
Atölye sonunda her çocuk, kendi emeğiyle ortaya çıkardığı ürünü evine götürür.
</p>
<p>
Bu atölye, çocukların el becerilerini, dikkatini ve üretme motivasyonunu desteklerken; süreci
keyifli, öğretici ve kalıcı bir deneyime dönüştürmeyi amaçlar.
</p>
  `.trim(),
};
