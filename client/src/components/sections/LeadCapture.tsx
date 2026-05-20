import { motion } from "framer-motion";
import { ArrowRight, X, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { pixelTrack } from "@/lib/pixel";

export function LeadCapture() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    businessName: "",
    industry: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          message: "Lead from Free AI Automation Assessment form",
        }),
      });

      const data = await response.json();

      if (data.success) {
        pixelTrack("Lead", { content_name: "Free Assessment" });
        toast({
          title: "Success!",
          description: "We'll be in touch within 24 hours with your assessment.",
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          businessName: "",
          industry: "",
        });
        setIsModalOpen(false);
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
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const benefits = [
    "Identify your top 3 automation opportunities",
    "See potential time savings across your team",
    "Get a custom implementation roadmap"
  ];

  return (
    <>
      <section className="py-20 bg-primary" data-testid="lead-capture-section">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Discover Your Business's <br />
                <span className="text-cyan-300">Hidden Automation Potential</span>
              </h2>
              <p className="text-xl text-white/90 mb-6">
                Find out with our <strong>FREE AI-Powered Assessment</strong> that reveals exactly where automation can save you time and money.
              </p>
              <div className="space-y-3 mb-8">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3" data-testid={`lead-benefit-${i}`}>
                    <CheckCircle className="w-5 h-5 text-cyan-300 shrink-0" />
                    <span className="text-white">{benefit}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-cyan-50 transition-colors text-lg"
                data-testid="btn-claim-assessment"
              >
                Claim Your FREE Assessment
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>

            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square rounded-3xl bg-white/10 backdrop-blur-sm p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-7xl font-bold text-white mb-4">5 min</div>
                  <div className="text-xl text-white/80">Quick Assessment</div>
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <div className="text-3xl font-bold text-cyan-300">$0</div>
                    <div className="text-white/70">No obligation</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
          data-testid="lead-modal-overlay"
        >
          <motion.div
            className="bg-card rounded-2xl p-6 sm:p-8 w-full max-w-md border border-border shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            data-testid="lead-modal"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">Get Your Free Assessment</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                data-testid="btn-close-modal"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <p className="text-muted-foreground mb-6">
              Enter your details and we'll send you a personalised automation assessment within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  data-testid="input-lead-firstname"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  data-testid="input-lead-lastname"
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Work Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                data-testid="input-lead-email"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                data-testid="input-lead-phone"
              />
              <input
                type="text"
                name="businessName"
                placeholder="Business Name"
                value={formData.businessName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                data-testid="input-lead-business"
              />
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                data-testid="select-lead-industry"
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
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white font-bold px-6 py-4 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                data-testid="btn-submit-lead"
              >
                {isSubmitting ? "Sending..." : "Get My Free Assessment"}
                {!isSubmitting && <ArrowRight className="w-5 h-5" />}
              </button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-4">
              No spam. No obligation. Just insights.
            </p>
          </motion.div>
        </div>
      )}
    </>
  );
}
