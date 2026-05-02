# AI Pivot Toolbox - AI Automation Agency Website

## Overview

AI Pivot Toolbox is a marketing website for an AI SEO and automation agency based in Brisbane, Australia. The platform showcases a full suite of AI-powered services including: AI SEO, AIO (Answer Engine Optimisation), GEO (Generative Engine Optimisation), AI voice agents, workflow automation, website design, app/software development, and AI tools & integrations. The website is designed for SEO/AEO/GEO/LLM optimisation targeting Australian businesses seeking AI-powered growth.

Includes a full e-commerce-style AI Toolbox at `/toolbox` where visitors can browse 12 AI products, add them to a shopping cart, and submit a quote request.

## User Preferences

Preferred communication style: Simple, everyday language.
Brand name: "AI Pivot Toolbox" (formerly AIPivot)
Target market: Australian businesses (not just Brisbane)
Marketing style: King Kong-style direct response — bold claims, specific timeframes, guarantee language

## Routes

| Path | Description |
|------|-------------|
| `/` | Home (marketing landing page) |
| `/toolbox` | AI Toolbox shop with cart |
| `/checkout` | Quote request checkout |
| `/terms` | Terms of Service |
| `/privacy` | Privacy Policy |
| `/refund` | Refund Policy |

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

### Pages
- `client/src/pages/Toolbox.tsx` — Product grid with category filtering, ToolCard components
- `client/src/pages/Checkout.tsx` — Quote request form + order summary sidebar

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

### SEO/GEO Optimization
- Comprehensive meta tags for OpenGraph and Twitter cards
- Schema.org structured data (JSON-LD) for organization, LocalBusiness, WebSite, WebPage, Services, FAQ
- robots.txt configured to allow AI crawlers (GPTBot, Claude-Web, PerplexityBot)
- Australian geo-targeting meta tags
- All brand references updated to "AI Pivot Toolbox"

## External Dependencies

### Email Integration
- **Gmail API**: Connected via Replit Connectors for contact form notifications
- **Dual notification**: nick@aipivot.com.au and nick@nickgriffiths.com.au
- **Authentication**: OAuth2 via Replit identity tokens

### Analytics
- **Google Analytics**: G-Z5TMS725JR (in index.html)

### Third-Party Services
- **Google Fonts**: Inter and Space Grotesk font families
- **GoHighLevel**: Chat widget embedded in index.html
- **Leadsy.ai**: vtag script in index.html
- **Replit Plugins**: vite-plugin-runtime-error-modal, cartographer, dev-banner

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
