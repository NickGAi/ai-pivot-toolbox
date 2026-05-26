import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { pixelTrack } from "@/lib/pixel";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const CONFIG = {
  bookingUrl: "/book",
  apiEndpoint: "/api/real-estate-funnel",
};

// ─── COPY ────────────────────────────────────────────────────────────────────
const COPY = {
  badge: "For Australian Real Estate Agents Only",
  heroHeadline: ["Stop Torching", "Your Portal Leads."],
  heroSub: "Find out how many extra listings are sitting in your existing database — and get a 90-day AI-powered plan to pull them out.",
  heroBullets: [
    "See exactly where your pipeline is leaking",
    "Find out how many extra listings you could squeeze from your current leads",
    "Get a 90-day AI-powered follow-up plan built around your business",
  ],
  heroCta: "Get My Free Growth Map",
  heroSecondaryCta: "Watch The 60-Second Breakdown",
  heroTrust: "Built for agents who are sick of wasting portal spend, missing follow-up, and leaving GCI on the table.",
  formCta: "Apply For My Free Growth Map",
  smallPrint: "No fluff. No obligation. If it looks like a fit, we'll invite you to book a short strategy call and walk you through the map.",
};

const LEAD_SOURCES = [
  "Portals (REA, Domain)",
  "Social Media Ads",
  "Referrals",
  "Signboards / Open Homes",
  "Website / SEO",
  "Other",
];

// ─── TYPES ───────────────────────────────────────────────────────────────────
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  agency: string;
  suburb: string;
  dealsPerMonth: string;
  leadSource: string;
  pipelineProblem: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  referrer: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

// ─── VIDEO COMPONENT ─────────────────────────────────────────────────────────
// youtubeId: YouTube video ID (e.g. "dQw4w9WgXcQ") — preferred for production
// src: local file path fallback for dev only
function VideoCinematic({ id, label, sublabel, youtubeId, src }: {
  id: string;
  label: string;
  sublabel: string;
  youtubeId?: string;
  src?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function handlePlayClick() {
    if (videoRef.current) {
      videoRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  }

  const containerStyle = {
    boxShadow: "0 0 60px rgba(255,69,0,0.10), 0 0 120px rgba(255,69,0,0.05)",
    border: "1px solid rgba(255,69,0,0.18)",
  };

  // ── YouTube embed ──────────────────────────────────────────────────────────
  if (youtubeId) {
    return (
      <div className="flex justify-center" id={id}>
        <div
          className="relative w-full max-w-sm aspect-[9/16] rounded-2xl overflow-hidden bg-black"
          style={containerStyle}
        >
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&playsinline=1&color=white`}
            title={label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>
      </div>
    );
  }

  // ── Local file (dev fallback) ──────────────────────────────────────────────
  if (src) {
    return (
      <div className="flex justify-center" id={id}>
        <div
          className="relative w-full max-w-sm aspect-[9/16] rounded-2xl overflow-hidden"
          style={containerStyle}
        >
          <video
            ref={videoRef}
            src={src}
            controls={playing}
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
            onEnded={() => setPlaying(false)}
          />
          {!playing && (
            <button
              onClick={handlePlayClick}
              aria-label={`Play ${label}`}
              className="absolute inset-0 flex flex-col items-center justify-center w-full h-full group"
              style={{ background: "rgba(7,9,15,0.45)" }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{
                  background: "rgba(255,69,0,0.15)",
                  border: "2px solid rgba(255,69,0,0.5)",
                  boxShadow: "0 0 40px rgba(255,69,0,0.3)",
                }}
              >
                <svg className="w-8 h-8 ml-1" fill="#FF4500" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-white font-bold text-lg tracking-tight drop-shadow">{label}</p>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      id={id}
      className="relative w-full aspect-video rounded-2xl overflow-hidden flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #07090f 0%, #0c1420 50%, #07090f 100%)",
        boxShadow: "0 0 60px rgba(255,69,0,0.08), 0 0 120px rgba(255,69,0,0.04), inset 0 1px 0 rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,69,0,0.15)",
      }}
    >
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)",
      }} />
      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#FF4500]/40 rounded-tl" />
      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#FF4500]/40 rounded-tr" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#FF4500]/40 rounded-bl" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#FF4500]/40 rounded-br" />
      <div className="relative z-10 text-center px-8">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5" style={{
          background: "rgba(255,69,0,0.12)",
          border: "2px solid rgba(255,69,0,0.4)",
          boxShadow: "0 0 30px rgba(255,69,0,0.2)",
        }}>
          <svg className="w-8 h-8 ml-1" fill="#FF4500" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <p className="text-white font-bold text-lg mb-1 tracking-tight">{label}</p>
        <p className="text-slate-500 text-sm">{sublabel}</p>
      </div>
    </div>
  );
}

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
export default function RealEstateFunnel() {
  const [showSticky, setShowSticky] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    agency: "",
    suburb: "",
    dealsPerMonth: "",
    leadSource: "",
    pipelineProblem: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    referrer: "",
  });

  // Page title + meta
  useEffect(() => {
    document.title = "Free 90-Day Pipeline Growth Map | Australian Real Estate Agents | AiPivot";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "Stop leaking listing appointments. Get a free 90-Day Pipeline Growth Map — a personalised AI-powered follow-up plan built around your real estate pipeline, your leads, and your market.");
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
    onSuccess: () => { pixelTrack("Lead", { content_name: "Pipeline Growth Map" }); setSubmitted(true); },
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
    if (!form.agency.trim()) e.agency = "Required";
    if (!form.suburb.trim()) e.suburb = "Required";
    if (!form.dealsPerMonth) e.dealsPerMonth = "Required";
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

          <p className="text-[#FF4500] text-xs font-bold uppercase tracking-[0.2em] mb-4">Application Received</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            Application Received.<br />Nice.
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-4">
            Now lock in a short call so we can sanity-check your numbers, look at how your pipeline works today, and build your 90-Day Growth Map properly.
          </p>
          <p className="text-slate-500 text-sm mb-10">
            Check your inbox — we'll also send confirmation within a few minutes.
          </p>

          <a
            href={CONFIG.bookingUrl}
            className="inline-block font-bold text-[#141413] text-lg px-10 py-5 rounded-xl w-full sm:w-auto hover:opacity-90 transition-all"
            style={{
              background: "#FF4500",
              boxShadow: "0 4px 24px rgba(255,69,0,0.4)",
            }}
          >
            Book My Strategy Call →
          </a>
          <p className="text-slate-600 text-xs mt-4">Short call. No obligation. We look at your numbers together.</p>
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
        {/* Background image + glow */}
        <div className="absolute inset-0 pointer-events-none">
          <img src="/images/hero-bg-dark-tech.webp" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "rgba(20,20,19,0.60)" }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-[0.07]"
            style={{ background: "radial-gradient(ellipse, #FF4500 0%, transparent 70%)" }} />
        </div>

        <div className="relative max-w-6xl mx-auto pt-16">

          {/* Badge — centred above columns */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[#FF4500] text-xs font-bold uppercase tracking-widest"
              style={{ background: "rgba(255,69,0,0.08)", border: "1px solid rgba(255,69,0,0.2)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500] animate-pulse" />
              {COPY.badge}
            </div>
          </div>

          {/* Two-column layout — normal document flow, no absolute positioning */}
          <div style={{ display: "flex", alignItems: "center", gap: "0" }}>

            {/* LEFT — 55% text */}
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

            {/* RIGHT — 45% Duku (desktop) */}
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

          {/* Mobile layout — single column, shown only below lg */}
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

            {/* Mobile Duku — below CTA */}
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

          {/* VIDEO 1 — below both columns */}
          <div className="max-w-3xl mx-auto mt-16 pb-20">
            <VideoCinematic
              id="video1"
              label="Stop Torching Your Portal Leads"
              sublabel="60-sec explainer"
              youtubeId="sV5m8tYaTlE"
            />
          </div>

        </div>
      </section>

      {/* ── PAIN ─────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 relative overflow-hidden" style={{ background: "#0b0e16" }}>
        <img src="/images/features-bg-circuit.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <SectionLabel>Brutal Honesty</SectionLabel>
          <h2 className="text-3xl sm:text-5xl font-bold leading-tight mb-12">
            Be Honest… How Many Of<br />Your Leads Never Hear<br />From You?
          </h2>

          <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
            <p>Every month, agents pour serious money into portals, paid ads, socials, signboards and websites.</p>
            <p>Then the enquiry comes in at the worst possible time — during an open, on the road, at dinner, or buried under a hundred other things.</p>
            <p className="text-xl text-white font-semibold">By the time you call them back, they've already spoken to another agent… or gone cold.</p>
            <div className="pl-6 border-l-4 border-[#FF4500] py-2 space-y-3">
              <p className="text-slate-300">That's the brutal truth:</p>
              <p className="text-white font-bold text-xl">Most agents do not have a lead problem.<br />They have a follow-up problem.</p>
              <p className="text-slate-400">And that problem is quietly costing them listings, appraisals and commission.</p>
            </div>
          </div>

          <div className="mt-12 rounded-2xl p-8"
            style={{ background: "#0c1018", border: "1px solid rgba(255,69,0,0.12)" }}>
            <p className="text-[#FF4500] font-bold text-xl leading-snug">
              You don't need more leads.<br />
              <span className="text-white">You need more conversations with the leads you already have.</span>
            </p>
          </div>

          <div className="mt-12 text-center">
            <CtaButton href="#apply" size="md">Get My Free Growth Map</CtaButton>
          </div>
        </div>
      </section>

      {/* ── EDUCATION — 3% ───────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Market Education</SectionLabel>
          <h2 className="text-3xl sm:text-5xl font-bold leading-tight mb-6">
            Only 3% Of Your Market Is<br />Ready To List Right Now.
          </h2>
          <p className="text-slate-400 text-lg mb-16 max-w-2xl">At any moment, in any suburb in Australia, the market breaks down like this:</p>

          {/* Market pyramid cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {[
              { pct: "3%",  label: "Ready to sign a listing agreement today",                color: "#ef4444", glow: "rgba(239,68,68,0.15)" },
              { pct: "17%", label: "Researching, stalking portals, 'thinking about it'",    color: "#f59e0b", glow: "rgba(245,158,11,0.12)" },
              { pct: "20%", label: "Know they'll need an agent soon — not ready yet",       color: "#3b82f6", glow: "rgba(59,130,246,0.12)" },
              { pct: "60%", label: "Not even thinking about selling yet — future listings", color: "#475569", glow: "rgba(71,85,105,0.1)" },
            ].map(({ pct, label, color, glow }) => (
              <div key={pct} className="rounded-2xl p-7 text-center"
                style={{ background: "#0c1018", border: `1px solid ${color}22`, boxShadow: `0 0 30px ${glow}` }}>
                <p className="text-5xl font-bold mb-4 leading-none" style={{ color }}>{pct}</p>
                <p className="text-slate-400 text-sm leading-snug">{label}</p>
              </div>
            ))}
          </div>

          {/* VIDEO 2 */}
          <div className="mb-16">
            <VideoCinematic
              id="video2"
              label="The 3% Truth No Agent Wants To Hear"
              sublabel="Market education explainer"
              youtubeId="AvYfF2WArVk"
            />
          </div>

          <div className="max-w-3xl mx-auto space-y-6 text-lg text-slate-300">
            <p>Most agents waste all their budget chasing the tiny 3% and completely ignore the 97% that needs to be warmed up, educated and followed up properly.</p>
            <p className="text-slate-400 italic">That's why their marketing feels inconsistent. It's not because the portals are broken. It's because the system is.</p>
            <div className="rounded-2xl p-7" style={{ background: "#0c1018", border: "1px solid rgba(255,69,0,0.12)" }}>
              <p className="text-[#FF4500] font-bold text-lg mb-2">AiPivot helps you work the 3% fast —</p>
              <p className="text-white">and nurture the other 97% until they're ready to raise their hand.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOLUTION ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-4" style={{ background: "#0b0e16" }}>
        <div className="max-w-4xl mx-auto">
          <SectionLabel>The Solution</SectionLabel>
          <h2 className="text-3xl sm:text-5xl font-bold leading-tight mb-6">
            AiPivot Is The Follow-Up Machine<br />
            <span style={{ color: "#FF4500" }}>Your Agency Never Had</span>
          </h2>

          <p className="text-slate-300 text-lg mb-10 max-w-2xl">
            AiPivot plugs into the leads you're already getting from portals, your website, social media, open homes and referral channels.
          </p>

          <div className="flex flex-wrap gap-3 mb-14">
            {["REA & Domain", "Your website", "Social DMs", "Open-home registrations", "Referral enquiries"].map(s => (
              <span key={s} className="px-4 py-2 rounded-full text-sm font-medium text-slate-300"
                style={{ background: "#0c1018", border: "1px solid rgba(255,69,0,0.15)" }}>
                {s}
              </span>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-14">
            {[
              { icon: "⚡", title: "Instant lead response", body: "Replies in seconds — not hours. First to follow up wins the listing." },
              { icon: "📱", title: "Smart SMS & email nurture", body: "Sequences that sound human, follow up relentlessly, and never forget." },
              { icon: "📊", title: "Pipeline visibility", body: "See every lead, every stage, every gap — no more Excel guesswork." },
              { icon: "📅", title: "AI appointment generation", body: "Warm prospects pushed to your calendar for inspections and appraisals automatically." },
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
            {["No more spreadsheets.", "No more 'I forgot to call them back.'", "No more praying the phone rings."].map(l => (
              <p key={l} className="text-xl text-white font-semibold">{l}</p>
            ))}
          </div>

          <div className="rounded-2xl p-8 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(255,69,0,0.08) 0%, rgba(204,55,0,0.06) 100%)",
              border: "1px solid rgba(255,69,0,0.2)",
            }}>
            <p className="text-white font-bold text-xl">You get a simple, brutal system that works every lead like gold.</p>
          </div>
        </div>
      </section>

      {/* ── GROWTH MAP ───────────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>What's Included</SectionLabel>
          <h2 className="text-3xl sm:text-5xl font-bold leading-tight mb-6">
            What You Get In The<br />90-Day Pipeline Growth Map
          </h2>
          <p className="text-slate-400 text-lg mb-16 max-w-2xl">
            This is not fluff, theory, or another "marketing audit" that tells you to post more on Instagram. This is a personalised growth map built around your numbers, your lead sources and your current pipeline.
          </p>

          <div className="space-y-5 mb-16">
            {[
              {
                step: "01",
                title: "We Audit The Pipeline",
                body: "We look at where your leads come from now — portals, website, socials, referrals, open homes — and what actually happens after they come in.",
                items: ["Enquiry sources mapped", "Conversion stages identified", "Your real follow-up timing exposed"],
              },
              {
                step: "02",
                title: "We Expose The Leaks",
                body: "We map the real-world journey from enquiry to inspection, appraisal, listing and sale — so you can see exactly where follow-up is weak, delayed, inconsistent or missing.",
                items: ["Enquiries never contacted in time", "Open-home attendees who vanish", "Appraisals never properly nurtured", "GCI left on the table every 90 days"],
              },
              {
                step: "03",
                title: "We Build The 90-Day Plan",
                body: "We outline a practical AI-powered follow-up and nurture system built around your specific business — so you can convert more of your existing leads into conversations, appointments and listings.",
                items: ["Days 0–3: rapid-fire follow-up", "Days 4–30: nurture and appraisal push", "Days 31–90: light-touch, top-of-mind", "Fully automated inside AiPivot"],
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
                "How many extra listings may be sitting in your current database",
                "What messages to send and when",
                "How to follow up faster without more manual work",
                "What AiPivot would automate if you want us to build it",
              ].map(o => (
                <li key={o} className="flex items-start gap-3 text-slate-300 text-sm">
                  <span className="text-[#FF4500] mt-0.5 flex-shrink-0">✓</span>
                  {o}
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center">
            <CtaButton href="#apply" size="lg">Yes, I Want My Pipeline Growth Map</CtaButton>
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ─────────────────────────────────────────────────── */}
      <section className="py-24 px-4" style={{ background: "#0b0e16" }}>
        <div className="max-w-3xl mx-auto">
          <SectionLabel>Is This For You?</SectionLabel>
          <h2 className="text-3xl sm:text-5xl font-bold leading-tight mb-16">
            Who This Is For.<br />Who It's Not.
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl p-7" style={{ background: "#0c1018", border: "1px solid rgba(16,185,129,0.2)" }}>
              <p className="text-emerald-400 font-bold text-base mb-6 flex items-center gap-2">
                <span>This IS for you</span>
              </p>
              <ul className="space-y-4">
                {[
                  "Australian real estate agents already generating leads",
                  "Boutique principals and high-performing listing agents",
                  "Teams spending on portals, digital marketing or social media",
                  "Agents who know they're underworking their database",
                  "People serious about building a proper system",
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
                  "Brand-new agents with no pipeline",
                  "People looking for a magic bullet without follow-up",
                  "Anyone who wants 'more leads' but refuses to fix conversion",
                  "Tyre-kickers with no intention to act",
                ].map(i => (
                  <li key={i} className="flex items-start gap-3 text-slate-400 text-sm leading-snug">
                    <span className="text-red-400 mt-0.5 flex-shrink-0">→</span>
                    {i}
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 text-xs mt-6 italic">If that's you, save us both the time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST / WHY ──────────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Why This Works</SectionLabel>
          <h2 className="text-3xl sm:text-5xl font-bold leading-tight mb-12">
            The Game Isn't Just<br />Lead Generation Anymore.
          </h2>

          <div className="space-y-6 text-lg text-slate-300 leading-relaxed mb-12">
            <p>The agents who win are the agents who follow up fast, stay top of mind, and build a system that works leads long after the first enquiry comes in.</p>
            <p>AiPivot is built around that exact problem: helping service businesses turn attention into leads, leads into appointments, and appointments into revenue.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-16">
            {[
              { label: "Built for appointment-driven businesses", icon: "🎯" },
              { label: "Designed to capture the leads most agents forget", icon: "🔍" },
              { label: "Focused on pipeline, not vanity metrics", icon: "📈" },
            ].map(({ label, icon }) => (
              <div key={label} className="rounded-2xl p-6 text-center"
                style={{ background: "#0c1018", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="text-3xl mb-4">{icon}</div>
                <p className="text-slate-300 text-sm leading-snug">{label}</p>
              </div>
            ))}
          </div>

          {/* VIDEO 3 */}
          <VideoCinematic
            id="video3"
            label="What Happens In A 90-Day Growth Map?"
            sublabel="Walkthrough of the session and what you'll walk away with"
            youtubeId="ckDfcXFRuA4"
          />
        </div>
      </section>

      {/* ── GUARANTEE ────────────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl p-10 text-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #141413 0%, #1a1714 100%)",
              border: "1px solid rgba(255,69,0,0.25)",
              boxShadow: "0 0 80px rgba(255,69,0,0.07)",
            }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px"
              style={{ background: "linear-gradient(90deg, transparent, #FF4500, transparent)" }} />
            <p className="text-[#FF4500] text-xs font-bold uppercase tracking-[0.2em] mb-5">The AiPivot Promise</p>
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-6 leading-tight">
              If You Don't Walk Away With At Least<br />
              <span style={{ color: "#FF4500" }}>One Clear, Actionable Insight</span> From<br />
              Your Growth Map Session —<br />
              We'll Give You Back The Hour.
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              No upsell pressure. No templated advice. If we can't find at least one specific place where your pipeline is leaking money — the call is on us and you owe us nothing.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {[
                "Free. No hidden cost.",
                "No lock-in commitment.",
                "Real numbers, not theory.",
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
      <section id="apply" className="py-24 px-4" style={{ background: "#0b0e16" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
              style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              Only 8 Growth Maps available this month
            </div>
            <SectionLabel>Apply Now</SectionLabel>
            <h2 className="text-3xl sm:text-5xl font-bold leading-tight mb-5">
              Ready To Stop<br />Leaking Listings?
            </h2>
            <p className="text-slate-400 text-lg max-w-lg mx-auto">
              Fill out the form. We review every application personally. If it's a fit, we'll send you a booking link for your free Growth Map session.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl p-8 sm:p-10"
            style={{ background: "#0c1018", border: "1px solid rgba(255,255,255,0.06)" }}>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="First name" required error={errors.firstName}>
                <input data-testid="input-firstName" type="text" value={form.firstName}
                  onChange={e => set("firstName", e.target.value)}
                  className={inputCls} placeholder="Jane" />
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
                  className={inputCls} placeholder="jane@realestate.com.au" />
              </Field>
              <Field label="Mobile" required error={errors.mobile}>
                <input data-testid="input-mobile" type="tel" value={form.mobile}
                  onChange={e => set("mobile", e.target.value)}
                  className={inputCls} placeholder="0400 000 000" />
              </Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Agency / brand" required error={errors.agency}>
                <input data-testid="input-agency" type="text" value={form.agency}
                  onChange={e => set("agency", e.target.value)}
                  className={inputCls} placeholder="Ray White Inner North" />
              </Field>
              <Field label="Suburb / market" required error={errors.suburb}>
                <input data-testid="input-suburb" type="text" value={form.suburb}
                  onChange={e => set("suburb", e.target.value)}
                  className={inputCls} placeholder="Newstead, QLD" />
              </Field>
            </div>

            <Field label="Approx. deals per month" required error={errors.dealsPerMonth}>
              <select data-testid="select-deals" value={form.dealsPerMonth}
                onChange={e => set("dealsPerMonth", e.target.value)}
                className={inputCls} style={{ colorScheme: "dark" }}>
                <option value="">Select range…</option>
                <option value="1-2">1–2 deals/month</option>
                <option value="3-5">3–5 deals/month</option>
                <option value="6-10">6–10 deals/month</option>
                <option value="10+">10+ deals/month</option>
              </select>
            </Field>

            <Field label="Main lead source">
              <div className="flex flex-wrap gap-2 pt-1">
                {LEAD_SOURCES.map(s => (
                  <button key={s} type="button" data-testid={`toggle-source-${s}`}
                    onClick={() => set("leadSource", s)}
                    className="px-4 py-2 rounded-full text-xs font-semibold border transition-all"
                    style={form.leadSource === s
                      ? { background: "#FF4500", borderColor: "#FF4500", color: "#141413" }
                      : { background: "transparent", borderColor: "rgba(255,255,255,0.1)", color: "#94a3b8" }}>
                    {s}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Biggest pipeline problem right now">
              <input data-testid="input-problem" type="text" value={form.pipelineProblem}
                onChange={e => set("pipelineProblem", e.target.value)}
                className={inputCls} placeholder="e.g. Portal leads go cold before I can call them back" />
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
          Get My Free Growth Map
        </a>
      </div>

    </div>
  );
}
