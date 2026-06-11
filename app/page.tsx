"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/brand/Logo";
import { MimoMascot } from "@/components/brand/MimoMascot";
import { WIN_TARGET } from "@/lib/game/types";

const RULES = [
  "Split into 2–6 teams. Each round, every team takes one turn with the phone.",
  "The actor sees a word and acts it out — no talking, no sounds. Teammates guess!",
  "Tap Got it for a point and the next word, or Skip to pass. Beat the clock.",
  `First team to ${WIN_TARGET} points wins the game. Pass and play!`,
];

export default function Home() {
  const router = useRouter();
  const [showRules, setShowRules] = useState(false);

  return (
    <div
      className="min-h-dvh flex flex-col"
      style={{
        background: "var(--sun-lt)",
        backgroundImage:
          "radial-gradient(circle, oklch(84% .17 82 / .28) 1.6px, transparent 1.6px)",
        backgroundSize: "26px 26px",
      }}
    >
      <main className="flex-1 w-full max-w-md mx-auto flex flex-col items-center text-center px-6 py-10">
        <div className="mt-2">
          <Logo size="lg" />
        </div>
        <p className="text-[15px] font-bold text-txt2 mt-1">
          Charades for the whole family.
        </p>

        <div className="flex-1 flex items-center justify-center min-h-[200px]">
          <MimoMascot state="happy" size={168} className="animate-bounce-spring" />
        </div>

        <div className="w-full flex flex-col gap-3.5">
          <Button
            variant="sun"
            size="lg"
            className="w-full"
            onClick={() => router.push("/setup")}
          >
            Start Game
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowRules((v) => !v)}
          >
            How to Play
          </Button>
        </div>

        {showRules && (
          <div className="w-full mt-4 bg-surface border border-[var(--border)] rounded-[22px] p-5 text-left [box-shadow:var(--sh1)]">
            <h2 className="font-display text-[18px] font-semibold mb-3">How to play</h2>
            <ol className="flex flex-col gap-3">
              {RULES.map((rule, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-sun-lt text-sun-dk font-display font-bold text-[13px] flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-[14px] text-txt2 leading-snug">{rule}</p>
                </li>
              ))}
            </ol>
          </div>
        )}

        <p className="text-[12px] font-bold text-txt3 mt-4">
          No reading required · Plays offline · Free
        </p>
      </main>
    </div>
  );
}
