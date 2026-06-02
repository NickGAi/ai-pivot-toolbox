import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { pixelTrack } from "@/lib/pixel";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const CONFIG = {
  bookingUrl: "/book",
  apiEndpoint: "/api/tradies-funnel",
};

// ─── COPY ────────────────────────────────────────────────────────────────────
const COPY = {
  badge: "FOR AUSTRALIAN TRADE BUSINESSES",
  heroHeadline: ["Stop Losing Jobs", "To Missed Calls."],
  heroSub: "Get a system that catches every missed call, texts back instantly, follows up your quotes, and gets you 5-star reviews — all on autopilot.",
  heroBullets: [
    "Catch every missed call with instant text-back",
    "Automate follow-up on quotes that haven't converted",
    "Get more 5-star reviews on autopilot",
  ],
  heroCta: "Get My Missed Call System — $295/mo",
  heroTrust: "Built for tradies who are sick of losing jobs to the bloke who answers his phone. No lock-in contracts. Cancel anytime.",
  formCta: "Start My Missed Call System — $295/mo",
  smallPrint: "$295/mo. No lock-in contracts. Cancel anytime. System installed within 7 days of sign-up.",
};

const TRADE_TYPES = ["Plumber", "Electrician", "Builder", "HVAC", "Painter", "Landscaper", "Other"];
const JOB_RANGES = ["1-5", "6-10", "11-20", "20+"];
const LEAD_SOURCES = ["Google", "HiPages", "Word of mouth", "Social media", "Other"];

// ─── TYPES ───────────────────────────────────────────────────────────────────
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  businessName: string;
  tradeType: string;
  suburb: string;
  jobsPerMonth: string;
  leadSource: string;
  biggestProblem: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  referrer: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

// ─── CTA BUTTON ──────────────────────────────────────────────────────────────
function CtaButton({ href, children, size = "md", className = "" }: {
  href: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "px-6 py-3 text-base",
    md: "px-8 py-4 text-lg",
    lg: "px-12 py-5 text-xl",
  };
  return (
    <a
      href={href}
      className={`inline-block font-bold rounded-xl transition-all hover:opacity-90 ${sizes[size]} ${className}`}
      style={{
        background: "#FF4500",
        color: "#141413",
        boxShadow: "0 4px 24px rgba(255,69,0,0.35), 0 1px 0 rgba(255,255,255,0.1) inset",
      }}
    >
      {children}
    </a>
  );
}

// ─── SECTION LABEL ───────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[#FF4500] font-bold text-xs uppercase tracking-[0.2em] mb-5 flex items-center gap-3">
      <span className="w-6 h-px bg-[#FF4500]/50" />
      {children}
      <span className="w-6 h-px bg-[#FF4500]/50" />
    </p>
  );
}

// ─── FORM FIELD ──────────────────────────────────────────────────────────────
function Field({ label, error, required, children }: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-300 mb-2">
        {label}{required && <span className="text-[#FF4500] ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
    </div>
  );
}

const inputCls = "w-full rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none transition-colors text-sm"
  + " bg-[#0c1018] border border-white/8 focus:border-[#FF4500]/60";

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function TradiesFunnel() {
  const [showSticky, setShowSticky] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    businessName: "",
    tradeType: "",
    suburb: "",
    jobsPerMonth: "",
    leadSource: "",
    biggestProblem: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    referrer: "",
  });

  // Page title + meta
  useEffect(() => {
    document.title = "Missed Call System for Tradies — $295/mo | AI Pivot";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "Stop losing jobs to missed calls. AI Pivot installs a system that texts back missed callers instantly, follows up quotes, and gets you 5-star reviews. $295/mo for Australian tradies.");
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", "noindex, nofollow");
    return () => {
      document.title = "AI Pivot Toolbox | AI SEO & Automation Agency Australia";
      robots?.setAttribute("content", "index, follow");
    };
  }, []);

  // Capture UTM / referrer on mount
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setForm(f => ({
      ...f,
      utm_source: p.get("utm_source") || "",
      utm_medium: p.get("utm_medium") || "",
      utm_campaign: p.get("utm_campaign") || "",
      referrer: document.referrer || "",
    }));
  }, []);

  // Sticky CTA after scroll
  useEffect(() => {
    const handler = () => setShowSticky(window.scrollY > 600);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const mutation = useMutation({
    mutationFn: (data: FormData) => apiRequest("POST", CONFIG.apiEndpoint, data),
    onSuccess: () => { pixelTrack("Lead", { content_name: "Missed Call System" }); setSubmitted(true); },
  });

  function set(field: keyof FormData, value: string) {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }));
  }

  function validate(): boolean {
    const e: FormErrors = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (!form.mobile.trim()) e.mobile = "Required";
    if (!form.businessName.trim()) e.businessName = "Required";
    if (!form.tradeType) e.tradeType = "Required";
    if (!form.suburb.trim()) e.suburb = "Required";
    if (!form.jobsPerMonth) e.jobsPerMonth = "Required";
    if (!form.leadSource) e.leadSource = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (validate()) mutation.mutate(form);
  }

  // ── THANK-YOU STATE ───────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#141413] flex items-center justify-center px-4 py-20">
        <div className="max-w-lg text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8" style={{
            background: "rgba(255,69,0,0.1)",
            border: "2px solid rgba(255,69,0,0.4)",
            boxShadow: "0 0 40px rgba(255,69,0,0.2)",
          }}>
            <svg className="w-10 h-10 text-[#FF4500]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <p className="text-[#FF4500] text-xs font-bold uppercase tracking-[0.2em] mb-4">System Locked In</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            You&apos;re In.<br />System Locked.
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-4">
            Your Missed Call System is locked in. I&apos;ll have your system installed within 7 days — missed call text-back, quote follow-up, and review automation all running on autopilot.
          </p>
          <p className="text-slate-500 text-sm mb-10">
            Check your inbox — we&apos;ll also send confirmation within a few minutes.
          </p>

          <a
            href={CONFIG.bookingUrl}
            className="inline-block font-bold text-[#141413] text-lg px-10 py-5 rounded-xl w-full sm:w-auto hover:opacity-90 transition-all"
            style={{
              background: "#FF4500",
              boxShadow: "0 4px 24px rgba(255,69,0,0.4)",
            }}
          >
            Book My Setup Call →
          </a>
          <p className="text-slate-600 text-xs mt-4">Short call to get your system configured. We&apos;ll map your workflow and have everything running within 7 days.</p>
        </div>
      </div>
    );
  }

  // ── PAGE ─────────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen text-white"
      style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif", background: "#141413" }}
    >

      {/* ── BACK LINK ────────────────────────────────────────────────────── */}
      <div className="absolute top-5 left-4 sm:left-8 z-50">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back to home
        </a>
      </div>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pl-4 overflow-hidden" style={{ minHeight: "600px", paddingRight: "30px" }}>
        <div className="absolute inset-0 pointer-events-none">
          <img src="/images/hero-bg-dark-tech.webp" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "rgba(20,20,19,0.60)" }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-[0.07]"
            style={{ background: "radial-gradient(ellipse, #FF4500 0%, transparent 70%)" }} />
        </div>

        <div className="relative max-w-6xl mx-auto pt-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[#FF4500] text-xs font-bold uppercase tracking-widest"
              style={{ background: "rgba(255,69,0,0.08)", border: "1px solid rgba(255,69,0,0.2)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500] animate-pulse" />
              {COPY.badge}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
            <div style={{ width: "55%", paddingRight: "48px" }} className="hidden lg:block">
              <h1 className="leading-[1.05] tracking-tight mb-8" style={{ fontSize: "68px", fontWeight: 900 }}>
                {COPY.heroHeadline[0]}<br />
                <span style={{ color: "#FF4500" }}>{COPY.heroHeadline[1]}</span>
              </h1>

              <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                {COPY.heroSub}
              </p>

              <ul className="flex flex-col gap-4 mb-12 text-left">
                {COPY.heroBullets.map(b => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(255,69,0,0.15)", border: "1px solid rgba(255,69,0,0.4)" }}>
                      <svg className="w-3 h-3 text-[#FF4500]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-slate-300 text-sm leading-snug">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mb-6">
                <CtaButton href="#apply" size="lg" className="w-full">
                  {COPY.heroCta}
                </CtaButton>
              </div>

              <p className="text-slate-500 text-sm">{COPY.heroTrust}</p>
            </div>

            <div className="hidden lg:block"
              style={{ width: "45%", minHeight: "560px", paddingRight: "40px", flexShrink: 0 }}>
              <picture>
                <source srcSet="/duku-re.webp" type="image/webp" />
                <img
                  src="/duku-re.png"
                  alt="Duku AI character"
                  style={{
                    width: "100%",
                    height: "560px",
                    objectFit: "cover",
                    objectPosition: "right center",
                  }}
                />
              </picture>
            </div>
          </div>

          <div className="lg:hidden text-center pb-4">
            <h1 className="text-5xl sm:text-6xl font-bold leading-[1.05] tracking-tight mb-8">
              {COPY.heroHeadline[0]}<br />
              <span style={{ color: "#FF4500" }}>{COPY.heroHeadline[1]}</span>
            </h1>

            <p className="text-xl text-slate-300 max-w-xl mx-auto mb-10 leading-relaxed">
              {COPY.heroSub}
            </p>

            <ul className="flex flex-col gap-4 mb-12 max-w-sm mx-auto text-left">
              {COPY.heroBullets.map(b => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(255,69,0,0.15)", border: "1px solid rgba(255,69,0,0.4)" }}>
                    <svg className="w-3 h-3 text-[#FF4500]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-slate-300 text-sm leading-snug">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mb-5">
              <CtaButton href="#apply" size="lg" className="w-full">
                {COPY.heroCta}
              </CtaButton>
            </div>

            <div className="flex justify-center mt-8 mb-4">
              <picture>
                <source srcSet="/duku-re.webp" type="image/webp" />
                <img
                  src="/duku-re.png"
                  alt="Duku AI character"
                  style={{ maxWidth: "300px", width: "100%", margin: "0 auto", opacity: 0.85 }}
                />
              </picture>
            </div>

            <p className="text-slate-500 text-sm mt-4 mb-8">{COPY.heroTrust}</p>
          </div>
        </div>
      </section>

      {/* ── PAIN ─────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 relative overflow-hidden" style={{ background: "#0b0e16" }}>
        <img src="/images/features-bg-circuit.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <SectionLabel>Brutal Honesty</SectionLabel>
          <h2 className="text-3xl sm:text-5xl font-bold leading-tight mb-12">
            Be Honest… How Many Jobs<br />Did You Lose This Week?
          </h2>

          <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
            <p>The phone rings while you&apos;re under a sink, up a ladder, quoting a job, driving between sites, or covered in dust with no chance of answering properly.</p>
            <p>The customer does not wait. They go back to Google, call the next tradie, and book with the bloke who picks up first.</p>
            <p>You send quotes that never get followed up. Old leads sit in your phone. Review requests get forgotten. There is no simple system chasing the jobs you already paid to attract.</p>
            <div className="pl-6 border-l-4 border-[#FF4500] py-2 space-y-3">
              <p className="text-slate-300">That is the expensive truth:</p>
              <p className="text-white font-bold text-xl">Most tradies don&apos;t have a lead problem.<br />They have a response problem.</p>
              <p className="text-slate-400">And every missed call, dead quote, and forgotten review quietly sends revenue to your competitors.</p>
            </div>
          </div>

          <div className="mt-12 rounded-2xl p-8"
            style={{ background: "#0c1018", border: "1px solid rgba(255,69,0,0.12)" }}>
            <p className="text-[#FF4500] font-bold text-xl leading-snug">
              You do not need to work harder for more enquiries.<br />
              <span className="text-white">You need to capture the jobs already trying to reach you.</span>
            </p>
          </div>

          <div className="mt-12 text-center">
            <CtaButton href="#apply" size="md">Get My Missed Call System — $295/mo</CtaButton>
          </div>
        </div>
      </section>

      {/* ── SOLUTION ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 relative overflow-hidden">
        <img src="/images/features-bg-circuit.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <SectionLabel>The Solution</SectionLabel>
          <h2 className="text-3xl sm:text-5xl font-bold leading-tight mb-6">
            AI Pivot Is The Job Catcher<br />
            <span style={{ color: "#FF4500" }}>Your Business Never Had</span>
          </h2>

          <p className="text-slate-300 text-lg mb-10 max-w-2xl">
            AI Pivot plugs into the enquiries your trade business is already getting — calls, quotes, Google, HiPages, website forms, social messages, and repeat customers.
          </p>

          <div className="flex flex-wrap gap-3 mb-14">
            {["Missed calls", "Quotes", "Google leads", "HiPages enquiries", "Repeat customers"].map(s => (
              <span key={s} className="px-4 py-2 rounded-full text-sm font-medium text-slate-300"
                style={{ background: "#0c1018", border: "1px solid rgba(255,69,0,0.15)" }}>
                {s}
              </span>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-14">
            {[
              { icon: "⚡", title: "Missed call text-back", body: "Instant SMS goes out when you cannot answer, so the job does not go straight to your competitor." },
              { icon: "📱", title: "Automated quote follow-up", body: "Chase up every quote that went quiet with reminders that sound human and never forget." },
              { icon: "⭐", title: "Review automation", body: "Ask for 5-star Google reviews after every completed job while the customer is happiest." },
              { icon: "📅", title: "Booking automation", body: "Let customers book online 24/7 without waiting for you to call back between jobs." },
            ].map(({ icon, title, body }) => (
              <div key={title} className="rounded-2xl p-6"
                style={{ background: "#0c1018", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="text-2xl mb-4">{icon}</div>
                <h3 className="text-white font-bold mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          <div className="text-center space-y-1 mb-14">
            {["No more missed-call roulette.", "No more quotes disappearing into silence.", "No more relying on memory after a 10-hour day."].map(l => (
              <p key={l} className="text-xl text-white font-semibold">{l}</p>
            ))}
          </div>

          <div className="rounded-2xl p-8 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(255,69,0,0.08) 0%, rgba(204,55,0,0.06) 100%)",
              border: "1px solid rgba(255,69,0,0.2)",
            }}>
            <p className="text-white font-bold text-xl">You get a simple Revenue Capture System that answers, follows up, and asks — even when you are on the tools.</p>
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ───────────────────────────────────────────────── */}
      <section className="py-24 px-4 relative overflow-hidden" style={{ background: "#0b0e16" }}>
        <img src="/images/features-bg-circuit.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <SectionLabel>What&apos;s Included</SectionLabel>
          <h2 className="text-3xl sm:text-5xl font-bold leading-tight mb-6">
            What You Get In The<br />$295/mo Missed Call System
          </h2>
          <p className="text-slate-400 text-lg mb-16 max-w-2xl">
            This is not another marketing tool you won’t use. It’s a done-for-you system that catches missed calls, follows up quotes, and gets you reviews — running on autopilot from day one.
          </p>

          <div className="space-y-5 mb-16">
            {[
              {
                step: "01",
                title: "We Map Your Workflow",
                body: "We look at missed calls, quote conversion, review count, and the steps between enquiry and booked job.",
                items: ["Missed calls reviewed", "Quote follow-up gaps identified", "Review collection checked", "Booking friction mapped"],
              },
              {
                step: "02",
                title: "We Show You The Leaks",
                body: "You see where jobs are being lost, what is causing the leak, and what it is likely costing you in real revenue.",
                items: ["Jobs lost to slow response", "Quotes going cold", "Reviews not being collected", "Old leads sitting untouched"],
              },
              {
                step: "03",
                title: "We Build The Fix",
                body: "Within 7 days, your full Missed Call System is installed and running. $295/mo, no lock-in contracts.",
                items: ["Instant missed-call text-back", "Automated quote follow-up", "Review request automation", "Running within 7 days"],
              },
            ].map(({ step, title, body, items }) => (
              <div key={step} className="flex gap-6 rounded-2xl p-8"
                style={{ background: "#0c1018", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-[#FF4500] font-bold text-lg"
                    style={{ background: "rgba(255,69,0,0.08)", border: "2px solid rgba(255,69,0,0.3)" }}>
                    {step}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{body}</p>
                  <ul className="space-y-2">
                    {items.map(item => (
                      <li key={item} className="flex items-center gap-3 text-slate-300 text-sm">
                        <svg className="w-4 h-4 text-[#FF4500] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-7 mb-12"
            style={{ background: "#0c1018", border: "1px solid rgba(255,69,0,0.12)" }}>
            <p className="text-white font-semibold text-lg mb-4">You also walk away knowing:</p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {[
                "How many jobs may be slipping through missed calls",
                "Which quotes should be chased first",
                "How your reviews can compound every month",
                "Whether the Revenue Capture System is worth it for your business",
              ].map(o => (
                <li key={o} className="flex items-start gap-3 text-slate-300 text-sm">
                  <span className="text-[#FF4500] mt-0.5 flex-shrink-0">✓</span>
                  {o}
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center">
            <CtaButton href="#apply" size="lg">Get My Missed Call System — $295/mo</CtaButton>
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ─────────────────────────────────────────────────── */}
      <section className="py-24 px-4 relative overflow-hidden">
        <img src="/images/features-bg-circuit.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <SectionLabel>Is This For You?</SectionLabel>
          <h2 className="text-3xl sm:text-5xl font-bold leading-tight mb-16">
            Who This Is For.<br />Who It&apos;s Not.
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl p-7" style={{ background: "#0c1018", border: "1px solid rgba(16,185,129,0.2)" }}>
              <p className="text-emerald-400 font-bold text-base mb-6 flex items-center gap-2">
                <span>This IS for:</span>
              </p>
              <ul className="space-y-4">
                {[
                  "Established tradies already getting enquiries",
                  "Businesses spending on Google, HiPages, or local marketing",
                  "Teams of 2-10 who cannot answer every call",
                  "Tradies who know they are losing jobs",
                  "Owners ready to install a proper follow-up system",
                ].map(i => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 text-sm leading-snug">
                    <span className="text-emerald-400 mt-0.5 flex-shrink-0">→</span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl p-7" style={{ background: "#0c1018", border: "1px solid rgba(239,68,68,0.2)" }}>
              <p className="text-red-400 font-bold text-base mb-6">This is NOT for:</p>
              <ul className="space-y-4">
                {[
                  "Brand new tradies with no enquiries",
                  "One-man bands happy with word of mouth only",
                  "Anyone who refuses to follow up quotes properly",
                  "People looking for more leads before fixing response",
                ].map(i => (
                  <li key={i} className="flex items-start gap-3 text-slate-400 text-sm leading-snug">
                    <span className="text-red-400 mt-0.5 flex-shrink-0">→</span>
                    {i}
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 text-xs mt-6 italic">If that is you, save us both the time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── GUARANTEE ────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 relative overflow-hidden">
        <img src="/images/cta-bg-orange-glow.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <div className="rounded-2xl p-10 text-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #141413 0%, #1a1714 100%)",
              border: "1px solid rgba(255,69,0,0.25)",
              boxShadow: "0 0 80px rgba(255,69,0,0.07)",
            }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px"
              style={{ background: "linear-gradient(90deg, transparent, #FF4500, transparent)" }} />
            <p className="text-[#FF4500] text-xs font-bold uppercase tracking-[0.2em] mb-5">The AI Pivot Promise</p>
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-6 leading-tight">
              If I Can&apos;t Find At Least One Leak<br />
              <span style={{ color: "#FF4500" }}>Worth More Than $295</span> —<br />
              You Get Your First Month Free.
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              If your Missed Call System doesn’t pay for itself within the first month, your first month is on us. No questions asked.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {[
                "$295/mo — no lock-in contracts",
                "Installed within 7 days",
                "Done-for-you, not DIY",
              ].map(p => (
                <div key={p} className="flex items-center gap-2 text-slate-300">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(255,69,0,0.15)", border: "1px solid rgba(255,69,0,0.4)" }}>
                    <svg className="w-3 h-3 text-[#FF4500]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FORM ─────────────────────────────────────────────────────────── */}
      <section id="apply" className="py-24 px-4 relative overflow-hidden" style={{ background: "#0b0e16" }}>
        <img src="/images/cta-bg-orange-glow.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none" />
        <div className="relative max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
              style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              Only 5 setup slots available this week
            </div>
            <SectionLabel>Apply Now</SectionLabel>
            <h2 className="text-3xl sm:text-5xl font-bold leading-tight mb-5">
              Start Your<br />Missed Call System
            </h2>
            <p className="text-slate-400 text-lg max-w-lg mx-auto">
              Complete the form below to lock in your setup slot. $295/mo — system installed within 7 days.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl p-8 sm:p-10"
            style={{ background: "#0c1018", border: "1px solid rgba(255,255,255,0.06)" }}>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="First name" required error={errors.firstName}>
                <input data-testid="input-firstName" type="text" value={form.firstName}
                  onChange={e => set("firstName", e.target.value)}
                  className={inputCls} placeholder="Jack" />
              </Field>
              <Field label="Last name" required error={errors.lastName}>
                <input data-testid="input-lastName" type="text" value={form.lastName}
                  onChange={e => set("lastName", e.target.value)}
                  className={inputCls} placeholder="Smith" />
              </Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Email" required error={errors.email}>
                <input data-testid="input-email" type="email" value={form.email}
                  onChange={e => set("email", e.target.value)}
                  className={inputCls} placeholder="jack@smithplumbing.com.au" />
              </Field>
              <Field label="Mobile" required error={errors.mobile}>
                <input data-testid="input-mobile" type="tel" value={form.mobile}
                  onChange={e => set("mobile", e.target.value)}
                  className={inputCls} placeholder="0400 000 000" />
              </Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Business name" required error={errors.businessName}>
                <input data-testid="input-businessName" type="text" value={form.businessName}
                  onChange={e => set("businessName", e.target.value)}
                  className={inputCls} placeholder="Smith Plumbing Co" />
              </Field>
              <Field label="Trade type" required error={errors.tradeType}>
                <select data-testid="select-tradeType" value={form.tradeType}
                  onChange={e => set("tradeType", e.target.value)}
                  className={inputCls} style={{ colorScheme: "dark" }}>
                  <option value="">Select trade…</option>
                  {TRADE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Suburb" required error={errors.suburb}>
                <input data-testid="input-suburb" type="text" value={form.suburb}
                  onChange={e => set("suburb", e.target.value)}
                  className={inputCls} placeholder="Newstead, QLD" />
              </Field>
              <Field label="Approx. jobs per month" required error={errors.jobsPerMonth}>
                <select data-testid="select-jobsPerMonth" value={form.jobsPerMonth}
                  onChange={e => set("jobsPerMonth", e.target.value)}
                  className={inputCls} style={{ colorScheme: "dark" }}>
                  <option value="">Select range…</option>
                  {JOB_RANGES.map(r => <option key={r} value={r}>{r} jobs/month</option>)}
                </select>
              </Field>
            </div>

            <Field label="Main lead source" required error={errors.leadSource}>
              <select data-testid="select-leadSource" value={form.leadSource}
                onChange={e => set("leadSource", e.target.value)}
                className={inputCls} style={{ colorScheme: "dark" }}>
                <option value="">Select source…</option>
                {LEAD_SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>

            <Field label="Biggest problem right now">
              <input data-testid="input-problem" type="text" value={form.biggestProblem}
                onChange={e => set("biggestProblem", e.target.value)}
                className={inputCls} placeholder="e.g. Calls come in while I&apos;m on site and quotes go cold" />
            </Field>

            {/* Hidden UTM fields */}
            <input type="hidden" value={form.utm_source} readOnly />
            <input type="hidden" value={form.utm_medium} readOnly />
            <input type="hidden" value={form.utm_campaign} readOnly />
            <input type="hidden" value={form.referrer} readOnly />

            {mutation.isError && (
              <p className="text-red-400 text-sm text-center py-2">Something went wrong — please try again or email us directly.</p>
            )}

            <button data-testid="button-submit" type="submit" disabled={mutation.isPending}
              className="w-full font-bold text-[#141413] text-lg py-5 rounded-xl transition-all hover:opacity-90 disabled:opacity-50"
              style={{
                background: "#FF4500",
                boxShadow: "0 4px 24px rgba(255,69,0,0.35)",
              }}>
              {mutation.isPending ? "Submitting…" : COPY.formCta}
            </button>

            <p className="text-slate-600 text-xs text-center leading-relaxed pt-1">{COPY.smallPrint}</p>
          </form>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="py-10 px-4 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <p className="text-slate-600 text-sm">
          © {new Date().getFullYear()} AI Pivot Toolbox · aipivot.com.au ·{" "}
          <a href="/privacy" className="hover:text-slate-400 transition-colors">Privacy</a>
        </p>
      </footer>

      {/* ── STICKY MOBILE CTA ────────────────────────────────────────────── */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 p-4 sm:hidden transition-transform duration-300 ${showSticky ? "translate-y-0" : "translate-y-full"}`}
        style={{ background: "rgba(20,20,19,0.95)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(255,69,0,0.15)" }}
      >
        <a href="#apply"
          className="block w-full text-center font-bold text-[#141413] py-4 rounded-xl hover:opacity-90 transition-all"
          style={{ background: "#FF4500", boxShadow: "0 4px 20px rgba(255,69,0,0.4)" }}>
          Start My $295/mo System
        </a>
      </div>

    </div>
  );
}
