import type { FooterLinkGroup } from "../types/types";

export const footerItems: FooterLinkGroup[] = [
  {
    title: "Aktiviteler",
    links: [
      { id: 4, name: "Tüm Aktiviteler", link: "/aktiviteler" },
      // tekil route'lar dinamik olacaksa burada yer verilmeyebilir
    ],
  },
  {
    title: "Kurumsal",
    links: [
      { id: 5, name: "Hakkımızda", link: "/hakkimizda" },
      { id: 7, name: "İletişim", link: "/iletisim" },
      {
        id: 8,
        name: "Gizlilik Politikası",
        link: "/sayfa/gizlilik",
        slug: "gizlilik",
      },
    ],
  },
];
