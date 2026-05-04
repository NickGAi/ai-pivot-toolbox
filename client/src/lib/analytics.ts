declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number>
) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

export const GA_EVENTS = {
  CONTACT_FORM: "contact",
  STRATEGY_CALL: "generate_lead",
  QUOTE_REQUEST: "quote_request",
} as const;
