import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "esnext",
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    proxy: {
      // "/api": "http://localhost:3000",
      "/api": "https://mcsmuscle1.ddns.net",
    },
  },
});
