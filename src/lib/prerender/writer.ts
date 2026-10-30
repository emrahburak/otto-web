// src/lib/prerender/writer.ts
// Post-build writer that creates one static HTML file per public route inside
// dist/. It reuses the exact data sources the React app renders so agents and
// no-JS clients receive the same Turkish content in the same order.

import fs from "node:fs/promises";
import path from "node:path";
import { createServer, type ViteDevServer } from "vite";
import type { PrerenderData } from "./types";
import { buildMarkdownForRoute } from "./markdown";
import { buildStaticPage, getRouteDefinitions } from "./template";

interface LoaderModule {
  getPrerenderData: () => PrerenderData;
}

async function loadPrerenderData(): Promise<PrerenderData> {
  // We load data through Vite's SSR module runner so that Vite-specific syntax
  // such as import.meta.glob and the @/ path alias are resolved exactly as in
  // the client bundle. A standalone Node run would not understand those.
  let server: ViteDevServer | undefined;

  try {
    server = await createServer({
      configFile: false,
      root: process.cwd(),
      resolve: {
        alias: {
          "@": path.resolve(process.cwd(), "src"),
        },
      },
      server: { middlewareMode: true },
      appType: "custom",
    });

    const loaderPath = path.resolve(process.cwd(), "src/lib/prerender/data-loader.ts");
    const module = (await server.ssrLoadModule(loaderPath)) as LoaderModule;
    return module.getPrerenderData();
  } finally {
    if (server) {
      await server.close();
    }
  }
}

export async function writePrerenderedHtml(distDir = "dist"): Promise<void> {
  const data = await loadPrerenderData();
  const routes = getRouteDefinitions(data);

  const baseHtmlPath = path.resolve(process.cwd(), distDir, "index.html");
  const baseHtml = await fs.readFile(baseHtmlPath, "utf-8");

  await Promise.all(
    routes.map(async (route) => {
      const html = buildStaticPage(baseHtml, route);
      const markdown = buildMarkdownForRoute(data, route.path);
      const outputPath =
        route.path === "/"
          ? path.resolve(process.cwd(), distDir, "index.html")
          : path.resolve(process.cwd(), distDir, route.path.slice(1), "index.html");
      const markdownPath =
        route.path === "/"
          ? path.resolve(process.cwd(), distDir, "index.md")
          : path.resolve(process.cwd(), distDir, route.path.slice(1), "index.md");

      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      await fs.writeFile(outputPath, html, "utf-8");

      if (markdown) {
        await fs.mkdir(path.dirname(markdownPath), { recursive: true });
        await fs.writeFile(markdownPath, markdown, "utf-8");
      }
    }),
  );
}
