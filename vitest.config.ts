/// <reference types="vitest" />

import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      // all: true,
    },
    resolveSnapshotPath: (path: string) => {
      return path.replace("/src/", "/tests/");
    },
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
