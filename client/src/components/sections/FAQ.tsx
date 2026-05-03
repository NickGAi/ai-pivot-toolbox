import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How much does AI automation cost for a small business in Australia?",
    answer: "AI automation for Australian small businesses starts from $397/month for a managed analytics dashboard, through to $1,497/month for full workflow automation or AI SEO. Because AI Pivot Toolbox is a solo AI-powered operator — not a large agency with high overhead — our pricing runs 40–60% below what traditional agencies charge for equivalent work. For context, large agencies typically charge $2,500–$5,000/month for the same managed services. Most clients see a return on investment within the first 60–90 days through time savings of 5–15 hours per week."
  },
  {
    question: "What is GEO — Generative Engine Optimisation?",
    answer: "GEO (Generative Engine Optimisation) is the practice of optimising your website and content so it gets cited, quoted, and surfaced by AI search engines like ChatGPT, Google AI Overviews, and Perplexity. Unlike traditional SEO which focuses on ranking in a list of links, GEO focuses on becoming the source AI engines pull their answers from. According to Princeton/IIT Delhi research (2024), adding statistics increases AI citation visibility by 33.9%, expert quotes by 32%, and structured content by 30%. AI Pivot Toolbox builds all content with GEO-first principles built in."
  },
  {
    question: "How do I get my business found on ChatGPT and Perplexity?",
    answer: "Getting found on ChatGPT, Perplexity, and Google AI Overviews requires a different strategy than traditional SEO. The three most important factors are: (1) structured, answer-first content that directly responds to questions your customers ask; (2) authoritative citations — links to .gov, .edu, and trusted industry sources; and (3) FAQ pages and comparison content that match real conversational queries. AI Pivot Toolbox's AEO and GEO service handles all of this for you, typically improving AI search visibility within 60–90 days."
  },
  {
    question: "How much does an AI voice agent cost in Australia?",
    answer: "A fully managed AI voice agent service from AI Pivot Toolbox costs $997/month — including setup, custom voice and personality configuration, CRM integration, appointment booking, and ongoing management. Large AI agencies in Australia typically charge $2,000–$3,000/month for the same service. The AI voice agent handles inbound and outbound calls 24/7, qualifies leads, books appointments, and logs all interactions automatically. Most clients recover the cost within the first month through leads captured outside business hours."
  },
  {
    question: "What AI tools are Australian small businesses using most in 2025?",
    answer: "According to BizCover's 2025 Australian Small Business AI Report (965 businesses surveyed), 80% of Australian SMBs are using or planning to adopt AI in 2025 — up from 39% in mid-2024. The most common use cases are: content and marketing automation (91% adoption intent in that sector), AI chatbots for customer service, meeting transcription tools, Xero/MYOB AI bookkeeping, and data reporting. The primary barrier to adoption is no longer cost — it's lack of knowledge about how to implement AI effectively. This is exactly the gap AI Pivot Toolbox fills."
  },
  {
    question: "What is the difference between AI SEO and traditional SEO?",
    answer: "Traditional SEO focuses on ranking in Google's blue-link results through keywords, backlinks, and technical optimisation. AI SEO goes further — it uses artificial intelligence to produce content at scale, identify ranking opportunities faster, and optimise for both Google and AI search engines simultaneously. AI SEO also encompasses AEO (Answer Engine Optimisation) and GEO (Generative Engine Optimisation), ensuring your business appears in AI-generated answers, not just search result pages. Gartner projects that 30% of searches will involve AI-generated answers by 2026, making AI SEO essential now."
  },
  {
    question: "How long does it take to set up AI automation for my business?",
    answer: "Most AI automation services from AI Pivot Toolbox are live within 7–14 days. An AI chatbot typically takes 3–5 days to train and deploy. A workflow automation build takes 1–2 weeks depending on complexity. An AI voice agent is generally live within a week. Full AI SEO campaigns begin producing measurable results within 60–90 days. Unlike large agencies with lengthy onboarding processes, working directly with a solo AI specialist means faster turnaround, direct communication, and no account manager delays."
  },
  {
    question: "Can AI automation integrate with Xero, MYOB, or my existing software?",
    answer: "Yes. AI Pivot Toolbox builds automation that integrates with Xero, MYOB, QuickBooks, HubSpot, Salesforce, Zoho, Google Workspace, Microsoft 365, Shopify, WooCommerce, and hundreds of other platforms via API and tools like Make and Zapier. Invoice automation specifically reduces per-transaction processing costs from $15–20 down to $2–3 with 90%+ error reduction. If your tool has an API or integration layer, we can connect it — and if it doesn't, we can usually find a workaround."
  },
  {
    question: "Are AI automation services compliant with Australian privacy law?",
    answer: "Yes. All AI Pivot Toolbox solutions are designed to comply with the Privacy Act 1988, the Australian Privacy Principles (APPs), and APRA standards for financial services. Key compliance practices include data sovereignty (Australian or locally-hosted infrastructure where required), full audit trails for automated decisions, and privacy-by-design architecture. We do not store or share client data with third parties beyond the integration platforms required to deliver the service. All AI models used are selected for transparency and explainability."
  },
  {
    question: "Why is AI Pivot Toolbox cheaper than other AI agencies in Australia?",
    answer: "AI Pivot Toolbox is a solo operator using AI tools to deliver agency-quality results without agency overhead. There are no account managers, no project coordinators, no large office leases, and no markup layers — just one specialist using the best available AI tools working directly with you. This structure allows pricing 40–60% below what traditional AI agencies charge, while maintaining faster turnaround and more direct communication. When you work with AI Pivot Toolbox, you work directly with the person doing the work — not a junior account manager relaying messages."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };

  return (
    <section id="faq" className="py-24" aria-labelledby="faq-heading">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="container-main">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 id="faq-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Straight answers about AI automation pricing, timelines, and how it works for Australian businesses
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="rounded-2xl bg-card border border-border overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-answer-${i}`}
                  data-testid={`faq-question-${i}`}
                >
                  <h3 className="text-lg font-semibold text-foreground pr-4" itemProp="name">
                    {faq.question}
                  </h3>
                  <ChevronDown 
                    className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200 ${
                      openIndex === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  id={`faq-answer-${i}`}
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === i ? 'max-h-[600px]' : 'max-h-0'
                  }`}
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <p 
                    className="px-6 pb-5 text-muted-foreground leading-relaxed"
                    itemProp="text"
                    data-testid={`faq-answer-${i}`}
                  >
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
