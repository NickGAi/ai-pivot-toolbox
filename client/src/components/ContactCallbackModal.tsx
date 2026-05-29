import { useState } from "react";
import { X, Phone, ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const LIME = "#84cc16";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactCallbackModal({ isOpen, onClose }: Props) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", businessName: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  if (!isOpen) return null;

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setErr("");
    try {
      const res = await fetch("/api/callback-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setDone(true);
      } else {
        setErr(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setErr("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = `w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#84cc16]/60 transition-shadow`;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      data-testid="callback-modal-overlay"
    >
      <motion.div
        className="bg-card rounded-2xl p-6 sm:p-8 w-full max-w-md border border-border shadow-2xl"
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        onClick={e => e.stopPropagation()}
        data-testid="callback-modal"
      >
        {!done ? (
          <>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: LIME }}>
                  <Phone className="w-4 h-4 text-[#141413]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground leading-tight">Request a Call Back</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Nick will call you within 24 hours</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors" data-testid="btn-close-callback-modal">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <p className="text-sm text-muted-foreground mb-5 mt-3">
              Not ready for the full Growth Map? No worries — leave your details and we'll have a no-pressure chat about what AI could do for your business.
            </p>

            <form onSubmit={onSubmit} className="space-y-3">
              <input type="text" name="name" placeholder="Your Name *" value={form.name} onChange={onChange} required className={inputClass} data-testid="input-callback-name" />
              <input type="email" name="email" placeholder="Email Address *" value={form.email} onChange={onChange} required className={inputClass} data-testid="input-callback-email" />
              <input type="tel" name="phone" placeholder="Your Mobile (so we can call you) *" value={form.phone} onChange={onChange} required className={inputClass} data-testid="input-callback-phone" />
              <input type="text" name="businessName" placeholder="Business Name (optional)" value={form.businessName} onChange={onChange} className={inputClass} data-testid="input-callback-business" />
              <textarea name="message" placeholder="What would you like to talk about? (optional)" value={form.message} onChange={onChange} rows={3} className={`${inputClass} resize-none`} data-testid="input-callback-message" />

              {err && <p className="text-red-500 text-sm">{err}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full font-bold px-6 py-4 rounded-xl transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-[#141413] hover:opacity-90"
                style={{ background: LIME }}
                data-testid="btn-submit-callback"
              >
                {submitting ? "Sending…" : "Request My Call Back"}
                {!submitting && <ArrowRight className="w-5 h-5" />}
              </button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-3">
              Your number is only used by Nick to call you — it's never published or sold.
            </p>
          </>
        ) : (
          <div className="text-center py-4" data-testid="callback-success">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: LIME }}>
              <CheckCircle className="w-8 h-8 text-[#141413]" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">You're locked in!</h3>
            <p className="text-muted-foreground text-sm mb-1">
              Nick will call you on <strong className="text-foreground">{form.phone}</strong> within 24 hours.
            </p>
            <p className="text-muted-foreground text-sm mb-6">
              A confirmation is on its way to <strong className="text-foreground">{form.email}</strong>.
            </p>
            <button
              onClick={onClose}
              className="font-bold px-6 py-3 rounded-xl text-[#141413] hover:opacity-90 transition-opacity"
              style={{ background: LIME }}
              data-testid="btn-close-callback-success"
            >
              Close
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
