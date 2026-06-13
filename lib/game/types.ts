export type CategoryKey = "animals" | "food" | "fruits" | "jobs" | "veggies" | "sports";

export type CategoryColor = "sun" | "mint" | "sky" | "coral" | "plum";

export interface Category {
  key: CategoryKey;
  name: string;
  emoji: string;
  color: CategoryColor;
}

export interface WordCard {
  word: string;
  category: CategoryKey;
  emoji: string;
}

export type GameMode = "picture" | "word";

export type TurnMode = "card" | "round";

export type GoalMode = "endless" | "points";

export interface Team {
  id: string;
  name: string;
  emoji: string;
  color: CategoryColor;
  score: number;
  roundGain: number;
}

export type RoundTimerLength = 0 | 30 | 60 | 90;

export interface GameSettings {
  mode: GameMode;
  turnMode: TurnMode;
  goalMode: GoalMode;
  winTarget: number;
  categories: CategoryKey[];
  roundLength: RoundTimerLength;
}

export type GameScreen =
  | "home"
  | "setup"
  | "categories"
  | "pass"
  | "play"
  | "roundend"
  | "gameover";

export interface GameState {
  settings: GameSettings;
  teams: Team[];
  round: number;
  currentTeamIndex: number;
  deck: WordCard[];
  deckIndex: number;
  timeLeft: number;
  cardsPlayed: number;
  screen: GameScreen;
}

export const WIN_TARGET = 15;
export const MIN_WIN_TARGET = 5;
export const MAX_WIN_TARGET = 50;

export const AVATARS = ["🦁", "🐬", "🦊", "🐼", "🦄", "🐯", "🐸", "🐵", "🦉", "🐰", "🐨", "🐲"];

export const TEAM_COLORS: CategoryColor[] = ["sun", "sky", "coral", "plum", "mint"];
