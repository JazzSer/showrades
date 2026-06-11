type LogoSize = "sm" | "md" | "lg";

interface LogoProps {
  size?: LogoSize;
  dark?: boolean;
  className?: string;
}

const iconSizes: Record<LogoSize, { icon: number; text: string }> = {
  sm: { icon: 24,  text: "text-xl"  },
  md: { icon: 36,  text: "text-3xl" },
  lg: { icon: 52,  text: "text-5xl" },
};

function MimoIcon({ size, dark }: { size: number; dark?: boolean }) {
  const h = Math.round(size * 1.19);
  const pupil = dark ? "white" : "#1a1a2e";
  return (
    <svg width={size} height={h} viewBox="0 0 90 110" fill="none" aria-hidden="true">
      <path d="M45 7C22 7 11 24 9 48S17 99 45 100 79 71 81 48 68 7 45 7Z" fill="#4ecfa0" />
      <ellipse cx="25" cy="11" rx="7" ry="12" fill="#4ecfa0" transform="rotate(-18 25 11)" />
      <ellipse cx="65" cy="11" rx="7" ry="12" fill="#4ecfa0" transform="rotate(18 65 11)" />
      <circle cx="31" cy="43" r="12" fill="white" />
      <circle cx="33" cy="41" r="7" fill={pupil} />
      <circle cx="36" cy="38" r="2.5" fill="white" />
      <circle cx="59" cy="43" r="12" fill="white" />
      <circle cx="61" cy="41" r="7" fill={pupil} />
      <circle cx="64" cy="38" r="2.5" fill="white" />
      <path d="M33 62Q45 74 57 62" stroke={pupil} strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ size = "md", dark = false, className }: LogoProps) {
  const { icon, text } = iconSizes[size];
  const textColor = dark ? "text-white" : "text-[var(--txt)]";

  return (
    <div className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <MimoIcon size={icon} dark={dark} />
      <span
        className={`font-display font-bold leading-none tracking-tight ${text} ${textColor}`}
      >
        Showrades
      </span>
    </div>
  );
}
