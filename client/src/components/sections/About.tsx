import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const benefits = [
  "24/7 AI-powered customer engagement",
  "Seamless CRM and calendar integration",
  "Human-like conversations that convert",
  "Real-time analytics and insights",
  "Custom-trained on your business",
  "Dedicated support team"
];

export function About() {
  return (
    <section id="about" className="py-24 bg-card">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Why Choose <span className="gradient-text">AIPivot</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              We specialise in AI solutions that drive real business results. 
              Our team understands the unique challenges you face and builds solutions 
              that actually work in the real world.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
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
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-cyan-500/20 p-1">
              <div className="w-full h-full rounded-3xl bg-background flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-8xl font-bold gradient-text mb-4">AI</div>
                  <div className="text-2xl font-bold text-foreground">Powered by Intelligence</div>
                  <div className="text-muted-foreground mt-2">Built for Business</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
