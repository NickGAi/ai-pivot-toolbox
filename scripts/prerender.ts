import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST_PUBLIC = path.resolve(ROOT, "dist/public");
const DIST_SERVER = path.resolve(ROOT, "dist/server");

const BASE_URL = "https://aipivot.com.au";

async function main() {
  console.log("[prerender] starting…");

  if (!fs.existsSync(DIST_PUBLIC)) {
    throw new Error(`dist/public not found — run vite build first`);
  }
  if (!fs.existsSync(DIST_SERVER)) {
    throw new Error(`dist/server not found — run vite ssr build first`);
  }

  const template = fs.readFileSync(path.join(DIST_PUBLIC, "index.html"), "utf-8");

  const entryUrl = pathToFileURL(path.join(DIST_SERVER, "entry-server.js")).href;
  const { render } = (await import(entryUrl)) as {
    render: (path: string) => string;
  };

  const { PAGE_META } = await import("../server/meta-injection.js") as {
    PAGE_META: Record<string, { title: string; description: string }>;
  };

  const { blogPosts } = await import("../client/src/data/blog-data.js") as {
    blogPosts: Array<{ slug: string }>;
  };

  const blogSlugs = blogPosts.map((p) => `/blog/${p.slug}`);

  const staticRoutes = [
    "/",
    "/toolbox",
    "/checkout",
    "/terms",
    "/privacy",
    "/refund",
    "/blog",
    "/ai-pivot-vs-marketing-agency",
    "/free-strategy-call",
    "/book",
    "/real-estate-pipeline-growth-map",
    "/pipeline",
  ];

  const locationSlugs = [
    "ai-automation-brisbane",
    "ai-automation-sydney",
    "ai-automation-melbourne",
    "ai-automation-perth",
    "ai-automation-adelaide",
    "ai-automation-gold-coast",
    "ai-automation-canberra",
    "ai-automation-newcastle",
    "ai-automation-hobart",
  ].map((s) => `/${s}`);

  const serviceSlugs = [
    "ai-voice-agents",
    "workflow-automation",
    "ai-seo-australia",
    "aeo-answer-engine-optimisation",
    "geo-generative-engine-optimisation",
    "ai-chatbot-australia",
    "website-design-ai",
    "app-development-australia",
    "ai-integrations",
  ].map((s) => `/${s}`);

  const industrySlugs = [
    "ai-for-real-estate",
    "ai-for-healthcare",
    "ai-for-legal",
    "ai-for-accounting",
    "ai-for-hospitality",
    "ai-for-construction",
    "ai-for-finance",
    "ai-for-retail",
  ].map((s) => `/${s}`);

  const ALL_ROUTES = [
    ...staticRoutes,
    ...locationSlugs,
    ...serviceSlugs,
    ...industrySlugs,
    ...blogSlugs,
  ];

  let rendered = 0;
  let failed = 0;

  for (const route of ALL_ROUTES) {
    const meta = PAGE_META[route] ?? {
      title: "AI Pivot Toolbox | AI Automation Agency for Australian Businesses",
      description:
        "AI Pivot Toolbox is an AI SEO and automation agency for Australian businesses.",
    };

    const canonicalUrl = route === "/" ? `${BASE_URL}/` : `${BASE_URL}${route}`;

    let appHtml = "";
    try {
      appHtml = render(route);
    } catch (err) {
      console.warn(`[prerender] render failed for ${route}:`, (err as Error).message);
      failed++;
    }

    const h1Text = meta.title.split(" | ")[0];
    const h1Html = `<h1 style="position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap">${escHtml(h1Text)}</h1>`;

    let html = template;

    html = html.replace(/<title>[^<]*<\/title>/, `<title>${escHtml(meta.title)}</title>`);
    html = html.replace(
      /<meta name="description" content="[^"]*"/,
      `<meta name="description" content="${escHtml(meta.description)}"`
    );
    html = html.replace("<!--CANONICAL_PLACEHOLDER-->", `<link rel="canonical" href="${canonicalUrl}">`);
    html = html.replace(
      /<meta property="og:title" content="[^"]*"/,
      `<meta property="og:title" content="${escHtml(meta.title)}"`
    );
    html = html.replace(
      /<meta property="og:description" content="[^"]*"/,
      `<meta property="og:description" content="${escHtml(meta.description)}"`
    );
    html = html.replace(
      /<meta property="og:url" content="[^"]*"/,
      `<meta property="og:url" content="${canonicalUrl}"`
    );
    html = html.replace(
      /<meta name="twitter:title" content="[^"]*"/,
      `<meta name="twitter:title" content="${escHtml(meta.title)}"`
    );
    html = html.replace(
      /<meta name="twitter:description" content="[^"]*"/,
      `<meta name="twitter:description" content="${escHtml(meta.description)}"`
    );
    html = html.replace("<!--SSR_H1-->", h1Html);

    if (appHtml) {
      html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
    }

    writeRoute(route, html);
    rendered++;
  }

  generateSitemap(ALL_ROUTES);

  console.log(
    `[prerender] done — ${rendered} routes (${failed} render errors, content omitted for those)`
  );
}

function escHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function writeRoute(route: string, html: string): void {
  if (route === "/") {
    fs.writeFileSync(path.join(DIST_PUBLIC, "index.html"), html, "utf-8");
    return;
  }
  const dir = path.join(DIST_PUBLIC, route.slice(1));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html, "utf-8");
}

function generateSitemap(routes: string[]): void {
  const now = new Date().toISOString().split("T")[0];
  const urls = routes
    .filter((r) => !["/checkout", "/book", "/pipeline"].includes(r))
    .map((r) => {
      const loc = r === "/" ? `${BASE_URL}/` : `${BASE_URL}${r}`;
      const priority =
        r === "/" ? "1.0" : r.startsWith("/blog/") ? "0.7" : "0.8";
      const freq =
        r === "/" ? "daily" : r.startsWith("/blog/") ? "monthly" : "weekly";
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
  fs.writeFileSync(path.join(DIST_PUBLIC, "sitemap.xml"), xml, "utf-8");
  console.log(`[prerender] sitemap.xml → ${routes.length} URLs`);
}

main().catch((err) => {
  console.error("[prerender] fatal:", err);
  process.exit(1);
});
