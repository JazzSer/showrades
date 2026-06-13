"use client";

export interface TimerProps {
  /** Total seconds (e.g. 60) */
  total: number;
  /** Remaining seconds */
  current: number;
  /** Diameter in px (default 130) */
  size?: number;
  /**
   * "default" — neutral track, mint/coral progress (used on light backgrounds).
   * "onColor" — translucent white track + solid white progress, for use on
   * saturated game-screen backgrounds (sun/sky).
   */
  variant?: "default" | "onColor";
}

const STROKE = 8;
const URGENT_THRESHOLD = 10;

export function Timer({ total, current, size = 130, variant = "default" }: TimerProps) {
  const radius = (size - STROKE * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(1, current / total));
  const offset = circumference * (1 - progress);
  const urgent = current <= URGENT_THRESHOLD;
  const center = size / 2;

  const onColor = variant === "onColor";
  const trackColor = onColor ? "oklch(100% 0 0 / .4)" : "var(--border)";
  const progressColor = onColor ? "#fff" : urgent ? "var(--coral)" : "var(--mint)";
  const textColor = onColor ? "var(--txt)" : urgent ? "var(--coral)" : "var(--txt)";

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0"
        aria-hidden="true"
      >
        {/* Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={STROKE}
        />
        {/* Progress ring */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={progressColor}
          strokeWidth={STROKE}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transformOrigin: `${center}px ${center}px`,
            transform: "rotate(-90deg)",
            transition: "stroke-dashoffset 1s linear, stroke 300ms ease",
          }}
        />
      </svg>
      <span
        className="relative z-10 font-display text-[35px] font-semibold leading-none"
        style={{ color: textColor }}
      >
        {current}
      </span>
    </div>
  );
}
