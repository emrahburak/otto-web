import type { CardData } from "../types/CardData";

export const teamMembers: CardData[] = [
  {
    id: 1,
    user: {
      id: 101,
      name: "Elif Kaya",
      position: "Frontend Developer",
      socialMedia: [
        { id: 1, title: "instagram", href: "" },
        { id: 2, title: "facebook", href: "" },
        { id: 3, title: "twitter", href: "" },
      ],
    },
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    variant: "team",
  },
  {
    id: 2,
    user: {
      id: 102,
      name: "Mert Yılmaz",
      position: "Backend Developer",
      socialMedia: [
        { id: 1, title: "instagram", href: "" },
        { id: 2, title: "facebook", href: "" },
        { id: 3, title: "twitter", href: "" },
      ],
    },
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    variant: "team",
  },
  {
    id: 3,
    user: {
      id: 103,
      name: "Ayşe Demir",
      position: "UI/UX Designer",
      socialMedia: [
        { id: 1, title: "instagram", href: "" },
        { id: 2, title: "facebook", href: "" },
        { id: 3, title: "twitter", href: "" },
      ],
    },
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    variant: "team",
  },
];
