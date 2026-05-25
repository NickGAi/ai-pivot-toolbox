export function BoldOrange() {
  return (
    <div
      style={{
        minHeight: "800px",
        background: "linear-gradient(145deg, #E8651A 0%, #f07630 40%, #d4571a 100%)",
        fontFamily: "'Inter', 'Space Grotesk', sans-serif",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Subtle bokeh circles */}
      <div style={{ position: "absolute", top: "10%", left: "15%", width: 200, height: 200, background: "rgba(255,255,255,0.06)", borderRadius: "50%", filter: "blur(30px)" }} />
      <div style={{ position: "absolute", top: "40%", left: "35%", width: 120, height: 120, background: "rgba(255,255,255,0.08)", borderRadius: "50%", filter: "blur(20px)" }} />
      <div style={{ position: "absolute", top: "20%", left: "55%", width: 80, height: 80, background: "rgba(255,255,255,0.05)", borderRadius: "50%", filter: "blur(15px)" }} />
      <div style={{ position: "absolute", top: "60%", left: "25%", width: 150, height: 150, background: "rgba(255,255,255,0.05)", borderRadius: "50%", filter: "blur(25px)" }} />

      {/* Navbar */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 48px",
        position: "relative", zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36,
            background: "rgba(0,0,0,0.2)",
            borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, fontWeight: 900, color: "#fff",
            border: "1.5px solid rgba(255,255,255,0.3)",
          }}>A</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>AI Pivot</div>
            <div style={{ fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.7)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Toolbox</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Services", "About", "Toolbox"].map(item => (
            <span key={item} style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", fontWeight: 500, cursor: "pointer" }}>{item}</span>
          ))}
          <button style={{
            background: "#000", color: "#fff", border: "none",
            borderRadius: 100, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer",
          }}>Book Free Call</button>
        </div>
      </nav>

      {/* Hero Content */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center",
        padding: "0 48px 0 56px", position: "relative", zIndex: 10,
        gap: 0,
      }}>
        {/* Left: Text */}
        <div style={{ flex: "0 0 52%", paddingRight: 24 }}>
          {/* Pill badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(0,0,0,0.2)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: 100, padding: "6px 14px", marginBottom: 24,
          }}>
            <div style={{ width: 8, height: 8, background: "#6DC53E", borderRadius: "50%" }} />
            <span style={{ fontSize: 12, color: "#fff", fontWeight: 600 }}>AI Automation & SEO Agency, Australia Wide</span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 50, fontWeight: 900, lineHeight: 1.0,
            letterSpacing: "-0.03em", textTransform: "uppercase",
            color: "#fff", margin: "0 0 20px",
            textShadow: "0 2px 20px rgba(0,0,0,0.2)",
          }}>
            AI Business<br />
            Automation —{" "}
            <span style={{
              background: "linear-gradient(135deg, #fff 0%, #d4f3b4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Tell Us What<br />You Want,
            </span>{" "}
            <span style={{ color: "#fff" }}>We'll Get It Done.</span>
          </h1>

          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, marginBottom: 12, maxWidth: 460 }}>
            Stop wasting time thinking about what you can do with AI. Get us to give you a clear path to implement and get started today.
          </p>

          <p style={{ fontSize: 14, color: "#fff", fontWeight: 700, marginBottom: 28, textShadow: "0 1px 8px rgba(0,0,0,0.2)" }}>
            ★★★★★ Guaranteed results for Australian businesses in 60 days or less
          </p>

          {/* CTA bar */}
          <div style={{
            display: "flex", alignItems: "center", gap: 0,
            background: "rgba(0,0,0,0.2)",
            border: "1.5px solid rgba(255,255,255,0.3)",
            borderRadius: 100, padding: "6px 6px 6px 20px", maxWidth: 480,
            backdropFilter: "blur(10px)",
          }}>
            <span style={{ fontSize: 18, marginRight: 10 }}>👋</span>
            <input
              readOnly
              placeholder="Enter your email — we'll send you some 'magic'..."
              style={{
                flex: 1, background: "transparent", border: "none", outline: "none",
                color: "#fff", fontSize: 13, minWidth: 0,
              }}
            />
            <button style={{
              background: "#6DC53E", color: "#000", border: "none",
              borderRadius: 100, padding: "10px 20px", fontSize: 13, fontWeight: 800,
              cursor: "pointer", whiteSpace: "nowrap",
            }}>
              Do it →
            </button>
          </div>

          {/* Service pills */}
          <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
            {["Voice AI", "Workflow AI", "AI SEO", "Chatbot AI", "Content AI"].map(s => (
              <div key={s} style={{
                background: "rgba(0,0,0,0.2)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: 100, padding: "5px 12px",
                fontSize: 12, color: "rgba(255,255,255,0.9)", fontWeight: 600,
              }}>{s}</div>
            ))}
          </div>
        </div>

        {/* Right: Duku character */}
        <div style={{
          flex: "0 0 48%",
          display: "flex", alignItems: "flex-end", justifyContent: "center",
          position: "relative",
          paddingBottom: 0,
        }}>
          <img
            src="/duku/duku-orange.png"
            alt="Duku AI character"
            style={{
              width: "105%", maxWidth: 560,
              objectFit: "contain",
              filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.3))",
              position: "relative", zIndex: 1,
              marginRight: -48,
            }}
          />
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        background: "rgba(0,0,0,0.2)",
        padding: "14px 48px",
        display: "flex", gap: 8, alignItems: "center",
        position: "relative", zIndex: 10,
      }}>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.08em", flexShrink: 0, marginRight: 16 }}>Works 24/7 for</span>
        {["Real Estate", "Healthcare", "Legal", "Finance", "Retail", "Construction", "Hospitality", "Accounting"].map(ind => (
          <span key={ind} style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", fontWeight: 700, flexShrink: 0 }}>
            {ind}
          </span>
        ))}
      </div>
    </div>
  );
}
