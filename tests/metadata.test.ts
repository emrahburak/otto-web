// tests/metadata.test.ts
// Verifies route-aware metadata: html lang, canonical, Open Graph tags.

import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";
import { getPrerenderData } from "../src/lib/prerender/data-loader";
import { buildStaticPage, getRouteDefinitions } from "../src/lib/prerender/template";
import { DEFAULT_OG_IMAGE, getCanonical } from "../src/lib/useSeo";

const data = getPrerenderData();
const routes = getRouteDefinitions(data);

const baseHtml = `<!doctype html>
<html lang="tr">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content="Default description" />
    <meta property="og:title" content="Default OG title" />
    <meta property="og:description" content="Default OG description" />
    <meta property="og:image" content="https://www.ottodogaokulu.com/og-image.jpeg" />
    <meta property="og:url" content="https://example.com/" />
    <meta property="og:type" content="website" />
    <link rel="canonical" href="https://www.ottodogaokulu.com/" />
    <title>Default title</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;

describe("getCanonical", () => {
  test("builds canonical URLs for routes", () => {
    expect(getCanonical("/")).toBe("https://www.ottodogaokulu.com/");
    expect(getCanonical("/hakkimizda")).toBe(
      "https://www.ottodogaokulu.com/hakkimizda",
    );
    expect(getCanonical("/aktiviteler/binicilik-atolyesi")).toBe(
      "https://www.ottodogaokulu.com/aktiviteler/binicilik-atolyesi",
    );
  });

  test("strips trailing slash except root", () => {
    expect(getCanonical("/hakkimizda/")).toBe(
      "https://www.ottodogaokulu.com/hakkimizda",
    );
  });
});

describe("index.html base metadata", () => {
  test("uses Turkish lang and homepage canonical", () => {
    const html = readFileSync(path.resolve(process.cwd(), "index.html"), "utf-8");
    expect(html).toContain('<html lang="tr"');
    expect(html).toContain('rel="canonical"');
    expect(html).toContain("https://www.ottodogaokulu.com/");
    expect(html).toContain('property="og:image"');
    expect(html).toContain('property="og:type"');
    expect(html).toContain(DEFAULT_OG_IMAGE);
  });
});

describe("pre-rendered route metadata", () => {
  test.each(routes.map((route) => [route.path]))(
    "route %s has lang, canonical, and Open Graph tags",
    (routePath) => {
      const route = routes.find((item) => item.path === routePath);
      expect(route).toBeDefined();
      const html = buildStaticPage(baseHtml, route!);
      const canonical =
        routePath === "/" ? "https://www.ottodogaokulu.com/" : `https://www.ottodogaokulu.com${routePath}`;

      expect(html).toContain('<html lang="tr"');
      expect(html).toContain(`<link rel="canonical" href="${canonical}"`);
      expect(html).toContain(`<meta property="og:url" content="${canonical}"`);
      expect(html).toContain('<meta property="og:title"');
      expect(html).toContain('<meta property="og:description"');
      expect(html).toContain('<meta property="og:image"');
      expect(html).toContain('<meta property="og:type"');
      expect(html.match(/rel="canonical"/g)?.length).toBe(1);
    },
  );

  test("activity detail uses og:type article", () => {
    const detail = routes.find((item) => item.path.startsWith("/aktiviteler/"));
    expect(detail).toBeDefined();
    const html = buildStaticPage(baseHtml, detail!);
    expect(html).toContain('<meta property="og:type" content="article"');
  });

  test("list pages use og:type website", () => {
    for (const listPath of ["/", "/hakkimizda", "/iletisim", "/aktiviteler"]) {
      const route = routes.find((item) => item.path === listPath);
      expect(route).toBeDefined();
      const html = buildStaticPage(baseHtml, route!);
      expect(html).toContain('<meta property="og:type" content="website"');
    }
  });
});
