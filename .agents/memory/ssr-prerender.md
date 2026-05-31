---
name: SSR Prerender Pipeline
description: How the build-time static prerendering works for all 53 routes; key decisions and pitfalls.
---

## The Rule
The SSR static hook for wouter must be a plain `() => [urlPath, noop] as const` function — do NOT use `memoryLocation` from `wouter/memory-location` because it uses `useSyncExternalStore` without `getServerSnapshot`, which crashes React 18 `renderToString`.

**Why:** React 18+ SSR requires the third `getServerSnapshot` argument to `useSyncExternalStore`. `memoryLocation({ static: true })` omits it, throwing "Missing getServerSnapshot, which is required for server-rendered content." on every route.

**How to apply:** In `client/src/entry-server.tsx`, the hook is defined inline:
```ts
const hook = () => [urlPath, (_to: string) => {}] as const;
```

## Express Static Middleware Order
In `server/static.ts` (production), the prerendered file handler (`app.get("*", ...)`) MUST appear BEFORE `app.use(express.static(...))`.

**Why:** `express.static` detects that `/ai-automation-brisbane` is a directory on disk and issues a 302 redirect to `/ai-automation-brisbane/` — even with `index: false`. Adding `redirect: false` helps but is not sufficient alone; the prerendered handler must come first so express.static never processes route-shaped paths.

**How to apply:** Order in static.ts: (1) trailing-slash 301, (2) /assets cache, (3) /fonts cache, (4) prerendered HTML handler, (5) express.static with `{ index: false, redirect: false }`, (6) 404 fallback.

## Build Pipeline Summary
- `script/build.ts`: (1) vite client build, (2) vite SSR build → `dist/server/entry-server.js`, (3) `tsx scripts/prerender.ts`, (4) esbuild server bundle → `dist/index.cjs`
- `scripts/prerender.ts`: imports `render()` from dist/server/entry-server.js, iterates all 50 routes, injects per-page meta via `PAGE_META` from `server/meta-injection.ts`, writes `dist/public/<path>/index.html`
- `client/src/main.tsx`: uses `hydrateRoot` in production, `createRoot` fallback in dev (root div empty)
