// Vercel route handler that serves the SPA for known routes and returns
// real HTTP 404s for unknown paths. Designed to be extended later for
// pre-rendered HTML (subtask 03) and Markdown content negotiation
// (subtask 04).

interface AcceptRange {
  type: string;
  subtype: string;
  q: number;
}

const KNOWN_ROUTE_PATTERNS: Array<(path: string) => boolean> = [
  (path) => path === "/",
  (path) => path === "/hakkimizda",
  (path) => path === "/iletisim",
  (path) => path === "/aktiviteler",
  (path) => /^\/aktiviteler\/[^/]+$/.test(path),
  (path) => /^\/sayfa\/[^/]+$/.test(path),
  (path) => path === "/about",
  (path) => path === "/contact",
  (path) => path === "/privacy",
];

function normalizePath(path: string): string {
  // Treat trailing slashes as their canonical version except for root.
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }
  return path;
}

export function isKnownRoute(path: string): boolean {
  const normalized = normalizePath(path);
  return KNOWN_ROUTE_PATTERNS.some((matches) => matches(normalized));
}

function parseAcceptHeader(accept: string): AcceptRange[] {
  return accept
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const [mediaRange, ...rawParams] = part.split(";").map((s) => s.trim());
      const [type, subtype] = mediaRange.toLowerCase().split("/");
      let q = 1;
      for (const param of rawParams) {
        const [key, value] = param.split("=").map((s) => s.trim());
        if (key === "q") {
          const parsed = parseFloat(value);
          q = Number.isNaN(parsed) ? 0 : parsed;
        }
      }
      return { type: type || "", subtype: subtype || "", q };
    })
    .filter((range) => range.q > 0);
}

export function acceptsMediaType(request: Request, mediaType: string): boolean {
  // Missing Accept defaults to HTML-only; Markdown must be explicitly requested.
  const accept = request.headers.get("accept") || "";
  const [targetType, targetSubtype] = mediaType.toLowerCase().split("/");
  const ranges = parseAcceptHeader(accept);

  return ranges.some((range) => {
    if (range.type === "*" && range.subtype === "*") return true;
    if (range.type !== targetType) return false;
    return range.subtype === "*" || range.subtype === targetSubtype;
  });
}

export function prefersMarkdown(request: Request): boolean {
  const accept = request.headers.get("accept") || "";
  const ranges = parseAcceptHeader(accept);

  // Only an EXPLICIT text/markdown entry counts; wildcards like */* must not
  // masquerade as Markdown support (otherwise */* would flip every browser
  // request to Markdown).
  const markdownRanges = ranges.filter(
    (range) => range.type === "text" && range.subtype === "markdown",
  );
  const htmlRanges = ranges.filter(
    (range) => range.type === "text" && range.subtype === "html",
  );

  const markdownQuality = markdownRanges.length
    ? Math.max(...markdownRanges.map((range) => range.q))
    : 0;
  const htmlQuality = htmlRanges.length
    ? Math.max(...htmlRanges.map((range) => range.q))
    : 0;

  // Markdown wins when it is explicitly requested and not strictly outranked
  // by an explicit text/html entry. Equal quality (the common
  // "text/markdown, text/html" case sent by crawlers) resolves to Markdown.
  return markdownQuality > 0 && markdownQuality >= htmlQuality;
}

export function buildMarkdown404(request: Request): string {
  const url = new URL(request.url);
  return `# 404 — Sayfa Bulunamadı

Aradığınız sayfa Otto Doğa Okulu sınırları içinde bulunamadı.

- **İstenen yol:** \`${url.pathname}\`
- **Site:** [Otto Doğa Okulu](https://ottodogaokulu.com)

Görünüşe göre yanlış patikaya saptınız. Güvenli yola dönmek için:

- [Ana Sayfaya Dön](/)
- [Aktiviteleri Keşfet](/aktiviteler)
- [Bize Ulaşın](/iletisim)
`;
}

function withVaryAccept(headers: Headers): Headers {
  const next = new Headers(headers);
  next.set("Vary", "Accept");
  return next;
}

export type MarkdownProvider = (
  path: string,
) => string | null | Promise<string | null>;

export function markdownUrlForPath(rawPath: string): string {
  const normalized = normalizePath(rawPath);
  if (normalized === "/") {
    return "/index.md";
  }
  return `${normalized}/index.md`;
}

async function resolveMarkdownForRoute(
  rawPath: string,
  request: Request,
  getMarkdown?: MarkdownProvider,
): Promise<string | null> {
  if (getMarkdown) {
    return getMarkdown(normalizePath(rawPath));
  }

  try {
    const markdownResponse = await fetch(
      new URL(markdownUrlForPath(rawPath), request.url),
    );
    if (!markdownResponse.ok) {
      return null;
    }
    return await markdownResponse.text();
  } catch {
    return null;
  }
}

export function createRouteHandler(
  fetchIndexHtml: (request: Request) => Promise<Response>,
  options: { getMarkdown?: MarkdownProvider } = {},
) {
  return async function handleRequest(request: Request): Promise<Response> {
    try {
      const url = new URL(request.url);
      const path = url.pathname;

      if (isKnownRoute(path)) {
        if (prefersMarkdown(request)) {
          const markdown = await resolveMarkdownForRoute(
            path,
            request,
            options.getMarkdown,
          );
          if (markdown) {
            return new Response(markdown, {
              status: 200,
              headers: {
                "Content-Type": "text/markdown; charset=utf-8",
                Vary: "Accept",
              },
            });
          }
        }

        const originResponse = await fetchIndexHtml(request);
        const headers = withVaryAccept(originResponse.headers);
        headers.delete("content-encoding");
        headers.delete("content-length");
        return new Response(originResponse.body, {
          status: 200,
          headers,
        });
      }

      if (prefersMarkdown(request)) {
        return new Response(buildMarkdown404(request), {
          status: 404,
          headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            Vary: "Accept",
          },
        });
      }

      const originResponse = await fetchIndexHtml(request);
      const headers = withVaryAccept(originResponse.headers);
      headers.delete("content-encoding");
      headers.delete("content-length");
      return new Response(originResponse.body, {
        status: 404,
        headers,
      });
    } catch {
      return new Response("Internal Server Error", {
        status: 500,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }
  };
}

export function htmlUrlForPath(rawPath: string): string {
  const normalized = normalizePath(rawPath);
  if (normalized === "/") {
    return "/index.html";
  }
  return `${normalized}/index.html`;
}

async function fetchRouteHtml(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const routeHtmlUrl = new URL(htmlUrlForPath(url.pathname), request.url);
  try {
    const routeResponse = await fetch(routeHtmlUrl, { headers: { "Accept-Encoding": "identity" } });
    if (routeResponse.ok) {
      return routeResponse;
    }
  } catch {
    // Fall through to the SPA shell.
  }
  return fetch(new URL("/index.html", request.url), { headers: { "Accept-Encoding": "identity" } });
}

export default {
  fetch: createRouteHandler(fetchRouteHtml),
};
