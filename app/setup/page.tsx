"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGame } from "@/hooks/useGameState";
import { Button } from "@/components/ui/Button";
import { CATEGORIES } from "@/lib/data/categories";
import { getCardsForCategories } from "@/lib/data/words";
import {
  CategoryColor,
  GameMode,
  MAX_WIN_TARGET,
  MIN_WIN_TARGET,
  RoundTimerLength,
} from "@/lib/game/types";
import { cx } from "@/lib/styles";

// ─── Per-color class maps ─────────────────────────────────────────────────────

const avatarBg: Record<CategoryColor, string> = {
  sun:   "bg-sun-lt",
  sky:   "bg-sky-lt",
  coral: "bg-coral-lt",
  mint:  "bg-mint-lt",
  plum:  "bg-plum-lt",
};

const activeBg: Record<CategoryColor, string> = {
  sun:   "bg-sun-lt border-sun-dk",
  mint:  "bg-mint-lt border-mint",
  sky:   "bg-sky-lt border-sky",
  coral: "bg-coral-lt border-coral",
  plum:  "bg-plum-lt border-plum",
};

const tickBg: Record<CategoryColor, string> = {
  sun:   "bg-sun-dk",
  mint:  "bg-mint",
  sky:   "bg-sky",
  coral: "bg-coral",
  plum:  "bg-plum",
};

const accentText: Record<CategoryColor, string> = {
  sun:   "text-sun-dk",
  mint:  "text-mint-dk",
  sky:   "text-sky-dk",
  coral: "text-coral-dk",
  plum:  "text-plum-dk",
};

// ─── Static data ──────────────────────────────────────────────────────────────

const MODES: { mode: GameMode; emoji: string; label: string; sub: string }[] = [
  { mode: "picture", emoji: "🖼️", label: "Picture", sub: "Under 7" },
  { mode: "word",    emoji: "🔤", label: "Word",    sub: "8 & up" },
];

const PRESETS: number[]           = [10, 15, 20, 25];
const ROUND_LENGTHS: RoundTimerLength[] = [0, 30, 60, 90];

function estimateMinutes(target: number) {
  // Rough estimate: ~1.5–2 minutes per point, scaled from the 15pt ≈ 20–30min anchor.
  const low  = Math.round((target / 15) * 20);
  const high = Math.round((target / 15) * 30);
  return `${low}–${high} min`;
}

// ─── Info-icon SVG (reused twice on this page) ───────────────────────────────
function InfoIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" strokeLinecap="round" />
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SetupPage() {
  const router = useRouter();
  const {
    state,
    setMode,
    setTurnMode,
    setGoalMode,
    setWinTarget,
    addTeam,
    removeTeam,
    renameTeam,
    cycleTeamAvatar,
    toggleCategory,
    setRoundLength,
    startGame,
  } = useGame();
  const { settings, teams } = state;

  const deckSize = getCardsForCategories(settings.categories).length;

  // Shared tab-pill item class builder
  const tabItem = (active: boolean) =>
    `${cx.tabPillItemBase} ${active ? cx.tabPillItemActive : cx.tabPillItemInactive}`;

  return (
    <div className="min-h-dvh bg-bg flex flex-col">
      <main className={cx.pageMain}>

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-2">
          <Link href="/" className={cx.navPill}>←</Link>
          <h1 className="font-display text-[22px] font-semibold">Set Up</h1>
          <div className="w-[44px]" />
        </div>

        {/* ── Game Mode ── */}
        <p className={cx.sectionLabel}>Game Mode</p>
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
                  (active ? "bg-sky-lt border-sky" : "bg-surface border-[var(--border)]")
                }
              >
                {active && (
                  <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-sky-dk flex items-center justify-center text-[12px] font-black text-white">
                    ✓
                  </span>
                )}
                <span className="block text-[30px] mb-1.5">{emoji}</span>
                <span className="block font-display text-[15px] font-semibold leading-tight">
                  {label}
                </span>
                <span className={"block text-[11px] font-extrabold mt-0.5 " + (active ? "text-sky-dk" : "text-txt3")}>
                  {sub}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Teams ── */}
        <p className={cx.sectionLabel}>Teams</p>
        <div className="flex flex-col gap-[11px]">
          {teams.map((team, i) => (
            <div
              key={team.id}
              className="flex items-center gap-2.5 bg-surface border border-[var(--border)] rounded-[14px] px-2.5 py-2 [box-shadow:var(--sh1)]"
            >
              <button
                onClick={() => cycleTeamAvatar(team.id)}
                title="Tap to change avatar"
                className={`w-[44px] h-[44px] rounded-full flex items-center justify-center text-[19px] shrink-0 ${avatarBg[team.color]}`}
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
                  className="w-[44px] h-[44px] rounded-full flex items-center justify-center shrink-0 hover:bg-coral-lt hover:text-coral-dk text-txt3"
                >
                  <span className="w-7 h-7 rounded-full bg-surf2 flex items-center justify-center text-[14px] font-black pointer-events-none">
                    ✕
                  </span>
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

        {/* ── Turn Style ── */}
        <p className={cx.sectionLabel}>Turn Style</p>
        <div className={cx.tabPillRow}>
          {(["card", "round"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setTurnMode(mode)}
              className={tabItem(settings.turnMode === mode)}
            >
              {mode === "round" ? "By round" : "By card"}
            </button>
          ))}
        </div>

        {/* ── Win Goal ── */}
        <p className={cx.sectionLabel}>Win Goal</p>
        <div className={cx.tabPillRow}>
          {(["endless", "points"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setGoalMode(mode)}
              className={tabItem(settings.goalMode === mode)}
            >
              {mode === "points" ? "Points target" : "Endless"}
            </button>
          ))}
        </div>

        {/* ── Win Target (points mode) ── */}
        {settings.goalMode === "points" ? (
          <>
            <p className={cx.sectionLabel}>First team to reach</p>
            <div className="flex items-center gap-3 bg-surface border border-[var(--border)] rounded-[22px] p-2.5 [box-shadow:var(--sh1)]">
              <button
                onClick={() => setWinTarget(settings.winTarget - 1)}
                disabled={settings.winTarget <= MIN_WIN_TARGET}
                aria-label="Fewer points"
                className="w-[54px] h-[54px] rounded-full border-2 border-[var(--border-dk)] bg-surf2 flex items-center justify-center text-[28px] font-bold text-txt shrink-0 leading-none cursor-pointer active:scale-[.92] disabled:opacity-40 disabled:pointer-events-none"
              >
                −
              </button>
              <div className="flex-1 text-center">
                <span className="block font-display text-[42px] font-bold leading-none text-txt">
                  {settings.winTarget}
                </span>
                <span className="block text-[11px] font-extrabold uppercase tracking-[.04em] text-txt3">
                  correct to win
                </span>
              </div>
              <button
                onClick={() => setWinTarget(settings.winTarget + 1)}
                disabled={settings.winTarget >= MAX_WIN_TARGET}
                aria-label="More points"
                className="w-[54px] h-[54px] rounded-full border-2 border-[var(--border-dk)] bg-surf2 flex items-center justify-center text-[28px] font-bold text-txt shrink-0 leading-none cursor-pointer active:scale-[.92] disabled:opacity-40 disabled:pointer-events-none"
              >
                +
              </button>
            </div>

            {/* Quick-pick presets */}
            <div className="flex gap-2 mt-2.5">
              {PRESETS.map((p) => (
                <button
                  key={p}
                  onClick={() => setWinTarget(p)}
                  className={
                    "flex-1 min-h-[44px] rounded-full border-2 font-display text-[15px] font-semibold text-center cursor-pointer " +
                    (settings.winTarget === p
                      ? "bg-sun-lt border-sun-dk text-txt"
                      : "bg-surface border-[var(--border)] text-txt2")
                  }
                >
                  {p}
                </button>
              ))}
            </div>

            <div className={`${cx.infoCard} mt-3`}>
              <span className="shrink-0 text-sun-dk mt-0.5">
                <InfoIcon />
              </span>
              <span>
                About <b className="text-txt">{estimateMinutes(settings.winTarget)}</b> for{" "}
                {settings.winTarget} points. The game ends the moment a team hits the target.
              </span>
            </div>
          </>
        ) : (
          <>
            {/* Endless mode card */}
            <div className="bg-surface border-2 border-mint rounded-[22px] p-[18px] [box-shadow:var(--sh1)] text-center mt-1">
              <div className="text-[32px]">♾️</div>
              <p className="font-display text-[19px] font-semibold mt-1">Play the whole deck</p>
              <p className="text-[13px] font-bold text-txt2 leading-snug mt-1">
                No target — keep going until every card in your chosen categories has been
                played. Highest score wins.
              </p>
            </div>

            <div className={`${cx.infoCard} mt-3`}>
              <span className="shrink-0 text-sun-dk mt-0.5">
                <InfoIcon />
              </span>
              <span>
                Stop sooner with <b className="text-txt">End game</b> any time during play —
                current scores decide the winner.
              </span>
            </div>
          </>
        )}

        {/* ── Categories ── */}
        <div className="flex items-center gap-3 mt-6 mb-1">
          <div className="flex-1 h-[1.5px] bg-[var(--border)] rounded-full" />
          <span className="text-[11px] font-extrabold tracking-[.09em] uppercase text-txt3 whitespace-nowrap">
            Categories
          </span>
          <div className="flex-1 h-[1.5px] bg-[var(--border)] rounded-full" />
        </div>

        <div className="grid grid-cols-2 gap-[11px] mt-2">
          {Object.values(CATEGORIES).map((cat) => {
            const active = settings.categories.includes(cat.key);
            const count  = getCardsForCategories([cat.key]).length;
            return (
              <button
                key={cat.key}
                onClick={() => toggleCategory(cat.key)}
                className={
                  "relative rounded-[22px] px-2.5 py-4 text-center border-2 [box-shadow:var(--sh1)] " +
                  "transition-transform active:scale-[.97] " +
                  (active ? activeBg[cat.color] : "bg-surface border-transparent")
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
                <span className={"block text-[11px] font-bold mt-0.5 " + (active ? accentText[cat.color] : "text-txt3")}>
                  {count} cards
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between mt-3 px-1 text-[12px] font-bold text-txt2">
          <span>
            <b className="text-txt">{settings.categories.length}</b> categories selected
          </span>
          <span>
            <b className="text-txt">{deckSize}</b> cards in deck
          </span>
        </div>

        {/* ── Round Timer ── */}
        <p className={cx.sectionLabel}>Round Timer</p>
        <div className={cx.tabPillRow}>
          {ROUND_LENGTHS.map((len) => (
            <button
              key={len}
              onClick={() => setRoundLength(len)}
              className={tabItem(settings.roundLength === len)}
            >
              {len === 0 ? "Off" : `${len}s`}
            </button>
          ))}
        </div>

        {/* ── Start CTA ── */}
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
