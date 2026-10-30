import path from "path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Compute __dirname equivalent for an ESM module so the `@` alias matches the
// Vite config without importing the Vite config file (which relies on the
// CommonJS-style `__dirname` provided by Vite's own config loader).
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    environment: "node",
    globals: false,
    passWithNoTests: true,
    reporters: "default",
  },
});
