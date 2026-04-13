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
        manualChunks: {
          "vendor-react":     ["react", "react-dom", "react-router-dom"],
          "vendor-animation": ["framer-motion"],
          "vendor-radix":     [
            "@radix-ui/react-tooltip",
            "@radix-ui/react-toast",
            "@radix-ui/react-dialog",
            "@radix-ui/react-accordion",
            "@radix-ui/react-select",
          ],
        },
      },
    },
  },
});
