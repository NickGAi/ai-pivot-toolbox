import { useState } from "react";
import { motion } from "framer-motion";
import { Download, CheckCircle, ArrowRight, FileText } from "lucide-react";

const checklist = [
  "How to make ChatGPT recommend YOUR business (not your competitors)",
  "The exact Google signals that determine if AI engines trust you",
  "7 quick wins Australian businesses can implement this week",
  "Why most SEO agencies are still fighting the last war — and what to do instead",
  "The one page you must optimise first for AI search visibility",
];

export function LeadMagnet() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
      } else {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <section className="py-20 bg-primary/5 border-y border-primary/10" id="free-checklist">
      <div className="container-main px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* Left: Offer copy */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-5">
                <FileText className="w-3.5 h-3.5" />
                Free Resource — No Credit Card Required
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
                The Australian Business AI Checklist
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                7 things you must do before your competitors do — a plain-English checklist that shows you exactly how to get your business recommended by ChatGPT, Perplexity and Google AI.
              </p>

              <ul className="space-y-3 mb-6">
                {checklist.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-xs text-muted-foreground">
                Used by 200+ Australian businesses. Takes 10 minutes to read. No fluff.
              </p>
            </div>

            {/* Right: Form */}
            <div className="bg-background border border-border rounded-2xl p-8 shadow-lg">
              {status === "success" ? (
                <div className="text-center py-6">
                  <CheckCircle className="w-14 h-14 text-primary mx-auto mb-4" aria-hidden="true" />
                  <h3 className="text-xl font-bold text-foreground mb-2">You're in!</h3>
                  <p className="text-muted-foreground text-sm">
                    Check your inbox — your checklist is on its way. While you're here, want to see exactly where your business stands right now?
                  </p>
                  <a
                    href="#contact"
                    className="btn btn-primary mt-6 w-full justify-center"
                    data-testid="lead-magnet-upsell-cta"
                  >
                    Book Your Free Growth Map Call
                    <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    Get the free checklist
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Sent straight to your inbox. No spam, ever.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div>
                      <label htmlFor="lm-firstName" className="block text-sm font-medium text-foreground mb-1.5">
                        First name
                      </label>
                      <input
                        id="lm-firstName"
                        type="text"
                        required
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        placeholder="e.g. Sarah"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                        data-testid="lead-magnet-firstname"
                      />
                    </div>
                    <div>
                      <label htmlFor="lm-email" className="block text-sm font-medium text-foreground mb-1.5">
                        Business email
                      </label>
                      <input
                        id="lm-email"
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="you@yourbusiness.com.au"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                        data-testid="lead-magnet-email"
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-sm text-red-500" role="alert">{errorMsg}</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="btn btn-primary w-full justify-center"
                      data-testid="lead-magnet-submit"
                    >
                      {status === "loading" ? (
                        "Sending…"
                      ) : (
                        <>
                          <Download className="mr-2 w-4 h-4" aria-hidden="true" />
                          Send Me the Free Checklist
                        </>
                      )}
                    </button>
                  </form>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    By submitting you agree to our{" "}
                    <a href="/privacy" className="underline hover:text-foreground">privacy policy</a>.
                    Unsubscribe any time.
                  </p>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
