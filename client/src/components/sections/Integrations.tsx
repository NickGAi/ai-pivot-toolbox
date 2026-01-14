import { motion } from "framer-motion";

const integrations = [
  "Salesforce", "HubSpot", "Zapier", "Google Calendar", "Outlook",
  "Slack", "Microsoft Teams", "Xero", "MYOB", "Monday.com",
  "Asana", "Zoho", "Freshworks", "Pipedrive", "ServiceNow"
];

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

        <motion.div 
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {integrations.map((name, i) => (
            <div
              key={i}
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-card border border-border text-sm sm:text-base text-foreground font-medium hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
            >
              {name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
