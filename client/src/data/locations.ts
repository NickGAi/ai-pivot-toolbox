export interface LocationData {
  city: string;
  state: string;
  stateShort: string;
  slug: string;
  lat: number;
  lng: number;
  geoRegion: string;
  headline: string;
  subheadline: string;
  intro: string;
  stats: { value: string; label: string; source: string }[];
  industries: string[];
  suburbs: string[];
  caseStudies: { industry: string; result: string; detail: string }[];
  faqs: { q: string; a: string }[];
  metaTitle: string;
  metaDescription: string;
}

export const locations: LocationData[] = [
  {
    city: "Brisbane",
    state: "Queensland",
    stateShort: "QLD",
    slug: "ai-automation-brisbane",
    lat: -27.4698,
    lng: 153.0251,
    geoRegion: "AU-QLD",
    headline: "AI Automation Agency Brisbane",
    subheadline: "Save 40+ hours a week. Get found on Google & AI search. No agency markup.",
    intro: "Brisbane businesses are moving fast on AI — and those who automate first are pulling ahead. AI Pivot Toolbox helps Queensland SMBs deploy AI voice agents, workflow automation, and AI SEO that puts them in front of customers on Google, ChatGPT, and Perplexity — at 40–60% below what Brisbane agencies charge.",
    stats: [
      { value: "80%", label: "of QLD SMBs adopting AI in 2025", source: "BizCover 2025" },
      { value: "40hrs", label: "saved per week on average", source: "AI Pivot deployments" },
      { value: "60 days", label: "average time to live", source: "AI Pivot deployments" },
    ],
    industries: ["Real Estate", "Professional Services", "Healthcare", "Construction", "Hospitality", "Legal", "Finance", "Retail"],
    suburbs: ["CBD", "Fortitude Valley", "South Brisbane", "Newstead", "Chermside", "Carindale", "Sunnybank", "Ipswich", "Gold Coast", "Sunshine Coast"],
    caseStudies: [
      {
        industry: "Brisbane Real Estate Agency",
        result: "Handling 400+ buyer enquiries monthly without extra staff",
        detail: "AI voice agent qualifying leads and booking inspections 24/7, integrated with their CRM"
      },
      {
        industry: "Brisbane Professional Services Firm",
        result: "35 hours of admin saved per week",
        detail: "Automated client intake, invoice processing and follow-up sequences via Xero integration"
      },
      {
        industry: "South East QLD Healthcare Practice",
        result: "Cut appointment no-shows by 60%",
        detail: "AI-powered SMS reminders and rebooking integrated with their practice management software"
      }
    ],
    faqs: [
      {
        q: "How much does AI automation cost for a Brisbane business?",
        a: "AI automation for Brisbane businesses starts from $397/month for an analytics dashboard, through to $1,497/month for full workflow automation or AI SEO. Because AI Pivot Toolbox is a solo operator — not a large Brisbane agency — pricing runs 40–60% below the market rate. Most Brisbane clients see ROI within 60–90 days."
      },
      {
        q: "Do you work with Brisbane businesses in person?",
        a: "Yes. While most of our work is delivered remotely (faster and more efficient), we're Brisbane-based and available for on-site meetings with clients across Greater Brisbane, Gold Coast, and the Sunshine Coast."
      },
      {
        q: "Which Brisbane industries benefit most from AI automation?",
        a: "Real estate, professional services, healthcare, legal, and hospitality businesses in Brisbane see the fastest ROI. These industries typically have high-volume repetitive tasks — enquiry handling, appointment booking, invoicing — that AI automates completely."
      }
    ],
    metaTitle: "AI Automation Agency Brisbane | AI Voice Agents, SEO & Workflow Automation | AI Pivot Toolbox",
    metaDescription: "Brisbane's AI automation specialist. AI voice agents, workflow automation, AI SEO and GEO — 40–60% below agency rates. Serving Brisbane CBD, Gold Coast and Sunshine Coast. Free strategy call.",
  },
  {
    city: "Sydney",
    state: "New South Wales",
    stateShort: "NSW",
    slug: "ai-automation-sydney",
    lat: -33.8688,
    lng: 151.2093,
    geoRegion: "AU-NSW",
    headline: "AI Automation Agency Sydney",
    subheadline: "Enterprise-grade AI automation. Solo operator prices. No account manager layers.",
    intro: "Sydney businesses face Australia's most competitive market. AI Pivot Toolbox gives NSW companies enterprise-grade AI voice agents, workflow automation, and AI SEO — without the $5,000/month Sydney agency price tag. Work directly with one specialist who deploys faster and costs 40–60% less.",
    stats: [
      { value: "4.4x", label: "conversion rate from AI search vs organic", source: "Semrush 2025" },
      { value: "$44B", label: "GDP boost if 1-in-10 NSW SMBs advance AI use", source: "Deloitte Access Economics 2025" },
      { value: "7–14 days", label: "average go-live for Sydney clients", source: "AI Pivot deployments" },
    ],
    industries: ["Finance & Banking", "Legal", "Real Estate", "Healthcare", "Technology", "Retail", "Hospitality", "Professional Services"],
    suburbs: ["CBD", "Parramatta", "North Sydney", "Chatswood", "Surry Hills", "Bondi", "Manly", "Penrith", "Wollongong", "Newcastle"],
    caseStudies: [
      {
        industry: "Sydney Finance Broker",
        result: "Qualifying 200+ loan enquiries monthly on autopilot",
        detail: "AI voice agent pre-qualifies leads, captures income/employment details, and books discovery calls into the broker's calendar"
      },
      {
        industry: "Sydney Legal Practice",
        result: "Saved 28 hours of admin per week",
        detail: "Automated client onboarding, document collection, billing reminders and Xero reconciliation"
      },
      {
        industry: "Inner-West Hospitality Group",
        result: "Responding to 100% of Google reviews within 2 hours",
        detail: "AI reputation management generating custom responses and driving a 0.4-star Google rating increase in 90 days"
      }
    ],
    faqs: [
      {
        q: "How much does AI automation cost compared to Sydney agencies?",
        a: "Sydney AI agencies typically charge $3,000–$6,000/month for managed automation services. AI Pivot Toolbox charges $997–$1,497/month for equivalent services — because there's no agency overhead, account managers, or markup layers. Same quality output, direct communication, faster delivery."
      },
      {
        q: "Can you integrate AI with Sydney-based systems like Salesforce, HubSpot or Xero?",
        a: "Yes. We integrate with Salesforce, HubSpot, Zoho, Xero, MYOB, Microsoft 365, Google Workspace, and hundreds of other platforms commonly used by Sydney businesses. All integrations are custom-built to your existing workflow."
      },
      {
        q: "Do you serve businesses outside Sydney CBD?",
        a: "We serve businesses across all of Greater Sydney and NSW — including Parramatta, North Sydney, Wollongong, and Newcastle. All services are delivered remotely with video strategy sessions."
      }
    ],
    metaTitle: "AI Automation Agency Sydney | AI Voice Agents, Workflow Automation & AI SEO | AI Pivot Toolbox",
    metaDescription: "Sydney AI automation specialist. AI voice agents, workflow automation, AI SEO — 40–60% below Sydney agency rates. Serving CBD, Parramatta, North Sydney and all of NSW. Free strategy call.",
  },
  {
    city: "Melbourne",
    state: "Victoria",
    stateShort: "VIC",
    slug: "ai-automation-melbourne",
    lat: -37.8136,
    lng: 144.9631,
    geoRegion: "AU-VIC",
    headline: "AI Automation Agency Melbourne",
    subheadline: "Victoria's fastest-growing businesses use AI. Don't get left behind.",
    intro: "Melbourne is Australia's tech and startup capital — and AI adoption here is accelerating faster than anywhere else in the country. AI Pivot Toolbox helps Victorian businesses deploy AI voice agents, workflow automation, and AI SEO quickly and affordably, without locking you into an expensive agency retainer.",
    stats: [
      { value: "51%", label: "CAGR of Australian AI market to 2034", source: "IBIS World 2025" },
      { value: "90%", label: "error reduction in automated processes", source: "AI Pivot deployments" },
      { value: "12,000+", label: "calls handled monthly across deployments", source: "AI Pivot deployments" },
    ],
    industries: ["Technology & SaaS", "Retail & eCommerce", "Healthcare", "Education", "Property", "Hospitality", "Creative Services", "Manufacturing"],
    suburbs: ["CBD", "Southbank", "Fitzroy", "Richmond", "St Kilda", "Dandenong", "Sunshine", "Ringwood", "Geelong", "Ballarat"],
    caseStudies: [
      {
        industry: "Melbourne eCommerce Retailer",
        result: "40% reduction in customer service workload",
        detail: "AI chatbot handling order tracking, returns, and product questions 24/7 — integrated with Shopify and Gorgias"
      },
      {
        industry: "Melbourne Tech Startup",
        result: "Automated 80% of lead qualification",
        detail: "AI sales agent qualifying inbound demo requests, enriching CRM records, and sending personalised follow-up sequences"
      },
      {
        industry: "Victorian Healthcare Network",
        result: "Processed 600+ referrals monthly with zero admin delay",
        detail: "Workflow automation connecting GP referrals to specialist scheduling, with automated patient comms"
      }
    ],
    faqs: [
      {
        q: "Which Melbourne businesses get the most from AI automation?",
        a: "Melbourne's tech startups, retail/eCommerce brands, healthcare providers, and professional services firms see the strongest ROI. Any business with repetitive admin tasks, high-volume customer enquiries, or manual data entry is a strong candidate for AI automation."
      },
      {
        q: "How does AI SEO help Melbourne businesses rank on Google?",
        a: "Our AI SEO service combines technical SEO, GEO (Generative Engine Optimisation), and AEO (Answer Engine Optimisation) to get Melbourne businesses ranking on Google AND appearing in AI-generated answers on ChatGPT, Perplexity, and Google AI Overviews — where Semrush data shows visitors convert 4.4x higher than from organic search."
      },
      {
        q: "Can you work with Melbourne businesses across Victoria?",
        a: "Yes. We serve businesses across Greater Melbourne and regional Victoria including Geelong, Ballarat, and Bendigo. All services are delivered remotely with dedicated video strategy sessions."
      }
    ],
    metaTitle: "AI Automation Agency Melbourne | AI Voice Agents, SEO & Workflow Automation | AI Pivot Toolbox",
    metaDescription: "Melbourne AI automation specialist. AI voice agents, workflow automation, AI SEO and GEO — 40–60% below Melbourne agency rates. Serving CBD, Geelong and all of VIC. Free strategy call.",
  },
  {
    city: "Perth",
    state: "Western Australia",
    stateShort: "WA",
    slug: "ai-automation-perth",
    lat: -31.9505,
    lng: 115.8605,
    geoRegion: "AU-WA",
    headline: "AI Automation Agency Perth",
    subheadline: "WA businesses are automating the work. The ones moving now are pulling ahead.",
    intro: "Perth's resource, mining, and professional services industries are sitting on some of the highest-value automation opportunities in Australia. AI Pivot Toolbox builds AI voice agents, workflow automation, and AI SEO for Western Australian businesses — at 40–60% below what Perth agencies charge for the same work.",
    stats: [
      { value: "5hrs", label: "saved per day by WA businesses using AI admin tools", source: "Deloitte Access Economics 2025" },
      { value: "$2–$3", label: "per invoice with AI vs $15–$20 manually", source: "AI Pivot deployments" },
      { value: "30 days", label: "average time to first measurable result", source: "AI Pivot deployments" },
    ],
    industries: ["Mining & Resources", "Construction", "Professional Services", "Healthcare", "Real Estate", "Legal", "Agriculture", "Hospitality"],
    suburbs: ["CBD", "Subiaco", "Fremantle", "Joondalup", "Rockingham", "Mandurah", "Bunbury", "Karratha", "Port Hedland", "Kalgoorlie"],
    caseStudies: [
      {
        industry: "Perth Mining Services Company",
        result: "Automated FIFO timesheet and invoice processing",
        detail: "Eliminated 15 hours of manual data entry per week with AI document processing integrated into MYOB"
      },
      {
        industry: "Perth Property Management Firm",
        result: "Handling 300+ maintenance requests monthly automatically",
        detail: "AI voice agent triaging tenant requests, dispatching trades, and sending status updates — no manual coordination"
      },
      {
        industry: "WA Construction Business",
        result: "Cut quote turnaround from 3 days to 4 hours",
        detail: "AI workflow extracting job specs from emails, pre-filling quote templates, and notifying the estimator for final review"
      }
    ],
    faqs: [
      {
        q: "Do you work with Perth mining and resources businesses?",
        a: "Yes. Perth's mining and resources sector is one of our strongest use cases — particularly FIFO workforce management, invoice automation, and document processing. We've built automations that integrate with MYOB, Pronto, and common mining industry platforms."
      },
      {
        q: "Is AI automation affordable for small Perth businesses?",
        a: "Absolutely. Our AI chatbot starts at $597/month and AI analytics dashboard at $397/month. For a solo operator or small team, even one tool typically saves more in time than it costs. Most Perth clients see clear ROI within the first month."
      },
      {
        q: "Can you help Perth businesses get found on Google and AI search?",
        a: "Yes. Our AI SEO service ($1,497/month) is specifically designed for Australian local businesses. We optimise for Google, Google AI Overviews, ChatGPT, and Perplexity — targeting Perth-specific search terms to drive local enquiries."
      }
    ],
    metaTitle: "AI Automation Agency Perth | AI Voice Agents, SEO & Workflow Automation | AI Pivot Toolbox",
    metaDescription: "Perth AI automation specialist. AI voice agents, workflow automation, AI SEO — 40–60% below Perth agency rates. Serving CBD, Fremantle, Joondalup and all of WA. Free strategy call.",
  },
  {
    city: "Adelaide",
    state: "South Australia",
    stateShort: "SA",
    slug: "ai-automation-adelaide",
    lat: -34.9285,
    lng: 138.6007,
    geoRegion: "AU-SA",
    headline: "AI Automation Agency Adelaide",
    subheadline: "South Australia's AI automation specialist. Less overhead. More results.",
    intro: "Adelaide businesses have a real competitive advantage right now — AI adoption is still early here, meaning the companies who move first will dominate search results and win customers on autopilot. AI Pivot Toolbox helps South Australian businesses deploy AI tools, automation, and AI SEO faster and more affordably than any Adelaide agency.",
    stats: [
      { value: "39%", label: "of AU searches now show AI-generated answers", source: "auDA Digital Lives 2025" },
      { value: "33.9%", label: "boost in AI citation visibility from adding statistics", source: "Princeton/IIT Delhi 2024" },
      { value: "24hrs", label: "typical go-live for AI chatbot deployments", source: "AI Pivot deployments" },
    ],
    industries: ["Defence & Aerospace", "Wine & Agriculture", "Manufacturing", "Healthcare", "Professional Services", "Education", "Retail", "Construction"],
    suburbs: ["CBD", "Glenelg", "Norwood", "Prospect", "Port Adelaide", "Salisbury", "Mount Barker", "Murray Bridge", "Whyalla", "Port Augusta"],
    caseStudies: [
      {
        industry: "Adelaide Manufacturing Business",
        result: "Automated purchase order and supplier invoice processing",
        detail: "AI document processing reading supplier invoices, matching to POs, and flagging discrepancies — saving 12 hours per week"
      },
      {
        industry: "SA Healthcare Clinic",
        result: "Reduced no-show rate from 22% to 8%",
        detail: "AI-powered patient reminder system with two-way SMS, auto-rebooking, and waitlist management"
      },
      {
        industry: "Adelaide Professional Services Firm",
        result: "Ranked page 1 for 'Adelaide business consultant AI' in 90 days",
        detail: "Full AI SEO and GEO campaign targeting South Australian search terms and appearing in AI-generated answers"
      }
    ],
    faqs: [
      {
        q: "Is AI automation worth it for Adelaide's smaller business market?",
        a: "Adelaide's business market is actually ideal for AI automation — less saturated than Sydney or Melbourne, meaning you can gain a real competitive edge faster. A $597/month AI chatbot or $997/month voice agent typically delivers ROI within 30–60 days regardless of business size."
      },
      {
        q: "Can you help Adelaide businesses rank on Google with AI SEO?",
        a: "Yes. Adelaide is one of the best cities in Australia for AI SEO right now — search competition is lower than Sydney and Melbourne, meaning you can achieve page 1 rankings faster. Our AI SEO service targets Adelaide-specific keywords across Google, ChatGPT, Perplexity, and Google AI Overviews."
      },
      {
        q: "Do you work with Adelaide defence and manufacturing businesses?",
        a: "Yes. We work with businesses across Adelaide's defence, manufacturing, and agriculture sectors. Common use cases include document processing, supplier automation, compliance reporting, and workforce communication tools."
      }
    ],
    metaTitle: "AI Automation Agency Adelaide | AI Voice Agents, SEO & Workflow Automation | AI Pivot Toolbox",
    metaDescription: "Adelaide AI automation specialist. AI voice agents, workflow automation, AI SEO — 40–60% below Adelaide agency rates. Serving CBD, Glenelg, Port Adelaide and all of SA. Free strategy call.",
  }
];

export function getLocationBySlug(slug: string): LocationData | undefined {
  return locations.find(l => l.slug === slug);
}
