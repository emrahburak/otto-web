import type { CardData } from "../../../types/types";

import cocukOyunIcon from "@/assets/icons/cocuk-oyunu-logo-01.svg";

const images = import.meta.glob(
  "@/assets/images/cocuk-oyunu/*.{png,jpg,jpeg,svg}",
  {
    eager: true,
    import: "default",
  },
);

export const cocukOyunu: CardData = {
  id: 13,
  title: "Çocuk Oyunu",
  description: "Fiko’yu tanıyın, onunla öğrenin, onunla büyüyün!",
  logo: cocukOyunIcon,
  images: Object.values(images) as string[],
  content: `
    <p>Dev kuklamız Fiko, çocukların kalbine dokunmaya geliyor!</p>
    <p>Hijyen, temizlik alışkanlıkları ve büyüklere saygı gibi değerleri eğlenceli bir dille anlatan, müzikli ve interaktif bir çocuk tiyatrosudur.</p>
    <p>Meraklı, sevimli ve bazen biraz yaramaz Fiko’nun maceralarında çocuklar hem çok gülecek hem de günlük hayatlarında önemli alışkanlıklar kazanacak.</p>
    <p>Çocuk Oyunu kısa yazısı - Fiko’yu tanıyın, onunla öğrenin, onunla büyüyün!</p>
  `.trim(),
};
