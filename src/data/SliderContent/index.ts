export interface SlideContent {
  id: string;
  img: string;
  banner?: string;
  description?: string;
}

export const slides: SlideContent[] = [
  {
    id: "slide-1",
    img: "https://picsum.photos/seed/slide1/1600/900",
    banner: "Manzaranın Tadını Çıkar",
    description: "Sadelik bazen en iyi kaçış yoludur",
  },
  {
    id: "slide-2",
    img: "https://picsum.photos/seed/slide2/1600/900",
    banner: "Gecenin Işıltısı",
    description: "Karanlıkta parlayan fikirler burada doğar",
  },
  {
    id: "slide-3",
    img: "https://picsum.photos/seed/slide3/1600/900",
    banner: "Yeni Ufuklara Yelken Aç",
    description: "Başlangıçlar cesaret ister",
  },
];
