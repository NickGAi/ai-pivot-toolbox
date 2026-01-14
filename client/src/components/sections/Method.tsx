import { motion } from "framer-motion";
import { Brain, Database, Cog, Rocket } from "lucide-react";

const steps = [
  {
    icon: Database,
    step: "01",
    title: "Data Integration",
    description: "We connect to your existing systems and understand your unique business workflows and data."
  },
  {
    icon: Brain,
    step: "02",
    title: "AI Training",
    description: "Your AI is trained on your specific products, services, and customer interaction patterns."
  },
  {
    icon: Cog,
    step: "03",
    title: "Automation Setup",
    description: "We configure intelligent automations that handle leads, enquiries, and scheduling 24/7."
  },
  {
    icon: Rocket,
    step: "04",
    title: "Launch & Optimise",
    description: "Go live with continuous monitoring and optimisation to maximise your results."
  }
];

export function Method() {
  return (
    <section 
      id="method" 
      className="py-24"
      aria-labelledby="method-heading"
    >
      <div className="container-main">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 id="method-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            AI Implementation Method
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A proven 4-step process to transform your business operations with AI in 6-12 weeks
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, i) => (
            <motion.div
              key={i}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="text-7xl font-bold text-primary/10 absolute -top-4 left-0">
                {item.step}
              </div>
              <div className="relative pt-12">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
