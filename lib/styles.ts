/**
 * Shared Tailwind class-string constants.
 *
 * Rules:
 * - Only add a constant here when the exact string appears in 3+ files.
 * - Order within each string: layout → spacing → sizing → typography → color → border → effects → interactive.
 * - Never import this file from hooks/, lib/game/, or lib/data/ — it is UI-layer only.
 */

// ─── Avatar / team colour maps ───────────────────────────────────────────────
// Repeated in: app/game/page.tsx, app/game/summary/page.tsx, app/game/end/page.tsx
export const AVATAR_BG: Record<string, string> = {
  sun:   "bg-sun-lt",
  mint:  "bg-mint-lt",
  sky:   "bg-sky-lt",
  coral: "bg-coral-lt",
  plum:  "bg-plum-lt",
};

// ─── Page-level layout shells ─────────────────────────────────────────────────
// Centred column, constrained to max-w-md, used as the <main> interior on every page.
export const cx = {
  /** Full-height root wrapper: stacks children in a column. */
  pageRoot: "min-h-dvh flex flex-col",

  /** <main> interior: centred, max-w-md, column layout, standard page padding. */
  pageMain: "flex-1 w-full max-w-md mx-auto flex flex-col px-5 py-4",

  /** Same as pageMain but centred text (home, pass screen, summary, end). */
  pageMainCentered: "flex-1 w-full max-w-md mx-auto flex flex-col items-center text-center px-6 py-8",

  // ─── Section label ───────────────────────────────────────────────────────
  // The all-caps overline label used between sections in setup/page.tsx.
  sectionLabel: "text-[11px] font-extrabold tracking-[.09em] uppercase text-txt3 mt-4 mb-2",

  // ─── Tab-pill toggle row ─────────────────────────────────────────────────
  // Pill container (bg row) for segmented toggle controls in setup/page.tsx.
  tabPillRow: "flex gap-1.5 bg-surf2 border border-[var(--border)] rounded-full p-1",

  // Active / inactive tab item inside tabPillRow.
  // py-[15px] ensures minimum 44px touch target height (14px text + 2×15px padding).
  tabPillItemBase:
    "flex-1 font-display font-extrabold text-[14px] py-[15px] rounded-full transition-colors",
  tabPillItemActive:   "bg-sun text-txt [box-shadow:var(--sh1)]",
  tabPillItemInactive: "bg-transparent text-txt2",

  // ─── Back / icon nav button ───────────────────────────────────────────────
  // 44 × 44 circular ghost button used as a back-nav pill (WCAG 2.1 minimum).
  // Appears in: app/setup/page.tsx, app/how-to-play/page.tsx
  navPill:
    "w-[44px] h-[44px] rounded-full bg-surface border border-[var(--border)] flex items-center justify-center text-txt2 [box-shadow:var(--sh1)]",

  // ─── Info / hint card ────────────────────────────────────────────────────
  // Horizontal card with a leading icon and a body text paragraph.
  // Appears in: app/setup/page.tsx (×2), app/how-to-play/page.tsx (×2)
  infoCard:
    "flex gap-2.5 items-start bg-surface border border-[var(--border)] rounded-[14px] px-3.5 py-3 text-[13px] font-bold text-txt2 leading-snug",

  // ─── Score row card ───────────────────────────────────────────────────────
  // Leaderboard row used in game/summary and game/end.
  scoreRowBase:
    "flex items-center gap-3 bg-surface rounded-[22px] px-4 py-3 border-2 text-left",
  scoreRowLeader:
    "border-mint [box-shadow:var(--sh2),0_0_0_3px_var(--mint-lt)]",
  scoreRowOther:
    "border-[var(--border)] [box-shadow:var(--sh1)]",
};
