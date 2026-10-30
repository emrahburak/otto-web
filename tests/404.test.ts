import { describe, expect, test } from "vitest";
import {
  acceptsMediaType,
  buildMarkdown404,
  createRouteHandler,
  isKnownRoute,
  prefersMarkdown,
} from "../api/handler";

function makeRequest(path: string, headers: Record<string, string> = {}): Request {
  return new Request(`https://ottodogaokulu.com${path}`, { headers });
}

function makeIndexHtmlResponse(): Response {
  return new Response('<div id="root"></div>', {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

describe("isKnownRoute", () => {
  test.each([
    "/",
    "/hakkimizda",
    "/iletisim",
    "/aktiviteler",
    "/aktiviteler/binicilik-atolyesi",
    "/sayfa/gizlilik",
    "/hakkimizda/",
  ])("returns true for known route %s", (path) => {
    expect(isKnownRoute(path)).toBe(true);
  });

  test.each([
    "/unknown",
    "/api/users",
    "/foo/bar/baz",
    "/deeply/nested/unknown/path",
  ])("returns false for unknown route %s", (path) => {
    expect(isKnownRoute(path)).toBe(false);
  });
});

describe("acceptsMediaType", () => {
  test("detects exact text/markdown", () => {
    const request = makeRequest("/x", { Accept: "text/markdown" });
    expect(acceptsMediaType(request, "text/markdown")).toBe(true);
  });

  test("returns false when Accept header is missing", () => {
    const request = makeRequest("/x");
    expect(acceptsMediaType(request, "text/markdown")).toBe(false);
  });

  test("detects text/markdown among other types", () => {
    const request = makeRequest("/x", {
      Accept: "text/html, text/markdown;q=0.9, */*;q=0.8",
    });
    expect(acceptsMediaType(request, "text/markdown")).toBe(true);
  });

  test("detects wildcard */*", () => {
    const request = makeRequest("/x", { Accept: "text/html, */*;q=0.8" });
    expect(acceptsMediaType(request, "text/markdown")).toBe(true);
  });

  test("detects text/* wildcard", () => {
    const request = makeRequest("/x", { Accept: "text/*" });
    expect(acceptsMediaType(request, "text/markdown")).toBe(true);
  });

  test("returns false when markdown is excluded", () => {
    const request = makeRequest("/x", { Accept: "text/html, application/json" });
    expect(acceptsMediaType(request, "text/markdown")).toBe(false);
  });

  test("respects q=0", () => {
    const request = makeRequest("/x", {
      Accept: "text/markdown;q=0, text/html",
    });
    expect(acceptsMediaType(request, "text/markdown")).toBe(false);
  });
});

describe("prefersMarkdown", () => {
  test("returns true when text/markdown has higher quality than text/html", () => {
    const request = makeRequest("/x", {
      Accept: "text/markdown;q=1, text/html;q=0.9",
    });
    expect(prefersMarkdown(request)).toBe(true);
  });

  test("returns false when text/html has higher quality", () => {
    const request = makeRequest("/x", {
      Accept: "text/html, text/markdown;q=0.9",
    });
    expect(prefersMarkdown(request)).toBe(false);
  });

  test("returns false for typical browser Accept header", () => {
    const request = makeRequest("/x", {
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    });
    expect(prefersMarkdown(request)).toBe(false);
  });

  test("returns false when Accept header is missing", () => {
    const request = makeRequest("/x");
    expect(prefersMarkdown(request)).toBe(false);
  });
});

describe("buildMarkdown404", () => {
  test("includes the requested path and 404 heading", () => {
    const body = buildMarkdown404(makeRequest("/missing-page"));
    expect(body).toContain("# 404");
    expect(body).toContain("/missing-page");
    expect(body).toContain("Otto Doğa Okulu");
  });
});

describe("route handler", () => {
  test.each([
    "/",
    "/hakkimizda",
    "/iletisim",
    "/aktiviteler",
    "/aktiviteler/binicilik-atolyesi",
    "/sayfa/gizlilik",
  ])(
    "GET %s returns 200 with the SPA index.html",
    async (path) => {
      const handler = createRouteHandler(() => Promise.resolve(makeIndexHtmlResponse()));
      const response = await handler(makeRequest(path));
      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toContain("text/html");
      expect(response.headers.get("Vary")).toBe("Accept");
    }
  );

  test("unknown path without markdown accept returns 404 HTML", async () => {
    const handler = createRouteHandler(() => Promise.resolve(makeIndexHtmlResponse()));
    const response = await handler(makeRequest("/non-existent-path"));
    expect(response.status).toBe(404);
    expect(response.headers.get("Content-Type")).toContain("text/html");
    expect(response.headers.get("Vary")).toBe("Accept");
    const body = await response.text();
    expect(body).toContain('<div id="root"></div>');
  });

  test("unknown path with browser Accept header returns 404 HTML", async () => {
    const handler = createRouteHandler(() => Promise.resolve(makeIndexHtmlResponse()));
    const response = await handler(
      makeRequest("/non-existent-path", {
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      })
    );
    expect(response.status).toBe(404);
    expect(response.headers.get("Content-Type")).toContain("text/html");
  });

  test("unknown path with Accept: text/markdown returns 404 markdown", async () => {
    const handler = createRouteHandler(() => Promise.resolve(makeIndexHtmlResponse()));
    const response = await handler(
      makeRequest("/non-existent-path", { Accept: "text/markdown" })
    );
    expect(response.status).toBe(404);
    expect(response.headers.get("Content-Type")).toBe("text/markdown; charset=utf-8");
    expect(response.headers.get("Vary")).toBe("Accept");
    const body = await response.text();
    expect(body).toContain("# 404");
    expect(body).toContain("/non-existent-path");
  });
});
