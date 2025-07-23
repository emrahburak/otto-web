export interface SlideContent {
  id: string;
  img: string;
  banner?: string;
  description?: string;
}

export const slides: SlideContent[] = [
  {
    id: "slide-1",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
    banner: "Doğanın Kalbinde Uyan",
    description: "Günün ilk ışıkları, ormanın derinliklerinde hayat bulur.",
  },
  {
    id: "slide-2",
    img: "https://picsum.photos/seed/slide3/1600/900",
    banner: "Çömlek Atölyesi - Ellerle Sanat",
    description: "Toprağın büyüsü ellerinde şekillenir.",
  },
  {
    id: "slide-3",
    img: "https://images.unsplash.com/photo-1502920514313-52581002a659?auto=format&fit=crop&w=1600&q=80",
    banner: "Özgürlüğe Yelken Aç",
    description: "Sessizlik ve rüzgar, ruhuna yol gösterir.",
  },
];
