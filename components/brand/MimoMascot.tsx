type MimoState = "happy" | "excited" | "thinking" | "sad";

interface MimoMascotProps {
  state?: MimoState;
  size?: number;
  className?: string;
}

const configs: Record<
  MimoState,
  { body: string; belly: string; ears: string; feet: string; shadow: string }
> = {
  happy: {
    body:   "#4ecfa0",
    belly:  "#c2f0e0",
    ears:   "#4ecfa0",
    feet:   "#3ab887",
    shadow: "#3ab887",
  },
  excited: {
    body:   "#f7c948",
    belly:  "#fef5cc",
    ears:   "#f7c948",
    feet:   "#c8960a",
    shadow: "#c8960a",
  },
  thinking: {
    body:   "#5eb0e5",
    belly:  "#bde5fc",
    ears:   "#5eb0e5",
    feet:   "#2d7dbd",
    shadow: "#2d7dbd",
  },
  sad: {
    body:   "#e8765b",
    belly:  "#fcd4c8",
    ears:   "#e8765b",
    feet:   "#b83a28",
    shadow: "#b83a28",
  },
};

export function MimoMascot({ state = "happy", size = 100, className }: MimoMascotProps) {
  const c = configs[state];
  const h = Math.round(size * 1.2);

  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 90 110"
      fill="none"
      className={className}
      aria-label={`Mimo the monster — ${state}`}
    >
      {/* Shadow */}
      <ellipse cx="45" cy="108" rx="26" ry="5" fill={c.shadow} opacity=".2" />

      {/* Body */}
      <path d="M45 7C22 7 11 24 9 48S17 99 45 100 79 71 81 48 68 7 45 7Z" fill={c.body} />

      {/* Belly highlight */}
      <ellipse cx="45" cy="64" rx="21" ry="26" fill={c.belly} opacity=".5" />

      {/* Ears */}
      <ellipse cx="25" cy="11" rx="7" ry="12" fill={c.ears} transform="rotate(-18 25 11)" />
      <ellipse cx="65" cy="11" rx="7" ry="12" fill={c.ears} transform="rotate(18 65 11)" />

      {/* Arms */}
      <path d="M11 52Q3 37 11 28Q19 25 23 33Q19 42 14 51Z" fill={c.body} />
      <path d="M79 52Q87 37 79 28Q71 25 67 33Q71 42 76 51Z" fill={c.body} />

      {/* Eyes + expressions per state */}
      {state === "happy" && (
        <>
          <circle cx="31" cy="43" r="12" fill="white" />
          <circle cx="33" cy="41" r="7" fill="#1a1a2e" />
          <circle cx="36" cy="38" r="2.5" fill="white" />
          <circle cx="59" cy="43" r="12" fill="white" />
          <circle cx="61" cy="41" r="7" fill="#1a1a2e" />
          <circle cx="64" cy="38" r="2.5" fill="white" />
          <path d="M33 62Q45 74 57 62" stroke="#1a1a2e" strokeWidth="3" fill="none" strokeLinecap="round" />
          <rect x="39" y="62" width="6" height="6" rx="1.5" fill="white" />
          <rect x="45" y="62" width="6" height="6" rx="1.5" fill="white" />
        </>
      )}

      {state === "excited" && (
        <>
          <circle cx="31" cy="41" r="13" fill="white" />
          <circle cx="31" cy="41" r="8" fill="#1a1a2e" />
          <circle cx="35" cy="37" r="3" fill="white" />
          <circle cx="59" cy="41" r="13" fill="white" />
          <circle cx="59" cy="41" r="8" fill="#1a1a2e" />
          <circle cx="63" cy="37" r="3" fill="white" />
          <path d="M30 62Q45 80 60 62" fill="#1a1a2e" />
          <ellipse cx="45" cy="72" rx="9" ry="5" fill="#e05c6b" />
        </>
      )}

      {state === "thinking" && (
        <>
          <circle cx="31" cy="43" r="12" fill="white" />
          <circle cx="33" cy="41" r="7" fill="#1a1a2e" />
          <circle cx="36" cy="38" r="2.5" fill="white" />
          {/* Right eye — squint */}
          <circle cx="59" cy="43" r="12" fill="white" />
          <path d="M51 43Q59 37 67 43" stroke="#1a1a2e" strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* Mouth — wavy */}
          <path d="M36 67Q41 62 45 67Q49 72 54 67" stroke="#1a1a2e" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Thought bubbles */}
          <circle cx="68" cy="26" r="4" fill="white" opacity=".85" />
          <circle cx="75" cy="18" r="6" fill="white" opacity=".75" />
          <circle cx="81" cy="9" r="8" fill="white" opacity=".7" />
          <text x="81" y="13" textAnchor="middle" fontSize="9" fill="#2d7dbd" fontFamily="sans-serif" fontWeight="800">?</text>
        </>
      )}

      {state === "sad" && (
        <>
          <ellipse cx="25" cy="17" rx="7" ry="12" fill={c.ears} transform="rotate(-35 25 17)" />
          <ellipse cx="65" cy="17" rx="7" ry="12" fill={c.ears} transform="rotate(35 65 17)" />
          <circle cx="31" cy="44" r="12" fill="white" />
          <circle cx="31" cy="47" r="7" fill="#1a1a2e" />
          <circle cx="34" cy="44" r="2.5" fill="white" />
          <path d="M21 36Q27 41 35 35" stroke="#1a1a2e" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <circle cx="59" cy="44" r="12" fill="white" />
          <circle cx="59" cy="47" r="7" fill="#1a1a2e" />
          <circle cx="62" cy="44" r="2.5" fill="white" />
          <path d="M53 35Q61 41 67 36" stroke="#1a1a2e" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M35 74Q45 65 55 74" stroke="#1a1a2e" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Tear */}
          <path d="M26 56Q24 63 26 67Q30 69 30 63Z" fill="#5eb0e5" opacity=".85" />
        </>
      )}

      {/* Feet */}
      {state !== "sad" && (
        <>
          <ellipse cx="33" cy="98" rx="13" ry="7" fill={c.feet} />
          <ellipse cx="57" cy="98" rx="13" ry="7" fill={c.feet} />
        </>
      )}
      {state === "sad" && (
        <>
          <path d="M13 68Q5 56 11 44Q19 38 24 46Q20 56 16 67Z" fill={c.body} />
          <path d="M77 68Q85 56 79 44Q71 38 66 46Q70 56 74 67Z" fill={c.body} />
          <ellipse cx="33" cy="98" rx="13" ry="7" fill={c.feet} />
          <ellipse cx="57" cy="98" rx="13" ry="7" fill={c.feet} />
        </>
      )}
    </svg>
  );
}
