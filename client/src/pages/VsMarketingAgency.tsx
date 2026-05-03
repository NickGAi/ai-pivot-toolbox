import { useEffect } from "react";
import { motion } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

const comparison = [
  { feature: "Monthly cost (AI SEO)", us: "$1,497/mo", them: "$3,000–$6,000/mo", winner: "us" },
  { feature: "Monthly cost (AI Voice Agent)", us: "$997/mo", them: "$2,500–$3,500/mo", winner: "us" },
  { feature: "Monthly cost (Workflow Automation)", us: "$1,497/mo", them: "$3,500–$5,000/mo", winner: "us" },
  { feature: "Setup fees", us: "Included", them: "$2,000–$10,000 separate", winner: "us" },
  { feature: "Lock-in contract", us: "Month-to-month, no lock-in", them: "12–24 month minimum", winner: "us" },
  { feature: "Time to go live", us: "7–14 days", them: "4–12 weeks onboarding", winner: "us" },
  { feature: "Who you actually work with", us: "The specialist doing the work", them: "An account manager (the work is done by juniors)", winner: "us" },
  { feature: "Communication", us: "Direct email, SMS, calls", them: "Through account manager, weekly catch-ups", winner: "us" },
  { feature: "GEO/AEO included in AI SEO", us: "Yes, every campaign", them: "Often a $1,000+/mo upsell", winner: "us" },
  { feature: "AI tools used", us: "Best-in-class (GPT-4, Claude, Vapi, Make)", them: "Same tools, plus agency markup", winner: "tie" },
  { feature: "Ability to handle enterprise complexity", us: "Smaller projects only ($50K and under)", them: "Better for $100K+ projects with multi-stakeholder requirements", winner: "them" },
  { feature: "Brand recognition for procurement", us: "Solo brand", them: "Established agency name", winner: "them" },
];

const faqs = [
  { q: "Why is AI Pivot Toolbox cheaper than a traditional Australian marketing agency?", a: "Because there's no agency overhead. Traditional Australian marketing agencies have account managers, project managers, creative directors, office leases, and partner profit margins built into their pricing. AI Pivot Toolbox is a solo operator using best-in-class AI tools — same underlying technology and quality of output, with 60–70% less overhead, which translates to 40–60% lower client pricing." },
  { q: "Don't I get more by working with a full agency?", a: "For projects above $100K with multiple stakeholders and complex creative requirements, yes — a traditional agency is probably the better fit. For most Australian small and medium businesses needing AI automation, AI SEO, voice agents, or workflow automation, you don't need an agency structure. You need one specialist who deeply understands the technology and can ship fast. That's what AI Pivot Toolbox is built for." },
  { q: "What if AI Pivot Toolbox can't handle the volume my business needs?", a: "AI Pivot Toolbox uses AI-powered tooling to deliver agency-scale output as a solo operator. For most Australian SMB needs (under 10,000 monthly enquiries, under $50K monthly automation contracts), capacity is not an issue. For larger needs, we're upfront about whether we're the right fit and can refer you to a traditional agency if it makes more sense." },
  { q: "What's the catch with such low pricing?", a: "There's no catch — there's a tradeoff. The tradeoff is that you don't get an account manager, weekly catch-up meetings, slick agency presentations, or a Sydney office tour. You get direct work with one specialist who responds quickly, ships fast, and delivers results. For most Australian small businesses, that's a much better deal than paying 2–3x more for the agency theatre." },
  { q: "Can I switch from my current agency to AI Pivot Toolbox?", a: "Yes — and many clients do. Most agency contracts have a notice period (typically 30–90 days). We're happy to do a parallel transition where we build out the new automation while you're winding down with your current agency, so there's no service gap. Many clients are surprised at how much better their results are once they're working directly with the specialist instead of through an account manager." },
];

export default function VsMarketingAgency() {
  useEffect(() => {
    document.title = "AI Pivot Toolbox vs Traditional Marketing Agency Australia | Honest Comparison";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "AI Pivot Toolbox vs traditional Australian marketing agencies — pricing, services, contracts, and outcomes compared. Honest analysis of when each is the right fit.");
    return () => { document.title = "AI Pivot Toolbox | AI Automation Agency Australia"; };
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-12">
          <div className="container-main px-4 sm:px-6 lg:px-8 max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Breadcrumbs crumbs={[{ label: "AI Pivot Toolbox vs Traditional Agency" }]} />
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                AI Pivot Toolbox vs Traditional Australian Marketing Agency
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                An honest comparison. When to choose us, when to choose a traditional agency, and exactly what each costs.
              </p>
            </motion.div>
          </div>
        </section>

        {/* TL;DR */}
        <section className="pb-12">
          <div className="container-main px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
              <p className="font-bold text-foreground mb-2">TL;DR</p>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Choose AI Pivot Toolbox</strong> if you're an Australian SMB needing AI automation, AI SEO, voice agents or workflow automation under $50K/year, you want fast turnaround, and you'd rather work directly with the specialist than through an account manager. <strong className="text-foreground">Choose a traditional agency</strong> if you have a $100K+ multi-stakeholder project, need extensive in-person creative collaboration, or your procurement requires a large established brand on the contract.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="pb-16">
          <div className="container-main px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Feature-by-feature comparison</h2>
            <div className="rounded-2xl border border-border overflow-hidden">
              <div className="grid grid-cols-3 bg-muted/50 px-4 py-3 text-xs sm:text-sm font-semibold text-foreground">
                <div>Feature</div>
                <div className="text-center">AI Pivot Toolbox</div>
                <div className="text-center">Traditional AU Agency</div>
              </div>
              {comparison.map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className={`grid grid-cols-3 px-4 py-4 text-xs sm:text-sm border-t border-border ${i % 2 === 0 ? "bg-background" : "bg-card"}`}
                  data-testid={`row-comparison-${i}`}
                >
                  <div className="font-medium text-foreground pr-2">{row.feature}</div>
                  <div className={`text-center px-2 ${row.winner === "us" ? "text-primary font-semibold" : "text-muted-foreground"}`}>
                    <div className="flex items-center justify-center gap-1.5">
                      {row.winner === "us" && <Check className="w-4 h-4 shrink-0" />}
                      <span>{row.us}</span>
                    </div>
                  </div>
                  <div className={`text-center px-2 ${row.winner === "them" ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                    <div className="flex items-center justify-center gap-1.5">
                      {row.winner === "them" && <Check className="w-4 h-4 shrink-0" />}
                      {row.winner === "us" && <X className="w-4 h-4 text-muted-foreground/50 shrink-0" />}
                      <span>{row.them}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Where agencies win */}
        <section className="pb-16">
          <div className="container-main px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">When AI Pivot Toolbox is the better fit</h3>
                <ul className="space-y-3">
                  {[
                    "Annual project budget under $50,000",
                    "You want speed — go live in 7–14 days, not 4–12 weeks",
                    "You'd rather work directly with the specialist than through an account manager",
                    "You don't want to be locked into a 12–24 month contract",
                    "You're a small or medium Australian business — not enterprise",
                    "You need AI-specific expertise (voice agents, GEO, workflow automation)",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">When a traditional agency is the better fit</h3>
                <ul className="space-y-3">
                  {[
                    "Annual budget over $100,000 with complex requirements",
                    "Multi-stakeholder projects requiring extensive in-person collaboration",
                    "You need a full creative team (videographers, designers, copywriters, strategists)",
                    "Your procurement requires an established agency brand on the contract",
                    "You operate at enterprise scale (10,000+ monthly enquiries, multiple business units)",
                    "You value account management and weekly catch-ups over speed and direct access",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                      <Check className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="pb-20">
          <div className="container-main px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Common questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-6 rounded-2xl bg-card border border-border"
                  data-testid={`faq-vs-${i}`}
                >
                  <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-card border-t border-border">
          <div className="container-main px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to see if we're the right fit?</h2>
            <p className="text-muted-foreground mb-8">Book a free strategy call. If a traditional agency is genuinely better for your needs, we'll tell you — and even refer you to one we trust.</p>
            <a href="/#contact" className="btn btn-primary text-lg px-8 py-4">
              Book a Free Strategy Call <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
