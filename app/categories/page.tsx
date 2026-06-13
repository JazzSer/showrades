"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGame } from "@/hooks/useGameState";
import { Button } from "@/components/ui/Button";
import { CATEGORIES } from "@/lib/data/categories";
import { getCardsForCategories } from "@/lib/data/words";
import { CategoryColor, RoundTimerLength } from "@/lib/game/types";

const activeBg: Record<CategoryColor, string> = {
  sun: "bg-sun-lt border-sun-dk",
  mint: "bg-mint-lt border-mint",
  sky: "bg-sky-lt border-sky",
  coral: "bg-coral-lt border-coral",
  plum: "bg-plum-lt border-plum",
};

const tickBg: Record<CategoryColor, string> = {
  sun: "bg-sun-dk",
  mint: "bg-mint",
  sky: "bg-sky",
  coral: "bg-coral",
  plum: "bg-plum",
};

const accentText: Record<CategoryColor, string> = {
  sun: "text-sun-dk",
  mint: "text-mint-dk",
  sky: "text-sky-dk",
  coral: "text-coral-dk",
  plum: "text-plum-dk",
};

const ROUND_LENGTHS: RoundTimerLength[] = [0, 30, 60, 90];

export default function CategoriesPage() {
  const router = useRouter();
  const { state, toggleCategory, setRoundLength, startGame } = useGame();
  const { settings } = state;

  return (
    <div className="min-h-dvh bg-bg flex flex-col">
      <main className="flex-1 w-full max-w-md mx-auto flex flex-col px-5 py-4">
        <div className="flex items-center justify-between mb-2">
          <Link
            href="/setup"
            className="w-[42px] h-[42px] rounded-full bg-surface border border-[var(--border)] flex items-center justify-center text-txt2 [box-shadow:var(--sh1)]"
          >
            ←
          </Link>
          <h1 className="font-display text-[22px] font-semibold">Categories</h1>
          <div className="w-[42px]" />
        </div>

        <div className="grid grid-cols-2 gap-[11px] mt-4">
          {Object.values(CATEGORIES).map((cat) => {
            const active = settings.categories.includes(cat.key);
            const count = getCardsForCategories([cat.key]).length;
            return (
              <button
                key={cat.key}
                onClick={() => toggleCategory(cat.key)}
                className={
                  "relative rounded-[22px] px-2.5 py-4 text-center border-2 [box-shadow:var(--sh1)] " +
                  "transition-transform active:scale-[.97] " +
                  (active
                    ? activeBg[cat.color]
                    : "bg-surface border-transparent")
                }
              >
                {active && (
                  <span
                    className={`absolute top-2 right-2 w-[21px] h-[21px] rounded-full flex items-center justify-center text-[12px] font-black text-white ${tickBg[cat.color]}`}
                  >
                    ✓
                  </span>
                )}
                <span className="block text-[30px] mb-1.5">{cat.emoji}</span>
                <span className="block font-display text-[15px] font-semibold leading-tight">
                  {cat.name}
                </span>
                <span
                  className={
                    "block text-[11px] font-bold mt-0.5 " +
                    (active ? accentText[cat.color] : "text-txt3")
                  }
                >
                  {count} cards
                </span>
              </button>
            );
          })}
        </div>

        <p className="text-[11px] font-extrabold tracking-[.09em] uppercase text-txt3 mt-5 mb-2">
          Round Timer
        </p>
        <div className="flex gap-1.5 bg-surf2 border border-[var(--border)] rounded-full p-1">
          {ROUND_LENGTHS.map((len) => (
            <button
              key={len}
              onClick={() => setRoundLength(len)}
              className={
                "flex-1 font-display font-extrabold text-[14px] py-2.5 rounded-full transition-colors " +
                (settings.roundLength === len
                  ? "bg-surface text-txt [box-shadow:var(--sh1)]"
                  : "bg-transparent text-txt2")
              }
            >
              {len === 0 ? "Off" : `${len}s`}
            </button>
          ))}
        </div>

        <Button
          variant="sun"
          size="lg"
          className="w-full mt-6"
          disabled={settings.categories.length === 0}
          onClick={() => {
            startGame();
            router.push("/game");
          }}
        >
          Start Round →
        </Button>
      </main>
    </div>
  );
}
