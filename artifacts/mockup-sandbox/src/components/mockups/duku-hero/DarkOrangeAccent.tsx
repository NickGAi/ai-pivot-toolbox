export function DarkOrangeAccent() {
  return (
    <div
      style={{
        minHeight: "800px",
        background: "linear-gradient(135deg, #0d1117 0%, #0f1a2e 50%, #0d1117 100%)",
        fontFamily: "'Inter', 'Space Grotesk', sans-serif",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Background glow blobs */}
      <div style={{
        position: "absolute", top: "15%", left: "5%",
        width: 500, height: 500,
        background: "radial-gradient(circle, rgba(232,101,26,0.18) 0%, transparent 70%)",
        borderRadius: "50%", filter: "blur(40px)",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "30%",
        width: 300, height: 300,
        background: "radial-gradient(circle, rgba(109,197,62,0.12) 0%, transparent 70%)",
        borderRadius: "50%", filter: "blur(40px)",
      }} />

      {/* Navbar */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 48px",
        borderBottom: "1px solid rgba(232,101,26,0.15)",
        position: "relative", zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, background: "#E8651A", borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, fontWeight: 900, color: "#fff",
          }}>A</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>AI Pivot</div>
            <div style={{ fontSize: 9, fontWeight: 600, color: "#E8651A", letterSpacing: "0.08em", textTransform: "uppercase" }}>Toolbox</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Services", "About", "Toolbox"].map(item => (
            <span key={item} style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", fontWeight: 500, cursor: "pointer" }}>{item}</span>
          ))}
          <button style={{
            background: "#E8651A", color: "#fff", border: "none",
            borderRadius: 100, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer",
          }}>Book Free Call</button>
        </div>
      </nav>

      {/* Hero Content */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center",
        padding: "0 48px", position: "relative", zIndex: 10,
        gap: 0,
      }}>
        {/* Left: Text */}
        <div style={{ flex: "0 0 55%", paddingRight: 40 }}>
          {/* Pill badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(232,101,26,0.12)", border: "1px solid rgba(232,101,26,0.3)",
            borderRadius: 100, padding: "6px 14px", marginBottom: 24,
          }}>
            <div style={{ width: 8, height: 8, background: "#E8651A", borderRadius: "50%" }} />
            <span style={{ fontSize: 12, color: "#E8651A", fontWeight: 600 }}>AI Automation & SEO Agency, Australia Wide</span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 48, fontWeight: 900, lineHeight: 1.0,
            letterSpacing: "-0.03em", textTransform: "uppercase",
            color: "#fff", margin: "0 0 20px",
          }}>
            AI Business<br />
            Automation —{" "}
            <span style={{
              background: "linear-gradient(135deg, #E8651A 0%, #f5a623 50%, #6DC53E 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Tell Us What<br />You Want,
            </span>{" "}
            We'll Get It Done.
          </h1>

          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: 12, maxWidth: 480 }}>
            Stop wasting time thinking about what you can do with AI. Get us to give you a clear path to implement and get started today.
          </p>

          <p style={{ fontSize: 14, color: "#6DC53E", fontWeight: 700, marginBottom: 28 }}>
            ★★★★★ Guaranteed results for Australian businesses in 60 days or less
          </p>

          {/* CTA bar */}
          <div style={{
            display: "flex", alignItems: "center", gap: 0,
            background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 100, padding: "6px 6px 6px 20px", maxWidth: 480,
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
        </div>

        {/* Right: Duku character */}
        <div style={{
          flex: "0 0 45%",
          display: "flex", alignItems: "flex-end", justifyContent: "center",
          position: "relative",
        }}>
          {/* Glow ring behind Duku */}
          <div style={{
            position: "absolute", bottom: -60, left: "50%", transform: "translateX(-50%)",
            width: 400, height: 400,
            background: "radial-gradient(ellipse, rgba(232,101,26,0.25) 0%, transparent 70%)",
            borderRadius: "50%",
          }} />
          <img
            src="/duku/duku-solo.png"
            alt="Duku AI character"
            style={{
              width: "100%", maxWidth: 440,
              objectFit: "contain",
              filter: "drop-shadow(0 20px 60px rgba(232,101,26,0.4))",
              position: "relative", zIndex: 1,
            }}
          />
        </div>
      </div>

      {/* Industry ticker */}
      <div style={{
        borderTop: "1px solid rgba(232,101,26,0.15)",
        padding: "16px 48px",
        display: "flex", gap: 8, alignItems: "center",
        position: "relative", zIndex: 10,
      }}>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", flexShrink: 0, marginRight: 12 }}>Trusted Across</span>
        {["Real Estate", "Healthcare", "Legal", "Finance", "Retail", "Construction", "Hospitality", "Accounting"].map(ind => (
          <span key={ind} style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 700, padding: "2px 0", flexShrink: 0 }}>
            {ind}
          </span>
        ))}
        <span style={{ fontSize: 12, color: "rgba(232,101,26,0.5)", marginLeft: "auto", flexShrink: 0 }}>→</span>
      </div>
    </div>
  );
}
