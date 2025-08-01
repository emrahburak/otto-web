import type { SlideContent } from "../types/types";

// 1. Görselleri topla
// const imageImports = import.meta.glob(
//   "@/assets/slider/*.{png,jpg,jpeg,svg,JPG}",
//   {
//     eager: true,
//     import: "default",
//   },
// );

const imageImports = import.meta.glob("@/assets/slider/*.webp", {
  eager: true,
  import: "default",
});

// 2. Varsayılan açıklamalar ve banner'lar
const banners = [
  "Özgürlüğe Yelken Aç",
  "Kendini yeniden keşfet",
  "Sanatın ve eğlencenin bulunduğu yer",
  "Doğanın ritmine kulak ver",
  "Ruhunu dinle",
  "Adım adım içsel keşif",
  "Derin bir nefes al",
  "Yaşamı yavaşlat",
  "İz bırak, fark yarat",
  "Doğayla bir ol",
  "Sessizlikte buluş",
];

const descriptions = [
  "Günün ilk ışıkları, ormanın derinliklerinde hayat bulur.",
  "Toprağın büyüsü ellerinde şekillenir.",
  "Sessizlik ve rüzgar, ruhuna yol gösterir.",
  "Köklerine dön, doğayı hisset.",
  "Kamp ateşi etrafında dostluklar büyür.",
  "Bir ağacın gölgesinde hayaller kurulur.",
  "Ayakların çıplak toprağa değsin, dünya ile bağın güçlensin.",
  "Gökkuşağının altından geç, merakın peşinden git.",
  "Her adımda doğa sana bir sır fısıldar.",
  "Küçük ellerle büyük keşifler başlar.",
  "Rüzgar saçlarını dağıtırken, kalbini de özgür bırak.",
  "Toprağa dokun, hayatı hisset.",
  "Birlikte oynarken öğrenmek, doğanın en güzel öğretisidir.",
  "Kamp çadırı değil, hayal çadırı kurulur burada.",
];

// 3. Görselleri SlideContent'e dönüştür
export const slides: SlideContent[] = Object.entries(imageImports).map(
  ([_, img], index) => ({
    id: `slide-${index + 1}`,
    img: img as string,
    banner: banners[Math.floor(Math.random() * banners.length)],
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
  }),
);
