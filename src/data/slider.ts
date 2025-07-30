import ottoSlide1 from "@/assets/otto-slide-01.jpg";
import ottoSlide2 from "@/assets/otto-slide-02.jpg";
import ottoDramaBanner from "@/assets/otto-drama-banner.jpg";
import type { SlideContent } from "../types/types";

export const slides: SlideContent[] = [
  {
    id: "slide-1",
    img: ottoSlide1,
    banner: "Doğanın Kalbinde Uyan",
    description: "Günün ilk ışıkları, ormanın derinliklerinde hayat bulur.",
  },
  {
    id: "slide-2",
    img: ottoSlide2,
    banner: "Sanatın ve eğlencenin bulunduğu yer",
    description: "Toprağın büyüsü ellerinde şekillenir.",
  },
  {
    id: "slide-3",
    img: ottoDramaBanner,
    banner: "Özgürlüğe Yelken Aç",
    description: "Sessizlik ve rüzgar, ruhuna yol gösterir.",
  },
];
