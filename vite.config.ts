import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    react(),
  ],
  base: "/insect-betyar/", // Alapértelmezett URL bázis
  build: {
    outDir: "insect-betyar", // Kimeneti könyvtár
    assetsDir: "assets", // Az összes statikus fájl a root-ba kerül
  },
});
