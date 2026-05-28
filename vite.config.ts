import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { metaImagesPlugin } from "./vite-plugin-meta-images";
import type { Plugin } from "vite";

const CRITICAL_CSS = `
:root{color-scheme:dark}
html,body{margin:0;padding:0;background:#070d1a;color:#f0f4f8;font-family:Inter,system-ui,-apple-system,sans-serif;min-height:100vh}
#root{min-height:100vh}
`.trim();

function asyncCssAndPreloadPlugin(): Plugin {
  const jsChunks: string[] = [];

  return {
    name: "async-css-and-preload",

    generateBundle(_opts, bundle) {
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type === "chunk" && fileName.endsWith(".js")) {
          jsChunks.push(`/${fileName}`);
        }
      }
    },

    transformIndexHtml: {
      order: "post",
      handler(html) {
        const preloadLinks = jsChunks
          .map(href => `<link rel="modulepreload" crossorigin href="${href}">`)
          .join("\n    ");

        return html
          .replace(
            /<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/g,
            (_, href) =>
              `<style>${CRITICAL_CSS}</style>` +
              `<link rel="preload" as="style" href="${href}" onload="this.onload=null;this.rel='stylesheet'">` +
              `<noscript><link rel="stylesheet" href="${href}"></noscript>`,
          )
          .replace("</head>", `    ${preloadLinks}\n  </head>`);
      },
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    tailwindcss(),
    metaImagesPlugin(),
    asyncCssAndPreloadPlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          motion: ["framer-motion"],
          router: ["wouter"],
          query: ["@tanstack/react-query"],
        },
      },
    },
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
    proxy: {
      "/__mockup": {
        target: "http://localhost:23636",
        changeOrigin: true,
        ws: true,
      },
    },
  },
});
