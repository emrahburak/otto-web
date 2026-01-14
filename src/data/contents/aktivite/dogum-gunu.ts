import dogumGunuIcon from "@/assets/icons/dogum-gunu-logo-01.svg";

import type { CardData } from "../../../types/types";

const imageLoaders = import.meta.glob(
  `@/assets/images/dogum-gunu/webp/*.webp`,
  {
    eager: false,
    import: "default",
  },
);

export const dogumGunu: CardData = {
  id: 15,
  title: "Doğum Günü Organizasyonları",
  description:
    "Size özel orman alanında, macera parkurları ve hayallerle şekillenen doğal bir doğum günü.",
  logo: dogumGunuIcon,
  images: Object.values(imageLoaders) as (() => Promise<string>)[], // string[] yerine
  content: `

  <p>
  Otto Doğa Okulu’nda doğum günleri, kalıplaşmış programlardan uzak; doğanın içinde, aileye ve
çocuğun hayallerine göre şekillenen özel bir deneyim olarak planlanır. Her doğum günü
organizasyonu, kutlama sahibinin isteği doğrultusunda tasarlanır ve tüm alan yalnızca o aileye
ayrılır.</p>
<p>
Çam ağaçlarının altında, doğanın tam kalbinde gerçekleşen bu kutlamalarda; aileler dilerse keyifli
bir beş çayı eşliğinde sohbet edebilir, dilerse mangal yakarak birlikte vakit geçirebilir. Doğal ortam,
yetişkinler için sakin ve rahatlatıcı bir buluşma alanı sunarken, çocuklar için özgürce hareket
edebilecekleri güvenli bir oyun alanına dönüşür.
</p>

<p>
Çocuklar, Otto Doğa Okulu’nun doğa temelli etkinlik parkurlarında gün boyu aktif olarak vakit
geçirir. Survivor parkurları, zipline benzeri hareketli oyun alanları ve yaş grubuna uygun atölye
çalışmalarıyla kutlama; sadece bir doğum günü değil, unutulmaz bir deneyime dönüşür
</p>



  `.trim(),
};
