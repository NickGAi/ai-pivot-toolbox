import { motion } from "framer-motion";
import { TrendingUp, Clock, PhoneCall, Building2 } from "lucide-react";

const stats = [
  {
    icon: PhoneCall,
    value: "12,000+",
    label: "Calls handled monthly",
    description: "Across client deployments"
  },
  {
    icon: Clock,
    value: "40hrs",
    label: "Admin saved per week",
    description: "Average per business"
  },
  {
    icon: TrendingUp,
    value: "90%",
    label: "Reduction in errors",
    description: "In automated processes"
  },
  {
    icon: Building2,
    value: "60 days",
    label: "Average go-live time",
    description: "From kickoff to deployment"
  }
];

const caseStudies = [
  {
    industry: "Professional Services",
    result: "Reduced admin workload by 35 hours per week",
    detail: "Automated client intake, follow-ups, and appointment scheduling"
  },
  {
    industry: "Real Estate Agency",
    result: "Handling 400+ enquiries monthly without extra staff",
    detail: "AI voice agent qualifying leads and booking inspections 24/7"
  },
  {
    industry: "Healthcare Practice",
    result: "Cut no-shows by 60% with automated reminders",
    detail: "Integrated with existing practice management software"
  }
];

const trustedSystems = [
  "Salesforce", "HubSpot", "Zoho", "Google Workspace", "Microsoft 365", "Xero"
];

export function Proof() {
  return (
    <section className="py-24 bg-card" aria-labelledby="proof-heading">
      <div className="container-main">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 id="proof-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Real Results from Real Businesses
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Numbers from actual deployments across Australian businesses
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-2xl bg-background border border-border text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              data-testid={`stat-card-${i}`}
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2" data-testid={`stat-value-${i}`}>{stat.value}</div>
              <div className="text-sm font-semibold text-foreground mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.description}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {caseStudies.map((study, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-2xl bg-background border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              data-testid={`case-study-${i}`}
            >
              <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-3" data-testid={`case-study-industry-${i}`}>
                {study.industry}
              </div>
              <p className="text-lg font-bold text-foreground mb-3" data-testid={`case-study-result-${i}`}>
                {study.result}
              </p>
              <p className="text-sm text-muted-foreground">
                {study.detail}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-muted-foreground mb-4">
            Built on top of the systems businesses already trust
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {trustedSystems.map((system, i) => (
              <span key={i} className="text-sm sm:text-base font-semibold text-foreground/60">
                {system}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
