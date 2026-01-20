import { motion } from "framer-motion";
import { TrendingUp, Clock, Users } from "lucide-react";

export function Urgency() {
  return (
    <section className="py-16 bg-primary/5 border-y border-primary/20">
      <div className="container-main">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
            The Cost of Manual Processes Compounds Daily
          </h2>
          
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <div className="flex flex-col items-center p-4" data-testid="urgency-point-0">
              <Clock className="w-8 h-8 text-primary mb-3" />
              <p className="text-sm text-muted-foreground">
                Every missed call is a lost opportunity your competitors are capturing
              </p>
            </div>
            <div className="flex flex-col items-center p-4" data-testid="urgency-point-1">
              <Users className="w-8 h-8 text-primary mb-3" />
              <p className="text-sm text-muted-foreground">
                Staff spending hours on admin that AI can handle in seconds
              </p>
            </div>
            <div className="flex flex-col items-center p-4" data-testid="urgency-point-2">
              <TrendingUp className="w-8 h-8 text-primary mb-3" />
              <p className="text-sm text-muted-foreground">
                Your competitors are already automating — the gap widens every month
              </p>
            </div>
          </div>

          <p className="text-lg text-foreground font-medium">
            Businesses that automate now will have a 12-18 month head start on those that wait.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
