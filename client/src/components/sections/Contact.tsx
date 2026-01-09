import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="container-main">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-muted-foreground">
              Book a free consultation to see how AI can revolutionise your real estate operations
            </p>
          </motion.div>

          <motion.div
            className="bg-card rounded-3xl p-8 sm:p-12 border border-border"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Call us</div>
                      <div className="text-foreground font-medium">1300 542 635</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Email us</div>
                      <div className="text-foreground font-medium">hello@aipivot.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Location</div>
                      <div className="text-foreground font-medium">Australia-wide</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col justify-center">
                <div className="bg-gradient-to-br from-primary/10 to-cyan-500/10 rounded-2xl p-8 text-center">
                  <h4 className="text-xl font-bold text-foreground mb-3">
                    Free AI Opportunity Analysis
                  </h4>
                  <p className="text-muted-foreground mb-6">
                    Discover how AI can transform your real estate business in a 30-minute call
                  </p>
                  <a 
                    href="mailto:hello@aipivot.com?subject=AI%20Consultation%20Request" 
                    className="btn btn-primary w-full justify-center"
                  >
                    Book Free Consultation
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
