"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/hooks/useGameState";
import { useAudio } from "@/hooks/useAudio";
import { Button } from "@/components/ui";
import { MimoMascot } from "@/components/brand/MimoMascot";
import { cx, AVATAR_BG } from "@/lib/styles";

export default function GameEndPage() {
  const router = useRouter();
  const { state, resetGame } = useGame();
  const { playSfx } = useAudio();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { playSfx("roundend"); }, []);

  const sorted = [...state.teams].sort((a, b) => b.score - a.score);
  const winner = sorted[0];

  return (
    <div
      className={cx.pageRoot}
      style={{
        background: "var(--mint-lt)",
        backgroundImage:
          "radial-gradient(circle, oklch(79% .14 158 / .22) 1.6px, transparent 1.6px)",
        backgroundSize: "26px 26px",
      }}
    >
      <main className={cx.pageMainCentered}>
        <p className="text-[12px] font-extrabold tracking-[.08em] uppercase text-mint-dk mt-2">
          Game over · {state.round} round{state.round > 1 ? "s" : ""}
        </p>
        <h1 className="font-display text-[clamp(28px,8vw,34px)] font-bold text-txt mt-1 leading-tight">
          {winner.name} wins! 🎉
        </h1>
        <div className="my-1">
          <MimoMascot state="excited" size={120} className="animate-bounce-spring" />
        </div>

        {/* ── Final leaderboard ── */}
        <div className="w-full flex flex-col gap-2.5 mt-1.5">
          {sorted.map((team, i) => (
            <div
              key={team.id}
              className={
                `${cx.scoreRowBase} ` +
                (i === 0 ? cx.scoreRowLeader : cx.scoreRowOther)
              }
            >
              <span className="w-4 shrink-0 font-display text-[17px] font-bold text-txt3">
                {i + 1}
              </span>
              <div className={`w-11 h-11 rounded-full flex items-center justify-center text-[21px] shrink-0 ${AVATAR_BG[team.color]}`}>
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

        {/* ── Game stats ── */}
        <p className="text-[13px] font-bold text-txt3 mt-3.5">
          <b className="text-txt2">{state.cardsPlayed}</b> cards played ·{" "}
          <b className="text-txt2">{state.settings.categories.length}</b> categories
        </p>

        {/* ── Actions ── */}
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
