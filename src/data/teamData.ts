import type { CardData } from "../types/types";
import t1 from "@/assets/team/team-03.jpeg";
import t2 from "@/assets/team/team-05.jpeg";
import t3 from "@/assets/team/team-01.jpeg";
import t4 from "@/assets/team/team-02.jpeg";
import t5 from "@/assets/team/team-04.jpeg";

export const teamMembers: CardData[] = [
  {
    id: 1,
    user: {
      id: 101,
      name: "Onur Ulutaş",
      position: "Eğitim Koordinatorü",
      socialMedia: [
        {
          id: 1,
          title: "instagram",
          href: "https://www.instagram.com/oonurulutas/",
        },
        { id: 2, title: "facebook", href: "" },
        { id: 3, title: "twitter", href: "" },
      ],
    },
    image: t1,
  },
  {
    id: 2,
    user: {
      id: 102,
      name: "Sima Erman",
      position: "Eğitimci",
      socialMedia: [
        {
          id: 1,
          title: "instagram",
          href: "https://www.instagram.com/simaermaan/",
        },
        { id: 2, title: "facebook", href: "" },
        { id: 3, title: "twitter", href: "" },
      ],
    },
    image: t2,
  },
  {
    id: 3,
    user: {
      id: 103,
      name: "Anıl İnce",
      position: "Eğitimci",
      socialMedia: [
        {
          id: 1,
          title: "instagram",
          href: "https://www.instagram.com/anil__ince",
        },
        { id: 2, title: "facebook", href: "" },
        { id: 3, title: "twitter", href: "" },
      ],
    },
    image: t3,
  },
  {
    id: 4,
    user: {
      id: 104,
      name: "Güney Tuncel",
      position: "Eğitimci",
      socialMedia: [
        {
          id: 1,
          title: "instagram",
          href: "https://www.instagram.com/guneytuncel",
        },
        { id: 2, title: "facebook", href: "" },
        { id: 3, title: "twitter", href: "" },
      ],
    },
    image: t4,
  },

  {
    id: 5,
    user: {
      id: 104,
      name: "Gülsüm Yıldırım",
      position: "İnsan Kaynakları",
      socialMedia: [
        {
          id: 1,
          title: "instagram",
          href: "https://www.instagram.com/gulsumsyldrm",
        },
        { id: 2, title: "facebook", href: "" },
        { id: 3, title: "twitter", href: "" },
      ],
    },
    image: t5,
  },
];
