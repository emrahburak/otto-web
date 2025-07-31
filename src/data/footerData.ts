import type { FooterLinkGroup } from "../types/types";

export const footerItems: FooterLinkGroup[] = [
  {
    title: "Kampımız",
    links: [{ id: 3, name: "S.S.S.", link: "/faq" }],
  },
  {
    title: "Aktiviteler",
    links: [
      { id: 4, name: "Tüm Aktiviteler", link: "/activites" },
      // tekil route'lar dinamik olacaksa burada yer verilmeyebilir
    ],
  },
  {
    title: "Kurumsal",
    links: [
      { id: 5, name: "Hakkımızda", link: "/about" },
      { id: 7, name: "İletişim", link: "/contact" },
    ],
  },
];
