"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/hooks/useGameState";
import { useCountdown } from "@/hooks/useCountdown";
import { Button, GameCard, Timer } from "@/components/ui";
import { MimoMascot } from "@/components/brand/MimoMascot";
import { CATEGORIES } from "@/lib/data/categories";

const AVATAR_BG: Record<string, string> = {
  sun: "bg-sun-lt",
  mint: "bg-mint-lt",
  sky: "bg-sky-lt",
  coral: "bg-coral-lt",
  plum: "bg-plum-lt",
};

export default function GamePage() {
  const router = useRouter();
  const { state, currentCard, onCorrect, onPass, endTurn } = useGame();
  const countdown = useCountdown(state.settings.roundLength, { onExpire: () => endTurn() });
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (state.screen === "roundend") router.replace("/game/summary");
    else if (state.screen === "gameover") router.replace("/game/end");
    else if (state.screen === "pass" && playing) setPlaying(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.screen, router]);

  const showPlay = playing || state.screen === "play";

  if (!showPlay) {
    const team = state.teams[state.currentTeamIndex];
    const sorted = [...state.teams].sort((a, b) => b.score - a.score);
    const leader = sorted[0];
    const allZero = state.teams.every((t) => t.score === 0);
    const subtitle =
      state.round === 1 && state.currentTeamIndex === 0 && allZero
        ? `Round ${state.round} · First up`
        : `${leader.name} lead with ${leader.score}`;

    const handleReady = () => {
      countdown.reset(state.settings.roundLength);
      countdown.start();
      setPlaying(true);
    };

    return (
      <div className="min-h-full bg-bg flex flex-col">
        <main className="flex-1 w-full max-w-md mx-auto flex flex-col items-center text-center px-6 py-8">
          <p className="text-[12px] font-bold tracking-[.08em] uppercase text-txt3 mt-2">
            Round {state.round}
          </p>
          <p className="font-display text-[20px] font-semibold text-txt mt-6">
            Pass the phone to
          </p>
          <div
            className={`w-28 h-28 rounded-full flex items-center justify-center text-[56px] mt-5 ${AVATAR_BG[team.color]}`}
          >
            {team.emoji}
          </div>
          <h1 className="font-display text-[28px] font-bold text-txt mt-4">{team.name}</h1>
          <div className="flex-1 flex items-center justify-center min-h-[120px]">
            <MimoMascot state="thinking" size={118} />
          </div>
          <Button variant="sun" size="lg" className="w-full" onClick={handleReady}>
            Tap when ready →
          </Button>
          <p className="text-[12px] text-txt3 mt-3">
            {subtitle} · {state.settings.roundLength}s round
          </p>
        </main>
      </div>
    );
  }

  const team = state.teams[state.currentTeamIndex];
  const card = currentCard();
  const isPic = state.settings.mode === "picture";
  const turnLabel = state.settings.style === "headsup" ? "HEADS UP" : "YOUR TURN";
  const category = card ? CATEGORIES[card.category] : null;

  return (
    <div className="min-h-full bg-bg flex flex-col">
      <main className="flex-1 w-full max-w-md mx-auto flex flex-col px-5 py-4">
        <div className="flex items-center justify-between">
          <div
            className={`flex items-center gap-2 rounded-full pl-1.5 pr-3.5 py-1 ${AVATAR_BG[team.color]}`}
          >
            <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-[16px]">
              {team.emoji}
            </div>
            <div className="text-left">
              <div className="font-display text-[14px] font-semibold leading-tight">
                {team.name}
              </div>
              <div className="text-[9px] font-extrabold tracking-[.05em] text-txt2">
                {turnLabel}
              </div>
            </div>
          </div>
          <div className="text-[10px] font-extrabold uppercase tracking-[.05em] bg-surf2 rounded-full px-3 py-1.5">
            {isPic ? "🖼️ Picture" : "🔤 Word"}
          </div>
        </div>

        <div className="mx-auto mt-3">
          <Timer total={state.settings.roundLength} current={countdown.current} />
        </div>

        <div className="flex-1 flex items-center justify-center my-4 min-h-[220px]">
          {card ? (
            isPic ? (
              <div className="flex flex-col items-center justify-center text-center">
                <div className="text-[120px] leading-none">{card.emoji}</div>
                <p className="font-display text-[32px] font-bold mt-4">{card.word}</p>
              </div>
            ) : (
              <GameCard
                category={category ? `${category.emoji} ${category.name}` : undefined}
                word={card.word}
                color={card.category ? CATEGORIES[card.category].color : "sun"}
                className="w-full"
              />
            )
          ) : (
            <p className="text-txt3">No cards left</p>
          )}
        </div>

        <div className="flex gap-3">
          <Button variant="coral" className="flex-1" onClick={onPass}>
            ✗ Pass
          </Button>
          <Button variant="mint" className="flex-1" onClick={onCorrect}>
            ✓ Got It
          </Button>
        </div>
      </main>
    </div>
  );
}
