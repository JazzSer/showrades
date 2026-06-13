"use client";

import { useEffect } from "react";
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

export default function SummaryPage() {
  const router = useRouter();
  const { state, nextRound, endGameEarly } = useGame();

  useEffect(() => {
    if (state.screen !== "roundend") router.replace("/game");
  }, [state.screen, router]);

  if (state.screen !== "roundend") return null;

  const sorted = [...state.teams].sort((a, b) => b.score - a.score);
  const leader = sorted[0];
  const tie = sorted.length > 1 && sorted[1].score === leader.score;
  const { goalMode, winTarget } = state.settings;
  const cardsRemaining = Math.max(0, state.deck.length - state.deckIndex);

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
          Round {state.round} complete
        </p>
        <h1 className="font-display text-[clamp(28px,8vw,34px)] font-bold text-txt mt-1 leading-tight">
          {tie ? "It's neck and neck!" : `${leader.name} lead!`}
        </h1>
        <div className="my-1">
          <MimoMascot state="excited" size={108} className="animate-bounce-spring" />
        </div>
        <div className="w-full flex flex-col gap-2.5 mt-1.5">
          {sorted.map((team, i) => (
            <div
              key={team.id}
              className={
                "flex items-center gap-3 bg-surface rounded-[22px] px-4 py-3 border-2 text-left " +
                (team.id === leader.id
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
                  {team.name}
                </div>
                <div className="text-[11px] text-txt3 font-bold mt-0.5">
                  {team.roundGain > 0 ? `+${team.roundGain} this round` : "—"}
                </div>
              </div>
              <div className="font-display text-[29px] font-bold ml-auto leading-none shrink-0">
                {team.score} <span className="text-[12px] font-body text-txt3">pts</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[13px] font-bold text-txt3 mt-3.5">
          {goalMode === "points" ? (
            tie ? (
              <>
                First to <b className="text-txt2">{winTarget} pts</b> wins
              </>
            ) : (
              <>
                First to <b className="text-txt2">{winTarget} pts</b> ·{" "}
                {leader.name.replace(/^(The|Team)\s+/i, "")} need{" "}
                <b className="text-txt2">{Math.max(0, winTarget - leader.score)} more</b>
              </>
            )
          ) : (
            <>
              <b className="text-txt2">{cardsRemaining}</b> card{cardsRemaining === 1 ? "" : "s"}{" "}
              left in the deck · highest score wins
            </>
          )}
        </p>

        <div className="w-full flex flex-col gap-3 mt-auto pt-6">
          <Button
            variant="sky"
            size="lg"
            className="w-full"
            onClick={() => {
              nextRound();
              router.push("/game");
            }}
          >
            Next Round →
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              endGameEarly();
              router.push("/game/end");
            }}
          >
            End Game
          </Button>
        </div>
      </main>
    </div>
  );
}
