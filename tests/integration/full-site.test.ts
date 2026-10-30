// tests/integration/full-site.test.ts
// Full-site validation: every public endpoint + machine-readable file.

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";
import {
  createRouteHandler,
  htmlUrlForPath,
  isKnownRoute,
  markdownUrlForPath,
} from "../../api/handler";
import { getPrerenderData } from "../../src/lib/prerender/data-loader";
import { buildMarkdownForRoute } from "../../src/lib/prerender/markdown";
import { buildStaticPage, getRouteDefinitions } from "../../src/lib/prerender/template";

const data = getPrerenderData();
const routes = getRouteDefinitions(data);
const getMarkdown = (routePath: string): string | null =>
  buildMarkdownForRoute(data, routePath);

function makeRequest(routePath: string, accept?: string): Request {
  const headers: Record<string, string> = {};
  if (accept) {
    headers.Accept = accept;
  }
  return new Request(`https://ottodogaokulu.com${routePath}`, { headers });
}

function makeIndexHtmlResponse(): Response {
  return new Response('<div id="root"></div>', {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

const PUBLIC_ROUTES = [
  "/",
  "/hakkimizda",
  "/iletisim",
  "/aktiviteler",
  `/aktiviteler/${data.workshops[0]?.slug}`,
  `/sayfa/${data.pages[0]?.slug}`,
  "/about",
  "/contact",
  "/privacy",
];

describe("public endpoints", () => {
  test.each(PUBLIC_ROUTES)("%s is known and returns 200 HTML", async (routePath) => {
    expect(isKnownRoute(routePath)).toBe(true);
    const handler = createRouteHandler(
      () => Promise.resolve(makeIndexHtmlResponse()),
      { getMarkdown },
    );
    const response = await handler(makeRequest(routePath));
    expect(response.status).toBe(200);
    expect(response.headers.get("Vary")).toBe("Accept");
  });

  test.each(PUBLIC_ROUTES)("%s returns markdown with Vary: Accept", async (routePath) => {
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
  });

  test("unknown route returns 404 HTML and markdown variant", async () => {
    const handler = createRouteHandler(
      () => Promise.resolve(makeIndexHtmlResponse()),
      { getMarkdown },
    );
    const html404 = await handler(makeRequest("/yok-boyle-bir-yol"));
    expect(html404.status).toBe(404);
    const md404 = await handler(
      makeRequest("/yok-boyle-bir-yol", "text/markdown"),
    );
    expect(md404.status).toBe(404);
    expect(md404.headers.get("Content-Type")).toBe(
      "text/markdown; charset=utf-8",
    );
  });
});

describe("static url helpers", () => {
  test("htmlUrlForPath maps routes to prerendered files", () => {
    expect(htmlUrlForPath("/")).toBe("/index.html");
    expect(htmlUrlForPath("/hakkimizda")).toBe("/hakkimizda/index.html");
    expect(htmlUrlForPath("/hakkimizda/")).toBe("/hakkimizda/index.html");
  });

  test("markdownUrlForPath maps routes to markdown files", () => {
    expect(markdownUrlForPath("/")).toBe("/index.md");
    expect(markdownUrlForPath("/about")).toBe("/about/index.md");
  });
});

describe("machine-readable files", () => {
  test.each(["robots.txt", "llms.txt", "sitemap.xml"])(
    "dist/%s exists",
    (file) => {
      expect(existsSync(path.resolve(process.cwd(), "dist", file))).toBe(true);
    },
  );

  test.each(["robots.txt", "llms.txt", "sitemap.xml"])(
    "public/%s exists",
    (file) => {
      expect(existsSync(path.resolve(process.cwd(), "public", file))).toBe(true);
    },
  );
});

describe("prerendered output", () => {
  test("every route has dist HTML and Markdown", () => {
    for (const route of routes) {
      const relative = route.path === "/" ? "" : route.path.slice(1);
      expect(
        existsSync(path.resolve(process.cwd(), "dist", relative, "index.html")),
        `${route.path} html`,
      ).toBe(true);
      expect(
        existsSync(path.resolve(process.cwd(), "dist", relative, "index.md")),
        `${route.path} md`,
      ).toBe(true);
    }
  });

  test("every prerendered HTML has metadata + JSON-LD", () => {
    const baseHtml = readFileSync(
      path.resolve(process.cwd(), "dist", "index.html"),
      "utf-8",
    );
    expect(baseHtml).toContain('<html lang="tr"');
    expect(baseHtml).toContain('rel="canonical"');
    expect(baseHtml).toContain("application/ld+json");
    for (const route of routes) {
      const relative = route.path === "/" ? "" : route.path.slice(1);
      const html = readFileSync(
        path.resolve(process.cwd(), "dist", relative, "index.html"),
        "utf-8",
      );
      const canonical =
        route.path === "/"
          ? "https://www.ottodogaokulu.com/"
          : `https://www.ottodogaokulu.com${route.path}`;
      expect(html).toContain(`href="${canonical}"`);
      expect(html).toContain("application/ld+json");
      expect(html).toContain('"@type":"Organization"');
      const built = buildStaticPage(baseHtml, route);
      expect(built).toContain(canonical);
    }
  });
});
