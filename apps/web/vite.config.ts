import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const port = 5500;

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@src": path.resolve("./src/"),
      },
    },
    server: {
      port: port,
      watch: {
        usePolling: true,
      },
      proxy: {
        "/api": {
          target: env.VITE_API || "http://127.0.0.1:8000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
      hmr: { port: port },
    },
  };
});
