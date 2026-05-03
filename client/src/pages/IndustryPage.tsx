import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, XCircle, TrendingUp, Clock, Shield, Zap } from "lucide-react";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Contact } from "@/components/sections/Contact";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { type IndustryData } from "@/data/industries-data";

interface Props {
  industry: IndustryData;
}

export default function IndustryPage({ industry }: Props) {
  useEffect(() => {
    document.title = industry.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", industry.metaDescription);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", `https://aipivot.com.au/${industry.slug}`);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", industry.metaTitle);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", industry.metaDescription);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", `https://aipivot.com.au/${industry.slug}`);
    return () => { document.title = "AI Pivot Toolbox | AI Automation Agency Australia"; };
  }, [industry]);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `https://aipivot.com.au/${industry.slug}#faq`,
        "mainEntity": industry.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": { "@type": "Answer", "text": faq.a }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://aipivot.com.au/" },
          { "@type": "ListItem", "position": 2, "name": `AI for ${industry.industry}`, "item": `https://aipivot.com.au/${industry.slug}` }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />

      <main>
        {/* Hero */}
        <section className="pt-32 pb-20">
          <div className="container-main px-4 sm:px-6 lg:px-8 max-w-5xl">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Breadcrumbs crumbs={[{ label: "Industries" }, { label: `AI for ${industry.industry}` }]} />
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                AI Automation for {industry.industry}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
                {industry.headline}
              </h1>
              <p className="text-xl sm:text-2xl text-primary font-medium mb-6">{industry.tagline}</p>
              <p className="text-lg text-muted-foreground mb-10 max-w-3xl leading-relaxed">{industry.intro}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact" className="btn btn-primary text-lg px-8 py-4">
                  Book a Free Strategy Call <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                <Link href="/toolbox" className="btn btn-secondary text-lg px-8 py-4">
                  Browse AI Tools & Pricing
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-card border-y border-border">
          <div className="container-main px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {industry.stats.map((stat, i) => (
                <motion.div key={i} className="text-center"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  data-testid={`industry-stat-${i}`}
                >
                  <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-foreground font-semibold mb-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">Source: {stat.source}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pain points */}
        <section className="py-24">
          <div className="container-main px-4 sm:px-6 lg:px-8 max-w-5xl">
            <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                The Admin Challenges Costing {industry.industry} Businesses Time and Money
              </h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-5">
              {industry.painPoints.map((point, i) => (
                <motion.div key={i} className="flex gap-4 p-6 rounded-2xl bg-card border border-border"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  data-testid={`pain-point-${i}`}
                >
                  <XCircle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{point.title}</h3>
                    <p className="text-sm text-muted-foreground">{point.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Top Services */}
        <section className="py-24 bg-card">
          <div className="container-main px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                AI Solutions for {industry.industry} Businesses
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The services that deliver the fastest ROI in your industry
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-6">
              {industry.topServices.map((svc, i) => (
                <motion.div key={i} className="p-6 rounded-2xl bg-background border border-border hover:border-primary/40 transition-colors"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  data-testid={`industry-service-${i}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-foreground">{svc.name}</h3>
                    <Link href={`/${svc.slug}`} className="text-primary text-xs hover:underline shrink-0 ml-3">Learn more →</Link>
                  </div>
                  <p className="text-sm text-muted-foreground">{svc.benefit}</p>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/toolbox" className="btn btn-primary">
                See All AI Tools & Pricing <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Case Study */}
        <section className="py-24">
          <div className="container-main px-4 sm:px-6 lg:px-8 max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  Real Results from a {industry.industry} Business
                </h2>
              </div>
              <div className="rounded-2xl bg-card border border-border p-8">
                <p className="text-2xl font-bold text-foreground mb-4">{industry.caseStudy.result}</p>
                <p className="text-muted-foreground mb-8 leading-relaxed">{industry.caseStudy.detail}</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {industry.caseStudy.metrics.map((metric, i) => (
                    <div key={i} className="flex items-start gap-3" data-testid={`case-metric-${i}`}>
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground font-medium text-sm">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why us */}
        <section className="py-20 bg-card">
          <div className="container-main px-4 sm:px-6 lg:px-8 max-w-4xl">
            <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Why {industry.industry} Businesses Choose AI Pivot Toolbox
              </h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: TrendingUp, title: "40–60% below agency rates", desc: "No agency overhead. You work directly with the specialist who builds and manages your implementation." },
                { icon: Clock, title: "Live in 7–14 days", desc: "No months-long onboarding. Most implementations are running within two weeks of our first call." },
                { icon: Shield, title: "No lock-in contracts", desc: "Month-to-month on all managed services. Cancel anytime — though most clients stay because it works." },
                { icon: Zap, title: "Industry-specific expertise", desc: `We've built automations specifically for ${industry.industry.toLowerCase()} businesses. No generic templates.` },
              ].map((item, i) => (
                <motion.div key={i} className="flex gap-4 p-6 rounded-2xl bg-background border border-border"
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
        <section className="py-24">
          <div className="container-main px-4 sm:px-6 lg:px-8 max-w-3xl">
            <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                FAQs — AI Automation for {industry.industry}
              </h2>
            </motion.div>
            <div className="space-y-6">
              {industry.faqs.map((faq, i) => (
                <motion.div key={i} className="p-6 rounded-2xl bg-card border border-border"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  data-testid={`industry-faq-${i}`}
                >
                  <h3 className="font-bold text-foreground mb-3">{faq.q}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Other industries */}
        <section className="py-16 bg-card border-y border-border">
          <div className="container-main px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-muted-foreground mb-4 text-sm font-medium">Also serving</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: "Real Estate", slug: "ai-for-real-estate" },
                { label: "Healthcare", slug: "ai-for-healthcare" },
                { label: "Legal", slug: "ai-for-legal" },
                { label: "Accounting", slug: "ai-for-accounting" },
                { label: "Hospitality", slug: "ai-for-hospitality" },
                { label: "Construction", slug: "ai-for-construction" },
                { label: "Finance", slug: "ai-for-finance" },
                { label: "Retail", slug: "ai-for-retail" },
              ].filter(l => l.slug !== industry.slug).map(l => (
                <Link key={l.slug} href={`/${l.slug}`}
                  className="px-5 py-2 rounded-full bg-background border border-border text-foreground hover:border-primary/40 hover:text-primary transition-colors text-sm font-medium"
                  data-testid={`industry-link-${l.slug}`}
                >
                  AI for {l.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </div>
  );
}
