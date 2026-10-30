// src/lib/prerender/types.ts
// Serializable shapes used by the pre-render templates. Kept separate from
// data-loader so the build config can import template helpers without pulling
// in the data sources or their Vite-specific imports.

export interface PrerenderAboutContent {
  title: string;
  content: string;
}

export interface PrerenderFooterLink {
  id: number;
  name: string;
  link: string;
  slug?: string;
}

export interface PrerenderFooterGroup {
  title: string;
  links: PrerenderFooterLink[];
}

export interface PrerenderContact {
  phone: string;
  mail: string;
  address: string;
  map: string;
}

export interface PrerenderWorkshop {
  id: number;
  title: string;
  description?: string;
  slug: string;
  content?: string;
}

export interface PrerenderTeamMember {
  id: number;
  name: string;
  position?: string;
}

export interface PrerenderPage {
  slug: string;
  title: string;
  description: string;
  content: string;
  breadcrumbLabel: string;
}

export interface PrerenderSlide {
  id: string;
  banner?: string;
  description?: string;
}

export interface PrerenderData {
  origin: string;
  aboutContent: PrerenderAboutContent;
  contact: PrerenderContact;
  workshops: PrerenderWorkshop[];
  slides: PrerenderSlide[];
  teamMembers: PrerenderTeamMember[];
  pages: PrerenderPage[];
  footerGroups: PrerenderFooterGroup[];
}
