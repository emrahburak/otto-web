// tests/prerender.test.ts
// Verifies that the pre-render templates emit the same Turkish text and route
// structure the React app renders. These tests run against the pure template
// functions, so they do not require a production build or a browser.

import { describe, expect, test } from "vitest";
import { getPrerenderData } from "../src/lib/prerender/data-loader";
import type { PrerenderData } from "../src/lib/prerender/types";
import { buildStaticPage, getRouteDefinitions } from "../src/lib/prerender/template";

function loadData(): PrerenderData {
  return getPrerenderData();
}

const baseHtml = `<!doctype html>
<html lang="tr">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content="Default description" />
    <meta property="og:title" content="Default OG title" />
    <meta property="og:description" content="Default OG description" />
    <meta property="og:url" content="https://example.com/" />
    <title>Default title</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/main.js"></script>
  </body>
</html>`;

describe("pre-render route definitions", () => {
  test("generates the expected public routes", () => {
    const data = loadData();
    const routes = getRouteDefinitions(data);
    const paths = routes.map((route) => route.path);

    expect(paths).toContain("/");
    expect(paths).toContain("/hakkimizda");
    expect(paths).toContain("/iletisim");
    expect(paths).toContain("/aktiviteler");

    for (const workshop of data.workshops) {
      expect(paths).toContain(`/aktiviteler/${workshop.slug}`);
    }

    for (const page of data.pages) {
      expect(paths).toContain(`/sayfa/${page.slug}`);
    }
  });

  test("every route has a title, description and non-empty content", () => {
    const data = loadData();
    const routes = getRouteDefinitions(data);

    for (const route of routes) {
      expect(route.title.length).toBeGreaterThan(0);
      expect(route.description.length).toBeGreaterThan(0);
      expect(route.content.length).toBeGreaterThan(0);
    }
  });
});

describe("home page pre-render", () => {
  test("contains the hero slides, about content and main activity titles", () => {
    const data = loadData();
    const route = getRouteDefinitions(data).find((r) => r.path === "/");
    expect(route).toBeDefined();
    expect(route!.content).toContain(data.aboutContent.title);
    expect(route!.content).toContain("Doğada öğren, özgürce geliş!");
    expect(route!.content).toContain("ETKİNLİKLER");

    // At least one slide banner is rendered in the hero area.
    expect(route!.content).toContain(data.slides[0]?.banner ?? "");

    for (const workshop of data.workshops) {
      expect(route!.content).toContain(workshop.title);
    }
  });
});

describe("about page pre-render", () => {
  test("contains the team members and Turkish about content", () => {
    const data = loadData();
    const route = getRouteDefinitions(data).find((r) => r.path === "/hakkimizda");
    expect(route).toBeDefined();
    expect(route!.content).toContain("HAKKIMIZDA");
    expect(route!.content).toContain(data.aboutContent.title);
    expect(route!.content).toContain("Ekibimizle Tanışın");

    for (const member of data.teamMembers) {
      expect(route!.content).toContain(member.name);
    }
  });
});

describe("contact page pre-render", () => {
  test("contains the Turkish contact headings and data", () => {
    const data = loadData();
    const route = getRouteDefinitions(data).find((r) => r.path === "/iletisim");
    expect(route).toBeDefined();
    expect(route!.content).toContain("İLETİŞİME GEÇİN");
    expect(route!.content).toContain(data.contact.phone);
    expect(route!.content).toContain(data.contact.mail);
    expect(route!.content).toContain(data.contact.address);
    expect(route!.content).toContain("Google Map");
  });
});

describe("activities list pre-render", () => {
  test("contains every workshop title", () => {
    const data = loadData();
    const route = getRouteDefinitions(data).find((r) => r.path === "/aktiviteler");
    expect(route).toBeDefined();
    expect(route!.content).toContain("AKTİVİTELER");

    for (const workshop of data.workshops) {
      expect(route!.content).toContain(workshop.title);
      expect(route!.content).toContain(`/aktiviteler/${workshop.slug}`);
    }
  });
});

describe("activity detail pre-render", () => {
  test("each workshop renders its own Turkish title and content", () => {
    const data = loadData();
    const routes = getRouteDefinitions(data);

    for (const workshop of data.workshops) {
      const route = routes.find((r) => r.path === `/aktiviteler/${workshop.slug}`);
      expect(route).toBeDefined();
      expect(route!.title).toContain(workshop.title);
      expect(route!.content).toContain(workshop.title);
      if (workshop.content) {
        expect(route!.content).toContain(workshop.content);
      }
    }
  });
});

describe("info page pre-render", () => {
  test("renders the privacy policy and not-found pages", () => {
    const data = loadData();
    const routes = getRouteDefinitions(data);

    const privacy = routes.find((r) => r.path === "/sayfa/gizlilik");
    expect(privacy).toBeDefined();
    expect(privacy!.content).toContain("Gizlilik Politikası ve KVKK Aydınlatma Metni");

    const notFound = routes.find((r) => r.path === "/sayfa/404");
    expect(notFound).toBeDefined();
    expect(notFound!.content).toContain("404");
    expect(notFound!.content).toContain("Ana Sayfaya Dön");
  });
});

describe("full page assembly", () => {
  test("injects content into the SPA shell and updates metadata", () => {
    const data = loadData();
    const route = getRouteDefinitions(data).find((r) => r.path === "/iletisim")!;
    const html = buildStaticPage(baseHtml, route);

    expect(html).toContain(`<title>${route.title}</title>`);
    expect(html).toContain(`<div id="root">${route.content}</div>`);
    expect(html).toContain(`<meta name="description" content="${route.description}"`);
    expect(html).toContain(`<meta property="og:title" content="${route.title}"`);
    expect(html).toContain(`<meta property="og:url" content="https://www.ottodogaokulu.com/iletisim"`);
    expect(html).toContain('<link rel="canonical" href="https://www.ottodogaokulu.com/iletisim"');
    expect(html).toContain('<script type="module" src="/assets/main.js"></script>');
  });

  test("preserves the root shell for React hydration", () => {
    const data = loadData();
    const route = getRouteDefinitions(data).find((r) => r.path === "/hakkimizda")!;
    const html = buildStaticPage(baseHtml, route);

    expect(html).toContain('<div id="root">');
    expect(html).toContain("</div>");
    expect(html).toContain(route.content);
  });
});
