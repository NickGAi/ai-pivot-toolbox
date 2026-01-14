import { motion } from "framer-motion";
import { Bot, Phone, MessageSquare, BarChart3, Zap, Users } from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "AI Sales Executive",
    description: "Instantly engage, qualify, and convert leads across SMS, Meta, Live Chat, and Webforms. 24/7 automated follow-ups."
  },
  {
    icon: Phone,
    title: "AI Phone Executive",
    description: "Handle inbound and outbound calls effortlessly. Qualify leads, book appointments, integrate with your CRM, and cold calling."
  },
  {
    icon: MessageSquare,
    title: "AI Receptionist",
    description: "Automate appointment scheduling and customer calls. Sync with Google or Outlook calendars seamlessly."
  },
  {
    icon: BarChart3,
    title: "AI Analytics",
    description: "Real-time insights into customer behaviour, lead quality, and conversion rates for your business."
  },
  {
    icon: Zap,
    title: "Workflow Automation",
    description: "Automate repetitive tasks, data updates, and client communications across all platforms."
  },
  {
    icon: Users,
    title: "Lead Management",
    description: "Intelligent lead scoring, routing, and nurturing to ensure no opportunity falls through the cracks."
  }
];

export function Services() {
  return (
    <section id="products" className="py-24 bg-card">
      <div className="container-main">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Our Products
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Purpose-built AI products designed to grow your business
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              className="p-8 rounded-2xl bg-background border border-border hover:border-primary/50 transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
