"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGame } from "@/hooks/useGameState";
import { Button } from "@/components/ui/Button";
import { CategoryColor, GameMode } from "@/lib/game/types";

const avatarBg: Record<CategoryColor, string> = {
  sun: "bg-sun-lt",
  sky: "bg-sky-lt",
  coral: "bg-coral-lt",
  mint: "bg-mint-lt",
  plum: "bg-plum-lt",
};

const MODES: { mode: GameMode; emoji: string; label: string; sub: string }[] = [
  { mode: "picture", emoji: "🖼️", label: "Picture", sub: "Under 7" },
  { mode: "word", emoji: "🔤", label: "Word", sub: "8 & up" },
];

export default function SetupPage() {
  const router = useRouter();
  const { state, setMode, setStyle, addTeam, removeTeam, renameTeam, cycleTeamAvatar } =
    useGame();
  const { settings, teams } = state;

  return (
    <div className="min-h-dvh bg-bg flex flex-col">
      <main className="flex-1 w-full max-w-md mx-auto flex flex-col px-5 py-4">
        <div className="flex items-center justify-between mb-2">
          <Link
            href="/"
            className="w-[42px] h-[42px] rounded-full bg-surface border border-[var(--border)] flex items-center justify-center text-txt2 [box-shadow:var(--sh1)]"
          >
            ←
          </Link>
          <h1 className="font-display text-[22px] font-semibold">Set Up</h1>
          <div className="w-[42px]" />
        </div>

        <p className="text-[11px] font-extrabold tracking-[.09em] uppercase text-txt3 mt-4 mb-2">
          Game Mode
        </p>
        <div className="grid grid-cols-2 gap-[11px]">
          {MODES.map(({ mode, emoji, label, sub }) => {
            const active = settings.mode === mode;
            return (
              <button
                key={mode}
                onClick={() => setMode(mode)}
                className={
                  "relative rounded-[22px] px-3 py-4 text-center border-2 [box-shadow:var(--sh1)] " +
                  "transition-transform active:scale-[.97] " +
                  (active
                    ? "bg-sky-lt border-sky"
                    : "bg-surface border-[var(--border)]")
                }
              >
                {active && (
                  <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-sky-dk text-white flex items-center justify-center text-[12px] font-black">
                    ✓
                  </span>
                )}
                <span className="block text-[30px] mb-1.5">{emoji}</span>
                <span className="block font-display text-[15px] font-semibold leading-tight">
                  {label}
                </span>
                <span
                  className={
                    "block text-[11px] font-extrabold mt-0.5 " +
                    (active ? "text-sky-dk" : "text-txt3")
                  }
                >
                  {sub}
                </span>
              </button>
            );
          })}
        </div>

        <p className="text-[11px] font-extrabold tracking-[.09em] uppercase text-txt3 mt-4 mb-2">
          Teams
        </p>
        <div className="flex flex-col gap-[11px]">
          {teams.map((team, i) => (
            <div
              key={team.id}
              className="flex items-center gap-2.5 bg-surface border border-[var(--border)] rounded-[14px] px-2.5 py-2 [box-shadow:var(--sh1)]"
            >
              <button
                onClick={() => cycleTeamAvatar(team.id)}
                title="Tap to change avatar"
                className={`w-[38px] h-[38px] rounded-full flex items-center justify-center text-[19px] shrink-0 ${avatarBg[team.color]}`}
              >
                {team.emoji}
              </button>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-extrabold tracking-[.06em] uppercase text-txt3">
                  Team {String.fromCharCode(65 + i)}
                </div>
                <input
                  className="w-full font-display text-[16px] font-semibold text-txt bg-transparent border-none outline-none p-0"
                  value={team.name}
                  maxLength={18}
                  onChange={(e) => renameTeam(team.id, e.target.value)}
                />
              </div>
              {teams.length > 2 && (
                <button
                  onClick={() => removeTeam(team.id)}
                  title="Remove"
                  className="w-7 h-7 rounded-full bg-surf2 text-txt3 text-[14px] font-black flex items-center justify-center shrink-0 hover:bg-coral-lt hover:text-coral-dk"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={addTeam}
          disabled={teams.length >= 6}
          className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-[var(--border-dk)] rounded-[22px] py-3.5 mt-2.5 font-display text-[16px] font-semibold text-txt2 cursor-pointer transition-colors hover:bg-surf2 hover:border-txt3 disabled:opacity-40 disabled:pointer-events-none"
        >
          + Add Team
        </button>

        <p className="text-[11px] font-extrabold tracking-[.09em] uppercase text-txt3 mt-4 mb-2">
          Game Style
        </p>
        <div className="flex gap-1.5 bg-surf2 border border-[var(--border)] rounded-full p-1">
          {(["default", "headsup"] as const).map((style) => (
            <button
              key={style}
              onClick={() => setStyle(style)}
              className={
                "flex-1 font-display font-extrabold text-[14px] py-2.5 rounded-full transition-colors " +
                (settings.style === style
                  ? "bg-surface text-txt [box-shadow:var(--sh1)]"
                  : "bg-transparent text-txt2")
              }
            >
              {style === "default" ? "Default" : "Heads Up"}
            </button>
          ))}
        </div>

        <Button
          variant="sun"
          size="lg"
          className="w-full mt-6"
          onClick={() => router.push("/categories")}
        >
          Pick Categories →
        </Button>
      </main>
    </div>
  );
}
