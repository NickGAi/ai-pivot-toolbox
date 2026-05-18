import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, MapPin, Phone, Clock, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Contact } from "@/components/sections/Contact";
import { type LocationData } from "@/data/locations";

interface Props {
  location: LocationData;
}

const services = [
  { name: "AI Voice Agent", price: "$997/mo", desc: "24/7 call handling, lead qualification & appointment booking" },
  { name: "AI SEO Package", price: "$1,497/mo", desc: "Rank on Google, ChatGPT, Perplexity & every AI search engine" },
  { name: "Workflow Automation", price: "$1,497/mo", desc: "Eliminate manual tasks, data entry & repetitive admin" },
  { name: "AI Chatbot", price: "$597/mo", desc: "Custom-trained chatbot for your website — captures leads 24/7" },
  { name: "AI Lead Nurturing", price: "$997/mo", desc: "Instant lead engagement across SMS, chat & web forms" },
  { name: "Invoice Automation", price: "$897/mo", desc: "Automate invoicing & cut processing costs by up to 85%" },
];

export default function LocationPage({ location }: Props) {
  useEffect(() => {
    document.title = location.metaTitle;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", location.metaDescription);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", `https://aipivot.com.au/${location.slug}`);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", location.metaTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", location.metaDescription);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", `https://aipivot.com.au/${location.slug}`);

    const geoRegion = document.querySelector('meta[name="geo.region"]');
    if (geoRegion) geoRegion.setAttribute("content", location.geoRegion);

    const geoPlace = document.querySelector('meta[name="geo.placename"]');
    if (geoPlace) geoPlace.setAttribute("content", location.city);

    const geoPos = document.querySelector('meta[name="geo.position"]');
    if (geoPos) geoPos.setAttribute("content", `${location.lat};${location.lng}`);

    const icbm = document.querySelector('meta[name="ICBM"]');
    if (icbm) icbm.setAttribute("content", `${location.lat}, ${location.lng}`);

    return () => {
      document.title = "AI Pivot Toolbox | AI Automation Agency Australia — Brisbane, Sydney, Melbourne";
    };
  }, [location]);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `https://aipivot.com.au/${location.slug}#localbusiness`,
        "name": `AI Pivot Toolbox — ${location.city}`,
        "image": "https://aipivot.com.au/opengraph.jpg",
        "description": location.metaDescription,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": location.city,
          "addressRegion": location.state,
          "addressCountry": "AU"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": location.lat,
          "longitude": location.lng
        },
        "url": `https://aipivot.com.au/${location.slug}`,
        "email": "nick@avaire.com.au",
        "priceRange": "$$",
        "areaServed": {
          "@type": "State",
          "name": location.state
        }
      },
      {
        "@type": "FAQPage",
        "@id": `https://aipivot.com.au/${location.slug}#faq`,
        "mainEntity": location.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": { "@type": "Answer", "text": faq.a }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://aipivot.com.au/" },
          { "@type": "ListItem", "position": 2, "name": `AI Automation ${location.city}`, "item": `https://aipivot.com.au/${location.slug}` }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Navbar />

      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 bg-background">
          <div className="container-main px-4 sm:px-6 lg:px-8 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <MapPin className="w-4 h-4" />
                AI Automation & SEO — {location.city}, {location.stateShort}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                {location.headline}
              </h1>
              <p className="text-xl text-muted-foreground mb-4 max-w-3xl">
                {location.subheadline}
              </p>
              <p className="text-lg text-foreground font-medium mb-4 max-w-3xl leading-relaxed border-l-4 border-primary pl-4">
                {location.painHook}
              </p>
              <p className="text-lg text-muted-foreground mb-10 max-w-3xl leading-relaxed">
                {location.intro}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact" className="btn btn-primary text-lg px-8 py-4">
                  Book a Free Strategy Call
                  <ArrowRight className="ml-2 w-5 h-5" />
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
              {location.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  data-testid={`location-stat-${i}`}
                >
                  <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-foreground font-semibold mb-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">Source: {stat.source}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-24">
          <div className="container-main px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                AI Services for {location.city} Businesses
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Every service is fully managed. You don't need a tech team — we handle everything from setup to ongoing optimisation.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <motion.div
                  key={i}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  data-testid={`location-service-${i}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-foreground">{service.name}</h3>
                    <span className="text-primary font-semibold text-sm shrink-0 ml-3">{service.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{service.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/toolbox" className="btn btn-primary">
                See All 12 AI Tools & Full Pricing
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-24 bg-card">
          <div className="container-main px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Results for {location.city} Businesses
              </h2>
              <p className="text-xl text-muted-foreground">Real outcomes from real deployments</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {location.caseStudies.map((cs, i) => (
                <motion.div
                  key={i}
                  className="p-6 rounded-2xl bg-background border border-border"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  data-testid={`location-case-${i}`}
                >
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                    {cs.industry}
                  </div>
                  <p className="text-lg font-bold text-foreground mb-3">{cs.result}</p>
                  <p className="text-sm text-muted-foreground">{cs.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="py-20">
          <div className="container-main px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Industries We Serve in {location.city}
              </h2>
            </motion.div>
            <div className="flex flex-wrap justify-center gap-3">
              {location.industries.map((ind, i) => (
                <motion.span
                  key={i}
                  className="px-5 py-2.5 rounded-full bg-card border border-border text-foreground font-medium text-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  data-testid={`location-industry-${i}`}
                >
                  {ind}
                </motion.span>
              ))}
            </div>

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-muted-foreground text-sm mb-2">Also serving businesses across:</p>
              <p className="text-foreground font-medium">
                {location.suburbs.join(" · ")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why Us */}
        <section className="py-20 bg-card">
          <div className="container-main px-4 sm:px-6 lg:px-8 max-w-4xl">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Why {location.city} Businesses Choose AI Pivot Toolbox
              </h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: TrendingUp, title: "40–60% below agency rates", desc: `No account managers, no office overhead, no markup layers. Just one specialist working directly with your ${location.city} business.` },
                { icon: Clock, title: "Live in 7–14 days", desc: "Most services go live in under two weeks. No months-long onboarding or lengthy discovery phases." },
                { icon: CheckCircle2, title: "No lock-in contracts", desc: "Month-to-month on all managed services. If it's not working, you can walk away — but most clients stay because it does." },
                { icon: Phone, title: "Direct access, always", desc: "You work with the same specialist from day one. No junior account manager handoffs or ticket queues." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex gap-4 p-6 rounded-2xl bg-background border border-border"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
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
        <section className="py-24" id="faq">
          <div className="container-main px-4 sm:px-6 lg:px-8 max-w-3xl">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                FAQs — AI Automation in {location.city}
              </h2>
            </motion.div>
            <div className="space-y-6">
              {location.faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  className="p-6 rounded-2xl bg-card border border-border"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  data-testid={`location-faq-${i}`}
                >
                  <h3 className="font-bold text-foreground mb-3">{faq.q}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Other locations */}
        <section className="py-16 bg-card border-y border-border">
          <div className="container-main px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-muted-foreground mb-4 text-sm font-medium">Also serving</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: "Brisbane", slug: "ai-automation-brisbane" },
                { label: "Sydney", slug: "ai-automation-sydney" },
                { label: "Melbourne", slug: "ai-automation-melbourne" },
                { label: "Perth", slug: "ai-automation-perth" },
                { label: "Adelaide", slug: "ai-automation-adelaide" },
              ]
                .filter(l => l.slug !== location.slug)
                .map(l => (
                  <Link
                    key={l.slug}
                    href={`/${l.slug}`}
                    className="px-5 py-2 rounded-full bg-background border border-border text-foreground hover:border-primary/40 hover:text-primary transition-colors text-sm font-medium"
                    data-testid={`location-link-${l.slug}`}
                  >
                    AI Automation {l.label}
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
