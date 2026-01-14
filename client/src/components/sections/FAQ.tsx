import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How much can AI automation reduce operational costs for Australian businesses?",
    answer: "Australian enterprises typically see 60-80% reduction in manual processing costs within 6-12 months of implementing AI automation. For example, invoice processing automation can reduce per-transaction costs from $15-20 to $2-3, while AI voice agents can handle 70-85% of tier-1 customer inquiries without human intervention. Our clients in financial services and professional services report average annual savings of $180K-$450K in operational costs."
  },
  {
    question: "Are AI automation solutions compliant with Australian data privacy regulations?",
    answer: "Yes, enterprise AI automation can be fully compliant with Australian regulatory frameworks including the Privacy Act 1988, Australian Privacy Principles (APPs), and APRA standards for financial services. AIPivot designs all AI solutions with compliance-first architecture: data sovereignty (Australian-hosted infrastructure), audit trails for all automated decisions, explainable AI models, and privacy-by-design principles."
  },
  {
    question: "What is the typical implementation timeline for enterprise AI automation?",
    answer: "Enterprise AI automation typically requires 6-12 weeks for full implementation, depending on integration complexity. AIPivot's phased approach begins with a 2-week discovery and compliance audit, followed by pilot deployment in one department before enterprise-wide rollout. Most clients see measurable ROI within the first quarter."
  },
  {
    question: "Can AI voice agents integrate with existing CRM systems?",
    answer: "Yes, AI voice agents seamlessly integrate with all major CRM platforms including Salesforce, HubSpot, Zoho, and Microsoft Dynamics. They also sync with Google and Outlook calendars for appointment scheduling. All interactions are automatically logged with full transcripts and analytics."
  },
  {
    question: "What industries benefit most from AI automation in Australia?",
    answer: "AI automation delivers significant ROI across multiple industries including Real Estate, Healthcare, Professional Services, Finance, Retail, Manufacturing, Hospitality, Legal, Education, and Technology. Any business with high-volume customer interactions, repetitive administrative tasks, or lead management requirements can benefit from AI automation."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24" aria-labelledby="faq-heading">
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
            Enterprise answers for operations directors, CFOs, and business leaders
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
                transition={{ delay: i * 0.1 }}
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
                    openIndex === i ? 'max-h-96' : 'max-h-0'
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
