// src/scripts/prerender.ts
// Standalone entry point used by the build pipeline to generate static HTML for
// every public route. It can also be invoked manually with:
//   tsx src/scripts/prerender.ts

import { writePrerenderedHtml } from "../lib/prerender/writer";

async function main(): Promise<void> {
  const distDir = process.argv[2] ?? "dist";
  await writePrerenderedHtml(distDir);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error("Pre-rendering failed:", message);
  process.exit(1);
});
