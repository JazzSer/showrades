"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/hooks/useGameState";
import { useCountdown } from "@/hooks/useCountdown";
import { Button, Timer } from "@/components/ui";
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
  const { state, currentCard, onCorrect, onPass, endTurn, endGameEarly } = useGame();
  const timerOn = state.settings.roundLength > 0;
  const [timeUp, setTimeUp] = useState(false);
  const countdown = useCountdown(state.settings.roundLength || 1, {
    onExpire: () => {
      if (state.settings.turnMode === "card") {
        // Treat a card-mode timeout like a "Pass": advance the deck and
        // give brief visible feedback before swapping who holds the phone.
        onPass();
        setTimeUp(true);
        setTimeout(() => {
          setTimeUp(false);
          endTurn();
        }, 1200);
      } else {
        endTurn();
      }
    },
  });
  const [playing, setPlaying] = useState(false);
  const [showEndSheet, setShowEndSheet] = useState(false);

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
    const isCardMode = state.settings.turnMode === "card";
    const subtitle = allZero
      ? isCardMode
        ? "Get ready!"
        : `Round ${state.round} · Up next`
      : `${leader.name} lead with ${leader.score}`;

    const handleReady = () => {
      if (timerOn) {
        countdown.reset(state.settings.roundLength);
        countdown.start();
      }
      setPlaying(true);
    };

    return (
      <div
        className="min-h-dvh flex flex-col"
        style={{
          background: "var(--plum-lt)",
          backgroundImage:
            "radial-gradient(circle, oklch(73% .14 292 / .26) 1.6px, transparent 1.6px)",
          backgroundSize: "26px 26px",
        }}
      >
        <main className="flex-1 w-full max-w-md mx-auto flex flex-col items-center text-center px-6 py-8">
          <p className="text-[12px] font-extrabold tracking-[.1em] uppercase text-plum-dk mt-2">
            {subtitle}
          </p>
          <h1 className="font-display text-[clamp(30px,9vw,38px)] font-bold text-txt mt-2.5 leading-tight">
            {team.name}
          </h1>
          <div
            className={`w-[68px] h-[68px] rounded-full flex items-center justify-center text-[36px] mt-4 bg-surface [box-shadow:var(--sh1)]`}
          >
            {team.emoji}
          </div>
          <div className="flex-1 flex items-center justify-center min-h-[160px]">
            <MimoMascot state="thinking" size={130} className="animate-bounce-spring" />
          </div>
          <p className="text-[15px] font-bold text-txt2 leading-snug max-w-[26ch]">
            {isCardMode
              ? `Your turn to act, ${team.name}! Pass the phone — everyone else guesses.`
              : `Give the phone to a ${team.name.replace(/^(The|Team)\s+/i, "")} to act out. Everyone else — no peeking!`}
          </p>
          <Button variant="plum" size="lg" className="w-full mt-4" onClick={handleReady}>
            We&apos;re Ready →
          </Button>
        </main>
      </div>
    );
  }

  const team = state.teams[state.currentTeamIndex];
  const card = currentCard();
  const isPic = state.settings.mode === "picture";
  const category = card ? CATEGORIES[card.category] : null;
  const goalMode = state.settings.goalMode;

  const handleResolve = (action: () => void) => {
    action();
    if (state.settings.turnMode === "card") {
      if (timerOn) countdown.reset(state.settings.roundLength);
      endTurn();
    }
  };

  const handleEndAndShowScores = () => {
    endGameEarly();
  };

  const sortedTeams = [...state.teams].sort((a, b) => b.score - a.score);

  return (
    <div className={`min-h-dvh flex flex-col ${isPic ? "bg-sky" : "bg-sun"}`}>
      <main className="flex-1 w-full max-w-md mx-auto flex flex-col px-5 py-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 rounded-full bg-white/55 pl-[5px] pr-3.5 py-[5px]">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[17px] shrink-0">
              {team.emoji}
            </div>
            <div className="text-left">
              <div className="font-display text-[14px] font-semibold leading-tight">
                {team.name}
              </div>
              <div className="text-[9px] font-extrabold tracking-[.05em] text-txt2">
                YOUR TURN
              </div>
            </div>
          </div>
          <div className="flex items-center gap-[7px] shrink-0">
            <div className="text-[10px] font-extrabold uppercase tracking-[.05em] bg-white/55 rounded-full px-[11px] py-2 text-txt">
              {isPic ? "🖼️ Picture" : "🔤 Word"}
            </div>
            <button
              onClick={() => setShowEndSheet(true)}
              title="End game early"
              className="flex items-center gap-[5px] bg-surface rounded-full pl-2.5 pr-[13px] py-2 font-bold text-[12px] text-coral-dk [box-shadow:var(--sh1)] active:scale-95"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <rect x="5" y="5" width="14" height="14" rx="2.5" />
              </svg>
              End
            </button>
          </div>
        </div>

        {/* Goal progress bar */}
        <div className="flex items-center gap-2.5 mt-3.5 shrink-0">
          <div className="flex-1 h-[9px] rounded-full bg-white/45 overflow-hidden">
            <div
              className="h-full rounded-full bg-white"
              style={{
                width:
                  goalMode === "points"
                    ? `${Math.min(100, (team.score / Math.max(1, state.settings.winTarget)) * 100)}%`
                    : `${Math.min(100, ((state.deckIndex + 1) / Math.max(1, state.deck.length)) * 100)}%`,
              }}
            />
          </div>
          <span className="text-[11px] font-extrabold text-txt whitespace-nowrap tracking-[.02em]">
            {goalMode === "points"
              ? `${team.score} / ${state.settings.winTarget}`
              : `♾️ Card ${Math.min(state.deckIndex + 1, state.deck.length)} / ${state.deck.length}`}
          </span>
        </div>

        {/* Timer */}
        {timerOn ? (
          <div className="mx-auto mt-3.5">
            <Timer total={state.settings.roundLength} current={countdown.current} variant="onColor" />
          </div>
        ) : null}

        {/* Card */}
        <div className="flex-1 flex items-center justify-center my-4 min-h-[220px]">
          {timeUp ? (
            <div className="w-full min-h-[220px] bg-coral rounded-[32px] [box-shadow:var(--sh2)] flex flex-col items-center justify-center text-center px-6 py-8 gap-1 animate-bounce-spring">
              <span className="text-[40px]">⏰</span>
              <p className="font-display text-[26px] font-bold text-white">Time&apos;s up!</p>
              <p className="text-[13px] text-white/85 font-bold">Passing the phone…</p>
            </div>
          ) : card ? (
            isPic ? (
              <div className="w-full h-full min-h-[220px] flex items-center justify-center bg-gradient-to-br from-sky-lt to-surface rounded-[22px]">
                <div className="flex flex-col items-center justify-center gap-2.5 text-center">
                  <div className="text-[clamp(140px,40vw,180px)] leading-none [filter:drop-shadow(0_8px_16px_oklch(20%_0_0/.15))]">
                    {card.emoji}
                  </div>
                  <p className="font-display text-[clamp(30px,9vw,38px)] font-bold text-txt tracking-[-.5px] leading-none">
                    {card.word}
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full min-h-[220px] bg-white rounded-[32px] [box-shadow:var(--sh2)] flex flex-col items-center justify-center text-center px-6 py-8">
                <span className="text-[11px] font-extrabold tracking-[.08em] uppercase text-mint-dk bg-mint-lt px-3.5 py-1.5 rounded-full mb-[18px]">
                  {category ? `${category.emoji} ${category.name}` : ""}
                </span>
                <div className="font-display text-[clamp(44px,13vw,56px)] font-bold leading-[1.02] text-txt">
                  {card.word}
                </div>
              </div>
            )
          ) : (
            <div className="w-full min-h-[220px] bg-white rounded-[32px] [box-shadow:var(--sh2)] flex flex-col items-center justify-center text-center px-6 py-8 gap-1">
              <p className="font-display text-[22px] font-semibold text-txt">Deck complete!</p>
              <p className="text-[13px] text-txt2 font-bold">
                Every card has been played — time to see the final scores.
              </p>
            </div>
          )}
        </div>

        {timeUp ? null : card ? (
          <>
            {/* End-turn button: by-round with timer off */}
            {state.settings.turnMode === "round" && !timerOn && (
              <Button variant="outline" className="w-full mb-3" onClick={() => endTurn()}>
                End Turn →
              </Button>
            )}

            <div className="flex gap-3">
              <Button variant="coral" className="flex-1" onClick={() => handleResolve(onPass)}>
                ✗ Pass
              </Button>
              <Button variant="mint" className="flex-1" onClick={() => handleResolve(onCorrect)}>
                ✓ Got It
              </Button>
            </div>
          </>
        ) : (
          <Button variant="sun" size="lg" className="w-full" onClick={() => endTurn()}>
            Finish Game →
          </Button>
        )}
      </main>

      {/* End-game-early confirm sheet */}
      {showEndSheet && (
        <div className="fixed inset-0 bg-[oklch(18%_0_0/.46)] flex items-end justify-center z-50">
          <div className="w-full max-w-md bg-surface rounded-t-[32px] px-5 pt-3.5 pb-[max(22px,env(safe-area-inset-bottom))] [box-shadow:0_-8px_32px_oklch(20%_0_0/.22)]">
            <div className="w-10 h-1.5 rounded-full bg-[var(--border-dk)] mx-auto mb-4" />
            <h3 className="font-display text-[23px] font-semibold text-center">
              End the game now?
            </h3>
            <p className="text-[14px] font-bold text-txt2 text-center mt-1.5 leading-snug">
              The round will stop and we&apos;ll show the final scores as they stand.
            </p>
            <div className="flex flex-col gap-2 mt-4">
              {sortedTeams.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center gap-2.5 bg-surf2 border border-[var(--border)] rounded-[14px] px-3.5 py-2.5"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-[17px] shrink-0 ${AVATAR_BG[t.color]}`}
                  >
                    {t.emoji}
                  </div>
                  <div className="font-display text-[15px] font-semibold">{t.name}</div>
                  <div className="font-display text-[19px] font-bold ml-auto">
                    {t.score} <span className="text-[11px] font-body text-txt3 font-bold">pts</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2.5 mt-[18px]">
              <Button variant="coral" size="lg" className="w-full" onClick={handleEndAndShowScores}>
                End & Show Scores
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => setShowEndSheet(false)}>
                Keep Playing
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
