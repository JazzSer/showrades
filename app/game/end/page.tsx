"use client";

import { useRouter } from "next/navigation";
import { useGame } from "@/hooks/useGameState";
import { Button } from "@/components/ui";
import { MimoMascot } from "@/components/brand/MimoMascot";

const AVATAR_BG: Record<string, string> = {
  sun: "bg-sun-lt",
  mint: "bg-mint-lt",
  sky: "bg-sky-lt",
  coral: "bg-coral-lt",
  plum: "bg-plum-lt",
};

export default function GameEndPage() {
  const router = useRouter();
  const { state, resetGame } = useGame();

  const sorted = [...state.teams].sort((a, b) => b.score - a.score);
  const winner = sorted[0];

  return (
    <div
      className="min-h-dvh flex flex-col"
      style={{
        background: "var(--mint-lt)",
        backgroundImage:
          "radial-gradient(circle, oklch(79% .14 158 / .22) 1.6px, transparent 1.6px)",
        backgroundSize: "26px 26px",
      }}
    >
      <main className="flex-1 w-full max-w-md mx-auto flex flex-col items-center text-center px-6 py-8">
        <p className="text-[12px] font-extrabold tracking-[.08em] uppercase text-mint-dk mt-2">
          Game over · {state.round} round{state.round > 1 ? "s" : ""}
        </p>
        <h1 className="font-display text-[clamp(28px,8vw,34px)] font-bold text-txt mt-1 leading-tight">
          {winner.name} wins! 🎉
        </h1>
        <div className="my-1">
          <MimoMascot state="excited" size={120} className="animate-bounce-spring" />
        </div>
        <div className="w-full flex flex-col gap-2.5 mt-1.5">
          {sorted.map((team, i) => (
            <div
              key={team.id}
              className={
                "flex items-center gap-3 bg-surface rounded-[22px] px-4 py-3 border-2 text-left " +
                (i === 0
                  ? "border-mint [box-shadow:var(--sh2),0_0_0_3px_var(--mint-lt)]"
                  : "border-[var(--border)] [box-shadow:var(--sh1)]")
              }
            >
              <span className="font-display text-[17px] font-bold text-txt3 w-4 shrink-0">
                {i + 1}
              </span>
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center text-[21px] shrink-0 ${AVATAR_BG[team.color]}`}
              >
                {team.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-[17px] font-semibold text-txt truncate">
                  {i === 0 ? `${team.name} 👑` : team.name}
                </div>
              </div>
              <div className="font-display text-[29px] font-bold ml-auto leading-none shrink-0">
                {team.score} <span className="text-[12px] font-body text-txt3">pts</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[13px] font-bold text-txt3 mt-3.5">
          <b className="text-txt2">{state.cardsPlayed}</b> cards played ·{" "}
          <b className="text-txt2">{state.settings.categories.length}</b> categories
        </p>

        <div className="w-full flex flex-col gap-3 mt-auto pt-6">
          <Button
            variant="sky"
            size="lg"
            className="w-full"
            onClick={() => {
              resetGame();
              router.push("/setup");
            }}
          >
            Play Again
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              resetGame();
              router.push("/");
            }}
          >
            Back to Home
          </Button>
        </div>
      </main>
    </div>
  );
}
