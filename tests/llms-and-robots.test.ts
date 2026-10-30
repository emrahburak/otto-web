// tests/llms-and-robots.test.ts
// Verifies public/llms.txt and public/robots.txt for agent discovery.

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";

const publicDir = path.resolve(process.cwd(), "public");

function readPublicFile(name: string): string {
  return readFileSync(path.join(publicDir, name), "utf-8");
}

describe("public/llms.txt", () => {
  test("exists and contains agent guidance", () => {
    expect(existsSync(path.join(publicDir, "llms.txt"))).toBe(true);
    const content = readPublicFile("llms.txt");
    expect(content.length).toBeGreaterThanOrEqual(200);
    expect(content.toLowerCase()).toContain("when to use");
    expect(content).toContain("/aktiviteler");
    expect(content).toContain("/hakkimizda");
    expect(content).toContain("/iletisim");
    expect(content).toContain("/sayfa/gizlilik");
    expect(content).toContain("/sitemap.xml");
  });
});

describe("public/robots.txt", () => {
  test("exists with correct name and allows public pages", () => {
    expect(existsSync(path.join(publicDir, "robots.txt"))).toBe(true);
    const content = readPublicFile("robots.txt");
    expect(content).toContain("User-agent: *");
    expect(content).toContain("Allow: /");
    expect(content).toContain(
      "Sitemap: https://www.ottodogaokulu.com/sitemap.xml",
    );
    expect(content).not.toMatch(/^Disallow:\s*\/hakkimizda/m);
    expect(content).not.toMatch(/^Disallow:\s*\/iletisim/m);
    expect(content).not.toMatch(/^Disallow:\s*\/aktiviteler/m);
    expect(content).not.toMatch(/^Disallow:\s*\/sayfa\/gizlilik/m);
    expect(content).not.toMatch(/^Disallow:\s*\/about/m);
    expect(content).not.toMatch(/^Disallow:\s*\/contact/m);
    expect(content).not.toMatch(/^Disallow:\s*\/privacy/m);
  });

  test("old public/robot.txt path is removed", () => {
    expect(existsSync(path.join(publicDir, "robot.txt"))).toBe(false);
  });
});
