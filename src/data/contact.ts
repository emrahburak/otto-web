import type { socialLinks } from "../types/types";

interface IContact {
  phone: string;
  mail: string;
  address?: string;
  social?: socialLinks[];
  map: string;
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
  map: "https://www.google.com/maps/place/Otto+Do%C4%9Fa+Okulu/@40.9640037,29.3762055,17z/data=!3m1!4b1!4m6!3m5!1s0x14cad7939fe75b0b:0x550537b96c0dd2fa!8m2!3d40.9640037!4d29.3762055!16s%2Fg%2F11yfndwp77?entry=ttu&g_ep=EgoyMDI1MDcyMC4wIKXMDSoASAFQAw%3D%3D",
};
