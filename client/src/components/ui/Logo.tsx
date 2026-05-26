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
      <img
        src="/logo-icon.png"
        alt="AI Pivot Toolbox icon"
        width={s.mark}
        height={s.mark}
        aria-hidden="true"
        style={{ flexShrink: 0, borderRadius: "22%", display: "block" }}
      />

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
