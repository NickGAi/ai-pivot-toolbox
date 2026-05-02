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
      {/* Mark: hexagon-style icon with toolbox grid */}
      <svg
        width={s.mark}
        height={s.mark}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="logo-grad-text" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.85)" />
          </linearGradient>
        </defs>
        {/* Rounded square bg */}
        <rect width="40" height="40" rx="10" fill="url(#logo-grad)" />
        {/* Toolbox handle */}
        <rect x="13" y="9" width="14" height="4" rx="2" fill="white" opacity="0.9" />
        {/* Toolbox body */}
        <rect x="8" y="14" width="24" height="17" rx="3" fill="white" opacity="0.15" />
        <rect x="8" y="14" width="24" height="17" rx="3" stroke="white" strokeWidth="1.5" opacity="0.9" />
        {/* Latch / centre divider */}
        <rect x="8" y="21" width="24" height="1.5" fill="white" opacity="0.6" />
        {/* AI text */}
        <text
          x="20"
          y="20.5"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight="700"
          fontSize="9"
          letterSpacing="0.5"
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
