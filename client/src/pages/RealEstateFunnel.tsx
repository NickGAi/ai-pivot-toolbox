import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface VideoPlaceholderProps {
  label: string;
  description: string;
  aspectRatio?: "landscape" | "square";
}

function VideoPlaceholder({ label, description, aspectRatio = "landscape" }: VideoPlaceholderProps) {
  return (
    <div
      className={`relative w-full bg-[#0d1829] border-2 border-dashed border-[#0ea5e9]/30 rounded-2xl flex flex-col items-center justify-center text-center p-8 ${aspectRatio === "landscape" ? "aspect-video" : "aspect-square max-w-xl mx-auto"}`}
    >
      <div className="w-16 h-16 rounded-full bg-[#0ea5e9]/20 border-2 border-[#0ea5e9] flex items-center justify-center mb-4">
        <svg className="w-7 h-7 text-[#0ea5e9] ml-1" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
      <p className="text-[#0ea5e9] font-bold text-lg mb-1">{label}</p>
      <p className="text-slate-400 text-sm max-w-xs">{description}</p>
    </div>
  );
}

interface FormData {
  name: string;
  mobile: string;
  email: string;
  agency: string;
  dealsPerMonth: string;
  leadSources: string[];
  goal: string;
}

const LEAD_SOURCES = ["Portals (REA, Domain)", "Social Media", "Referrals", "Signboards / Open Homes", "Website", "Other"];

export default function RealEstateFunnel() {
  const [form, setForm] = useState<FormData>({
    name: "",
    mobile: "",
    email: "",
    agency: "",
    dealsPerMonth: "",
    leadSources: [],
    goal: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const mutation = useMutation({
    mutationFn: (data: FormData) =>
      apiRequest("POST", "/api/real-estate-funnel", data),
    onSuccess: () => setSubmitted(true),
  });

  function validate(): boolean {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.mobile.trim()) e.mobile = "Required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (!form.agency.trim()) e.agency = "Required";
    if (!form.dealsPerMonth) e.dealsPerMonth = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) mutation.mutate(form);
  }

  function toggleSource(s: string) {
    setForm(f => ({
      ...f,
      leadSources: f.leadSources.includes(s)
        ? f.leadSources.filter(x => x !== s)
        : [...f.leadSources, s],
    }));
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#080d1a] flex items-center justify-center px-4">
        <div className="max-w-lg text-center">
          <div className="w-20 h-20 rounded-full bg-[#0ea5e9]/20 border-2 border-[#0ea5e9] flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-[#0ea5e9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">You're In.</h1>
          <p className="text-slate-300 text-lg mb-4">
            We've got your application. We review every one personally — if it's a fit,
            you'll receive a booking link within 24 hours to lock in your free 90-Day Pipeline Growth Map session.
          </p>
          <p className="text-slate-400 text-sm">Keep an eye on your inbox (and spam folder just in case).</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080d1a] text-white" style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}>

      {/* HERO */}
      <section className="relative pt-12 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#0ea5e9]/10 border border-[#0ea5e9]/30 rounded-full px-4 py-2 text-[#0ea5e9] text-sm font-semibold mb-8">
            <span className="w-2 h-2 rounded-full bg-[#0ea5e9] animate-pulse" />
            For Australian Real Estate Agents Only
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Stop Torching<br />
            <span className="text-[#0ea5e9]">Your Portal Leads.</span>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-300 font-medium mb-4 leading-relaxed">
            Turn The Leads You Already Have Into<br className="hidden sm:block" />
            <span className="text-white font-bold"> 90 Days Of Extra Listing Appointments.</span>
          </p>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            Free 90‑Day Pipeline Growth Map for Australian real estate agents who want more listings — without spending another cent on ads or portals.
          </p>

          <ul className="flex flex-col sm:flex-row gap-4 justify-center mb-10 text-left max-w-2xl mx-auto">
            {[
              "Find out exactly where your pipeline is bleeding money",
              "See how many extra listings you can squeeze from your existing database",
              "Get a 90-day, AI-powered follow-up plan done for you",
            ].map(b => (
              <li key={b} className="flex items-start gap-3 flex-1">
                <span className="w-5 h-5 rounded-full bg-[#0ea5e9] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-slate-300 text-sm leading-snug">{b}</span>
              </li>
            ))}
          </ul>

          <a
            href="#apply"
            className="inline-block bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold text-lg px-10 py-4 rounded-xl transition-colors shadow-lg shadow-[#0ea5e9]/30 mb-6"
          >
            Get My Free 90-Day Pipeline Growth Map
          </a>

          <div className="text-slate-500 text-sm mb-12">No cost. No obligation. Limited spots each month.</div>

          {/* VIDEO 1 — Hero explainer */}
          <div className="max-w-3xl mx-auto">
            <VideoPlaceholder
              label="Video 1: Stop Torching Your Portal Leads"
              description="60-second hero explainer — autoplay muted above the fold. Upload your video and it will appear here."
            />
            <p className="text-slate-500 text-xs mt-3">Autoplay muted · click to watch with sound</p>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Pain */}
      <section className="py-20 px-4 bg-[#0a0f1e]">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#0ea5e9] font-bold text-sm uppercase tracking-widest mb-4">Brutal Honesty</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-10 leading-tight">
            Be Honest… How Many Of Your<br />Portal Leads Never Hear From You?
          </h2>

          <div className="space-y-5 text-lg text-slate-300 leading-relaxed">
            <p>Every month you wire serious cash to the portals.</p>
            <p>And what do you get?<br />
              A flood of email alerts… texts… buyer and seller enquiries at all hours.</p>
            <p className="text-white font-semibold text-xl border-l-4 border-[#0ea5e9] pl-5">
              But here's the uncomfortable truth:<br />
              By the time you actually ring them back, they've already spoken to two other agents —<br />
              or worse — they've gone cold and you never hear from them again.
            </p>
            <p>You're not alone.<br />
              Digital real estate advertising is a multi-billion dollar game in Australia, dominated by the portals.</p>
            <p className="text-2xl font-bold text-white">They're getting richer.<br />
              Most agents are just getting busier… not wealthier.</p>
            <div className="bg-[#0d1829] border border-[#0ea5e9]/20 rounded-2xl p-6 mt-8">
              <p className="text-[#0ea5e9] font-bold text-xl mb-2">The problem is NOT "I need more leads."</p>
              <p className="text-slate-300">The problem is you're <strong className="text-white">leaking the leads you already have.</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — The 3% Truth */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#0ea5e9] font-bold text-sm uppercase tracking-widest mb-4">Market Education</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
            Only 3% Of Your Market Is Ready To List Today.<br />
            <span className="text-[#0ea5e9]">Who's Working The Other 97%?</span>
          </h2>

          <p className="text-slate-400 text-lg mb-10">Right now, in your patch:</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              { pct: "3%", label: "Ready to sign a listing agreement this month", color: "#ef4444" },
              { pct: "17%", label: "Stalking portals, researching, 'thinking about it'", color: "#f59e0b" },
              { pct: "20%", label: "Know they should sell soon — but not hunting agents yet", color: "#3b82f6" },
              { pct: "60%", label: "Not even on the radar yet — future listings", color: "#6b7280" },
            ].map(({ pct, label, color }) => (
              <div key={pct} className="bg-[#0a0f1e] rounded-2xl p-6 border border-white/5 text-center">
                <p className="text-5xl font-bold mb-3" style={{ color }}>{pct}</p>
                <p className="text-slate-400 text-sm leading-snug">{label}</p>
              </div>
            ))}
          </div>

          {/* VIDEO 2 — 3% vs 97% explainer */}
          <div className="mb-12">
            <VideoPlaceholder
              label="Video 2: The 3% vs 97% Strategy"
              description="Education explainer — mid-page. Shows the market pyramid and why most agents are fighting for the wrong slice. Upload your video and it will appear here."
            />
          </div>

          <div className="max-w-3xl mx-auto space-y-5 text-lg text-slate-300">
            <p>What does most real estate marketing do?<br />
              Sprays all the budget at that tiny 3%… and completely ignores the 97% who'll be your future listings.</p>
            <p className="italic text-slate-400">Then agents say "Facebook doesn't work" or "The portals are broken."</p>
            <p className="text-white font-bold text-xl">No. The strategy is broken.</p>
            <div className="bg-[#0a0f1e] border border-[#0ea5e9]/20 rounded-2xl p-6">
              <p className="text-[#0ea5e9] font-bold text-lg mb-2">You absolutely go after the 3%.</p>
              <p>But you <strong className="text-white">also</strong> capture and nurture the 97% — so when they're ready to sell, you're the only agent they think of.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — Enter AiPivot */}
      <section className="py-20 px-4 bg-[#0a0f1e]">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#0ea5e9] font-bold text-sm uppercase tracking-widest mb-4">The Solution</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
            Meet AI Pivot Toolbox: Your 24/7 Follow-Up Machine<br />
            <span className="text-[#0ea5e9]">That Never Sleeps, Never Forgets, Never Gets "Too Busy."</span>
          </h2>

          <p className="text-slate-300 text-lg mb-8">AI Pivot Toolbox plugs into the leads you're already getting from:</p>
          <div className="flex flex-wrap gap-3 mb-10">
            {["Portals (REA, Domain, etc.)", "Your website and landing pages", "Social DMs and enquiry forms", "Open-home registrations and QR codes"].map(s => (
              <span key={s} className="bg-[#0d1829] border border-[#0ea5e9]/20 text-slate-300 px-4 py-2 rounded-full text-sm font-medium">{s}</span>
            ))}
          </div>

          <p className="text-slate-300 text-lg mb-6">Then it:</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {[
              { icon: "⚡", text: "Replies to new enquiries in seconds — not hours" },
              { icon: "📱", text: "Follows up automatically with smart SMS and email sequences" },
              { icon: "🔥", text: "Nurtures cold buyers into hot sellers over 30, 60, 90 days" },
              { icon: "📅", text: "Pushes hot prospects straight to your calendar for appraisals" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-start gap-4 bg-[#080d1a] rounded-xl p-5 border border-white/5">
                <span className="text-2xl">{icon}</span>
                <p className="text-slate-300 leading-snug">{text}</p>
              </div>
            ))}
          </div>

          <div className="text-center space-y-2 mb-12 text-lg text-white font-semibold">
            <p>No more spreadsheets.</p>
            <p>No more "I forgot to call them back."</p>
            <p>No more praying the phone rings.</p>
          </div>

          <div className="bg-gradient-to-r from-[#0ea5e9]/10 to-[#0284c7]/10 border border-[#0ea5e9]/30 rounded-2xl p-6 text-center">
            <p className="text-white text-lg font-semibold">You get a simple, brutal system that works every lead like gold.</p>
          </div>
        </div>
      </section>

      {/* SECTION 5 — What You Get */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#0ea5e9] font-bold text-sm uppercase tracking-widest mb-4">What's Included</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 leading-tight">
            Here's Exactly What We'll Do For You <span className="text-[#0ea5e9]">(Free)</span>
          </h2>

          <div className="space-y-6 mb-14">
            {[
              {
                step: "01",
                title: "Stalk Your Current Pipeline",
                items: [
                  "Where your leads are coming from (portals, signboards, socials, referrals)",
                  "What actually happens to them: enquiry → inspection → appraisal → listing → sale",
                  "You'll see — probably for the first time — the real numbers behind your pipeline",
                ],
              },
              {
                step: "02",
                title: "Expose The Leaks (Brutally)",
                items: [
                  "How many enquiries are never contacted in time",
                  "How many open-home attendees vanish after one call",
                  "How many appraisals never get nurtured properly",
                  "How much GCI you're leaving on the table every 90 days",
                ],
              },
              {
                step: "03",
                title: "Design Your 90-Day AI Follow-Up Machine",
                items: [
                  "Day 0–3: instant responses + rapid-fire follow-up",
                  "Day 4–30: education, proof, inspection and appraisal pushes",
                  "Day 31–90: light-touch nurture so they don't forget your name",
                  "All built to run inside AI Pivot Toolbox — no tech skills required",
                ],
              },
            ].map(({ step, title, items }) => (
              <div key={step} className="flex gap-6 bg-[#0a0f1e] rounded-2xl p-7 border border-white/5">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-[#0ea5e9]/10 border-2 border-[#0ea5e9] flex items-center justify-center">
                    <span className="text-[#0ea5e9] font-bold text-lg">{step}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
                  <ul className="space-y-2">
                    {items.map(item => (
                      <li key={item} className="flex items-start gap-3 text-slate-300">
                        <svg className="w-4 h-4 text-[#0ea5e9] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

          <p className="text-slate-300 text-lg text-center mb-8">
            You walk away with a clear, written 90-day plan and a video walkthrough of how it works in your specific business.
          </p>

          <div className="text-center">
            <a
              href="#apply"
              className="inline-block bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold text-xl px-12 py-5 rounded-xl transition-colors shadow-lg shadow-[#0ea5e9]/30"
            >
              Yes, I Want My Pipeline Growth Map
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 6 — Who it's for */}
      <section className="py-20 px-4 bg-[#0a0f1e]">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#0ea5e9] font-bold text-sm uppercase tracking-widest mb-4">Is This For You?</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-10 leading-tight">
            This Is NOT For Every Agent In Australia
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-[#080d1a] rounded-2xl p-6 border border-emerald-500/20">
              <p className="text-emerald-400 font-bold text-lg mb-4">✅ This IS for you if:</p>
              <ul className="space-y-3 text-slate-300">
                {[
                  "You're a licensed agent in Australia",
                  "You're already doing deals and spending on portals / marketing",
                  "You know you're sitting on a database that's underworked",
                  "You're willing to use tech if it makes you more money",
                ].map(i => <li key={i} className="flex items-start gap-2 text-sm"><span className="text-emerald-400 mt-0.5">→</span>{i}</li>)}
              </ul>
            </div>
            <div className="bg-[#080d1a] rounded-2xl p-6 border border-red-500/20">
              <p className="text-red-400 font-bold text-lg mb-4">❌ This is NOT for:</p>
              <ul className="space-y-3 text-slate-300">
                {[
                  "Brand-new agents with no listings and no leads",
                  "People looking for a 'magic lead source' without doing any follow-up",
                  "Anyone allergic to numbers, accountability and growth",
                ].map(i => <li key={i} className="flex items-start gap-2 text-sm"><span className="text-red-400 mt-0.5">→</span>{i}</li>)}
              </ul>
              <p className="text-slate-500 text-sm mt-4 italic">If that's you, save us both the time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — Why us */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#0ea5e9] font-bold text-sm uppercase tracking-widest mb-4">Why AI Pivot Toolbox</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 leading-tight">
            Why Take Growth Advice From<br />
            <span className="text-[#0ea5e9]">A Bunch Of AI Nerds?</span>
          </h2>

          <div className="space-y-5 text-lg text-slate-300 leading-relaxed mb-10">
            <p className="text-white font-semibold text-xl">Because we live where tech meets GCI.</p>
            <p>We built AI Pivot Toolbox specifically for service businesses that win or lose based on how well they turn leads into conversations — and conversations into contracts.</p>
            <p>You've seen how much money is pouring into digital ads and portals in Australia right now. The agents who win treat follow-up like a weapon, not an afterthought.</p>
            <div className="bg-[#0a0f1e] border border-[#0ea5e9]/20 rounded-2xl p-6">
              <p className="text-white font-semibold mb-2">Our job is simple:</p>
              <p>Bolt a ruthless, AI-powered follow-up engine onto your existing marketing — so you squeeze every last listing out of the demand that's already there.</p>
            </div>
            <p className="text-slate-400">If you get value from the Growth Map and want our help building and running it — great, we can talk about that. If not, you'll still walk away with a 90-day pipeline plan you can implement yourself.</p>
          </div>

          {/* VIDEO 3 — Growth Map explainer */}
          <VideoPlaceholder
            label="Video 3: How the Growth Map Works"
            description="Walkthrough of the 90-Day Pipeline Growth Map — what happens on the call and what you'll leave with. Upload your video and it will appear here."
          />
        </div>
      </section>

      {/* SECTION 8 — Application Form */}
      <section id="apply" className="py-20 px-4 bg-[#0a0f1e]">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#0ea5e9] font-bold text-sm uppercase tracking-widest mb-4 text-center">Limited Spots Each Month</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center leading-tight">
            Ready To Stop Leaking Listings?
          </h2>
          <p className="text-slate-400 text-lg text-center mb-10">
            We can only build a handful of Growth Maps each month without dropping the ball on existing clients. Fill out the form below — we'll review it and, if it's a fit, send you a booking link.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {[
              "Sick of watching portal leads go stone-cold",
              "Tired of 'more marketing' that doesn't turn into more listings",
              "Ready to plug a real system into your business",
            ].map(p => (
              <div key={p} className="flex items-center gap-2 text-slate-300 text-sm">
                <span className="w-2 h-2 rounded-full bg-[#0ea5e9]" />
                {p}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 bg-[#080d1a] rounded-2xl p-8 border border-white/5">

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Name *</label>
                <input
                  data-testid="input-name"
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full bg-[#0d1829] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:border-[#0ea5e9] focus:outline-none transition-colors"
                  placeholder="Jane Smith"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Mobile *</label>
                <input
                  data-testid="input-mobile"
                  type="tel"
                  value={form.mobile}
                  onChange={e => setForm(f => ({ ...f, mobile: e.target.value }))}
                  className="w-full bg-[#0d1829] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:border-[#0ea5e9] focus:outline-none transition-colors"
                  placeholder="0400 000 000"
                />
                {errors.mobile && <p className="text-red-400 text-xs mt-1">{errors.mobile}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Email *</label>
              <input
                data-testid="input-email"
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full bg-[#0d1829] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:border-[#0ea5e9] focus:outline-none transition-colors"
                placeholder="jane@realestate.com.au"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Agency / Brand *</label>
              <input
                data-testid="input-agency"
                type="text"
                value={form.agency}
                onChange={e => setForm(f => ({ ...f, agency: e.target.value }))}
                className="w-full bg-[#0d1829] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:border-[#0ea5e9] focus:outline-none transition-colors"
                placeholder="Ray White Inner North"
              />
              {errors.agency && <p className="text-red-400 text-xs mt-1">{errors.agency}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Approximate deals per month *</label>
              <select
                data-testid="select-deals"
                value={form.dealsPerMonth}
                onChange={e => setForm(f => ({ ...f, dealsPerMonth: e.target.value }))}
                className="w-full bg-[#0d1829] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0ea5e9] focus:outline-none transition-colors"
              >
                <option value="" className="text-slate-600">Select range…</option>
                <option value="1-2">1–2 deals/month</option>
                <option value="3-5">3–5 deals/month</option>
                <option value="6-10">6–10 deals/month</option>
                <option value="10+">10+ deals/month</option>
              </select>
              {errors.dealsPerMonth && <p className="text-red-400 text-xs mt-1">{errors.dealsPerMonth}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">Main lead sources (select all that apply)</label>
              <div className="flex flex-wrap gap-2">
                {LEAD_SOURCES.map(s => (
                  <button
                    key={s}
                    type="button"
                    data-testid={`toggle-source-${s}`}
                    onClick={() => toggleSource(s)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                      form.leadSources.includes(s)
                        ? "bg-[#0ea5e9] border-[#0ea5e9] text-white"
                        : "bg-[#0d1829] border-white/10 text-slate-400 hover:border-[#0ea5e9]/40"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                What's the #1 thing you want more of in the next 90 days?
              </label>
              <input
                data-testid="input-goal"
                type="text"
                value={form.goal}
                onChange={e => setForm(f => ({ ...f, goal: e.target.value }))}
                className="w-full bg-[#0d1829] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:border-[#0ea5e9] focus:outline-none transition-colors"
                placeholder="More listing appraisals from my existing database"
              />
            </div>

            {mutation.isError && (
              <p className="text-red-400 text-sm text-center">Something went wrong. Please try again or email us directly.</p>
            )}

            <button
              data-testid="button-submit"
              type="submit"
              disabled={mutation.isPending}
              className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] disabled:opacity-60 text-white font-bold text-xl py-5 rounded-xl transition-colors shadow-lg shadow-[#0ea5e9]/30"
            >
              {mutation.isPending ? "Submitting…" : "Apply For My Free 90-Day Growth Map"}
            </button>

            <p className="text-slate-500 text-xs text-center leading-relaxed">
              No cost. No obligation. We'll review your answers and, if it's a fit,<br />
              send you a booking link for your personalised Growth Map session.
            </p>
          </form>
        </div>
      </section>

      {/* Footer bar */}
      <footer className="py-8 px-4 border-t border-white/5 text-center">
        <p className="text-slate-600 text-sm">
          © {new Date().getFullYear()} AI Pivot Toolbox · aipivot.com.au ·{" "}
          <a href="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
        </p>
      </footer>

    </div>
  );
}
