import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Clock, Shield, Phone, ArrowRight, Star } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { useToast } from "@/hooks/use-toast";

const benefits = [
  { icon: Clock, title: "30 minutes, max", text: "No slides, no sales theatre. We diagnose your highest-value automation, you decide what to do with it." },
  { icon: Check, title: "3 specific recommendations", text: "Walk away with the 3 AI workflows that would save you the most time in your business — whether you hire us or not." },
  { icon: Shield, title: "No-pressure guarantee", text: "If we're not the right fit for you, we'll tell you straight up — and refer you to someone who is." },
];

const proofPoints = [
  "Solo AI specialist (not an agency reselling overseas labour)",
  "40–60% below traditional AI agency pricing",
  "Live in 7–14 days, not 4–12 weeks",
  "Month-to-month, no lock-in contracts",
  "Brisbane-based, working with clients across Australia",
];

const faqs = [
  { q: "Is this actually free, or is there a catch?", a: "Genuinely free. Two reasons: (1) most businesses I speak to aren't a fit for what I do — and I'd rather find that out in 30 minutes than waste your time and mine. (2) For the businesses that ARE a fit, the call is the start of a working relationship — there's no incentive for me to dress it up." },
  { q: "What happens on the call?", a: "I ask you 5–10 questions about your business — what's eating your time, where leads are leaking, what tools you use, what you've already tried. Then I tell you the 3 specific AI workflows that would have the biggest impact for you. If you want me to build them, we talk pricing and timeline. If not, you've still got a free roadmap to do it yourself or with someone else." },
  { q: "Will you try to sell me on the call?", a: "If we're a clear fit, I'll let you know what it would cost and what's involved. If we're not a fit, I'll say so and point you somewhere better. I'm a solo operator — I don't have a sales team or quotas. The call works because I only take on clients I can deliver real results for." },
  { q: "Do I need to know anything about AI before the call?", a: "No. Most clients come in saying 'I keep hearing about AI but don't know where to start' — that's exactly the right starting point. I do the technical work; you focus on running your business." },
  { q: "What if I'm just curious and not ready to buy?", a: "That's fine. About 40% of strategy calls don't end with a purchase — they end with the business owner having a clear plan they can act on whenever they're ready. Some come back 6 months later, some never do, both are fine." },
];

export default function StrategyCall() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [utm, setUtm] = useState({ source: "", medium: "", campaign: "" });
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", businessName: "", industry: "", message: "",
  });

  useEffect(() => {
    document.title = "Free 30-Min AI Strategy Call | AI Pivot Toolbox";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "Book a free 30-minute AI strategy call. Walk away with 3 specific AI workflows that would save you the most time in your business — whether you hire us or not.");
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", "noindex, nofollow");
    const params = new URLSearchParams(window.location.search);
    setUtm({
      source: params.get("utm_source") || "",
      medium: params.get("utm_medium") || "",
      campaign: params.get("utm_campaign") || "",
    });
    return () => {
      document.title = "AI Pivot Toolbox | AI Automation Agency Australia";
      robots?.setAttribute("content", "index, follow");
    };
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const utmTag = utm.source ? `\n\n[Source: ${utm.source} / ${utm.medium} / ${utm.campaign}]` : "";
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          industry: form.industry || "Strategy Call",
          businessName: form.businessName,
          preferredDate: "",
          message: `STRATEGY CALL REQUEST\nBusiness: ${form.businessName}\n\n${form.message}${utmTag}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        toast({ title: "Booked!", description: "Nick will be in touch within 1 business day to confirm a time." });
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (err: any) {
      toast({ title: "Something went wrong", description: err.message || "Please call 0XXX XXX XXX directly.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Stripped header — no nav distractions */}
      <header className="border-b border-border">
        <div className="container-main px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" data-testid="link-home"><Logo size="md" /></a>
          <a href="tel:0000000000" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2" data-testid="link-phone">
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">Or call: 0XXX XXX XXX</span>
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="pt-12 pb-8">
          <div className="container-main px-4 sm:px-6 max-w-4xl text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Free strategy call · Limited spots this week
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Get the 3 AI workflows that would save you the most time in your business.
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-2">
                30 minutes. No slides. No sales pitch. You walk away with a clear plan — whether you hire us or not.
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                Built for Australian small businesses · Brisbane-based · Working across the country
              </p>
              <a href="#book" className="btn btn-primary text-lg px-8 py-4 inline-flex items-center" data-testid="cta-book-hero">
                Book My Free Strategy Call <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* Proof bar */}
        <section className="py-8 border-y border-border bg-card/30">
          <div className="container-main px-4 sm:px-6 max-w-5xl">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {proofPoints.map((p, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground" data-testid={`proof-${i}`}>
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What you'll get */}
        <section className="py-16">
          <div className="container-main px-4 sm:px-6 max-w-5xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-12">What you'll walk away with</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border"
                  data-testid={`benefit-${i}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <b.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{b.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{b.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Honest expectation setting */}
        <section className="py-12">
          <div className="container-main px-4 sm:px-6 max-w-3xl">
            <div className="p-6 sm:p-8 rounded-2xl bg-primary/5 border border-primary/20">
              <div className="flex items-start gap-3 mb-4">
                <Star className="w-5 h-5 text-primary shrink-0 mt-1" />
                <h3 className="text-xl font-bold text-foreground">An honest note before you book</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-3">
                AI Pivot Toolbox is one specialist (Nick), not an agency. That means I take on a limited number of new clients each month — usually 4–6. The strategy call exists so we both know whether we're a fit before either of us commits time to a project.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                If you're a fit, I'll tell you exactly what it costs, how long it takes, and what results to expect. If you're not, I'll point you in the right direction — there's no upside in me taking on a project I can't deliver on.
              </p>
            </div>
          </div>
        </section>

        {/* Booking form */}
        <section id="book" className="py-16 scroll-mt-8">
          <div className="container-main px-4 sm:px-6 max-w-2xl">
            <div className="rounded-2xl bg-card border border-border p-6 sm:p-10">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">You're in.</h2>
                  <p className="text-muted-foreground">Nick will be in touch within 1 business day to confirm a time. If it's urgent, give him a call directly on 0XXX XXX XXX.</p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Book your free strategy call</h2>
                  <p className="text-muted-foreground mb-6">Takes 30 seconds. Nick replies within 1 business day to confirm a time.</p>
                  <form onSubmit={submit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">First name</label>
                        <input required value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:ring-2 focus:ring-primary outline-none" data-testid="input-first-name" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Last name</label>
                        <input required value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:ring-2 focus:ring-primary outline-none" data-testid="input-last-name" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                      <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:ring-2 focus:ring-primary outline-none" data-testid="input-email" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Phone (mobile preferred)</label>
                      <input type="tel" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:ring-2 focus:ring-primary outline-none" data-testid="input-phone" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Business name</label>
                      <input required value={form.businessName} onChange={e => setForm({...form, businessName: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:ring-2 focus:ring-primary outline-none" data-testid="input-business" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Industry</label>
                      <select value={form.industry} onChange={e => setForm({...form, industry: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:ring-2 focus:ring-primary outline-none" data-testid="select-industry">
                        <option value="">Select your industry</option>
                        <option>Mortgage / Finance Broking</option>
                        <option>Construction / Trades</option>
                        <option>Legal</option>
                        <option>Real Estate</option>
                        <option>Healthcare</option>
                        <option>Accounting / Bookkeeping</option>
                        <option>Hospitality</option>
                        <option>Retail / eCommerce</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">What's the #1 thing eating your time right now? <span className="text-muted-foreground font-normal">(optional, but helps)</span></label>
                      <textarea rows={3} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:ring-2 focus:ring-primary outline-none resize-none" data-testid="input-message" />
                    </div>
                    <button type="submit" disabled={submitting} className="btn btn-primary w-full text-lg py-4 disabled:opacity-50" data-testid="button-submit">
                      {submitting ? "Sending..." : "Book My Free Strategy Call"}
                    </button>
                    <p className="text-xs text-muted-foreground text-center">No spam. No newsletter signup. We use your details once to confirm the call.</p>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="container-main px-4 sm:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-foreground text-center mb-10">Common questions</h2>
            <div className="space-y-4">
              {faqs.map((f, i) => (
                <div key={i} className="p-6 rounded-2xl bg-card border border-border" data-testid={`faq-sc-${i}`}>
                  <h3 className="font-semibold text-foreground mb-2">{f.q}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-card border-t border-border">
          <div className="container-main px-4 sm:px-6 max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Still reading?</h2>
            <p className="text-muted-foreground mb-8">The call costs nothing and takes 30 minutes. Worst case you walk away with 3 specific ideas. Best case you save 10+ hours a week.</p>
            <a href="#book" className="btn btn-primary text-lg px-8 py-4 inline-flex items-center" data-testid="cta-book-final">
              Book My Free Strategy Call <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-border">
        <div className="container-main px-4 sm:px-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} AI Pivot Toolbox · <a href="/privacy" className="hover:text-foreground">Privacy</a> · <a href="/terms" className="hover:text-foreground">Terms</a></p>
        </div>
      </footer>
    </div>
  );
}
