import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, TrendingUp, Clock, Shield, Zap } from "lucide-react";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Contact } from "@/components/sections/Contact";
import { type ServiceData } from "@/data/services-data";

interface Props {
  service: ServiceData;
}

export default function ServicePage({ service }: Props) {
  useEffect(() => {
    document.title = service.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", service.metaDescription);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", `https://aipivot.com.au/${service.slug}`);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", service.metaTitle);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", service.metaDescription);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", `https://aipivot.com.au/${service.slug}`);
    return () => { document.title = "AI Pivot Toolbox | AI Automation Agency Australia"; };
  }, [service]);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `https://aipivot.com.au/${service.slug}#service`,
        "name": service.name,
        "description": service.metaDescription,
        "provider": { "@id": "https://aipivot.com.au/#organization" },
        "areaServed": { "@type": "Country", "name": "Australia" },
        "offers": {
          "@type": "Offer",
          "price": service.ourPrice.replace(/[^0-9]/g, ""),
          "priceCurrency": "AUD",
          ...(service.billing === "monthly" ? {
            "priceSpecification": {
              "@type": "UnitPriceSpecification",
              "referenceQuantity": { "@type": "QuantitativeValue", "value": "1", "unitCode": "MON" }
            }
          } : {})
        }
      },
      {
        "@type": "FAQPage",
        "@id": `https://aipivot.com.au/${service.slug}#faq`,
        "mainEntity": service.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": { "@type": "Answer", "text": faq.a }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://aipivot.com.au/" },
          { "@type": "ListItem", "position": 2, "name": service.name, "item": `https://aipivot.com.au/${service.slug}` }
        ]
      }
    ]
  };

  const savingsPercent = Math.round((1 - parseInt(service.ourPrice.replace(/[^0-9]/g, "")) / parseInt(service.agencyPrice.replace(/[^0-9]/g, ""))) * 100);

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />

      <main>
        {/* Hero */}
        <section className="pt-32 pb-20">
          <div className="container-main px-4 sm:px-6 lg:px-8 max-w-5xl">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                AI Automation — Australia Wide
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
                {service.headline}
              </h1>
              <p className="text-xl sm:text-2xl text-primary font-medium mb-6">{service.tagline}</p>
              <p className="text-lg text-muted-foreground mb-10 max-w-3xl leading-relaxed">{service.intro}</p>

              {/* Pricing comparison */}
              <div className="inline-flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-2xl bg-card border border-border mb-10">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">AI Pivot Toolbox</p>
                  <p className="text-3xl font-bold text-foreground">
                    {service.ourPrice}<span className="text-base font-normal text-muted-foreground">/{service.billing === "monthly" ? "mo" : "once"}</span>
                  </p>
                </div>
                <div className="hidden sm:block w-px h-10 bg-border" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Traditional agencies</p>
                  <p className="text-2xl font-bold text-muted-foreground line-through">
                    {service.agencyPrice}<span className="text-base font-normal">/{service.billing === "monthly" ? "mo" : "once"}</span>
                  </p>
                </div>
                <div className="hidden sm:block w-px h-10 bg-border" />
                <div className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20">
                  <p className="text-primary font-bold">Save {savingsPercent}%</p>
                  <p className="text-xs text-muted-foreground">vs agency rates</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact" className="btn btn-primary text-lg px-8 py-4">
                  Book a Free Strategy Call <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                <Link href="/toolbox" className="btn btn-secondary text-lg px-8 py-4">
                  Add to Quote
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-card border-y border-border">
          <div className="container-main px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {service.stats.map((stat, i) => (
                <motion.div key={i} className="text-center"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  data-testid={`service-stat-${i}`}
                >
                  <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-foreground font-semibold mb-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">Source: {stat.source}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="py-24">
          <div className="container-main px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">What's Included</h2>
                <div className="space-y-3">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3" data-testid={`feature-${i}`}>
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">How It Works</h2>
                <div className="space-y-6">
                  {service.howItWorks.map((step, i) => (
                    <div key={i} className="relative pl-14" data-testid={`step-${i}`}>
                      <div className="absolute left-0 top-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                        {step.step}
                      </div>
                      <h3 className="font-bold text-foreground mb-1">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-24 bg-card">
          <div className="container-main px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Results from Real Deployments</h2>
              <p className="text-xl text-muted-foreground">Across Australian businesses</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {service.results.map((result, i) => (
                <motion.div key={i} className="p-6 rounded-2xl bg-background border border-border"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  data-testid={`service-result-${i}`}
                >
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">{result.industry}</div>
                  <p className="text-lg font-bold text-foreground mb-3">{result.result}</p>
                  <p className="text-sm text-muted-foreground">{result.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="py-20">
          <div className="container-main px-4 sm:px-6 lg:px-8 max-w-4xl">
            <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Why AI Pivot Toolbox?</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: TrendingUp, title: `Save ${savingsPercent}% vs agency rates`, desc: "Solo operator model — no account managers, no overhead, no markup. You work directly with the specialist." },
                { icon: Clock, title: "Live in 7–14 days", desc: "No months-long onboarding. Most implementations are live within two weeks of kickoff." },
                { icon: Shield, title: "No lock-in contracts", desc: "Month-to-month on all managed services. Stay because it's working — not because you're locked in." },
                { icon: Zap, title: "Fully managed, always", desc: "We build, maintain, and continuously improve your implementation. You focus on your business." },
              ].map((item, i) => (
                <motion.div key={i} className="flex gap-4 p-6 rounded-2xl bg-card border border-border"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                >
                  <item.icon className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-card">
          <div className="container-main px-4 sm:px-6 lg:px-8 max-w-3xl">
            <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            </motion.div>
            <div className="space-y-6">
              {service.faqs.map((faq, i) => (
                <motion.div key={i} className="p-6 rounded-2xl bg-background border border-border"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  data-testid={`service-faq-${i}`}
                >
                  <h3 className="font-bold text-foreground mb-3">{faq.q}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Related services */}
        {service.relatedSlugs.length > 0 && (
          <section className="py-16 border-y border-border">
            <div className="container-main px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-muted-foreground mb-4 text-sm font-medium">Related services</p>
              <div className="flex flex-wrap justify-center gap-3">
                {service.relatedSlugs.map(slug => (
                  <Link key={slug} href={`/${slug}`}
                    className="px-5 py-2 rounded-full bg-card border border-border text-foreground hover:border-primary/40 hover:text-primary transition-colors text-sm font-medium"
                  >
                    {slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <Contact />
      </main>
      <Footer />
    </div>
  );
}
