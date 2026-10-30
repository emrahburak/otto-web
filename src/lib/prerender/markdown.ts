// src/lib/prerender/markdown.ts
// Pure Markdown builders derived from the same PrerenderData the HTML
// pre-render uses. No browser or Vite-specific imports so this module is
// safe to unit-test and to bundle for edge runtimes.

import type { PrerenderData } from "./types";

const SITE_ORIGIN = "https://www.ottodogaokulu.com";

function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export function stripHtmlToText(value: string): string {
  return decodeEntities(
    value
      .replace(/<li[^>]*>/gi, "\n- ")
      .replace(/<\/(h1|h2|h3|p|ul|ol|div|section|article)[^>]*>/gi, "\n")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim(),
  );
}

function canonicalFor(path: string): string {
  return path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
}

function documentShell(
  title: string,
  description: string,
  canonical: string,
  body: string,
): string {
  return `# ${title}\n\n> ${description}\n\n- **Kanonik URL:** ${canonical}\n\n${body.trim()}\n`;
}

function homeBody(data: PrerenderData): string {
  const slides = data.slides
    .map((slide) => {
      const banner = (slide.banner ?? "").trim();
      const description = stripHtmlToText(slide.description ?? "");
      return banner
        ? `## ${banner}\n\n${description}`.trim()
        : description;
    })
    .filter(Boolean)
    .join("\n\n");

  const activities = data.workshops
    .map((workshop) => `- [${workshop.title}](/aktiviteler/${workshop.slug}) — ${workshop.description ?? ""}`.trim())
    .join("\n");

  const about = stripHtmlToText(`${data.aboutContent.title}\n\n${data.aboutContent.content}`);

  return `${slides}\n\n## ${data.aboutContent.title}\n\n${about}\n\n## Etkinlikler\n\n${activities}\n\n## İletişim\n\n- **Telefon:** ${data.contact.phone}\n- **E-posta:** ${data.contact.mail}\n- **Adres:** ${data.contact.address}\n`;
}

function aboutBody(data: PrerenderData): string {
  const about = stripHtmlToText(data.aboutContent.content);
  const team = data.teamMembers
    .map((member) =>
      `- **${member.name}**${member.position ? ` — ${member.position}` : ""}`,
    )
    .join("\n");

  return `## ${data.aboutContent.title}\n\n${about}\n\n## Ekibimizle Tanışın\n\n${team}\n`;
}

function contactBody(data: PrerenderData): string {
  const aboutExcerpt = stripHtmlToText(data.aboutContent.content).slice(0, 600);
  const activitySummary = data.workshops
    .slice(0, 8)
    .map((workshop) => `- [${workshop.title}](/aktiviteler/${workshop.slug})`)
    .join("\n");

  return `## İletişime Geçin\n\n- **Telefon:** [${data.contact.phone}](tel:${data.contact.phone})\n- **E-posta:** ${data.contact.mail}\n- **Adres:** ${data.contact.address}\n- **Harita:** ${data.contact.map}\n\n## Otto Doğa Okulu'nu Tanıyın\n\n${aboutExcerpt}\n\nDetaylı bilgi için [Hakkımızda](/hakkimizda) sayfasına bakın.\n\n## Öne Çıkan Etkinlikler\n\n${activitySummary}\n\nTüm programlar için [Aktiviteler](/aktiviteler) sayfasına göz atın.\n`;
}

function activitiesBody(data: PrerenderData): string {
  const cards = data.workshops
    .map(
      (workshop) =>
        `## [${workshop.title}](/aktiviteler/${workshop.slug})\n\n${stripHtmlToText(workshop.description ?? "")}`,
    )
    .join("\n\n");

  return `Otto Doğa Okulu'nun doğa temelli etkinlikleri:\n\n${cards}\n`;
}

function workshopBody(
  workshop: PrerenderData["workshops"][number],
): string {
  const content = stripHtmlToText(workshop.content ?? workshop.description ?? "");
  return `## ${workshop.title}\n\n${content}\n\n- [Tüm Aktiviteler](/aktiviteler)\n- [İletişim](/iletisim)\n`;
}

function pageBody(page: PrerenderData["pages"][number]): string {
  const content = stripHtmlToText(page.content);
  return `## ${page.title}\n\n${content}\n`;
}

export function normalizeRoutePath(path: string): string {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }
  return path || "/";
}

export function buildMarkdownForRoute(
  data: PrerenderData,
  rawPath: string,
): string | null {
  const path = normalizeRoutePath(rawPath);

  if (path === "/") {
    return documentShell(
      "Ana Sayfa – Otto Doğa Okulu",
      "Çocuklar için doğa temelli öğrenme ve keşif olanakları sunan Otto Doğa Okulu'nun ana sayfası.",
      canonicalFor(path),
      homeBody(data),
    );
  }

  if (path === "/hakkimizda" || path === "/about") {
    return documentShell(
      "Hakkımızda – Otto Doğa Okulu",
      "İstanbul Pendik'teki Otto Doğa Okulu'nun eğitim programları ve kadrosu.",
      canonicalFor(path),
      aboutBody(data),
    );
  }

  if (path === "/iletisim" || path === "/contact") {
    return documentShell(
      "İletişim – Otto Doğa Okulu",
      "Otto Doğa Okulu ile iletişime geçin.",
      canonicalFor(path),
      contactBody(data),
    );
  }

  if (path === "/aktiviteler") {
    return documentShell(
      "Aktiviteler – Otto Doğa Okulu",
      "Otto Doğa Okulu'nun doğa temelli etkinlikleri.",
      canonicalFor(path),
      activitiesBody(data),
    );
  }

  const workshopMatch = path.match(/^\/aktiviteler\/([^/]+)$/);
  if (workshopMatch) {
    const workshop = data.workshops.find((item) => item.slug === workshopMatch[1]);
    if (!workshop) {
      return null;
    }
    return documentShell(
      `${workshop.title} – Otto Doğa Okulu`,
      workshop.description ?? "Otto Doğa Okulu etkinlik detayları.",
      canonicalFor(path),
      workshopBody(workshop),
    );
  }

  if (path === "/privacy") {
    const page = data.pages.find((item) => item.slug === "gizlilik");
    if (!page) {
      return null;
    }
    return documentShell(
      `${page.title} – Otto Doğa Okulu`,
      page.description,
      canonicalFor(path),
      pageBody(page),
    );
  }

  const pageMatch = path.match(/^\/sayfa\/([^/]+)$/);
  if (pageMatch) {
    const page = data.pages.find((item) => item.slug === pageMatch[1]);
    if (!page) {
      return null;
    }
    return documentShell(
      `${page.title} – Otto Doğa Okulu`,
      page.description,
      canonicalFor(path),
      pageBody(page),
    );
  }

  return null;
}

export function buildMarkdownIndex(
  data: PrerenderData,
  paths: string[],
): Record<string, string> {
  const index: Record<string, string> = {};
  for (const routePath of paths) {
    const markdown = buildMarkdownForRoute(data, routePath);
    if (markdown) {
      index[normalizeRoutePath(routePath)] = markdown;
    }
  }
  return index;
}
