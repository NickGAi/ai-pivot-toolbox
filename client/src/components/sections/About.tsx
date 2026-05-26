import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

const benefits = [
  "24/7 AI-powered customer engagement",
  "Seamless CRM and calendar integration",
  "Human-like conversations that convert",
  "Real-time analytics and insights",
  "Custom-trained on your business",
  "Dedicated support team"
];

const notForYou = [
  "Early-stage businesses without defined workflows",
  "Teams looking for a DIY chatbot tool",
  "Businesses without existing systems to integrate"
];

export function About() {
  return (
    <section 
      id="about" 
      className="py-24 bg-card"
      aria-labelledby="about-heading"
      itemScope
      itemType="https://schema.org/AboutPage"
    >
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 id="about-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Why Choose <span className="gradient-text">AI Pivot Toolbox</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed" itemProp="description">
              We're not a software platform you log into. We're implementation specialists who build, deploy, and manage AI systems that work inside your business — integrated with the tools you already use.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="rounded-3xl bg-gradient-to-br from-primary/20 to-orange-500/20 p-1">
              <div className="rounded-3xl bg-background p-8">
                <h3 className="text-xl font-bold text-foreground mb-6">This is not for everyone</h3>
                <p className="text-muted-foreground mb-6">
                  We work best with established businesses that have real workflows to automate. If you're looking for a quick fix or DIY solution, we're probably not the right fit.
                </p>
                <div className="space-y-3">
                  {notForYou.map((item, i) => (
                    <div key={i} className="flex items-center gap-3" data-testid={`disqualifier-${i}`}>
                      <XCircle className="w-5 h-5 text-muted-foreground shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-foreground font-medium">
                    We require existing business systems to integrate with (CRM, calendar, phone system, etc.)
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
