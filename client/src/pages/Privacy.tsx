import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main role="main" aria-label="Privacy Policy" className="pt-24 pb-16">
        <article className="container-main max-w-4xl">
          <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">
            <strong>AI Pivot Toolbox – aipivot.com.au</strong><br />
            Last updated: January 2026
          </p>

          <div className="prose prose-invert max-w-none space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              AI Pivot Toolbox respects your privacy and is committed to protecting your personal information in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This Privacy Policy explains how we collect, use, store, and disclose personal information when you use aipivot.com.au or our Services.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">We may collect personal information including:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Name and contact details</li>
                <li>Account and billing information</li>
                <li>Communications with us</li>
                <li>Website usage data and analytics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">We use personal information to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Provide and improve our Services</li>
                <li>Manage accounts and process payments</li>
                <li>Communicate with you</li>
                <li>Comply with legal and regulatory obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Cookies and Analytics</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar technologies to improve website performance and user experience. You can manage cookies through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Disclosure of Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">We may disclose personal information to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Third-party service providers (hosting, analytics, payments)</li>
                <li>Legal or regulatory authorities where required by law</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We do not sell your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We take reasonable steps to protect personal information from misuse, loss, unauthorised access, modification, or disclosure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Access and Correction</h2>
              <p className="text-muted-foreground leading-relaxed">
                You may request access to or correction of your personal information in accordance with the Privacy Act by contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Overseas Disclosure</h2>
              <p className="text-muted-foreground leading-relaxed">
                Some service providers may store or process information outside Australia. Where this occurs, we take reasonable steps to ensure appropriate data protection measures are in place.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                For privacy enquiries or complaints, contact us at:<br />
                Email: nick@aipivot.com.au
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
