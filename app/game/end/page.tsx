"use client";

import { useRouter } from "next/navigation";
import { useGame } from "@/hooks/useGameState";
import { Button, TeamCard } from "@/components/ui";
import { MimoMascot } from "@/components/brand/MimoMascot";

export default function GameEndPage() {
  const router = useRouter();
  const { state, resetGame } = useGame();

  const sorted = [...state.teams].sort((a, b) => b.score - a.score);
  const winner = sorted[0];

  return (
    <div className="min-h-dvh bg-bg flex flex-col">
      <main className="flex-1 w-full max-w-md mx-auto flex flex-col items-center text-center px-6 py-8">
        <p className="text-[12px] font-bold tracking-[.08em] uppercase text-sun-dk mt-2">
          Game over · {state.round} round{state.round > 1 ? "s" : ""}
        </p>
        <h1 className="font-display text-[28px] font-bold text-txt mt-1">
          {winner.name} wins! 🎉
        </h1>
        <div className="my-3">
          <MimoMascot state="excited" size={120} className="animate-bounce-spring" />
        </div>
        <div className="w-full flex flex-col gap-2.5">
          {sorted.map((team, i) => (
            <TeamCard
              key={team.id}
              name={i === 0 ? `${team.name} 👑` : team.name}
              emoji={team.emoji}
              score={team.score}
              color={team.color}
              active={i === 0}
            />
          ))}
        </div>
        <div className="w-full flex flex-col gap-3 mt-auto pt-6">
          <Button
            variant="sun"
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
            Home
          </Button>
        </div>
      </main>
    </div>
  );
}
