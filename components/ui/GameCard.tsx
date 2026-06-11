type CardColor = "sun" | "mint" | "coral" | "plum" | "sky";

export interface GameCardProps {
  category?: string;
  word: string;
  hint?: string;
  color?: CardColor;
  className?: string;
}

const bgMap: Record<CardColor, string> = {
  sun:   "bg-sun   [box-shadow:var(--sh3),0_8px_0_var(--sun-dk)]",
  mint:  "bg-mint  [box-shadow:var(--sh3),0_8px_0_var(--mint-dk)]",
  coral: "bg-coral [box-shadow:var(--sh3),0_8px_0_var(--coral-dk)]",
  plum:  "bg-plum  [box-shadow:var(--sh3),0_8px_0_var(--plum-dk)]",
  sky:   "bg-sky   [box-shadow:var(--sh3),0_8px_0_var(--sky-dk)]",
};

const wordColorMap: Record<CardColor, string> = {
  sun:   "text-txt",
  mint:  "text-white",
  coral: "text-white",
  plum:  "text-white",
  sky:   "text-white",
};

const hintColorMap: Record<CardColor, string> = {
  sun:   "text-txt2",
  mint:  "text-white/65",
  coral: "text-white/65",
  plum:  "text-white/65",
  sky:   "text-white/65",
};

export function GameCard({ category, word, hint, color = "sun", className = "" }: GameCardProps) {
  return (
    <div
      className={
        `rounded-[32px] px-10 py-12 text-center min-h-[220px] ` +
        `flex flex-col items-center justify-center ` +
        `${bgMap[color]} ${className}`
      }
    >
      {category && (
        <span
          className={
            "text-[11px] font-bold tracking-[.1em] uppercase " +
            "bg-white/[.28] px-3 py-[3px] rounded-full mb-6 inline-block " +
            `${color === "sun" ? "text-txt2" : "text-inherit"}`
          }
        >
          {category}
        </span>
      )}
      <div
        className={`font-display text-[52px] font-bold leading-[1.05] ${wordColorMap[color]}`}
      >
        {word}
      </div>
      {hint && (
        <p className={`text-[13px] mt-4 ${hintColorMap[color]}`}>{hint}</p>
      )}
    </div>
  );
}
