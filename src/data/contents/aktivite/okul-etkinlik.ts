import okulEtkinlikIcon from "@/assets/icons/okul-etkinlik-icon-01.svg";

import type { CardData } from "../../../types/types";

const imageLoaders = import.meta.glob(
  `@/assets/images/okul-etkinlik/webp/*.webp`,
  {
    eager: false,
    import: "default",
  },
);

export const okulEtkinlik: CardData = {
  id: 16,
  title: "Okul İçi Etkinlik",
  description:
    "Doğa disiplinini ve atölye ruhunu okul sınırlarına taşıyan, eğitici ve ürün odaklı etkinlikler.",
  logo: okulEtkinlikIcon,
  images: Object.values(imageLoaders) as (() => Promise<string>)[], // string[] yerine
  content: `
<p>
Otto Doğa Okulu, doğanın öğretilerini ve atölye kültürünü okul sınırları içerisine taşıyarak çocuklara kendi ortamlarında üretim yapma fırsatı sunar. Uzman eğitmenler eşliğinde gerçekleştirilen bu etkinliklerde; çocuklar ahşap, toprak ve doğal materyallerle çalışarak teorik bilgilerini pratiğe dönüştürür. Okul içi etkinliklerimiz, müfredatla uyumlu uygulama alanları yaratarak öğrencilerin odaklanma, el becerisi ve problem çözme yeteneklerini güçlendirirken, doğaya olan meraklarını okul koridorlarında da canlı tutmayı hedefler.</p>


  `.trim(),
};
