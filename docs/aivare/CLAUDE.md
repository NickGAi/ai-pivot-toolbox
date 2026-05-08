# CLAUDE.md — AiVARE Project Context

## Project
- **Name:** AiVARE
- **Domain:** aivare.com.au
- **Founder:** Nick Griffiths (Brisbane, QLD, AU) — sole operator
- **ABN registered:** 7 October 2025 — Griffiths, Nicholas Stephen, sole trader, QLD 4020

## What AiVARE Is
AI-native CRM for Australian real estate agents. Not a bolt-on AI layer — Digital Agents that autonomously handle prospecting, lead scoring, listing copy, open-home follow-up, vendor reports and cold calling. Built for independent and boutique agencies that have left or are about to leave a franchise (Ray White, LJH, Harcourts, McGrath, Belle, Raine & Horne).

**The core wedge:** No incumbent CRM positions against the franchise model. Reapit, Rex, MRI Vault all sell *to* franchises. AiVARE sells to agents leaving them. The "Secession" narrative is uncontested.

## ICP (Inferred Customer Profile)
- **Primary:** Solo principal-agents and 2–10-person boutique agencies in NSW/VIC/QLD currently inside a franchise whose renewal is within 18 months and who are paying ~8% of GCI to the brand
- **Secondary:** Independent agencies on legacy CRMs (Reapit/AgentBox, MRI Vault, MyDesktop, Box+Dice) whose AI feature roadmap is bolt-on rather than agentic
- **Tertiary:** Brand-new agents leaving sales roles at franchises to start their own shop
- **They are NOT:** Large franchise networks, property managers only, commercial-only agencies

## Brand Voice
See `/references/voice.md`. Read it before writing a single sentence of prose.

**Register:** Savage, confident, direct. Sabri Suby / Hormozi value-stack meets MSCHF / Liquid Death irreverence. Every brag must be substantiated — the voice only works when the claims are real.

**Lexical mandates:**
- "Digital Agents" not "AI chatbots"
- "Secession" not "switching CRMs"
- "Founders 25" (capitalised) for the founding cohort
- "GCI" not "commission" where precision matters
- "independent" not "boutique" as primary descriptor

**Banned words/phrases:** game-changer, synergy, leverage (verb), unleash, cutting-edge, state-of-the-art, world-class, delve, tapestry, nestled, navigate the complexities, "In today's", "Whether you're…", "It's important to note"

## Mandates (non-negotiable)
- **Australian English everywhere.** optimisation, organisation, behaviour, colour, analyse, realise, centre, licence (noun)/license (verb), enrol, programme, tonne, mum. Never optimize/analyze/color/center.
- **No unsubstantiated superlatives.** "Australia's #1" and "500+ agents" are retired until independently verified. ACCC/ACL exposure is real.
- **One motion.** Pick paid Founders 25 pilot OR free 14-day trial. Never both on the same page.
- **Experience density.** Every blog post and service page must contain at least three of: real dollar figure, named client (or anonymised case with real metric), dated event, named tool/version, before/after benchmark, proprietary screenshot.
- **Server-side rendering for all marketing pages.** No client-side-rendered marketing. Every page must serve readable HTML to a non-JS crawler. This is non-negotiable — until it's fixed, no other SEO/AEO work has effect.
- **One H1 per page.** Primary keyword in first 100 words.
- **Schema in `<head>`** as JSON-LD. Validate with Rich Results Test before deploying.
- **Last Updated date visible** on every blog post and service page; `dateModified` in schema.
- **Author byline** with link to /about/nick-griffiths, Person schema with `sameAs` to LinkedIn, X, GitHub.
- **No AI-slop.** Use Claude/GPT for scaffolding only. Edit ratio >30% per pass before publishing.

## Competitive Set
| Competitor | Positioning | Their weakness | Our differentiator |
|---|---|---|---|
| Reapit Sales (AgentBox) | "#1 used by Top 100 agents" | Sells to franchises, not against them; no agentic AI | Secession narrative + Digital Agents |
| MRI Vault (VaultRE) | Enterprise franchise CRM | Same as Reapit | Secession + price |
| Rex Software | Most AI-active incumbent (AI Advisory Board) | Bolt-on AI, not agentic; franchise-aligned | Autonomous agents vs feature additions |
| LockedOn | Triggers + GUARDIAN trust integration | No secession angle | Full Digital Agent autonomy |
| RiTA (Cotality) | AI prospecting layer over existing CRM | Requires existing CRM; not a full replacement | All-in-one: CRM + Digital Agents |
| Box+Dice | Lock-in clauses | Dated UI, lock-in | Easy migration + open data |

## AEO Targets — When an Australian agent asks ChatGPT/Perplexity/AI Overviews, AiVARE should appear for:
- "Best AI CRM for real estate agents Australia 2026"
- "Best CRM for independent real estate agents Australia"
- "How do I leave Ray White and keep my database"
- "Real estate franchise alternative in Australia 2026"
- "Reapit AgentBox versus alternatives"
- "AI agent for real estate prospecting Australia"
- "Real estate CRM with trust accounting Australia"
- "Cheapest real estate CRM Australia"

## Quality Gates Before Publishing
1. Marketing pages render static HTML to curl (no JS required)
2. Rich Results Test passes for all schema on the page
3. Australian English spelling pass
4. No unsubstantiated superlatives
5. Experience density: ≥3 of the six elements present
6. One motion only (Founders 25 OR free trial — not both)
