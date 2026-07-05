import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Served from GitHub Pages under the repo name:
  // https://dumont94.github.io/network-builder-tool/
  base: "/network-builder-tool/",
  server: {
    port: 5173,
  },
});
