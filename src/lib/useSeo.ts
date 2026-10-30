import { useEffect } from "react";

// useSeo.ts — route-aware head helper. Keeps the existing title/description
// behavior and extends it with canonical + Open Graph tags so crawlers and
// agents receive consistent metadata on every route.

export const SITE_ORIGIN = "https://www.ottodogaokulu.com";
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.jpeg`;

export type OgType = "website" | "article";

interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: OgType;
  ogUrl?: string;
}

export function getCanonical(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http")) {
    return pathOrUrl;
  }
  const normalized = pathOrUrl === "/" ? "/" : pathOrUrl.replace(/\/$/, "");
  return `${SITE_ORIGIN}${normalized}`;
}

function upsertMetaByName(name: string, content: string): void {
  let element = document.querySelector(`meta[name='${name}']`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertMetaByProperty(property: string, content: string): void {
  let element = document.querySelector(`meta[property='${property}']`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertCanonical(href: string): void {
  let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

export function useSeo({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  ogUrl,
}: SeoProps): void {
  useEffect(() => {
    document.documentElement.setAttribute("lang", "tr");
    document.title = title;
    upsertMetaByName("description", description);

    const canonicalHref = canonical ?? getCanonical(window.location.pathname);
    upsertCanonical(canonicalHref);

    upsertMetaByProperty("og:title", ogTitle ?? title);
    upsertMetaByProperty("og:description", ogDescription ?? description);
    upsertMetaByProperty("og:image", ogImage);
    upsertMetaByProperty("og:type", ogType);
    upsertMetaByProperty("og:url", ogUrl ?? canonicalHref);
  }, [title, description, canonical, ogTitle, ogDescription, ogImage, ogType, ogUrl]);
}
