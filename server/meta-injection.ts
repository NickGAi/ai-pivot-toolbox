import { type Request, type Response, type NextFunction } from "express";
import fs from "fs";
import path from "path";

interface PageMeta {
  title: string;
  description: string;
}

const BASE_URL = "https://aipivot.com.au";

const PAGE_META: Record<string, PageMeta> = {
  "/": {
    title: "AI Pivot Toolbox | AI SEO & Automation Agency Australia — Brisbane, Sydney, Melbourne",
    description: "AI Pivot Toolbox is an AI SEO agency and automation agency serving Australian businesses. AI voice agents, workflow automation, AI SEO, GEO, AEO, and custom AI tools — 40–60% below agency rates because we're a solo AI-powered operator.",
  },
  "/toolbox": {
    title: "AI Toolbox | Browse AI Tools & Automation Products | AI Pivot Toolbox",
    description: "Browse 12 AI automation tools and products for Australian businesses. AI voice agents, chatbots, workflow automation, SEO tools and more. Get a custom quote.",
  },
  "/checkout": {
    title: "Request a Quote | AI Pivot Toolbox",
    description: "Request a quote for AI automation services. AI voice agents, workflow automation, AI SEO and more for Australian businesses.",
  },
  "/blog": {
    title: "AI Automation Blog | Tips, Guides & Strategy for Australian Businesses | AI Pivot Toolbox",
    description: "Practical AI automation guides, SEO strategy, GEO, and AEO tips for Australian small businesses. Updated weekly by an Australian AI specialist.",
  },
  "/terms": {
    title: "Terms of Service | AI Pivot Toolbox",
    description: "Terms of Service for AI Pivot Toolbox — AI automation and SEO agency for Australian businesses.",
  },
  "/privacy": {
    title: "Privacy Policy | AI Pivot Toolbox",
    description: "Privacy Policy for AI Pivot Toolbox. How we collect, use, and protect your data in compliance with the Privacy Act 1988.",
  },
  "/refund": {
    title: "Refund Policy | AI Pivot Toolbox",
    description: "Refund and cancellation policy for AI Pivot Toolbox services.",
  },
  "/ai-pivot-vs-marketing-agency": {
    title: "AI Pivot Toolbox vs Traditional Marketing Agency Australia | AI Pivot Toolbox",
    description: "How AI Pivot Toolbox compares to traditional Australian marketing agencies — pricing, speed, results, and why solo AI operators deliver more for less.",
  },

  // Location pages
  "/ai-automation-brisbane": {
    title: "AI Automation Agency Brisbane | AI Voice Agents, SEO & Workflow Automation | AI Pivot Toolbox",
    description: "Brisbane's AI automation specialist. AI voice agents, workflow automation, AI SEO and GEO — 40–60% below agency rates. Serving Brisbane CBD, Gold Coast and Sunshine Coast. Free strategy call.",
  },
  "/ai-automation-sydney": {
    title: "AI Automation Agency Sydney | AI Voice Agents, Workflow Automation & AI SEO | AI Pivot Toolbox",
    description: "Sydney AI automation specialist. AI voice agents, workflow automation, AI SEO — 40–60% below Sydney agency rates. Serving CBD, Parramatta, North Sydney and all of NSW. Free strategy call.",
  },
  "/ai-automation-melbourne": {
    title: "AI Automation Agency Melbourne | AI Voice Agents, SEO & Workflow Automation | AI Pivot Toolbox",
    description: "Melbourne AI automation specialist. AI voice agents, workflow automation, AI SEO and GEO — 40–60% below Melbourne agency rates. Serving CBD, Geelong and all of VIC. Free strategy call.",
  },
  "/ai-automation-perth": {
    title: "AI Automation Agency Perth | AI Voice Agents, SEO & Workflow Automation | AI Pivot Toolbox",
    description: "Perth AI automation specialist. AI voice agents, workflow automation, AI SEO — 40–60% below Perth agency rates. Serving CBD, Fremantle, Joondalup and all of WA. Free strategy call.",
  },
  "/ai-automation-adelaide": {
    title: "AI Automation Agency Adelaide | AI Voice Agents, SEO & Workflow Automation | AI Pivot Toolbox",
    description: "Adelaide AI automation specialist. AI voice agents, workflow automation, AI SEO — 40–60% below Adelaide agency rates. Serving CBD, Glenelg, Port Adelaide and all of SA. Free strategy call.",
  },
  "/ai-automation-gold-coast": {
    title: "AI Automation Agency Gold Coast | AI Voice Agents, SEO & Workflow Automation | AI Pivot Toolbox",
    description: "Gold Coast AI automation specialist. AI voice agents, chatbots, workflow automation, AI SEO — 40–60% below agency rates. Serving Surfers Paradise, Broadbeach, Robina and all of GC. Free strategy call.",
  },
  "/ai-automation-canberra": {
    title: "AI Automation Agency Canberra | AI Voice Agents, SEO & Workflow Automation | AI Pivot Toolbox",
    description: "Canberra AI automation specialist. AI voice agents, workflow automation, AI SEO — for government, defence, and professional services businesses in the ACT. Free strategy call.",
  },
  "/ai-automation-newcastle": {
    title: "AI Automation Agency Newcastle | AI Voice Agents, SEO & Workflow Automation | AI Pivot Toolbox",
    description: "Newcastle AI automation specialist. AI voice agents, workflow automation, AI SEO — 40–60% below Sydney agency rates. Serving Newcastle CBD, Hunter Valley, Lake Macquarie. Free strategy call.",
  },
  "/ai-automation-hobart": {
    title: "AI Automation Agency Hobart | AI Voice Agents, SEO & Workflow Automation | AI Pivot Toolbox",
    description: "Hobart AI automation specialist. First-mover advantage in Tasmania — AI voice agents, workflow automation, AI SEO before your competitors have it. Free strategy call.",
  },

  // Service pages
  "/ai-voice-agents": {
    title: "AI Voice Agents Australia | 24/7 Call Handling from $997/mo | AI Pivot Toolbox",
    description: "Fully managed AI voice agents for Australian businesses. Inbound calls, lead qualification, appointment booking — 24/7. From $997/month. 40–60% below agency rates. Free strategy call.",
  },
  "/workflow-automation": {
    title: "Workflow Automation Australia | Business Process Automation from $1,497/mo | AI Pivot Toolbox",
    description: "Custom workflow automation for Australian businesses. Eliminate manual tasks, integrate your systems, save 40+ hours per week. From $1,497/month. Free strategy call.",
  },
  "/ai-seo-australia": {
    title: "AI SEO Agency Australia | SEO, GEO & AEO from $1,497/mo | AI Pivot Toolbox",
    description: "Australia's AI SEO agency. Rank on Google AND get cited by ChatGPT, Perplexity & AI Overviews. Full-service SEO agency covering technical SEO, GEO, and AEO — from $1,497/month.",
  },
  "/aeo-answer-engine-optimisation": {
    title: "Answer Engine Optimisation (AEO) Australia | Get Found on ChatGPT & Perplexity | AI Pivot Toolbox",
    description: "AEO services for Australian businesses. Get your business cited by ChatGPT, Perplexity, and Google AI Overviews. Structured content, FAQ schema, and AI visibility tracking. Free strategy call.",
  },
  "/geo-generative-engine-optimisation": {
    title: "GEO Agency Australia | Generative Engine Optimisation from $1,497/mo | AI Pivot Toolbox",
    description: "Australia's specialist GEO agency. Get cited by Google AI Overviews, ChatGPT, and Perplexity. Research-backed generative engine optimisation — fully managed from $1,497/month.",
  },
  "/ai-chatbot-australia": {
    title: "AI Chatbot Australia | Custom Website Chatbot from $597/mo | AI Pivot Toolbox",
    description: "Custom AI chatbots for Australian business websites. Capture leads, answer questions, and book appointments 24/7. Trained on your business. From $597/month. Free strategy call.",
  },
  "/website-design-ai": {
    title: "Website Design with AI Australia | Custom Websites from $3,497 | AI Pivot Toolbox",
    description: "Custom website design for Australian businesses with AI chatbot, SEO, and lead capture built in. From $3,497 once-off — 40–60% below agency rates. 4–6 week delivery. Free strategy call.",
  },
  "/app-development-australia": {
    title: "App Development Australia | Custom AI Apps from $7,997 | AI Pivot Toolbox",
    description: "Custom web and mobile app development for Australian businesses. AI features, fast delivery, fixed price. MVPs from $7,997 — 40–60% below agency rates. Free strategy call.",
  },
  "/ai-integrations": {
    title: "CRM & AI Integrations Australia | Connect Your Business Systems from $997/mo | AI Pivot Toolbox",
    description: "Custom CRM and software integrations for Australian businesses. Connect Xero, Salesforce, HubSpot, and 100+ tools. Fully managed from $997/month. Free strategy call.",
  },

  // Industry pages
  "/ai-for-real-estate": {
    title: "AI Automation for Real Estate Australia | AI Voice Agents & CRM Integration | AI Pivot Toolbox",
    description: "AI automation for Australian real estate agencies. Handle 400+ enquiries monthly, book inspections 24/7, and automate CRM updates — without extra staff. Free strategy call.",
  },
  "/ai-for-healthcare": {
    title: "AI Automation for Healthcare Practices Australia | Reduce No-Shows & Admin | AI Pivot Toolbox",
    description: "AI automation for Australian healthcare and allied health practices. Reduce no-shows by 60%, save 10–20 hours of admin weekly, and automate referral and billing workflows. Free strategy call.",
  },
  "/ai-for-legal": {
    title: "AI Automation for Law Firms Australia | Legal Admin Automation | AI Pivot Toolbox",
    description: "AI automation for Australian law firms. Automate client intake, document collection, and billing prep. Save 28+ hours of non-billable admin weekly. Privacy Act compliant. Free strategy call.",
  },
  "/ai-for-accounting": {
    title: "AI Automation for Accounting Firms Australia | Xero & MYOB Integration | AI Pivot Toolbox",
    description: "AI automation for Australian accounting firms. Automate Xero/MYOB reconciliation, document collection, and client communication. Save 20+ hours monthly. Free strategy call.",
  },
  "/ai-for-hospitality": {
    title: "AI Automation for Hospitality Australia | Reservations, Reviews & Guest Comms | AI Pivot Toolbox",
    description: "AI automation for Australian restaurants, hotels, and hospitality businesses. Handle reservations 24/7, manage reviews automatically, reduce no-shows. Free strategy call.",
  },
  "/ai-for-construction": {
    title: "AI Automation for Construction Businesses Australia | Quote & Invoice Automation | AI Pivot Toolbox",
    description: "AI automation for Australian builders and construction companies. Faster quotes, automated invoicing, compliance document management. Save 40+ hours monthly. Free strategy call.",
  },
  "/ai-for-finance": {
    title: "AI Automation for Finance Brokers Australia | Lead Qualification & Document Automation | AI Pivot Toolbox",
    description: "AI automation for Australian finance brokers and financial planners. Pre-qualify 200+ leads monthly, automate document collection, respond in 90 seconds. Free strategy call.",
  },
  "/ai-for-retail": {
    title: "AI Automation for Retail & eCommerce Australia | Chatbot, Shopify & Workflow Automation | AI Pivot Toolbox",
    description: "AI automation for Australian retailers and eCommerce businesses. Handle 1,000+ customer queries monthly, automate cart recovery, and reduce support workload by 40%. Free strategy call.",
  },

  // Blog posts
  "/blog/what-is-geo-generative-engine-optimisation": {
    title: "What Is GEO (Generative Engine Optimisation)? Guide for Australian Businesses | AI Pivot Toolbox",
    description: "GEO explained for Australian businesses. Learn how Generative Engine Optimisation gets your business cited by ChatGPT, Perplexity, and Google AI Overviews — and why it matters more than traditional SEO.",
  },
  "/blog/ai-voice-agent-cost-australia": {
    title: "AI Voice Agent Cost Australia 2026 | Pricing Guide | AI Pivot Toolbox",
    description: "How much does an AI voice agent cost in Australia? Pricing ranges from $500–$3,000/month. Compare agency vs solo operator pricing, what's included, and how to calculate ROI.",
  },
  "/blog/aeo-vs-seo-australia": {
    title: "AEO vs SEO Australia: What's the Difference? | AI Pivot Toolbox",
    description: "AEO (Answer Engine Optimisation) vs SEO explained for Australian businesses. Learn the difference, why both matter in 2026, and how to get your business into AI-generated answers.",
  },
  "/blog/get-business-recommended-chatgpt": {
    title: "How to Get Recommended by ChatGPT & Perplexity — Guide for Australian Businesses | AI Pivot Toolbox",
    description: "How to get your Australian business recommended by ChatGPT, Perplexity, and Google AI. Step-by-step GEO guide with research-backed techniques and real examples.",
  },
  "/blog/ai-automation-small-business-australia": {
    title: "AI Automation for Small Business Australia — Where to Start | AI Pivot Toolbox",
    description: "A practical guide to AI automation for Australian small businesses. Which tools to start with, what to avoid, and how to get ROI within 30 days. From $397/month.",
  },
  "/blog/workflow-automation-tasks-australia": {
    title: "10 Business Tasks to Automate With AI in Australia (2026) | AI Pivot Toolbox",
    description: "The 10 highest-ROI workflow automations for Australian businesses. What to automate, what tools to use, and what each one costs. Save 40+ hours per week.",
  },
  "/blog/best-ai-tools-australian-small-business-2026": {
    title: "Best AI Tools for Australian Small Business 2026 | AI Pivot Toolbox",
    description: "The best AI tools for Australian small businesses in 2026 — tested across admin, marketing, sales, and customer service. Honest reviews, real prices in AUD, no affiliate fluff.",
  },
  "/blog/automate-xero-with-ai-australia": {
    title: "How to Automate Xero With AI in Australia (2026 Guide) | AI Pivot Toolbox",
    description: "8 high-ROI ways to automate Xero with AI for Australian businesses. Bank reconciliation, invoice processing, debtor follow-up, and more. Tools, costs, and ROI explained.",
  },
  "/blog/ai-for-australian-accountants": {
    title: "AI for Australian Accountants: 7 Workflows to Automate (2026) | AI Pivot Toolbox",
    description: "How Australian accounting firms are using AI to automate client onboarding, BAS prep, advisory work, and compliance. 7 specific workflows with tools and ROI for 2026.",
  },
};

let cachedTemplate: string | null = null;

function getTemplate(distPath: string): string {
  if (!cachedTemplate) {
    cachedTemplate = fs.readFileSync(path.join(distPath, "index.html"), "utf-8");
  }
  return cachedTemplate;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function injectMeta(distPath: string) {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Only handle GET requests for HTML (not assets, API, etc.)
    if (req.method !== "GET") return next();

    const urlPath = req.path.replace(/\/$/, "") || "/";
    const meta = PAGE_META[urlPath];

    // If no meta entry, just serve the default index.html as-is
    if (!meta) return next();

    const canonicalUrl = urlPath === "/" ? BASE_URL + "/" : BASE_URL + urlPath;

    try {
      let html = getTemplate(distPath);

      // Replace <title>
      html = html.replace(
        /<title>[^<]*<\/title>/,
        `<title>${escapeHtml(meta.title)}</title>`
      );

      // Replace meta description
      html = html.replace(
        /<meta name="description" content="[^"]*"/,
        `<meta name="description" content="${escapeHtml(meta.description)}"`
      );

      // Replace canonical
      html = html.replace(
        /<link rel="canonical" href="[^"]*"/,
        `<link rel="canonical" href="${canonicalUrl}"`
      );

      // Replace og:title
      html = html.replace(
        /<meta property="og:title" content="[^"]*"/,
        `<meta property="og:title" content="${escapeHtml(meta.title)}"`
      );

      // Replace og:description
      html = html.replace(
        /<meta property="og:description" content="[^"]*"/,
        `<meta property="og:description" content="${escapeHtml(meta.description)}"`
      );

      // Replace og:url
      html = html.replace(
        /<meta property="og:url" content="[^"]*"/,
        `<meta property="og:url" content="${canonicalUrl}"`
      );

      // Replace twitter:title
      html = html.replace(
        /<meta name="twitter:title" content="[^"]*"/,
        `<meta name="twitter:title" content="${escapeHtml(meta.title)}"`
      );

      // Replace twitter:description
      html = html.replace(
        /<meta name="twitter:description" content="[^"]*"/,
        `<meta name="twitter:description" content="${escapeHtml(meta.description)}"`
      );

      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.send(html);
    } catch {
      next();
    }
  };
}

// Bust the template cache on file change (dev mode)
export function bustMetaCache(): void {
  cachedTemplate = null;
}
