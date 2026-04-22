import { motion } from "framer-motion";
import { Bot, Phone, Search, Globe, Code, Puzzle, Zap, BarChart3, Cpu } from "lucide-react";

const serviceCategories = [
  {
    category: "AI Automation",
    services: [
      {
        icon: Bot,
        title: "AI Sales Executive",
        description: "Instantly engage, qualify, and convert leads across SMS, Meta, Live Chat, and webforms. 24/7 automated follow-ups that never miss an opportunity."
      },
      {
        icon: Phone,
        title: "AI Voice Agents",
        description: "Handle inbound and outbound calls automatically. Qualify leads, book appointments, integrate with your CRM, and run cold calling campaigns."
      },
      {
        icon: Zap,
        title: "Workflow Automation",
        description: "Automate repetitive tasks, data entry, and client communications across all your platforms — saving hours every single day."
      }
    ]
  },
  {
    category: "AI SEO & Visibility",
    services: [
      {
        icon: Search,
        title: "AI SEO",
        description: "AI-powered search engine optimisation that gets your business ranking higher on Google. Content strategy, technical SEO, and link building — done with AI precision."
      },
      {
        icon: Cpu,
        title: "AIO — Answer Engine Optimisation",
        description: "Get your business featured in AI-generated answers on ChatGPT, Perplexity, and Google AI Overviews. Be the answer, not just a result."
      },
      {
        icon: Globe,
        title: "GEO — Generative Engine Optimisation",
        description: "Optimise your online presence so AI models reference and recommend your business. Future-proof your visibility as search evolves."
      }
    ]
  },
  {
    category: "Build & Integrate",
    services: [
      {
        icon: Globe,
        title: "Website Design & Development",
        description: "Fast, conversion-focused websites built with AI-enhanced design. From landing pages to full business sites — delivered in days, not months."
      },
      {
        icon: Code,
        title: "App & Software Development",
        description: "Custom web apps and software tailored to your business. Automate internal processes, build client portals, and create tools your team actually wants to use."
      },
      {
        icon: Puzzle,
        title: "AI Tools & Integrations",
        description: "Connect your entire tech stack with AI. CRM integrations, API connections, and custom AI tools that plug straight into your existing business systems."
      }
    ]
  }
];

export function Services() {
  let cardIndex = 0;

  return (
    <section
      id="services"
      className="py-24 bg-card"
      aria-labelledby="services-heading"
    >
      <div className="container-main">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 id="services-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What We Do
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From AI automation to SEO, websites, and custom software — we help Australian businesses grow faster with the right technology
          </p>
        </motion.div>

        <div className="space-y-16" itemScope itemType="https://schema.org/ItemList">
          {serviceCategories.map((cat, catIndex) => {
            const catCards = cat.services.map((service, i) => {
              const globalIndex = cardIndex++;
              return (
                <motion.div
                  key={i}
                  className="p-6 sm:p-8 rounded-2xl bg-background border border-border hover:border-primary/50 transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  itemScope
                  itemProp="itemListElement"
                  itemType="https://schema.org/Service"
                  data-testid={`service-card-${globalIndex}`}
                >
                  <div
                    className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors"
                    aria-hidden="true"
                  >
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3" itemProp="name">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed" itemProp="description">{service.description}</p>
                </motion.div>
              );
            });

            return (
              <div key={catIndex}>
                <motion.h3
                  className="text-lg font-semibold text-primary uppercase tracking-wider mb-6"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  {cat.category}
                </motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {catCards}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
