// src/lib/prerender/data-loader.ts
// Aggregates the same data sources the React app uses so the pre-rendered HTML
// stays in sync with the live site. This module is loaded through Vite's
// ssrLoadModule during the post-build step, which means import.meta.glob and
// the @/ alias are resolved exactly as in the browser bundle.

import slugify from "slugify";
import { aboutContent } from "../../data/content";
import { ContactData } from "../../data/contact";
import { workshops } from "../../data/workshop";
import { slides } from "../../data/slider";
import { teamMembers } from "../../data/teamData";
import { pageData } from "../../data/pageData";
import { footerItems } from "../../data/footerData";
import type { PrerenderData } from "./types";

function createWorkshopSlug(title: string): string {
  // Keep in sync with ServiceDetailPage slug generation.
  return slugify(title, { lower: true, locale: "tr" });
}

export function getPrerenderData(): PrerenderData {
  const pages = pageData.map((page) => {
    const footerLink = footerItems
      .flatMap((group) => group.links)
      .find((link) => {
        const linkSlug = link.slug ?? link.link?.split("/").filter(Boolean).pop();
        return linkSlug === page.slug;
      });

    const breadcrumbLabel =
      page.slug === "404"
        ? "Sayfa Bulunamadı"
        : (footerLink?.name ?? page.title);

    return {
      slug: page.slug,
      title: page.title,
      description: page.description,
      content: page.content,
      breadcrumbLabel,
    };
  });

  return {
    origin: "https://www.ottodogaokulu.com",
    aboutContent,
    contact: {
      phone: ContactData.phone,
      mail: ContactData.mail,
      address: ContactData.address ?? "",
      map: ContactData.map,
    },
    workshops: workshops.map((workshop) => ({
      id: workshop.id,
      title: workshop.title ?? "",
      description: workshop.description,
      slug: createWorkshopSlug(workshop.title ?? ""),
      content: workshop.content,
    })),
    slides: slides.map((slide) => ({
      id: slide.id,
      banner: slide.banner,
      description: slide.description,
    })),
    teamMembers: teamMembers.map((member) => ({
      id: member.id,
      name: member.user?.name ?? "",
      position: member.user?.position,
    })),
    pages,
    footerGroups: footerItems,
  };
}
