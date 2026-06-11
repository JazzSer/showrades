"use client";

export interface TimerProps {
  /** Total seconds (e.g. 60) */
  total: number;
  /** Remaining seconds */
  current: number;
  /** Diameter in px (default 130) */
  size?: number;
}

const STROKE = 7;
const URGENT_THRESHOLD = 10;

export function Timer({ total, current, size = 130 }: TimerProps) {
  const radius = (size - STROKE * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(1, current / total));
  const offset = circumference * (1 - progress);
  const urgent = current <= URGENT_THRESHOLD;
  const center = size / 2;

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
          stroke="var(--border)"
          strokeWidth={STROKE}
        />
        {/* Progress ring */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={urgent ? "var(--coral)" : "var(--mint)"}
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
        className="relative z-10 font-display text-[42px] font-semibold leading-none"
        style={{ color: urgent ? "var(--coral)" : "var(--txt)" }}
      >
        {current}
      </span>
    </div>
  );
}
