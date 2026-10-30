// tests/jsonld.test.ts
// Verifies complete Organization JSON-LD on every route.

import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";
import { buildOrganizationJsonLd, ORGANIZATION_DATA } from "../src/lib/jsonLd";
import { getPrerenderData } from "../src/lib/prerender/data-loader";
import { buildStaticPage, getRouteDefinitions } from "../src/lib/prerender/template";

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

function extractJsonLd(html: string): Record<string, unknown>[] {
  const matches = [
    ...html.matchAll(
      /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi,
    ),
  ];
  return matches.map((match) => JSON.parse(match[1]) as Record<string, unknown>);
}

describe("organization JSON-LD helper", () => {
  test("contains required Organization fields", () => {
    expect(ORGANIZATION_DATA["@context"]).toBe("https://schema.org");
    expect(ORGANIZATION_DATA["@type"]).toBe("Organization");
    expect(ORGANIZATION_DATA.name).toBe("Otto Doğa Okulu");
    expect(ORGANIZATION_DATA.description.length).toBeGreaterThan(50);
    expect(ORGANIZATION_DATA.url).toBe("https://www.ottodogaokulu.com/");
    expect(ORGANIZATION_DATA.logo).toContain("og-image.jpeg");
    expect(ORGANIZATION_DATA.image).toContain("og-image.jpeg");
    expect(ORGANIZATION_DATA.sameAs).toContain(
      "https://www.instagram.com/ottodogaokulu",
    );
    const address = ORGANIZATION_DATA.address as Record<string, string>;
    expect(address.streetAddress).toBeTruthy();
    expect(address.addressLocality).toBe("Pendik");
    expect(address.addressRegion).toBe("İstanbul");
    expect(address.postalCode).toBe("34916");
    expect(address.addressCountry).toBe("TR");
    const contactPoint = ORGANIZATION_DATA.contactPoint as Record<string, unknown>;
    expect(contactPoint.telephone).toBe("+905010144386");
    expect(contactPoint.email).toBe("info@ottodogapark.com");
  });

  test("serializes to valid JSON", () => {
    expect(() => JSON.parse(buildOrganizationJsonLd())).not.toThrow();
  });
});

describe("index.html fallback JSON-LD", () => {
  test("contains complete Organization", () => {
    const html = readFileSync(path.resolve(process.cwd(), "index.html"), "utf-8");
    const scripts = extractJsonLd(html);
    expect(scripts.length).toBeGreaterThanOrEqual(1);
    const org = scripts.find((item) => item["@type"] === "Organization");
    expect(org).toBeDefined();
    expect(org!["name"]).toBe("Otto Doğa Okulu");
    expect(org!["logo"]).toContain("og-image.jpeg");
    expect(org!["contactPoint"]).toBeDefined();
    expect(
      (org!["sameAs"] as string[]).some((url) => url.includes("instagram")),
    ).toBe(true);
  });
});

describe("pre-rendered JSON-LD", () => {
  test.each(routes.map((route) => [route.path]))(
    "route %s contains valid Organization JSON-LD",
    (routePath) => {
      const route = routes.find((item) => item.path === routePath);
      const html = buildStaticPage(baseHtml, route!);
      const scripts = extractJsonLd(html);
      expect(scripts.length).toBeGreaterThanOrEqual(1);
      const org = scripts.find((item) => item["@type"] === "Organization");
      expect(org).toBeDefined();
      expect(org!["url"]).toBe("https://www.ottodogaokulu.com/");
      expect(org!["contactPoint"]).toBeDefined();
      expect(org!["address"]).toBeDefined();
    },
  );
});
