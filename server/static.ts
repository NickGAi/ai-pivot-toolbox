import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // 1. Trailing slash → 301 permanent redirect to non-slash URL.
  //    Must be first so the redirect fires before any file lookup.
  app.use((req, res, next) => {
    if (req.path !== "/" && req.path.endsWith("/")) {
      const cleanPath = req.path.slice(0, -1);
      const qs = req.originalUrl.slice(req.path.length);
      return res.redirect(301, cleanPath + qs);
    }
    next();
  });

  // 2. Long-lived cache for hashed assets (CSS/JS bundles)
  app.use("/assets", express.static(path.join(distPath, "assets"), {
    maxAge: "1y",
    immutable: true,
  }));

  // 3. Long-lived cache for self-hosted fonts
  app.use("/fonts", express.static(path.join(distPath, "fonts"), {
    maxAge: "1y",
    immutable: true,
  }));

  // 4. Serve prerendered route HTML files BEFORE generic static middleware
  //    so express.static never gets a chance to directory-redirect them.
  //    Homepage → dist/public/index.html
  //    Other routes → dist/public/<path>/index.html
  app.get("*", (req, res, next) => {
    const urlPath = req.path;
    let htmlFile: string;

    if (urlPath === "/") {
      htmlFile = path.join(distPath, "index.html");
    } else {
      htmlFile = path.join(distPath, urlPath.slice(1), "index.html");
    }

    if (fs.existsSync(htmlFile)) {
      res.setHeader("Cache-Control", "no-store");
      return res.sendFile(htmlFile);
    }

    next();
  });

  // 5. Other static files (favicon, manifest, robots.txt, sitemap.xml, etc.)
  //    index:false + redirect:false prevent any auto-redirect to trailing slash.
  app.use(express.static(distPath, { index: false, redirect: false }));

  // 6. Unknown routes → real 404.
  //    Serve the prerendered 404 page if it exists, otherwise plain response.
  app.use("*", (_req, res) => {
    const custom404 = path.join(distPath, "404.html");
    if (fs.existsSync(custom404)) {
      return res.status(404).sendFile(custom404);
    }
    res.status(404).type("html").send(
      "<!DOCTYPE html><html><head><title>404 Not Found</title></head><body><h1>404 Not Found</h1></body></html>"
    );
  });
}
