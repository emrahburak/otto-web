import anaokuluIcon from "@/assets/icons/anaokullari-yillik-icon-01.svg";

import type { CardData } from "../../../types/types";

const imageLoaders = import.meta.glob(
  `@/assets/images/anaokulu-yillik/webp/*.webp`,
  {
    eager: false,
    import: "default",
  },
);

export const anaokuluYillik: CardData = {
  id: 12,
  title: "Anaokulları ile Yıllık Anlaşma",
  description:
    "Dört mevsimi doğada anlamlandıran, 12 haftalık sertifikalı ve ürün odaklı bütüncül orman okulu sistemi.",
  logo: anaokuluIcon,
  images: Object.values(imageLoaders) as (() => Promise<string>)[], // string[] yerine
  content: `

<p>Otto Doğa ve Orman Okulu, okullarla 12 haftalık
Bütüncül Orman Okulu Sistemi kapsamında yıllık
iş birlikleri yürütmektedir. Program, sürecin
başlangıcında gerçekleştirilen veli tanışma çayı
ile başlar.Eğitim süreci sonunda veli katılımlı
sertifika töreni düzenlenir.</p>

<p>Öğrenciler, 12 hafta boyunca her uygulama
gününde ürünlü atölye çalışmalarına katılım
sağlar. Program süresince çocuklar, doğada dört
mevsimi gözlemleme, deneyimleme ve
anlamlandırma fırsatı bulur.</p>

  `.trim(),
};
