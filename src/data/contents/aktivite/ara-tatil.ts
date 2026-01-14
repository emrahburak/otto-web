import araTatilIcon from "@/assets/icons/aratatil-logo-01.svg";

import type { CardData } from "../../../types/types";

const imageLoaders = import.meta.glob(`@/assets/images/ara-tatil/webp/*.webp`, {
  eager: false,
  import: "default",
});

export const araTatilProgrami: CardData = {
  id: 14,
  title: "Ara Tatil Programı",
  description:
    "5-13 yaş grubuna özel, uyaranlardan uzak, tam gün beslenme dahil doğada oyun ve atölye odaklı tatil",
  logo: araTatilIcon,
  images: Object.values(imageLoaders) as (() => Promise<string>)[], // string[] yerine
  content: `

<p>Otto Doğa Okulu’nun sömester ve ara tatil programı, çocukların iki hafta boyunca doğayla iç içe,
sade ve güvenli bir ortamda vakit geçirmesi için planlanır. Program süresince çocuklar, <strong>her gün
farklı bir atölye</strong> deneyimler..</p>

<p>Atölye çalışmalarının ardından çocuklar; hareket parkurlarına katılır, doğada drama oyunları oynar
ve orman alanında özgürce zaman geçirir. Programın temel amacı, çocukların fazla uyaranlardan
uzak, doğanın içinde hareket ederek, oynayarak ve deneyimleyerek vakit geçirmesini sağlamaktır.</p>

<p>
Program <strong>09.30 – 16.00</strong> saatleri arasında gerçekleşir ve tam gün okul düzenindedir.<strong>Öğle yemeği ve
ikindi kahvaltısı</strong> programa dahildir
</p>

<p>
Otto Doğa Okulu tatil programları; çocukların hem keyifle zaman geçirdiği hem de doğayla bağ
kurduğu, dengeli ve yapılandırılmış bir tatil deneyimi sunar.
</p>

<p>Sömester ve ara tatil programımız, <strong>5–13 yaş</strong> aralığındaki çocuklar için uygundur.
<strong>4–4,5 yaş</strong> grubundaki çocuklar ise bireysel uyum durumları değerlendirilerek programa kabul
edilebilir.</p>

  `.trim(),
};
