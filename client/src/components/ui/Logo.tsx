interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Logo({ size = "md", className = "" }: LogoProps) {
  const scales = {
    sm: { mark: 32, font: "text-base", sub: "text-[9px]", gap: "gap-2" },
    md: { mark: 40, font: "text-xl", sub: "text-[10px]", gap: "gap-2.5" },
    lg: { mark: 52, font: "text-2xl", sub: "text-xs", gap: "gap-3" },
  };
  const s = scales[size];

  return (
    <span className={`flex items-center ${s.gap} ${className}`}>
      <svg
        width={s.mark}
        height={s.mark}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        {/* Orange rounded square background */}
        <rect width="40" height="40" rx="9" fill="#FF4500" />

        {/* Briefcase handle — arch above body */}
        <path
          d="M15 14 L15 11 Q15 8 20 8 Q25 8 25 11 L25 14"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Briefcase body */}
        <rect x="7" y="14" width="26" height="18" rx="3" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="2" />

        {/* Horizontal latch divider */}
        <line x1="7" y1="23" x2="33" y2="23" stroke="white" strokeWidth="1.5" strokeOpacity="0.8" />

        {/* Latch clasp */}
        <rect x="17.5" y="21" width="5" height="4" rx="1" fill="white" fillOpacity="0.9" />

        {/* AI text in upper section */}
        <text
          x="20"
          y="20"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight="800"
          fontSize="7.5"
          letterSpacing="1"
        >AI</text>
      </svg>

      {/* Wordmark */}
      <span className="flex flex-col leading-none">
        <span
          className={`font-display font-bold ${s.font} text-foreground tracking-tight leading-none`}
          style={{ letterSpacing: "-0.03em" }}
        >
          AI Pivot
        </span>
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary leading-none mt-0.5 text-center"
        >
          Toolbox
        </span>
      </span>
    </span>
  );
}
