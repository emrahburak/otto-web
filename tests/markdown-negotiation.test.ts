// tests/markdown-negotiation.test.ts
// Verifies Accept: text/markdown negotiation for homepage and key routes.
// Markdown is derived from the same src/data sources via the pre-render helpers.

import { describe, expect, test } from "vitest";
import {
  createRouteHandler,
  markdownUrlForPath,
  prefersMarkdown,
} from "../api/handler";
import { getPrerenderData } from "../src/lib/prerender/data-loader";
import {
  buildMarkdownForRoute,
  normalizeRoutePath,
  stripHtmlToText,
} from "../src/lib/prerender/markdown";

const data = getPrerenderData();
const getMarkdown = (path: string): string | null =>
  buildMarkdownForRoute(data, path);

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

const MARKDOWN_ROUTES = [
  "/",
  "/hakkimizda",
  "/iletisim",
  "/aktiviteler",
  `/aktiviteler/${data.workshops[0]?.slug}`,
  `/sayfa/${data.pages[0]?.slug}`,
];

describe("markdown helpers", () => {
  test("normalizeRoutePath strips trailing slash", () => {
    expect(normalizeRoutePath("/hakkimizda/")).toBe("/hakkimizda");
    expect(normalizeRoutePath("/")).toBe("/");
  });

  test("markdownUrlForPath maps routes to static .md files", () => {
    expect(markdownUrlForPath("/")).toBe("/index.md");
    expect(markdownUrlForPath("/hakkimizda")).toBe("/hakkimizda/index.md");
    expect(markdownUrlForPath("/aktiviteler/binicilik-atolyesi")).toBe(
      "/aktiviteler/binicilik-atolyesi/index.md",
    );
  });

  test("stripHtmlToText removes tags without losing Turkish content", () => {
    expect(stripHtmlToText("<p>Doğada öğren</p>")).toContain("Doğada öğren");
    expect(stripHtmlToText("<li>Orman Eğitimi</li>")).toContain("Orman Eğitimi");
  });
});

describe("buildMarkdownForRoute", () => {
  test.each(MARKDOWN_ROUTES)("builds markdown for %s", (routePath) => {
    const markdown = buildMarkdownForRoute(data, routePath);
    expect(markdown).not.toBeNull();
    expect(markdown as string).toContain("Otto Doğa Okulu");
    expect(markdown as string).toContain("https://www.ottodogaokulu.com");
  });

  test("returns null for unknown parameterized slugs", () => {
    expect(buildMarkdownForRoute(data, "/aktiviteler/unknown-slug")).toBeNull();
    expect(buildMarkdownForRoute(data, "/sayfa/unknown-slug")).toBeNull();
    expect(buildMarkdownForRoute(data, "/unknown")).toBeNull();
  });

  test("includes route-specific Turkish content", () => {
    expect(buildMarkdownForRoute(data, "/iletisim") as string).toContain(
      data.contact.phone,
    );
    expect(buildMarkdownForRoute(data, "/hakkimizda") as string).toContain(
      data.teamMembers[0]?.name ?? "Ekibimiz",
    );
  });
});

describe("markdown content negotiation", () => {
  test.each(MARKDOWN_ROUTES)(
    "GET %s with Accept: text/markdown returns markdown",
    async (routePath) => {
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
      const body = await response.text();
      expect(body).toContain("Otto Doğa Okulu");
    },
  );

  test("HTML is preserved without markdown Accept", async () => {
    const handler = createRouteHandler(
      () => Promise.resolve(makeIndexHtmlResponse()),
      { getMarkdown },
    );
    const response = await handler(makeRequest("/hakkimizda"));

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toContain("text/html");
    expect(response.headers.get("Vary")).toBe("Accept");
  });

  test("browser Accept header still returns HTML", async () => {
    const handler = createRouteHandler(
      () => Promise.resolve(makeIndexHtmlResponse()),
      { getMarkdown },
    );
    const response = await handler(
      makeRequest(
        "/",
        "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      ),
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toContain("text/html");
    expect(prefersMarkdown(makeRequest("/", "text/markdown"))).toBe(true);
  });

  test("trailing slash markdown request works", async () => {
    const handler = createRouteHandler(
      () => Promise.resolve(makeIndexHtmlResponse()),
      { getMarkdown },
    );
    const response = await handler(makeRequest("/hakkimizda/", "text/markdown"));

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe(
      "text/markdown; charset=utf-8",
    );
  });
});
