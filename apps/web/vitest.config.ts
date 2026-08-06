import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup.ts",
    reporters: ["verbose"],
  },

  resolve: {
    alias: {
      "@src": path.resolve("./src/"),
    },
  },
});
