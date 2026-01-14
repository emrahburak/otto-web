import ahsapIcon from "@/assets/icons/ahsap-logo-01.svg";

import type { CardData } from "../../../types/types";

const imageLoaders = import.meta.glob(`@/assets/images/ahsap/webp/*.webp`, {
  eager: false,
  import: "default",
});

export const ahsapAtolyesi: CardData = {
  id: 11,
  title: "Ahsap Atölyesi",
  description:
    "Çocukların doğanın kalbinde, kendi elleriyle tasarlayıp ürettiği kalıcı bir ahşap serüveni",
  logo: ahsapIcon,
  images: Object.values(imageLoaders) as (() => Promise<string>)[], // string[] yerine
  content: `

<p>Otto Doğa Okulu Ormanda Ahşap Atölyesi, çocukların doğayla temas ederek üretim sürecini
deneyimlediği uygulamalı ve ürünlü bir atölyedir. Atölye, orman içinde kurulan alanda
gerçekleştirilir ve her çocuğun kendisine ait <strong> özel bir çalışma tezgâhı</strong> bulunur</p>

<p>Atölye sürecinde çocuklar, o günün oyuncağını <strong>kendi elleriyle</strong> tasarlar ve üretir. Eğitmen, her
çocukla birebir ilgilenerek süreci güvenli ve destekleyici bir şekilde yönlendirir. Çocuklar, ahşapla
çalışmanın ritmini hissederken hem üretir hem de odaklanmayı öğrenir.</p>

<p>Atölye sonunda her çocuk, kendi emeğiyle ortaya çıkardığı oyuncağı evine götürür. Böylece yapılan
çalışma, yalnızca bir etkinlik değil; kalıcı bir deneyime ve hatıraya dönüşür..</p>
  `.trim(),
};
