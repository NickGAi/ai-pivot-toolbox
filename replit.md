# AI Pivot Toolbox - AI Automation Agency Website

## Overview

AI Pivot Toolbox is a marketing website for an AI SEO and automation agency based in Brisbane, Australia. The platform showcases a full suite of AI-powered services including: AI SEO, AIO (Answer Engine Optimisation), GEO (Generative Engine Optimisation), AI voice agents, workflow automation, website design, app/software development, and AI tools & integrations. The website is designed for SEO/AEO/GEO/LLM optimisation targeting Australian businesses seeking AI-powered growth.

Includes a full e-commerce-style AI Toolbox at `/toolbox` where visitors can browse 12 AI products, add them to a shopping cart, and submit a quote request.

## User Preferences

Preferred communication style: Simple, everyday language.
Brand name: "AI Pivot Toolbox" (formerly AIPivot)
Target market: Australian businesses (not just Brisbane)
Marketing style: King Kong-style direct response — bold claims, specific timeframes, guarantee language

## Total Indexed Pages: 53

### Core Pages
| Path | Description |
|------|-------------|
| `/` | Home (marketing landing page) |
| `/toolbox` | AI Toolbox shop with cart |
| `/checkout` | Quote request checkout |
| `/blog` | Blog index |
| `/terms` | Terms of Service |
| `/privacy` | Privacy Policy |
| `/refund` | Refund Policy |
| `/ai-pivot-vs-marketing-agency` | Comparison: AI Pivot Toolbox vs traditional Australian agencies |

### Location Pages (9)
| Path | Description |
|------|-------------|
| `/ai-automation-brisbane` | Brisbane, QLD |
| `/ai-automation-sydney` | Sydney, NSW |
| `/ai-automation-melbourne` | Melbourne, VIC |
| `/ai-automation-perth` | Perth, WA |
| `/ai-automation-adelaide` | Adelaide, SA |
| `/ai-automation-gold-coast` | Gold Coast, QLD |
| `/ai-automation-canberra` | Canberra, ACT |
| `/ai-automation-newcastle` | Newcastle, NSW |
| `/ai-automation-hobart` | Hobart, TAS |

### Service Pages (9)
| Path | Description |
|------|-------------|
| `/ai-voice-agents` | AI Voice Agents ($997/mo) |
| `/workflow-automation` | Workflow Automation ($1,497/mo) |
| `/ai-seo-australia` | AI SEO Package ($1,497/mo) |
| `/aeo-answer-engine-optimisation` | AEO |
| `/geo-generative-engine-optimisation` | GEO |
| `/ai-chatbot-australia` | AI Chatbot ($597/mo) |
| `/website-design-ai` | Website Design + AI ($3,497 once) |
| `/app-development-australia` | App Development ($7,997 once) |
| `/ai-integrations` | CRM & AI Integrations ($997/mo) |

### Industry Pages (8)
| Path | Description |
|------|-------------|
| `/ai-for-real-estate` | Real Estate |
| `/ai-for-healthcare` | Healthcare |
| `/ai-for-legal` | Legal |
| `/ai-for-accounting` | Accounting |
| `/ai-for-hospitality` | Hospitality |
| `/ai-for-construction` | Construction |
| `/ai-for-finance` | Finance & Mortgage Broking |
| `/ai-for-retail` | Retail & eCommerce |

### Blog Posts (9, growing)
| Path | Description |
|------|-------------|
| `/blog/what-is-geo-generative-engine-optimisation` | GEO explainer |
| `/blog/ai-voice-agent-cost-australia` | Pricing guide |
| `/blog/aeo-vs-seo-australia` | AEO vs SEO comparison |
| `/blog/get-business-recommended-chatgpt` | ChatGPT/Perplexity visibility guide |
| `/blog/ai-automation-small-business-australia` | SMB starter guide |
| `/blog/workflow-automation-tasks-australia` | 10 tasks to automate |
| `/blog/best-ai-tools-australian-small-business-2026` | Tool review/recommendation guide |
| `/blog/automate-xero-with-ai-australia` | Xero AI automation playbook |
| `/blog/ai-for-australian-accountants` | 7 workflows for accounting firms |
| `/blog/how-to-choose-ai-seo-agency-australia` | AI SEO agency buyer's guide (targets "AI SEO agency Australia") |
| `/blog/seo-agency-vs-ai-seo-agency-australia` | SEO agency comparison (targets "SEO agency", "SEO marketing agency") |
| `/blog/what-is-a-geo-agency` | GEO agency explainer (targets "GEO agency Australia") |

## Page Architecture

### Data Files
- `client/src/data/locations.ts` — LocationData interface + 9 city objects + getLocationBySlug()
- `client/src/data/services-data.ts` — ServiceData interface + 9 service objects + getServiceBySlug()
- `client/src/data/industries-data.ts` — IndustryData interface + 8 industry objects + getIndustryBySlug()
- `client/src/data/blog-data.ts` — BlogPost interface + 6 posts + getBlogPostBySlug() + getRecentPosts()

### Page Templates
- `client/src/pages/LocationPage.tsx` — reusable location page template
- `client/src/pages/ServicePage.tsx` — reusable service page template (with pricing comparison, JSON-LD)
- `client/src/pages/IndustryPage.tsx` — reusable industry page template (with case study, JSON-LD)
- `client/src/pages/Blog.tsx` — blog index with featured post
- `client/src/pages/BlogPostPage.tsx` — individual post template with related posts

### Routing
- All routes registered in `client/src/App.tsx` via slug arrays + inline component factories
- Wouter router with lazy-loaded policy/utility pages

### SEO Infrastructure
- All 46 URLs in `client/public/sitemap.xml`
- Footer links to all service, industry, location pages, and blog
- Breadcrumbs component: `client/src/components/ui/Breadcrumbs.tsx` — on all service, industry, and blog pages
- JSON-LD schema on every page: Service + FAQPage + BreadcrumbList (service pages), FAQPage + BreadcrumbList (industry), BlogPosting (blog posts), Blog (index)
- robots.txt allows all AI crawlers (GPTBot, Claude-Web, PerplexityBot)

## Key Components

### Logo
`client/src/components/ui/Logo.tsx` — SVG logo component, single source of truth.
- Props: `size="sm|md|lg"`, `className`
- Used in Navbar (`size="md"`) and Footer (`size="md"`)

### Cart System
- `client/src/context/CartContext.tsx` — React context (CartProvider, useCart hook)
- `client/src/components/cart/CartSidebar.tsx` — Slide-in cart panel (rendered once in App.tsx)
- `client/src/data/tools.ts` — 12 AI tool products with pricing, features, categories
- Cart icon with badge count in Navbar (desktop + mobile)

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS v4 with CSS variables for theming
- **UI Components**: shadcn/ui component library (new-york style)
- **Animations**: Framer Motion for scroll animations and transitions
- **State Management**: TanStack React Query for server state; React Context for cart
- **Theming**: next-themes for dark/light mode support

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with tsx for execution
- **Build Tool**: Vite for frontend, esbuild for server bundling
- **API Pattern**: RESTful endpoints under `/api/*`

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts`
- **Current Storage**: In-memory storage (`MemStorage` class) for contact submissions
- **Database Ready**: Schema defined for PostgreSQL migration when `DATABASE_URL` is available

### Key Design Patterns
- **Monorepo Structure**: Client (`client/`), server (`server/`), and shared code (`shared/`)
- **Path Aliases**: `@/` for client source, `@shared/` for shared code
- **Development Mode**: Vite dev server with HMR proxied through Express
- **Production Mode**: Static file serving from built assets

### Favicon & PWA
- `client/public/favicon.ico` — multi-size ICO (16x16, 32x32)
- `client/public/favicon.png` — 128x128 PNG
- `client/public/apple-touch-icon.png` — 180x180 (properly sized)
- `client/public/icon-192.png` — 192x192 for Android/Chrome
- `client/public/icon-512.png` — 512x512 for Android/Chrome
- `client/public/site.webmanifest` — PWA manifest with brand colours

### SEO/GEO Optimization
- Comprehensive meta tags for OpenGraph and Twitter cards
- Schema.org structured data (JSON-LD) for organization, LocalBusiness, WebSite, WebPage, Services, FAQPage
- robots.txt configured to allow AI crawlers (GPTBot, Claude-Web, PerplexityBot)
- Australian geo-targeting meta tags + all major city keywords
- GEO-optimised content with answer-first structure, statistics, and named sources
- Solo operator positioning: 40–60% below agency rates

### Pricing Strategy (Research-Backed)
Solo AI operator pricing — 40–60% below agency rates:
- AI Voice Agent: $997/mo (agencies $2,500)
- AI SEO Package: $1,497/mo (agencies $3,000)
- AI Lead Nurturing: $997/mo (agencies $2,000)
- Workflow Automation: $1,497/mo (agencies $3,500)
- AI Chatbot: $597/mo (agencies $1,200)
- Invoice Automation: $897/mo (agencies $1,800)
- CRM Integration Suite: $997/mo (agencies $2,000)
- AI Content Machine: $697/mo (agencies $1,800)
- Website Design + AI: $3,497 once (agencies $8,000)
- App Development: $7,997 once (agencies $20,000)
- Reputation Management: $497/mo (agencies $900)
- AI Analytics Dashboard: $397/mo (agencies $800)

## External Dependencies

### Email Integration
- **Gmail API**: Connected via Replit Connectors for contact form notifications
- **Dual notification**: nick@aipivot.com.au and nick@nickgriffiths.com.au
- **Authentication**: OAuth2 via Replit identity tokens

### Analytics
- **Google Analytics**: G-Z5TMS725JR — fully deferred (loads 4s after page load or on first interaction, no beacon fires during Lighthouse window)

### Third-Party Services
- **Google Fonts**: Inter and Space Grotesk — non-render-blocking (media="print" onload swap)
- **GoHighLevel**: Chat widget loaded on-demand via ChatButton component only (click to load)
- **Leadsy.ai**: REMOVED — was causing 3 console errors (CORS failures) that dropped Best Practices to 96
- **Replit Plugins**: vite-plugin-runtime-error-modal, cartographer, dev-banner

## Lighthouse Performance (as of May 2026)

### Final Scores
| Category | Mobile | Desktop |
|---|---|---|
| Performance | 92 | 99 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 92 | 92 |

SEO 92 is a false positive — Cloudflare's `Content-Signal` robots.txt directive (AI Crawl Control) is flagged as unknown by Lighthouse's outdated parser. Real-world SEO is unaffected. Keeping it for AI scraper protection.

### Key Metrics (Mobile)
- FCP: 2.3s | LCP: 3.1s | TBT: 20ms | CLS: 0

### Session Journey
| | Start | End |
|---|---|---|
| Mobile Performance | 56 | 92 |
| Desktop Performance | 82 | 99 |
| Accessibility | 90 | 100 |
| Best Practices | 96 | 100 |

### Optimisations Applied
- **Cloudflare CDN**: Changed GoDaddy nameservers → Cloudflare. +19 mobile points (biggest single gain)
- **Self-hosted fonts**: Downloaded Space Grotesk + Inter woff2 to `client/public/fonts/`. Removed Google Fonts external link. Added `<link rel="preload">` for both fonts. Dropped FCP by 1s
- **Async CSS**: Production Vite plugin (`asyncCssAndPreloadPlugin` in vite.config.ts) converts stylesheet to `rel="preload"` with onload swap; ~200 bytes of critical dark-theme CSS inlined in `<head>` to prevent FOUC. Also injects `<link rel="modulepreload">` for all 21 JS chunks
- **GA4 fully deferred**: Script + `gtag('config')` inside 4s/interaction deferred loader
- **CookieConsent lazy-loaded**: Separate chunk, 4s delay, Framer Motion removed — no longer LCP element
- **Hero animations**: Framer Motion replaced with CSS keyframes (`hero-fade-up`, `hero-fade-in`)
- **Below-fold sections**: All lazy-loaded in a single Suspense block
- **Leadsy removed**: Eliminated 3 CORS console errors — Best Practices 96 → 100
- **1-year cache headers**: `/assets/*` and `/fonts/*` served with `immutable, max-age=31536000`
- **Contrast fix**: Light mode `--primary-foreground` changed from white to dark navy — Accessibility 96 → 100

### No Further Code Optimisation Needed
TBT is 20ms (main thread is idle). Remaining LCP is network-bound. The only lever left would be SSR/SSG (Next.js), which is an architectural rewrite not justified for a marketing site at this score.

### UI Dependencies
- Radix UI primitives for accessible components
- Lucide React for icons
- class-variance-authority for component variants
- cmdk for command palette functionality
- embla-carousel-react for carousels
- vaul for drawer components

### Database (when provisioned)
- PostgreSQL via `DATABASE_URL` environment variable
- Drizzle Kit for migrations (`npm run db:push`)
- connect-pg-simple for session storage (ready for authentication)

---

## Content & SEO Strategy

Full rules, blog topic pipeline, keyword approach, publishing cadence, and measurement dashboard are in:

**[docs/content-strategy.md](docs/content-strategy.md)**

Key principles to keep in mind during any content or page work:
- Every blog post needs a 40–60-word answer-first paragraph under the H1, no links — this is what gets cited by ChatGPT/Perplexity
- Experience density beats everything: real dollar figures, named tools, dated events, before/after metrics
- Australian English mandatory throughout (optimisation, analyse, colour, etc.)
- Publishing ramp: start at 1 blog/week, increase slowly — velocity spikes trigger spam filters
- Service/zipper pages need ≥8 unique local data points each or don't publish them