import { motion } from "framer-motion";

export function Integrations() {
  return (
    <section id="integrations" className="py-24">
      <div className="container-main">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Integrations
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Seamlessly connects with the tools you already use
          </p>
        </motion.div>
      </div>
    </section>
  );
}
