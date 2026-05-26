import { ArrowRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { pixelTrack } from "@/lib/pixel";

const logosRow1 = [
  "Real Estate", "Healthcare", "Professional Services", "Finance", "Retail",
  "Manufacturing", "Hospitality", "Legal", "Education", "Technology"
];

const logosRow2 = [
  "Consulting", "Insurance", "Logistics", "Construction", "Automotive",
  "Telecommunications", "Accounting", "Marketing", "Recruitment", "Property Management"
];

export function Hero() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [step, setStep] = useState<"email" | "name" | "loading" | "success" | "error">("email");
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step === "name") {
      setTimeout(() => nameRef.current?.focus(), 320);
    }
  }, [step]);

  function handleEmailNext(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStep("name");
  }

  async function handleNameSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep("loading");
    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email }),
      });
      const data = await res.json();
      if (data.success) {
        pixelTrack("Lead", { content_name: "Hero Email Capture" });
        setStep("success");
      } else {
        setStep("error");
      }
    } catch {
      setStep("error");
    }
  }

  return (
    <section 
      className="relative min-h-screen flex flex-col justify-center pt-20"
      aria-labelledby="hero-heading"
      itemScope
      itemType="https://schema.org/WPHeader"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <img src="/images/hero-bg-dark-tech.webp" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="container-main relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Split layout: text left, Duku right */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

          {/* LEFT — content */}
          <div className="flex-1 animate-hero-fade-up lg:text-left text-center">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-6 sm:mb-8" role="status">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
              <span itemProp="description">AI Automation & SEO Agency, Australia Wide</span>
            </div>

            <h1 
              id="hero-heading" 
              className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-bold text-foreground mb-6 leading-[1.0] tracking-tight uppercase"
              itemProp="headline"
            >
              AI Business Automation Tools —{" "}
              <span className="gradient-text">Tell Us What You Want,</span>{" "}
              We'll Get It Done.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl lg:mx-0 mx-auto mb-3 sm:mb-4 leading-relaxed" itemProp="text">
              Stop wasting time thinking about what you can do with AI. Get us to give you a clear path to implement and get started today. From custom AI lead generation, Voice Clone, Video Avatars, to automated workflows.
            </p>

            <p className="text-sm sm:text-base text-primary font-semibold max-w-xl lg:mx-0 mx-auto mb-8 sm:mb-10">
              ★★★★★ Guaranteed results for Australian businesses in 60 days or less
            </p>

            {/* Email + Name capture bar */}
            {step === "success" ? (
              <div className="max-w-xl flex items-center justify-center gap-3 bg-primary/10 border border-primary/30 rounded-full px-6 py-4 lg:mx-0 mx-auto">
                <span className="text-2xl">🎉</span>
                <p className="text-foreground font-semibold">Done! Check your inbox — your clear path is on its way.</p>
              </div>
            ) : (
              <div className="max-w-xl lg:mx-0 mx-auto">
                <div className="relative overflow-hidden rounded-full">
                  {/* Step 1 — Email */}
                  <form
                    onSubmit={handleEmailNext}
                    data-testid="hero-email-form"
                    className="flex items-center gap-0 bg-foreground/10 border border-foreground/20 rounded-full pl-4 pr-1 py-1 transition-transform duration-300 ease-in-out"
                    style={{
                      transform: step === "email" ? "translateX(0%)" : "translateX(-110%)",
                      position: step === "email" ? "relative" : "absolute",
                      inset: 0,
                      width: "100%",
                    }}
                  >
                    <span className="text-xl mr-3 flex-shrink-0" aria-hidden="true">👋</span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Enter your email here and we'll send you some 'magic'..."
                      className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-sm sm:text-base outline-none min-w-0"
                      data-testid="hero-email-input"
                      aria-label="Enter your email address"
                    />
                    <button
                      type="submit"
                      className="flex-shrink-0 bg-[#b8f000] hover:bg-[#caff00] text-black font-bold text-sm sm:text-base px-5 py-3 rounded-full transition-colors whitespace-nowrap flex items-center gap-1"
                      data-testid="hero-email-submit"
                    >
                      Do it <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>

                  {/* Step 2 — Name */}
                  <form
                    onSubmit={handleNameSubmit}
                    data-testid="hero-name-form"
                    className="flex items-center gap-0 bg-foreground/10 border border-foreground/20 rounded-full pl-4 pr-1 py-1 transition-transform duration-300 ease-in-out"
                    style={{
                      transform: step !== "email" ? "translateX(0%)" : "translateX(110%)",
                      position: step !== "email" ? "relative" : "absolute",
                      inset: 0,
                      width: "100%",
                    }}
                  >
                    <span className="text-xl mr-3 flex-shrink-0" aria-hidden="true">👋</span>
                    <input
                      ref={nameRef}
                      type="text"
                      required
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      placeholder="And your first name..."
                      className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-sm sm:text-base outline-none min-w-0"
                      data-testid="hero-name-input"
                      aria-label="Enter your first name"
                    />
                    <button
                      type="submit"
                      disabled={step === "loading"}
                      className="flex-shrink-0 bg-[#b8f000] hover:bg-[#caff00] text-black font-bold text-sm sm:text-base px-5 py-3 rounded-full transition-colors disabled:opacity-60 whitespace-nowrap flex items-center gap-1"
                      data-testid="hero-name-submit"
                    >
                      {step === "loading" ? "Sending…" : <>Submit <ArrowRight className="w-4 h-4" /></>}
                    </button>
                  </form>
                </div>
              </div>
            )}
            {step === "error" && (
              <p className="text-red-400 text-sm mt-3 lg:text-left text-center">Something went wrong — try again or <a href="#contact" className="underline">book a call</a>.</p>
            )}

            {/* Mobile Duku — below CTA on small screens */}
            <div className="lg:hidden flex justify-center mt-10">
              <picture>
                <source srcSet="/duku-re.webp" type="image/webp" />
                <img
                  src="/duku-re.png"
                  alt="Duku AI character"
                  width={280}
                  height={280}
                  className="w-56 sm:w-64 drop-shadow-2xl"
                  loading="eager"
                />
              </picture>
            </div>
          </div>

          {/* RIGHT — Duku (desktop only) */}
          <div className="hidden lg:block animate-hero-fade-in flex-shrink-0"
            style={{ width: "45%", minHeight: "560px", paddingRight: "40px" }}>
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
                loading="eager"
              />
            </picture>
          </div>

        </div>

        {/* Logo Marquee */}
        <div className="animate-hero-fade-in mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-border overflow-hidden">
          <p className="text-sm text-muted-foreground mb-6 sm:mb-8 uppercase tracking-wider text-center">
            Trusted Across Industries
          </p>
          
          {/* Mobile: Wrapped grid */}
          <div className="flex flex-wrap justify-center gap-3 sm:hidden">
            {[...logosRow1, ...logosRow2.slice(0, 4)].map((logo, i) => (
              <div key={i} className="text-xs font-bold text-foreground/60 px-2 py-1">
                {logo}
              </div>
            ))}
          </div>

          {/* Desktop: Scrolling marquee */}
          <div className="hidden sm:block">
            <div className="relative overflow-hidden mb-6">
              <div className="flex animate-marquee-left whitespace-nowrap">
                {[...logosRow1, ...logosRow1].map((logo, i) => (
                  <div key={i} className="mx-8 text-xl font-bold text-foreground/60 hover:text-foreground/80 transition-colors flex-shrink-0">
                    {logo}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative overflow-hidden">
              <div className="flex animate-marquee-right whitespace-nowrap">
                {[...logosRow2, ...logosRow2].map((logo, i) => (
                  <div key={i} className="mx-8 text-xl font-bold text-foreground/60 hover:text-foreground/80 transition-colors flex-shrink-0">
                    {logo}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
