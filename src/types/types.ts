import type React from "react";

export interface AboutContent {
  id: string;
  img: string;
}

export interface socialButton {
  id: number;
  name: string;
  icon: React.ReactNode;
  href: string;
  style?: React.CSSProperties;
}

export type socialLinks = {
  id: number;
  title: string;
  href: string;
};

export type User = {
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
  bannerImage?: string;
}

export interface headLink {
  id: number;
  name: string;
  link: string;
}

export interface FooterLink {
  id: number;
  name: string;
  link: string;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}
