import type React from "react";

export const fileExtensions = ["png", "jpg", "jpeg", "svg", "JPG"]; // dışardan kontrol edilebilir

export interface IAboutContent {
  title: string;
  content: string;
}
export interface SlideContent {
  id: string;
  img: string;
  banner?: string;
  description?: string;
}
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
  logo?: string; // Eskiden image'ti
  href?: string;
  images?: string[]; // Eskiden bannerImage'ti, şimdi liste
  image?: string;
  content?: string; // Markdown body içeriği (HTML olabilir)
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
  slug?: string;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}
