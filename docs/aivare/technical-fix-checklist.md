# AiVARE — Technical Fix Checklist

Priority order. Nothing in the content strategy has any effect until items 1–4 are done.

---

## Priority 1 — Blockers (do these before anything else)

### 1. Fix server-side rendering
**Problem:** The production site is a client-side-rendered SPA that returns `Loading AiVARE...` to non-JS crawlers. Google has indexed zero substantive pages. `site:aivare.com.au` returns nothing meaningful.

**Fix options (pick one):**
- **Option A (recommended):** Refactor marketing pages to Next.js with App Router. Use SSG for blog content, ISR (`revalidate: 86400`) for service pages. Deploy to Vercel. One-week effort.
- **Option B (lighter):** Implement SSR middleware (e.g. `react-snap` or `vite-plugin-ssr`) that pre-renders the key marketing routes at build time. Less architectural change but more fragile long-term.

**Pages that must render without JS (minimum viable set):**
- `/` (homepage)
- `/founders25` or equivalent pricing/CTA page
- `/pricing`
- `/features`
- `/about`
- `/blog` (index)
- `/sitemap.xml`
- `/robots.txt`

**Verify with:**
```bash
curl -s https://aivare.com.au | grep -i "loading aivare"
# Should return nothing if SSR is working
curl -s https://aivare.com.au | grep -i "<h1"
# Should return your actual H1
```

---

### 2. Fix the legal flags in meta
**Problem:** Current meta contains three unsubstantiated claims that carry ACCC/ACL misleading-conduct exposure:

| Claim | Problem | Fix |
|---|---|---|
| "Australia's #1 AI Real Estate CRM" | Unsubstantiated superlative — ACCC has enforced against this pattern | Remove until you have independent evidence (G2 rating, independent review count, market share data) |
| "Used by 500+ agents" | ABN registered October 2025 — implausible at any realistic growth rate | Remove until substantiated with real user count |
| "analyze" | US spelling on an AU brand | Change to "analyse" |

**Suggested replacement meta description:**
> AiVARE is an AI-native CRM built for Australian real estate agents leaving franchises. Digital Agents handle prospecting, lead scoring, listing copy and follow-up — so you work your database, not your inbox.

---

### 3. Add /robots.txt and /sitemap.xml
**robots.txt template:**
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /app/
Disallow: /*?*utm_*

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: https://aivare.com.au/sitemap.xml
```

**sitemap.xml:** Auto-generate via next-sitemap or App Router metadata API once SSR is live. Include every published blog post, every service page, /about, /pricing, /features, /founders25 (if public). Exclude /api/*, /app/*, /admin/*, drafts.

---

### 4. Pick one conversion motion and kill the other
**Problem:** "Paid Founders 25 pilot" and "Free 14-day trial" are contradictory. Mixed messaging destroys conversion because visitors can't form a single intent.

**Recommendation:** Lead with Founders 25 (paid, high-commitment, creates case-study assets). Use "Book a demo" as the secondary low-friction CTA. Remove "free trial" language until you have the product stable enough to support it.

---

## Priority 2 — Schema (do these in Week 1 once SSR is live)

Add the following JSON-LD blocks to `<head>`. Validate each with [Rich Results Test](https://search.google.com/test/rich-results) before deploying.

### Organization (sitewide, in root layout)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://aivare.com.au#org",
  "name": "AiVARE",
  "url": "https://aivare.com.au",
  "logo": "https://aivare.com.au/logo.png",
  "sameAs": [
    "https://www.linkedin.com/company/aivare",
    "https://x.com/aivare"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "AU",
    "addressRegion": "QLD",
    "addressLocality": "Brisbane"
  },
  "founder": {
    "@type": "Person",
    "name": "Nick Griffiths",
    "url": "https://aivare.com.au/about/nick-griffiths"
  }
}
```

### Person — Nick Griffiths (on /about/nick-griffiths and as author on every blog post)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://aivare.com.au/about/nick-griffiths#person",
  "name": "Nick Griffiths",
  "url": "https://aivare.com.au/about/nick-griffiths",
  "jobTitle": "Founder",
  "worksFor": {"@id": "https://aivare.com.au#org"},
  "sameAs": [
    "https://www.linkedin.com/in/YOUR_LINKEDIN_SLUG",
    "https://x.com/YOUR_X_HANDLE",
    "https://github.com/YOUR_GITHUB_HANDLE"
  ],
  "knowsAbout": [
    "AI automation",
    "Real estate technology",
    "CRM software",
    "Generative engine optimisation"
  ]
}
```

### SoftwareApplication (on homepage and /features)
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "AiVARE",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "AUD",
    "price": "YOUR_PRICE"
  },
  "provider": {"@id": "https://aivare.com.au#org"}
}
```

### BlogPosting (on every blog post)
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "POST_TITLE",
  "description": "META_DESCRIPTION",
  "image": ["HERO_IMAGE_URL"],
  "datePublished": "YYYY-MM-DD",
  "dateModified": "YYYY-MM-DD",
  "author": {"@id": "https://aivare.com.au/about/nick-griffiths#person"},
  "publisher": {"@id": "https://aivare.com.au#org"},
  "mainEntityOfPage": "https://aivare.com.au/blog/SLUG"
}
```

### FAQPage (on every page with genuine Q&A)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "QUESTION_TEXT",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ANSWER_TEXT"
      }
    }
  ]
}
```

### BreadcrumbList (on every non-home page)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://aivare.com.au/"},
    {"@type": "ListItem", "position": 2, "name": "SECTION", "item": "https://aivare.com.au/SECTION/"},
    {"@type": "ListItem", "position": 3, "name": "PAGE", "item": "https://aivare.com.au/SECTION/SLUG"}
  ]
}
```

---

## Priority 3 — Search Console & Indexing (Week 1)

### Google Search Console
1. Add property as **domain property** (covers www + non-www + http/https)
2. Submit `/sitemap.xml`
3. Use URL Inspection → Request Indexing on homepage, /founders25, /pricing, /features, /about immediately after SSR is live
4. Connect GSC to GA4

### Bing Webmaster Tools + IndexNow
**This is the free moat most AU real estate tech competitors skip.** Bing powers ChatGPT and Copilot search — getting indexed here directly affects AI citation.

1. Go to [bing.com/webmasters](https://www.bing.com/webmasters)
2. Add site, verify via DNS TXT record
3. Generate an IndexNow API key
4. Submit sitemap
5. After every new page deploy, ping IndexNow:
```
https://www.bing.com/indexnow?url=https://aivare.com.au/YOUR-NEW-PAGE&key=YOUR_KEY
```
Or use the `next-indexnow` package if on Next.js.

### Google Business Profile
1. Create/claim at [business.google.com](https://business.google.com)
2. Brisbane address (your registered address)
3. Category: Software Company / CRM Software
4. Upload real photos (no stock)
5. Link to a **specific service page** — not the homepage (GBP policy update mid-2025)
6. Do NOT keyword-stuff the business name — triggers manual video re-verification lock

---

## Priority 4 — /about/nick-griffiths Page (Week 2)

This page is load-bearing for Google's author signals (added to Search Central February 2026) and for every `Person` schema reference across the site.

**Must include:**
- Headshot photo (real, not stock)
- Name, title, location (Brisbane, QLD, Australia)
- Short bio (200–400 words) in first person, Nick's actual voice
- Links to LinkedIn, X/Twitter, GitHub (these populate the `sameAs` in Person schema)
- ABN or business registration reference (adds trust signals)
- `Person` JSON-LD in `<head>` (see schema section above)

**Slug:** `/about/nick-griffiths` — use this exact path so all `sameAs` schema references point correctly.

---

## Priority 5 — OG Image Fix

**Problem:** The sibling domain `aivare.org/app` has OG metadata pointing to the wrong domain. Once the `.com.au` marketing site is live and properly rendered, ensure:

- `og:image` is hosted at `https://aivare.com.au/og.jpg` (not the SPA sibling or any Replit preview domain)
- Image dimensions: 1200×630px
- Image text passes mobile readability (≥48px font)
- File size: <300KB, JPG or PNG
- `og:locale` set to `en_AU`
- `og:site_name` set to `AiVARE`

---

## Verification Checklist (run before considering technical work done)

```bash
# 1. SSR working
curl -s https://aivare.com.au | grep "<h1"          # must return your H1

# 2. robots.txt accessible
curl -I https://aivare.com.au/robots.txt             # must return 200

# 3. sitemap accessible
curl -I https://aivare.com.au/sitemap.xml            # must return 200

# 4. No meta legal flags
curl -s https://aivare.com.au | grep -i "australia's #1"   # must return nothing
curl -s https://aivare.com.au | grep -i "500+ agents"       # must return nothing
curl -s https://aivare.com.au | grep "analyze"              # must return nothing

# 5. Schema present
curl -s https://aivare.com.au | grep "application/ld+json"  # must return at least 1 match
```

Then validate schema at [search.google.com/test/rich-results](https://search.google.com/test/rich-results).
