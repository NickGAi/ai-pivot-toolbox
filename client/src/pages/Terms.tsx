import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main role="main" aria-label="Terms of Service" className="pt-24 pb-16">
        <article className="container-main max-w-4xl">
          <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">
            <strong>AIPivot – aipivot.com.au</strong><br />
            Last updated: January 2026
          </p>

          <div className="prose prose-invert max-w-none space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              Welcome to AIPivot. These Terms of Service ("Terms") govern your access to and use of our website, products, and services provided through aipivot.com.au ("Website", "Services"). By accessing or using our Website or Services, you agree to be bound by these Terms.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Eligibility</h2>
              <p className="text-muted-foreground leading-relaxed">
                You must be at least 18 years old and legally capable of entering into a binding contract to use our Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Use of Services</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You agree to use our Services only for lawful purposes and in a way that does not infringe the rights of others or restrict their use of the Services.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">You must not:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Misuse or interfere with the Website or Services</li>
                <li>Attempt unauthorised access to systems or data</li>
                <li>Use the Services for unlawful, harmful, or deceptive activities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Services Provided</h2>
              <p className="text-muted-foreground leading-relaxed">
                AIPivot provides AI-powered tools, digital services, software access, and related offerings as described on the Website. We may update, modify, suspend, or discontinue any part of the Services at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Fees and Payments</h2>
              <p className="text-muted-foreground leading-relaxed">
                All prices are listed in Australian Dollars (AUD) unless stated otherwise and may exclude GST. You agree to pay all applicable fees at the time of purchase.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content, software, branding, designs, text, graphics, and materials on the Website are owned by or licensed to AIPivot. You may not copy, reproduce, distribute, or modify any content without prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Australian Consumer Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nothing in these Terms excludes, restricts, or modifies any consumer guarantees, rights, or remedies you may have under the Australian Consumer Law (ACL) or any other applicable law that cannot be excluded.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To the maximum extent permitted by law, AIPivot is not liable for any indirect, incidental, or consequential loss arising from your use of the Website or Services.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Where liability cannot be excluded under the ACL, our liability is limited (at our option) to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Re-supplying the Services, or</li>
                <li>Paying the cost of having the Services supplied again.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may suspend or terminate your access to the Services if you breach these Terms or where required for legal, security, or operational reasons.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms are governed by the laws of Queensland, Australia. Any disputes will be subject to the exclusive jurisdiction of the courts of Queensland.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
