import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { injectMeta } from "./meta-injection";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Long-lived cache for hashed assets (CSS/JS bundles with content hashes in filename)
  app.use("/assets", express.static(path.join(distPath, "assets"), {
    maxAge: "1y",
    immutable: true,
  }));

  // Long-lived cache for self-hosted fonts (filenames are stable)
  app.use("/fonts", express.static(path.join(distPath, "fonts"), {
    maxAge: "1y",
    immutable: true,
  }));

  app.use(express.static(distPath));

  // Inject per-page meta (title, description, canonical, og:*, twitter:*) before serving index.html
  app.use(injectMeta(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
