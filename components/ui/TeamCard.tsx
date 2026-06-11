type TeamColor = "sun" | "sky" | "coral" | "mint" | "plum";

export interface TeamCardProps {
  name: string;
  emoji: string;
  score: number;
  status?: string;
  active?: boolean;
  color?: TeamColor;
  className?: string;
}

const avatarBg: Record<TeamColor, string> = {
  sun:   "bg-sun-lt",
  sky:   "bg-sky-lt",
  coral: "bg-coral-lt",
  mint:  "bg-mint-lt",
  plum:  "bg-plum-lt",
};

export function TeamCard({
  name,
  emoji,
  score,
  status,
  active = false,
  color = "sun",
  className = "",
}: TeamCardProps) {
  return (
    <div
      className={
        "flex items-center gap-5 bg-surface rounded-[32px] px-8 py-5 " +
        "transition-[transform,box-shadow] duration-200 " +
        `[box-shadow:var(--sh1)] border-2 ` +
        (active
          ? "border-[var(--sun)] [box-shadow:var(--sh2),0_0_0_3px_var(--sun-lt)] scale-[1.01]"
          : "border-[var(--border)]") +
        ` ${className}`
      }
    >
      {/* Avatar */}
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center text-[22px] shrink-0 ${avatarBg[color]}`}
      >
        {emoji}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="font-display text-[20px] font-semibold text-txt truncate">{name}</div>
        {status && <div className="text-[11px] text-txt3 mt-0.5">{status}</div>}
      </div>

      {/* Score */}
      <div className="font-display text-[40px] font-bold text-txt ml-auto leading-none">
        {score} <span className="text-[13px] font-body text-txt3">pts</span>
      </div>
    </div>
  );
}
