import { useEffect } from "react";

export default function Pipeline() {
  useEffect(() => {
    const prev = {
      title: document.title,
      desc: document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "",
      keywords: document.querySelector('meta[name="keywords"]')?.getAttribute("content") ?? "",
    };

    document.title = "AI Pivot | AI Automation for Real Estate Agents";

    let descEl = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!descEl) {
      descEl = document.createElement("meta");
      descEl.name = "description";
      document.head.appendChild(descEl);
    }
    descEl.content = "AI Pivot automates lead follow-up for Australian real estate agents. Stop losing portal leads — your 24/7 AI-powered digital employee.";

    let kwEl = document.querySelector('meta[name="keywords"]') as HTMLMetaElement | null;
    if (!kwEl) {
      kwEl = document.createElement("meta");
      kwEl.name = "keywords";
      document.head.appendChild(kwEl);
    }
    kwEl.content = "AI automation, real estate AI, lead follow-up, AI Pivot, real estate agents Australia, CRM automation, digital employee, lead nurturing, property AI, portal leads, aipivot";

    return () => {
      document.title = prev.title;
      if (descEl) descEl.content = prev.desc;
      if (kwEl) kwEl.content = prev.keywords;
    };
  }, []);

  return (
    <iframe
      src="https://aipivot-pipeline.manus.space"
      title="AI Pivot | AI Automation for Real Estate Agents"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        border: "none",
        zIndex: 9999,
      }}
      allowFullScreen
    />
  );
}
