import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { trackEvent, GA_EVENTS } from "@/lib/analytics";
import { pixelTrack } from "@/lib/pixel";

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    pixelTrack("Contact");
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    industry: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        pixelTrack("Contact");
        trackEvent(GA_EVENTS.CONTACT_FORM, {
          form_location: "homepage",
          industry: formData.industry || "unspecified",
        });
        toast({
          title: "Success!",
          description: data.message,
        });
        setFormData({ firstName: "", email: "", phone: "", industry: "" });
      } else {
        toast({
          title: "Error",
          description: data.error || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden"
      aria-labelledby="contact-heading"
      itemScope
      itemType="https://schema.org/ContactPage"
    >
      <img src="/images/cta-bg-orange-glow.webp" alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden="true" />
      <div className="absolute inset-0 bg-background/80" aria-hidden="true" />
      <div className="container-main relative z-10">
        <div className="max-w-xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 id="contact-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Book Your Growth Map Call
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              A 30-minute call to map out your automation opportunities
            </p>
            <div className="bg-background/50 rounded-xl p-6 border border-border text-left max-w-md mx-auto" data-testid="contact-process-info">
              <p className="text-sm font-semibold text-foreground mb-3">What happens on the call:</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2" data-testid="call-step-0">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>We review your current workflows and pain points</span>
                </li>
                <li className="flex items-start gap-2" data-testid="call-step-1">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>You get a clear picture of what can be automated</span>
                </li>
                <li className="flex items-start gap-2" data-testid="call-step-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>We provide a rough timeline and investment range</span>
                </li>
              </ul>
              <p className="text-xs text-muted-foreground mt-4 pt-3 border-t border-border" data-testid="no-sell-guarantee">
                No hard sell. If we're not a fit, we'll tell you.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-border"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-firstName" className="sr-only">First Name</label>
                <input
                  id="contact-firstName"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  data-testid="input-firstName"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="sr-only">Email Address</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  data-testid="input-email"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="contact-phone" className="sr-only">Phone Number</label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  data-testid="input-phone"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="contact-industry" className="sr-only">Industry</label>
                <select
                  id="contact-industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  data-testid="select-industry"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Your Industry</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Professional Services">Professional Services</option>
                  <option value="Finance">Finance</option>
                  <option value="Retail">Retail</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Hospitality">Hospitality</option>
                  <option value="Legal">Legal</option>
                  <option value="Education">Education</option>
                  <option value="Technology">Technology</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                data-testid="button-submit"
                className="btn btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Request Meeting"}
                {!isSubmitting && <ArrowRight className="ml-2 w-5 h-5" />}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
