import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const GHL_WIDGET_ID = "696f4d1d572f8583c5616640";
const GHL_LOADER = "https://widgets.leadconnectorhq.com/loader.js";
const GHL_RESOURCES = "https://widgets.leadconnectorhq.com/chat-widget/loader.js";

export function ChatButton() {
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  function handleClick() {
    if (loading) return;
    setLoading(true);

    const script = document.createElement("script");
    script.src = GHL_LOADER;
    script.setAttribute("data-resources-url", GHL_RESOURCES);
    script.setAttribute("data-widget-id", GHL_WIDGET_ID);
    script.onload = () => {
      // Give the widget a moment to render its own button, then hide ours
      setTimeout(() => setVisible(false), 800);
    };
    document.body.appendChild(script);
  }

  if (!visible) return null;

  return (
    <button
      onClick={handleClick}
      data-testid="chat-button"
      aria-label="Open chat"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-primary text-[#141413] rounded-full shadow-lg shadow-primary/30 px-4 py-3 font-semibold text-sm transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/40 active:scale-95"
    >
      {loading ? (
        <span className="w-5 h-5 rounded-full border-2 border-[#141413]/40 border-t-[#141413] animate-spin" />
      ) : (
        <MessageCircle className="w-5 h-5 flex-shrink-0" />
      )}
      <span>{loading ? "Connecting…" : "Chat with us"}</span>
    </button>
  );
}
