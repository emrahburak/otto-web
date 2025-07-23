import type { FooterLinkGroup } from "../types/types";

export const footerItems: FooterLinkGroup[] = [
  {
    title: "Kampımız",
    links: [
      { id: 1, name: "Konaklama", link: "/accommodation" },
      { id: 2, name: "Fiyatlandırma", link: "/pricing" },
      { id: 3, name: "S.S.S.", link: "/faq" },
    ],
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
      { id: 6, name: "Blog", link: "/blog" }, // varsa
      { id: 7, name: "İletişim", link: "/contact" },
    ],
  },
  {
    title: "Yasal",
    links: [
      { id: 8, name: "Gizlilik Politikası", link: "/privacy-policy" },
      { id: 9, name: "Kullanım Koşulları", link: "/terms-of-use" },
      { id: 10, name: "K.V.K.K.", link: "/kvkk" }, // ya da /data-protection
    ],
  },
];
