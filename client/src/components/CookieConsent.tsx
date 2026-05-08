import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setShowBanner(true), 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-hero-fade-in">
      <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl shadow-2xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Cookie className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-foreground font-semibold mb-1">We value your privacy</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We use cookies to enhance your browsing experience and analyse our traffic. 
                By clicking "Accept All", you consent to our use of cookies. 
                You can manage your preferences at any time.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleDecline}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-border text-foreground font-medium hover:bg-muted transition-colors text-sm"
              data-testid="button-decline-cookies"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors text-sm"
              data-testid="button-accept-cookies"
            >
              Accept All
            </button>
          </div>
          
          <button
            onClick={handleDecline}
            className="absolute top-3 right-3 sm:static p-1.5 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close cookie banner"
            data-testid="button-close-cookies"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
