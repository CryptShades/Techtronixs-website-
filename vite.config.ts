import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Prerendering is handled by `react-snap` as a postbuild step.
// See the "postbuild" script in package.json and the "reactSnap" config below.
// Run `npm run build` and react-snap will prerender all routes automatically.

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
  build: {
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("framer-motion")) return "vendor-animation";
          if (id.includes("@radix-ui")) return "vendor-radix";
          if (
            id.includes("react/") ||
            id.includes("react-dom/") ||
            id.includes("react-router-dom")
          )
            return "vendor-react";
          return "vendor";
        },
      },
    },
  },
});
