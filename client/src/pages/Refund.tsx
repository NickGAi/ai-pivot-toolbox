import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Refund() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main role="main" aria-label="Refund Policy" className="pt-24 pb-16">
        <article className="container-main max-w-4xl">
          <h1 className="text-4xl font-bold text-foreground mb-8">Refund Policy</h1>
          <p className="text-muted-foreground mb-8">
            <strong>AI Pivot Toolbox – aipivot.com.au</strong><br />
            Last updated: January 2026
          </p>

          <div className="prose prose-invert max-w-none space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              This Refund Policy outlines how refunds are handled for services purchased from AI Pivot Toolbox. It operates in addition to your rights under the Australian Consumer Law (ACL).
            </p>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Your Consumer Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Under the ACL, you are entitled to a refund, replacement, or compensation where a service:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Has a major failure, or</li>
                <li>Does not meet acceptable standards and the issue cannot be remedied within a reasonable time</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Nothing in this policy limits or excludes those rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. When Refunds May Be Provided</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">Refunds may be provided where:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>The Service was not delivered at all</li>
                <li>A major technical failure prevents access to the Service and cannot be resolved within a reasonable timeframe</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Refund requests must be made within 30 days of purchase unless otherwise required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. When Refunds Are Not Provided</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">Refunds are generally not provided for:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Change of mind</li>
                <li>Partial use of Services</li>
                <li>Dissatisfaction with AI-generated outputs where the Service is functioning as described</li>
                <li>Outcomes or results not expressly guaranteed</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Requesting a Refund</h2>
              <p className="text-muted-foreground leading-relaxed">
                To request a refund, email: nick@aipivot.com.au
              </p>
              <p className="text-muted-foreground leading-relaxed mt-2">
                Include your purchase details and a description of the issue.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Approved Refunds</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">If approved:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Refunds will be issued to the original payment method</li>
                <li>Processing times depend on your payment provider</li>
              </ul>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
