// tests/trust-anchors.test.ts
// Verifies trust-anchor aliases reuse existing Turkish content.

import { describe, expect, test } from "vitest";
import { createRouteHandler, isKnownRoute } from "../api/handler";
import { getPrerenderData } from "../src/lib/prerender/data-loader";
import { buildMarkdownForRoute, stripHtmlToText } from "../src/lib/prerender/markdown";
import { buildStaticPage, getRouteDefinitions } from "../src/lib/prerender/template";

const data = getPrerenderData();
const routes = getRouteDefinitions(data);

function makeRequest(path: string, accept?: string): Request {
  const headers: Record<string, string> = {};
  if (accept) {
    headers.Accept = accept;
  }
  return new Request(`https://ottodogaokulu.com${path}`, { headers });
}

function makeIndexHtmlResponse(): Response {
  return new Response('<div id="root"></div>', {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

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

describe("trust-anchor routing", () => {
  test.each(["/about", "/contact", "/privacy"])(
    "%s is a known route",
    (routePath) => {
      expect(isKnownRoute(routePath)).toBe(true);
    },
  );

  test.each(["/hakkimizda", "/iletisim", "/sayfa/gizlilik"])(
    "%s Turkish primary still works",
    (routePath) => {
      expect(isKnownRoute(routePath)).toBe(true);
    },
  );

  test.each(["/about", "/contact", "/privacy"])(
    "GET %s returns 200 HTML",
    async (routePath) => {
      const getMarkdown = (path: string): string | null =>
        buildMarkdownForRoute(data, path);
      const handler = createRouteHandler(
        () => Promise.resolve(makeIndexHtmlResponse()),
        { getMarkdown },
      );
      const response = await handler(makeRequest(routePath));
      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toContain("text/html");
    },
  );

  test.each(["/about", "/contact", "/privacy"])(
    "GET %s with markdown Accept returns markdown",
    async (routePath) => {
      const getMarkdown = (path: string): string | null =>
        buildMarkdownForRoute(data, path);
      const handler = createRouteHandler(
        () => Promise.resolve(makeIndexHtmlResponse()),
        { getMarkdown },
      );
      const response = await handler(makeRequest(routePath, "text/markdown"));
      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe(
        "text/markdown; charset=utf-8",
      );
      expect(response.headers.get("Vary")).toBe("Accept");
    },
  );
});

describe("trust-anchor content", () => {
  test.each(["/about", "/contact", "/privacy"])(
    "%s pre-rendered HTML has >=500 chars and self canonical",
    (routePath) => {
      const route = routes.find((item) => item.path === routePath);
      expect(route).toBeDefined();
      const html = buildStaticPage(baseHtml, route!);
      const canonical =
        routePath === "/"
          ? "https://www.ottodogaokulu.com/"
          : `https://www.ottodogaokulu.com${routePath}`;
      expect(html).toContain(`<link rel="canonical" href="${canonical}"`);
      const visible = stripHtmlToText(route!.content);
      expect(visible.length).toBeGreaterThanOrEqual(500);
    },
  );

  test("/about reuses Hakkımızda content", () => {
    const route = routes.find((item) => item.path === "/about");
    expect(route!.content).toContain("Ekibimizle Tanışın");
  });

  test("/contact reuses İletişim content", () => {
    const route = routes.find((item) => item.path === "/contact");
    expect(route!.content).toContain(data.contact.phone);
    expect(route!.content).toContain(data.contact.mail);
  });

  test("/privacy reuses Gizlilik content", () => {
    const route = routes.find((item) => item.path === "/privacy");
    const primary = routes.find((item) => item.path === "/sayfa/gizlilik");
    expect(route).toBeDefined();
    expect(primary).toBeDefined();
    expect(route!.title).toBe(primary!.title);
    expect(route!.content).toContain("KVKK");
  });

  test.each(["/about", "/contact", "/privacy"])(
    "%s markdown has >=200 chars",
    (routePath) => {
      const markdown = buildMarkdownForRoute(data, routePath);
      expect(markdown).not.toBeNull();
      expect((markdown as string).length).toBeGreaterThanOrEqual(200);
    },
  );
});
