import Link from "next/link";
import { MimoMascot } from "@/components/brand/MimoMascot";

const STEPS: { bg: string; emoji: string; title: string; desc: string }[] = [
  {
    bg: "bg-sun-lt",
    emoji: "🎭",
    title: "Act it out",
    desc: "One player holds the phone and acts out the card — no talking, no sounds, and no pointing at real objects in the room.",
  },
  {
    bg: "bg-sky-lt",
    emoji: "💬",
    title: "Team guesses",
    desc: "Teammates shout out as many guesses as they can before the timer hits zero. Everyone else stays quiet.",
  },
  {
    bg: "bg-mint-lt",
    emoji: "✓",
    title: "Got It or Pass",
    desc: "Guessed right? Tap Got It for a point and jump to the next card. Stuck? Tap Pass to skip — no penalty.",
  },
  {
    bg: "bg-plum-lt",
    emoji: "🤝",
    title: "Pass the phone",
    desc: "When the timer ends, hand the phone to the next team and keep the laughs going. Scores are tallied for you.",
  },
];

export default function HowToPlayPage() {
  return (
    <div
      className="min-h-dvh flex flex-col"
      style={{
        background: "var(--sky-lt)",
        backgroundImage:
          "radial-gradient(circle, oklch(70% .13 232 / .18) 1.6px, transparent 1.6px)",
        backgroundSize: "26px 26px",
      }}
    >
      <main className="flex-1 w-full max-w-md mx-auto flex flex-col px-5 py-4">
        <div className="flex items-center justify-between mb-2">
          <Link
            href="/"
            className="w-[42px] h-[42px] rounded-full bg-surface border border-[var(--border)] flex items-center justify-center text-txt2 [box-shadow:var(--sh1)]"
          >
            ←
          </Link>
          <h1 className="font-display text-[22px] font-semibold">How to Play</h1>
          <div className="w-[42px]" />
        </div>

        {/* Hero */}
        <div className="flex items-center gap-3.5 bg-surface border border-[var(--border)] rounded-[22px] px-4 py-3.5 [box-shadow:var(--sh1)] mt-1.5">
          <div className="w-[62px] h-[62px] shrink-0 flex items-center justify-center">
            <MimoMascot state="happy" size={50} className="animate-bounce-spring" />
          </div>
          <div>
            <p className="font-display text-[19px] font-semibold leading-tight">
              Charades, the easy way
            </p>
            <p className="text-[12.5px] font-bold text-txt2 leading-snug mt-1">
              Act it out, no talking. Your team shouts guesses before time runs out. Here&apos;s
              the whole game in four moves.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-2.5 mt-2.5">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="flex gap-3.5 items-start bg-surface border border-[var(--border)] rounded-[22px] p-3.5 [box-shadow:var(--sh1)]"
            >
              <div
                className={`w-[34px] h-[34px] rounded-full flex items-center justify-center font-display font-bold text-[16px] text-txt shrink-0 ${step.bg}`}
              >
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 font-display text-[17px] font-semibold leading-tight">
                  <span className="text-[18px]">{step.emoji}</span>
                  {step.title}
                </div>
                <p className="text-[13px] font-bold text-txt2 leading-snug mt-1">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[11px] font-extrabold tracking-[.09em] uppercase text-txt3 mt-4 mb-2 flex items-center gap-1.5">
          Two ways to play
        </p>
        <div className="grid grid-cols-2 gap-[11px]">
          <div className="bg-sky-lt border-2 border-sky rounded-[22px] px-3 py-4 text-center [box-shadow:var(--sh1)]">
            <span className="block text-[30px] mb-1.5">🖼️</span>
            <span className="block font-display text-[16px] font-semibold">Picture</span>
            <span className="block text-[10.5px] font-extrabold uppercase tracking-[.05em] text-txt3 mt-0.5">
              Under 7
            </span>
            <p className="text-[12px] font-bold text-txt2 leading-snug mt-1.5">
              Big illustrated prompts. No reading needed, so little ones can lead the room.
            </p>
          </div>
          <div className="bg-sun-lt border-2 border-sun-dk rounded-[22px] px-3 py-4 text-center [box-shadow:var(--sh1)]">
            <span className="block text-[30px] mb-1.5">🔤</span>
            <span className="block font-display text-[16px] font-semibold">Word</span>
            <span className="block text-[10.5px] font-extrabold uppercase tracking-[.05em] text-txt3 mt-0.5">
              8 &amp; up
            </span>
            <p className="text-[12px] font-bold text-txt2 leading-snug mt-1.5">
              Large, easy-to-read word prompts for older kids, teens and grown-ups.
            </p>
          </div>
        </div>

        <div className="flex gap-2.5 items-start bg-surface border border-[var(--border)] rounded-[14px] px-3.5 py-3 mt-3 text-[13px] font-bold text-txt2 leading-snug">
          <span className="shrink-0 text-sun-dk mt-0.5">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span>
            Both modes share the same teams, scores and timer — a 5-year-old and a grandparent
            can play in the very same game.
          </span>
        </div>

        <div className="flex gap-2.5 items-start bg-surface border border-[var(--border)] rounded-[14px] px-3.5 py-3 mt-2.5 text-[13px] font-bold text-txt2 leading-snug">
          <span className="shrink-0 text-sun-dk mt-0.5">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M8 21h8M12 17v4M6 4h12v5a6 6 0 0 1-12 0Z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span>
            First team to the <b className="text-txt">points target</b> wins — or pick{" "}
            <b className="text-txt">Endless</b> in setup and the highest score takes the crown.
          </span>
        </div>
      </main>

      <div className="sticky bottom-0 w-full max-w-md mx-auto px-5 pt-3 pb-[max(15px,env(safe-area-inset-bottom))] bg-gradient-to-t from-[var(--sky-lt)] via-[var(--sky-lt)] to-transparent">
        <Link
          href="/setup"
          className={
            "inline-flex items-center justify-center gap-2 font-body font-bold rounded-full " +
            "leading-none whitespace-nowrap cursor-pointer border-none w-full " +
            "transition-[transform,box-shadow] duration-200 " +
            "active:translate-y-[3px] active:!shadow-none " +
            "text-[22px] px-10 py-5 bg-sun text-txt " +
            "[box-shadow:0_5px_0_var(--sun-dk)] " +
            "hover:-translate-y-0.5 hover:[box-shadow:0_7px_0_var(--sun-dk)]"
          }
        >
          Start a Game →
        </Link>
      </div>
    </div>
  );
}
