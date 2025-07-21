import type { socialLinks } from "../types/CardData";

interface IContact {
  phone: string;
  mail: string;
  address?: string;
  social?: socialLinks[];
}

export const ContactData: IContact = {
  phone: "05010144386",
  mail: "info@ottodogapark.com",
  address: "Kurna, Kurtdoğmuş Yolu Cd.No:65 34916 Pendik/İstanbul",
  social: [
    { id: 1, href: "", title: "facebook" },
    { id: 2, href: "", title: "x" },
    {
      id: 3,
      href: "https://www.instagram.com/ottodogaokulu/",
      title: "instagram",
    },
  ],
};
