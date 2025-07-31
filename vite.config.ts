import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { ViteImageOptimizer as imageOptimizer } from "vite-plugin-image-optimizer";

import path from "path";

const isProduction = process.env.NODE_ENV === "production";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    isProduction &&
    imageOptimizer({
      jpg: { quality: 80 },
      png: { quality: 80 },
      webp: { quality: 75 },
      avif: { quality: 50 },
      svg: {},
    }),
  ],
  server: {
    host: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // opsiyonel: sadece uyarıyı bastırır
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@fortawesome")) return "vendor_fortawesome";
            if (id.includes("swiper")) return "vendor_swiper";
            if (id.includes("lucide-react")) return "vendor_lucide";
            return "vendor";
          }
        },
      },
    },
  },
});
