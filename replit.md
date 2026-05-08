# AI Pivot Toolbox - AI Automation Agency Website

## Overview

AI Pivot Toolbox is a marketing website for an AI SEO and automation agency based in Brisbane, Australia. The platform showcases a full suite of AI-powered services including: AI SEO, AIO (Answer Engine Optimisation), GEO (Generative Engine Optimisation), AI voice agents, workflow automation, website design, app/software development, and AI tools & integrations. The website is designed for SEO/AEO/GEO/LLM optimisation targeting Australian businesses seeking AI-powered growth.

Includes a full e-commerce-style AI Toolbox at `/toolbox` where visitors can browse 12 AI products, add them to a shopping cart, and submit a quote request.

## User Preferences

Preferred communication style: Simple, everyday language.
Brand name: "AI Pivot Toolbox" (formerly AIPivot)
Target market: Australian businesses (not just Brisbane)
Marketing style: King Kong-style direct response — bold claims, specific timeframes, guarantee language

## Total Indexed Pages: 50

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

## Content & SEO Strategy (2026 Rules)

### The Core Shift — What Actually Ranks in 2026
The March 2026 core update was the most volatile on record (79.5% of top-3 URLs shifted). Key findings:
- **Original-data pages: +22% visibility. Paraphrased AI content: -71%.** (SE Ranking, March 2026)
- **Human-written content is 8× more likely to rank #1 than pure AI** (80% vs 9%) — Semrush 42K-post study
- Google's "Information Gain" patent (US20200349181A1) is now operational — rephrasing top results is penalised
- Zero-click is ~65% of searches; AI Overviews appear on ~21% of queries — raw volume is a vanity metric
- Only ~12% of AI citations overlap with Google's top 10 — AEO is a separate game from classic SEO

### Blog Post Rules (Every Post)

**Structure (non-negotiable):**
- One H1 containing primary keyword, ≤60 chars
- **40–60-word answer-first paragraph immediately under H1** — no links inside it. This is the AEO citation bait
- 4–8 H2s. At least 3 phrased as real user questions matching AI prompt phrasing (7–23 words)
- 40–60-word direct answer immediately under each question H2, before deeper exposition
- One HTML comparison table somewhere mid-post (not an image)
- One pull quote per major section with a standalone factual claim containing a number
- 3–5 internal links to /blog or /service pages on this site
- 2–3 external links to primary sources (gov, industry body, named research)
- 4–8 question FAQ block at foot, each answer 50–300 words, marked up as FAQPage JSON-LD
- Author byline with "Last Updated" date visible; `dateModified` in BlogPosting schema

**Experience density — every post must have at least 3 of:**
- Real dollar figure
- Named client or anonymised case with real metric
- Dated event (month + year)
- Named tool with version
- Before/after benchmark
- Proprietary screenshot or original data

**Anti-slop guardrails:**
- No paragraph starts with "In today's", "In the ever-evolving", "Whether you're…"
- No sentence longer than 25 words unless deliberate for rhythm
- Max two bulleted lists per post
- Banned words: game-changer, synergy, leverage (verb), unleash, cutting-edge, state-of-the-art, world-class, delve, tapestry, nestled, navigate the complexities
- Edit ratio >30% on anything AI-drafted before publishing
- No more than 8% AI-likely score on originality.ai before publishing

**Australian English — mandatory:**
optimisation, organisation, behaviour, colour, analyse, realise, centre, licence (noun)/license (verb), programme, tonne

### Keyword Research Approach (2026)
- Volume floor: **≥50** (not 100 — AI prompts are tiny per term but high-intent)
- Use **Personal KD% <30** (Semrush) — not raw KD; weighted by your actual domain authority
- Prefer SERPs **without AI Overviews** for blog content. Where AIO is present, engineer a 40–60-word answer paragraph to win the citation instead
- Intent: **informational** for blog posts, **commercial/transactional** for service pages
- Include the Questions tab — every question with KD<30 and >50 volume becomes a blog post or FAQ block
- One root keyword per page. Up to 2 secondary + 3 tertiary only if user intent is identical. If intent differs, split pages

**Three content lanes:**
1. **Money keywords** (commercial intent): "best [thing] [city] 2026", "[competitor] alternative", "[service] [suburb]" → service pages
2. **Adjacent/upper-funnel** (informational, higher volume): how-to, comparison, "what is", "is X worth it" → blog posts
3. **AEO/GEO targets** (phrased as real AI prompts): these become 40–60-word answer paragraphs embedded in posts and service pages

### AEO Targets — AI Pivot Toolbox Should Appear For:
- "Best AI consultant in Brisbane for small business 2026"
- "How do I get my business cited by ChatGPT in Australia"
- "What's the cheapest AI automation agency in Australia"
- "Best AI workflow automation for Australian SMBs"
- "Solo AI operator versus agency in Australia"
- "Generative engine optimisation Australia"
- "How do I comply with the December 2026 Privacy Act ADM rules"
- "Who can write my Australian AI policy"

### Blog Topic Pipeline (Priority Order)
Topics validated for AU intent, KD<30 typical. Build in this sequence:

**Foundation cluster (publish first):**
1. What is GEO and how does it differ from SEO in 2026 ✓ *exists*
2. How to get your business cited by ChatGPT in Australia ✓ *exists*
3. Voluntary AI Safety Standard explained for Australian SMBs
4. December 2026 Privacy Act ADM rules — what every Australian business must update
5. AI policy template for Australian SMBs (with downloadable)
6. ChatGPT vs Claude vs Copilot for Australian small business in 2026
7. n8n vs Make vs Zapier for Australian SMBs — data sovereignty edition
8. AI voice agent vs human receptionist: cost-benefit for AU service businesses

**Vertical cluster (high conversion intent):**
9. AI for Australian tradies — no-fluff guide for plumbers, sparkies and HVAC
10. AI for Australian accountants — APES 110 compliance angle ✓ *exists*
11. AI for Australian law firms — NSW Supreme Court Practice Note implications
12. AI for not-for-profits in Australia — grant-eligible automation patterns
13. AI for allied health practices — AHPRA guidance
14. AI implementation cost in Australia — what $5k, $15k and $50k actually buy
15. AI ROI calculator for Australian SMBs — five worked examples

**AEO/authority cluster:**
16. How to rank in ChatGPT for Australian local searches
17. How to rank in Perplexity for Australian B2B searches
18. AI Overviews appearance in google.com.au — what triggers it
19. Reddit as an AI-citation moat for Australian businesses
20. Wikidata Q-ID for Australian SMBs — the underrated entity move
21. Why solo AI operators are eating mid-tier agencies in Australia (founder-voice piece)
22. The five free moves that put a Brisbane SMB on the AI search map

**Regulatory wedge (differentiator):**
23. December 2026 OAIC compliance scan — how to be ready
24. Voice agent regulations in Australia — Privacy Act, ACMA, ACL
25. Microsoft Copilot data residency in Australia — plain-English audit
26. Self-hosted n8n on Australian infrastructure: step-by-step

### Service Page Rules (Zipper Pages)
Each must have **≥8 unique data points** before publishing. If you can't get to 8, don't publish.
- Real local client (or anonymised case with real number)
- Suburb-specific FAQ (not generic)
- Named past project
- Location-specific pricing band with a sentence on what drives variance
- Local reviews or testimonials (not stock)
- Neighbourhood-specific compliance note (e.g. QLD vs NSW regulation difference)
- Real local photo (not stock)
- One location-specific before/after metric

**Hard cap: no more than 5 service/zipper pages per week.** Each page must have 300+ genuinely unique words. Templated suburb-swap with no other variation = doorway page = manual action risk.

### Publishing Cadence (Anti-Spam Ramp)
| Period | Blog posts/week | Service pages/week |
|---|---|---|
| Weeks 1–2 | 1 | 0 |
| Weeks 3–4 | 2 | 1 |
| Weeks 5–8 | 3 | 2 |
| Weeks 9–12 | 4 | 3 |
| Months 4+ | 5 (cap) | 5 (cap) |

**Emergency brake:** If indexing time exceeds 14 days for a fresh URL, or any page drops >25% in rankings week-on-week — stop publishing. Edit the most recent 30 pages for Information Gain and wait 30 days before resuming.

Watch in GSC: if <50% of submitted URLs are indexed at 14 days, audit rendering and internal linking immediately.

### Off-Page (AEO/GEO visibility)
- **Bing Webmaster Tools + IndexNow** — submit day one. Free moat most AU competitors skip; directly affects ChatGPT/Copilot citation
- **Google Business Profile** — link to specific service page (not homepage). Don't keyword-stuff the GBP name (triggers manual re-verification lock)
- 4–6 authentic Reddit comments/week in r/AusBusiness, r/AusFinance, r/sysadmin (AU). No promotion for first 4 weeks — problem-solving only
- 3–5 expert source pitches/week via Featured.com (free, relaunched April 2025), Qwoted ($149/mo), SourceBottle (good for AU)
- 1 podcast appearance per quarter with full transcript on host site
- Apply for Wikidata Q-ID within first 90 days
- List on G2, Capterra, GetApp

**AI traffic converts ~14% versus 2.8% organic** (Whitehat) — track the GA4 AI-referrer segment: `source matches chatgpt.com|perplexity.ai|gemini.google.com|copilot.microsoft.com|claude.ai`

### What NOT to Do
- Don't buy backlinks — March 2026 spam update made it permanently negative ROI
- Don't build llms.txt files — confirmed unused by Mueller + three independent studies
- Don't dump 50+ programmatic pages in a single deploy — Aug 2025 + Mar 2026 spam updates flag this pattern
- Don't let AI rewrite existing pages without adding fresh experience density — pure rewrites flatten entity signals
- Don't keyword-stuff the Google Business Profile name
- Don't publish service pages to locations you can't write 300+ unique words about
- Don't maintain mixed AU/US spelling — inconsistency mucks up your AU locale footprint
- Don't chase Lighthouse 100s at the cost of shipping content — CrUX p75 field data is what ranks
