import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "publish-static-pages",
      generateBundle() {
        for (const page of ["About", "Gallery"]) {
          this.emitFile({
            type: "asset",
            fileName: `${page.toLowerCase()}.html`,
            source: fs.readFileSync(path.resolve(__dirname, `src/pages/${page}.html`), "utf8"),
          });
        }
      },
    },
    viteSingleFile(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
