import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ShoppingBag } from "lucide-react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const [, navigate] = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    message: "",
  });

  useEffect(() => {
    document.title = "Checkout | AI Pivot Toolbox";
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const toolList = items.map((i) => `${i.tool.name} x${i.quantity} ($${(i.tool.price * i.quantity).toLocaleString()}${i.tool.billing === "monthly" ? "/mo" : " one-time"})`).join("\n");

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.business,
          message: `TOOLBOX ORDER REQUEST\n\nSelected Tools:\n${toolList}\n\nTotal: $${totalPrice.toLocaleString()}\n\nAdditional notes:\n${form.message}`,
          service: "AI Toolbox Order",
        }),
      });
      setSubmitted(true);
      clearCart();
    } catch {
      setSubmitted(true);
      clearCart();
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-32 pb-16 flex items-center justify-center">
          <motion.div
            className="text-center max-w-lg px-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Quote Request Sent!</h1>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              We've received your toolbox selection and will send you a custom quote within 24 hours. We'll also book a quick call to walk you through everything.
            </p>
            <button
              onClick={() => navigate("/")}
              className="btn btn-primary"
              data-testid="checkout-back-home"
            >
              Back to Home
            </button>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container-main px-4 sm:px-6 lg:px-8 max-w-5xl">
          <button
            onClick={() => navigate("/toolbox")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm"
            data-testid="checkout-back"
          >
            <ArrowLeft size={16} />
            Back to Toolbox
          </button>

          <div className="grid lg:grid-cols-[1fr_380px] gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-3xl font-bold text-foreground mb-2">Get Your Custom Quote</h1>
              <p className="text-muted-foreground mb-8">Fill in your details and we'll get back to you within 24 hours with everything you need to get started.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2" htmlFor="co-name">Full Name *</label>
                    <input
                      id="co-name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                      data-testid="checkout-name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2" htmlFor="co-business">Business Name *</label>
                    <input
                      id="co-business"
                      name="business"
                      type="text"
                      required
                      value={form.business}
                      onChange={handleChange}
                      placeholder="Acme Pty Ltd"
                      className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                      data-testid="checkout-business"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2" htmlFor="co-email">Email Address *</label>
                    <input
                      id="co-email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@business.com.au"
                      className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                      data-testid="checkout-email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2" htmlFor="co-phone">Phone Number</label>
                    <input
                      id="co-phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="0400 000 000"
                      className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                      data-testid="checkout-phone"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2" htmlFor="co-message">Anything else we should know?</label>
                  <textarea
                    id="co-message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your business, current tools, or goals…"
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
                    data-testid="checkout-message"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full justify-center text-base py-4 disabled:opacity-60"
                  data-testid="checkout-submit"
                >
                  {loading ? "Sending…" : "Send My Quote Request"}
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  No payment required. We'll send you a detailed quote and schedule a free 30-min onboarding call.
                </p>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="rounded-2xl bg-card border border-border p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-5">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  <h2 className="font-bold text-foreground">Order Summary</h2>
                </div>

                {items.length === 0 ? (
                  <p className="text-muted-foreground text-sm text-center py-4">
                    Your cart is empty.{" "}
                    <button onClick={() => navigate("/toolbox")} className="text-primary hover:underline">Browse tools</button>
                  </p>
                ) : (
                  <div className="space-y-3">
                    {items.map(({ tool, quantity }) => (
                      <div key={tool.id} className="flex justify-between gap-3 text-sm" data-testid={`order-item-${tool.id}`}>
                        <div className="min-w-0">
                          <p className="font-medium text-foreground truncate">{tool.name}</p>
                          <p className="text-muted-foreground text-xs">
                            {quantity > 1 ? `×${quantity} ` : ""}
                            {tool.billing === "monthly" ? "monthly" : "one-time"}
                          </p>
                        </div>
                        <p className="font-semibold text-foreground shrink-0">
                          ${(tool.price * quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}

                    <div className="border-t border-border pt-3 flex justify-between items-center">
                      <p className="font-bold text-foreground">Total</p>
                      <p className="font-bold text-foreground text-xl">${totalPrice.toLocaleString()}</p>
                    </div>
                  </div>
                )}

                <div className="mt-5 pt-5 border-t border-border space-y-3">
                  {["Free 30-min strategy call", "Custom onboarding plan", "No lock-in contracts", "Australian support team"].map((p) => (
                    <div key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
