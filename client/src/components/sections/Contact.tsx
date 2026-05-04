import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { trackEvent, GA_EVENTS } from "@/lib/analytics";

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    industry: "",
    preferredDate: "",
    message: "",
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
        trackEvent(GA_EVENTS.CONTACT_FORM, {
          form_location: "homepage",
          industry: formData.industry || "unspecified",
        });
        toast({
          title: "Success!",
          description: data.message,
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          industry: "",
          preferredDate: "",
          message: "",
        });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section 
      id="contact" 
      className="py-24"
      aria-labelledby="contact-heading"
      itemScope
      itemType="https://schema.org/ContactPage"
    >
      <div className="container-main">
        <div className="max-w-xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 id="contact-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Book Your Strategy Call
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange as any}
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
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Preferred Meeting Date & Time</label>
                <input
                  type="datetime-local"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Tell us about your business (Optional)"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
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
