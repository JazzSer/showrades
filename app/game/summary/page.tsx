"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/hooks/useGameState";
import { Button, TeamCard } from "@/components/ui";
import { MimoMascot } from "@/components/brand/MimoMascot";
import { WIN_TARGET } from "@/lib/game/types";

export default function SummaryPage() {
  const router = useRouter();
  const { state, nextRound } = useGame();

  useEffect(() => {
    if (state.screen !== "roundend") router.replace("/game");
  }, [state.screen, router]);

  if (state.screen !== "roundend") return null;

  const sorted = [...state.teams].sort((a, b) => b.score - a.score);
  const leader = sorted[0];
  const tie = sorted.length > 1 && sorted[1].score === leader.score;

  return (
    <div className="min-h-full bg-bg flex flex-col">
      <main className="flex-1 w-full max-w-md mx-auto flex flex-col items-center text-center px-6 py-8">
        <p className="text-[12px] font-bold tracking-[.08em] uppercase text-mint-dk mt-2">
          Round {state.round} complete
        </p>
        <h1 className="font-display text-[28px] font-bold text-txt mt-1">
          {tie ? "It's neck and neck!" : `${leader.name} lead!`}
        </h1>
        <div className="my-3">
          <MimoMascot state="excited" size={118} />
        </div>
        <div className="w-full flex flex-col gap-2.5">
          {sorted.map((team) => (
            <TeamCard
              key={team.id}
              name={team.name}
              emoji={team.emoji}
              score={team.score}
              status={team.roundGain > 0 ? `+${team.roundGain} this round` : "—"}
              color={team.color}
              active={team.id === leader.id}
            />
          ))}
        </div>
        <p className="text-[13px] text-txt3 mt-4">
          First to <b className="text-txt">{WIN_TARGET} pts</b> wins
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
            onClick={() => router.push("/game/end")}
          >
            End Game
          </Button>
        </div>
      </main>
    </div>
  );
}
