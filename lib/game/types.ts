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

export type GameMode = "word" | "picture";

export type GameStyle = "default" | "headsup";

export interface Team {
  id: string;
  name: string;
  emoji: string;
  color: CategoryColor;
  score: number;
  roundGain: number;
}

export type RoundTimerLength = 30 | 60 | 90;

export interface GameSettings {
  mode: GameMode;
  style: GameStyle;
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
  screen: GameScreen;
}

export const WIN_TARGET = 15;

export const AVATARS = ["🦁", "🐬", "🦊", "🐼", "🦄", "🐯", "🐸", "🐵", "🦉", "🐰", "🐨", "🐲"];

export const TEAM_COLORS: CategoryColor[] = ["sun", "sky", "coral", "plum", "mint"];
