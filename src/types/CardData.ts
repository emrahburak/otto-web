type socialLinks = {
  id: number;
  title: string;
  href: string;
};

type User = {
  id: number;
  name: string;
  position?: string;
  socialMedia?: socialLinks[];
};

export interface CardData {
  id: number;
  title?: string;
  user?: User;
  position?: string;
  description?: string;
  image?: string;
  href?: string;
  variant?: "default" | "team" | "featured";
}
