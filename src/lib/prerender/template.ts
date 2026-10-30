// src/lib/prerender/template.ts
// Pure functions that render the same Turkish text and heading structure the
// React components produce, without depending on a browser environment. These
// templates are used both by the post-build script and by the test suite.

import type {
  PrerenderData,
  PrerenderPage,
  PrerenderTeamMember,
  PrerenderWorkshop,
} from "./types";

const SITE_ORIGIN = "https://www.ottodogaokulu.com";

const ORGANIZATION_JSON_LD = `{"@context":"https://schema.org","@type":"Organization","name":"Otto Doğa Okulu","description":"İstanbul Pendik'te OttodoğaPark içinde yer alan Otto Doğa Okulu; okul gezileri, yaz okulu, şirket motivasyon etkinlikleri ve doğum günü organizasyonları sunan, çocuklara yönelik atölye odaklı bütüncül bir orman okulu sistemidir.","url":"https://www.ottodogaokulu.com/","logo":"https://www.ottodogaokulu.com/og-image.jpeg","image":"https://www.ottodogaokulu.com/og-image.jpeg","telephone":"+905010144386","address":{"@type":"PostalAddress","streetAddress":"Kurna Mah. Kurtdoğmuş Yolu Cad. No: 63/1","addressLocality":"Pendik","addressRegion":"İstanbul","postalCode":"34916","addressCountry":"TR"},"geo":{"@type":"GeoCoordinates","latitude":"40.964004","longitude":"29.376206"},"sameAs":["https://www.instagram.com/ottodogaokulu","https://www.facebook.com/ottodogaokulu"],"contactPoint":{"@type":"ContactPoint","telephone":"+905010144386","email":"info@ottodogapark.com","contactType":"customer service","areaServed":"TR","availableLanguage":["tr"]},"parentOrganization":{"@type":"Organization","name":"Otto Doğa Park"}}`;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface Crumb {
  label: string;
  href?: string;
}

function renderBreadcrumb(items: Crumb[]): string {
  const currentLabel = items[items.length - 1]?.label ?? "";
  const listItems = items
    .map((item, index) => {
      const isLast = index === items.length - 1;
      const content = item.href && !isLast
        ? `<a href="${item.href}" class="hover:text-black transition-all duration-300 ease-in-out">${item.label.toLocaleUpperCase("tr")}</a>`
        : `<span>${item.label.toLocaleUpperCase("tr")}</span>`;
      const separator = isLast ? "" : `<span class="mx-2">~</span>`;
      return `<li class="flex items-center text-white font-display">${content}${separator}</li>`;
    })
    .join("");

  return `
    <nav aria-label="breadcrumb" class="w-full min-h-[288px] bg-[url(@/assets/ui/bg-heading.png)] bg-cover bg-center bg-no-repeat mt-5 flex items-center justify-center">
      <div>
        <h1 class="text-3xl text-white font-bold font-display text-center">${currentLabel.toLocaleUpperCase("tr")}</h1>
        <ol class="flex space-x-2 justify-center">${listItems}</ol>
      </div>
    </nav>
  `;
}

function extractCoordinates(mapUrl: string): { lat: number; lng: number } | null {
  const googleMatch = mapUrl.match(/@([- .\d]+),([- .\d]+)/) || mapUrl.match(/q=([- .\d]+),([- .\d]+)/);
  const appleMatch = mapUrl.match(/ll=([- .\d]+),([- .\d]+)/);

  if (googleMatch) {
    const [, lat, lng] = googleMatch;
    return { lat: parseFloat(lat), lng: parseFloat(lng) };
  }
  if (appleMatch) {
    const [, lat, lng] = appleMatch;
    return { lat: parseFloat(lat), lng: parseFloat(lng) };
  }
  return null;
}

function renderLocationField(mapUrl: string): string {
  const location = extractCoordinates(mapUrl);
  if (!location) {
    return '<div class="text-red-500">Konum alınamadı</div>';
  }
  const iframeSrc = `https://maps.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`;
  return `
    <section class="w-full bg-gray-100 p-4 rounded-xl shadow-md" style="height: 470px;">
      <a href="https://maps.google.com/?q=${location.lat},${location.lng}" target="_blank" rel="noopener noreferrer">
        <div class="rounded-lg overflow-hidden cursor-pointer border border-gray-300 hover:ring-2 hover:ring-blue-400 transition" style="height: 100%;">
          <iframe src="${iframeSrc}" allowfullscreen loading="lazy" title="Google Map" style="width: 100%; height: 100%; border: 0;"></iframe>
        </div>
      </a>
    </section>
  `;
}

function renderAboutField(content: { title: string; content: string }): string {
  return `
    <section class="py-10">
      <h2 class="text-4xl font-semibold mb-4 font-display text-center">${content.title}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 max-w-6xl mx-auto">
        <div class="flex flex-col items-center justify-center gap-5 w-full">
          <div class="prose prose-lg text-gray-700 font-display-02 space-y-3">${content.content}</div>
        </div>
      </div>
    </section>
  `;
}

function renderWorkshopCard(workshop: PrerenderWorkshop): string {
  return `
    <a href="/aktiviteler/${workshop.slug}" class="block w-full h-full min-h-[384px] shadow-md p-7 flex flex-col gap-5 text-gray-02 bg-gray-01 hover:shadow-xl transition-all duration-200 ease-in-out">
      <h3 class="text-lg font-semibold mb-2 text-center font-display text-black">${workshop.title}</h3>
      ${workshop.description ? `<p class="text-gray-600 text-sm leading-relaxed text-center font-display-02">${workshop.description}</p>` : ""}
    </a>
  `;
}

function renderTeamMember(member: PrerenderTeamMember): string {
  return `
    <article class="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
      <h3 class="font-display text-2xl">${member.name}</h3>
      ${member.position ? `<span class="font-display-02 text-gray-500">${member.position}</span>` : ""}
    </article>
  `;
}

export interface RouteDefinition {
  path: string;
  content: string;
  title: string;
  description: string;
  ogType?: "website" | "article";
  ogImage?: string;
}

const DEFAULT_OG_IMAGE = "https://www.ottodogaokulu.com/og-image.jpeg";

function renderHome(data: PrerenderData): RouteDefinition {
  const activityCards = data.workshops.map(renderWorkshopCard).join("");
  const slideItems = data.slides
    .map(
      (slide) => `
        <div class="relative w-full h-full flex flex-col justify-center items-center text-white p-4 gap-8">
          <h1 class="text-6xl font-semibold font-display text-center">${slide.banner ?? ""}</h1>
          ${slide.description ? `<p class="text-xl text-center max-w-md font-display-02">${slide.description}</p>` : ""}
        </div>
      `,
    )
    .join("");

  const content = `
    <div class="w-full">
      <section class="mySwiper w-full h-[600px]">${slideItems}</section>
      ${renderAboutField(data.aboutContent)}
      <section class="bg-gray-01 w-full space-y-14 py-16 grid grid-cols-1">
        <h2 class="font-display text-center font-normal text-4xl">ETKİNLİKLER</h2>
        <div class="w-full mx-auto max-w-full sm:max-w-xl md:max-w-4xl lg:max-w-6xl grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-4">${activityCards}</div>
        <a href="/aktiviteler" class="font-display font-semibold text-white py-2 px-6 bg-green-01 w-fit mx-auto rounded-full leading-normal hover:bg-orange-01">AKTİVİTELER</a>
      </section>
      ${renderLocationField(data.contact.map)}
    </div>
  `;

  return {
    path: "/",
    title: "Ana Sayfa – Otto Doğa Okulu",
    description: "Çocuklar için doğa temelli öğrenme ve keşif olanakları sunan Otto Doğa Okulu’nun ana sayfası.",
    content,
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
  };
}

function renderAbout(data: PrerenderData): RouteDefinition {
  const teamCards = data.teamMembers.map(renderTeamMember).join("");
  const content = `
    <div class="space-y-8">
      ${renderBreadcrumb([
        { label: "Anasayfa", href: "/" },
        { label: "Hakkımızda" },
      ])}
      ${renderAboutField(data.aboutContent)}
      <section class="w-full bg-gray-01 py-16 space-y-8">
        <h2 class="font-display text-center font-normal text-4xl">Ekibimizle Tanışın</h2>
        <div class="mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4" style="max-width: 1320px;">${teamCards}</div>
      </section>
    </div>
  `;

  return {
    path: "/hakkimizda",
    title: "Hakkımızda – Otto Doğa Okulu",
    description: "İstanbul Pendik’teki Otto Doğa Okulu’nun doğayla iç içe, çocuklara özel eğitim programları ve uzman kadrosu hakkında bilgi alın.",
    content,
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
  };
}

function renderContact(data: PrerenderData): RouteDefinition {
  const activityLinks = data.workshops
    .slice(0, 8)
    .map(
      (workshop) =>
        `<li><a href="/aktiviteler/${workshop.slug}">${workshop.title}</a></li>`,
    )
    .join("");
  const content = `
    <div class="space-y-8">
      ${renderBreadcrumb([
        { label: "Anasayfa", href: "/" },
        { label: "İletişim" },
      ])}
      <section class="w-full max-w-6xl mx-auto py-5">
        <h1 class="text-center font-semibold font-display text-3xl">İLETİŞİME GEÇİN</h1>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-7 py-16">
          <div class="flex flex-col items-center justify-start gap-1">
            <p class="font-display text-2xl">Telefon</p>
            <a href="tel:${data.contact.phone}" class="font-display-02 text-gray-500 hover:text-orange-01 text-lg text-center">${data.contact.phone}</a>
          </div>
          <div class="flex flex-col items-center justify-start gap-1">
            <p class="font-display text-2xl">Mail</p>
            <p class="font-display-02 text-gray-500 text-lg text-center">${data.contact.mail}</p>
          </div>
          <div class="flex flex-col items-center justify-start gap-1">
            <p class="font-display text-2xl">Adres</p>
            <p class="font-display-02 text-gray-500 text-lg text-center">${data.contact.address}</p>
          </div>
        </div>
      </section>
      <section class="w-full max-w-6xl mx-auto px-4 space-y-4">
        <h2 class="font-display text-2xl text-center">Otto Doğa Okulu'nu Tanıyın</h2>
        ${renderAboutField(data.aboutContent)}
        <p class="font-display-02 text-gray-500 text-center">Detaylı bilgi için <a href="/hakkimizda">Hakkımızda</a> sayfasına bakın.</p>
      </section>
      <section class="w-full max-w-6xl mx-auto px-4 space-y-4">
        <h2 class="font-display text-2xl text-center">Öne Çıkan Etkinlikler</h2>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-2 font-display-02 text-gray-500">${activityLinks}</ul>
        <p class="font-display-02 text-gray-500 text-center">Tüm programlar için <a href="/aktiviteler">Aktiviteler</a> sayfasına göz atın.</p>
      </section>
      <div id="location-section" class="pt-4">${renderLocationField(data.contact.map)}</div>
    </div>
  `;

  return {
    path: "/iletisim",
    title: "İletişim – Otto Doğa Okulu",
    description: "Otto Doğa Okulu ile iletişime geçin. Sorularınız, görüşleriniz ve kayıt işlemleri için bize ulaşabilirsiniz.",
    content,
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
  };
}

function renderActivities(data: PrerenderData): RouteDefinition {
  const activityCards = data.workshops.map(renderWorkshopCard).join("");
  const content = `
    <div class="space-y-8">
      ${renderBreadcrumb([
        { label: "Anasayfa", href: "/" },
        { label: "Aktiviteler" },
      ])}
      <div class="p-8 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">${activityCards}</div>
    </div>
  `;

  return {
    path: "/aktiviteler",
    title: "Aktiviteler – Otto Doğa Okulu",
    description: "Otto Doğa Okulu’nun doğa temelli, öğretici ve eğlenceli etkinlikleri hakkında bilgi alın.",
    content,
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
  };
}

function renderServiceDetail(workshop: PrerenderWorkshop): RouteDefinition {
  const content = `
    <div class="space-y-8">
      ${renderBreadcrumb([
        { label: "Anasayfa", href: "/" },
        { label: "Aktiviteler", href: "/aktiviteler" },
        { label: workshop.title },
      ])}
      <div class="w-full max-w-6xl mx-auto space-y-8 px-4">
        <h1 class="text-3xl font-bold text-center font-display">${workshop.title}</h1>
        ${workshop.content ? `<div class="w-full h-fit font-display-02 text-gray-500 text-center">${workshop.content}</div>` : ""}
      </div>
    </div>
  `;

  return {
    path: `/aktiviteler/${workshop.slug}`,
    title: `${workshop.title} – Otto Doğa Okulu`,
    description: workshop.description ?? "Otto Doğa Okulu etkinlik detayları.",
    content,
    ogType: "article",
    ogImage: DEFAULT_OG_IMAGE,
  };
}

function renderPageDetail(page: PrerenderPage): RouteDefinition {
  const content = `
    <div>
      ${renderBreadcrumb([
        { label: "Anasayfa", href: "/" },
        { label: page.breadcrumbLabel },
      ])}
      <div class="w-full max-w-6xl mx-auto py-10 px-4 space-y-7">
        <h2 class="text-2xl font-semibold font-display text-center">${page.title}</h2>
        <div class="prose prose-lg mx-auto">${page.content}</div>
      </div>
    </div>
  `;

  return {
    path: `/sayfa/${page.slug}`,
    title: `${page.title} – Otto Doğa Okulu`,
    description: page.description,
    content,
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
  };
}

export function getRouteDefinitions(data: PrerenderData): RouteDefinition[] {
  const serviceRoutes = data.workshops.map((workshop) => renderServiceDetail(workshop));
  const pageRoutes = data.pages.map((page) => renderPageDetail(page));
  const home = renderHome(data);
  const about = renderAbout(data);
  const contact = renderContact(data);
  const activities = renderActivities(data);
  const gizlilik = pageRoutes.find((route) => route.path === "/sayfa/gizlilik");

  const trustAnchors: RouteDefinition[] = [
    { ...about, path: "/about" },
    { ...contact, path: "/contact" },
  ];
  if (gizlilik) {
    trustAnchors.push({ ...gizlilik, path: "/privacy" });
  }

  return [
    home,
    about,
    contact,
    activities,
    ...serviceRoutes,
    ...pageRoutes,
    ...trustAnchors,
  ];
}

export function buildStaticPage(
  baseHtml: string,
  route: RouteDefinition,
): string {
  const canonical = route.path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${route.path}`;
  const ogType = route.ogType ?? "website";
  const ogImage = route.ogImage ?? DEFAULT_OG_IMAGE;

  let html = baseHtml;
  html = html.replace(/<html\s+lang="[^"]*"/i, `<html lang="tr"`);
  html = html.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`);
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"/i,
    `<meta name="description" content="${escapeHtml(route.description)}"`,
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"/i,
    `<meta property="og:title" content="${escapeHtml(route.title)}"`,
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"/i,
    `<meta property="og:description" content="${escapeHtml(route.description)}"`,
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"/i,
    `<meta property="og:url" content="${escapeHtml(canonical)}"`,
  );
  html = html.replace(
    /<meta\s+property="og:type"\s+content="[^"]*"/i,
    `<meta property="og:type" content="${ogType}"`,
  );
  if (/<meta\s+property="og:image"/i.test(html)) {
    html = html.replace(
      /<meta\s+property="og:image"\s+content="[^"]*"/i,
      `<meta property="og:image" content="${escapeHtml(ogImage)}"`,
    );
  } else {
    html = html.replace(
      "</head>",
      `  <meta property="og:image" content="${escapeHtml(ogImage)}" />\n  </head>`,
    );
  }
  if (/<link\s+rel="canonical"/i.test(html)) {
    html = html.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
      `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    );
  } else {
    html = html.replace(
      "</head>",
      `  <link rel="canonical" href="${escapeHtml(canonical)}" />\n  </head>`,
    );
  }
  const jsonLdTag = `<script type="application/ld+json">${ORGANIZATION_JSON_LD}</script>`;
  if (/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i.test(html)) {
    html = html.replace(
      /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i,
      jsonLdTag,
    );
  } else {
    html = html.replace("</head>", `  ${jsonLdTag}\n  </head>`);
  }
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${route.content}</div>`,
  );

  return html;
}
