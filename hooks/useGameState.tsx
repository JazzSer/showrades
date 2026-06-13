"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AVATARS,
  CategoryKey,
  GameSettings,
  GameState,
  GoalMode,
  MAX_WIN_TARGET,
  MIN_WIN_TARGET,
  RoundTimerLength,
  Team,
  TEAM_COLORS,
  TurnMode,
  WIN_TARGET,
  WordCard,
} from "@/lib/game/types";
import { getCardsForCategories } from "@/lib/data/words";

const SAVE_KEY = "showrades_game_v1";

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildDeck(categories: CategoryKey[]): WordCard[] {
  return shuffle(getCardsForCategories(categories));
}

function defaultState(): GameState {
  return {
    settings: {
      mode: "word",
      turnMode: "round",
      goalMode: "points",
      winTarget: WIN_TARGET,
      categories: ["animals", "food", "fruits"],
      roundLength: 60,
    },
    teams: [
      { id: "team-1", name: "Team Lions", emoji: "🦁", color: "sun", score: 0, roundGain: 0 },
      { id: "team-2", name: "Team Dolphins", emoji: "🐬", color: "sky", score: 0, roundGain: 0 },
    ],
    round: 1,
    currentTeamIndex: 0,
    deck: [],
    deckIndex: 0,
    timeLeft: 60,
    cardsPlayed: 0,
    screen: "home",
  };
}

function loadState(): GameState | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<GameState> & {
      settings?: Partial<GameSettings> & { style?: string };
    };
    const defaults = defaultState();
    if (!parsed.settings) return { ...defaults, ...parsed } as GameState;

    // Drop the deprecated "style" field (default | headsup) from older saves —
    // turn framing is now controlled by turnMode ("round" | "card").
    const { style: _style, ...restSettings } = parsed.settings;
    void _style;

    return {
      ...defaults,
      ...parsed,
      settings: {
        ...defaults.settings,
        ...restSettings,
        turnMode: restSettings.turnMode ?? "round",
        goalMode: restSettings.goalMode ?? "points",
        winTarget: restSettings.winTarget ?? WIN_TARGET,
      },
      cardsPlayed: parsed.cardsPlayed ?? 0,
    } as GameState;
  } catch {
    return null;
  }
}

interface GameContextValue {
  state: GameState;
  setMode: (mode: GameState["settings"]["mode"]) => void;
  setTurnMode: (turnMode: TurnMode) => void;
  setGoalMode: (goalMode: GoalMode) => void;
  setWinTarget: (winTarget: number) => void;
  toggleCategory: (category: CategoryKey) => void;
  setRoundLength: (length: RoundTimerLength) => void;
  addTeam: () => void;
  removeTeam: (id: string) => void;
  renameTeam: (id: string, name: string) => void;
  cycleTeamAvatar: (id: string) => void;
  startGame: () => void;
  currentCard: () => WordCard | null;
  onCorrect: () => void;
  onPass: () => void;
  endTurn: () => void;
  endGameEarly: () => void;
  nextRound: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(defaultState);
  const loaded = useRef(false);

  useEffect(() => {
    const saved = loadState();
    if (saved) setState(saved);
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    } catch {
      // ignore storage errors (e.g. private browsing quota)
    }
  }, [state]);

  const setMode = useCallback((mode: GameSettings["mode"]) => {
    setState((s) => ({ ...s, settings: { ...s.settings, mode } }));
  }, []);

  const setTurnMode = useCallback((turnMode: TurnMode) => {
    setState((s) => ({ ...s, settings: { ...s.settings, turnMode } }));
  }, []);

  const setGoalMode = useCallback((goalMode: GoalMode) => {
    setState((s) => ({ ...s, settings: { ...s.settings, goalMode } }));
  }, []);

  const setWinTarget = useCallback((winTarget: number) => {
    const clamped = Math.max(MIN_WIN_TARGET, Math.min(MAX_WIN_TARGET, winTarget));
    setState((s) => ({ ...s, settings: { ...s.settings, winTarget: clamped } }));
  }, []);

  const toggleCategory = useCallback((category: CategoryKey) => {
    setState((s) => {
      const has = s.settings.categories.includes(category);
      if (has && s.settings.categories.length === 1) return s;
      const categories = has
        ? s.settings.categories.filter((c) => c !== category)
        : [...s.settings.categories, category];
      return { ...s, settings: { ...s.settings, categories } };
    });
  }, []);

  const setRoundLength = useCallback((roundLength: RoundTimerLength) => {
    setState((s) => ({ ...s, settings: { ...s.settings, roundLength } }));
  }, []);

  const addTeam = useCallback(() => {
    setState((s) => {
      if (s.teams.length >= 6) return s;
      const usedEmojis = s.teams.map((t) => t.emoji);
      const emoji = AVATARS.find((a) => !usedEmojis.includes(a)) ?? AVATARS[0];
      const color = TEAM_COLORS[s.teams.length % TEAM_COLORS.length];
      const team: Team = {
        id: `team-${Date.now()}`,
        name: `Team ${s.teams.length + 1}`,
        emoji,
        color,
        score: 0,
        roundGain: 0,
      };
      return { ...s, teams: [...s.teams, team] };
    });
  }, []);

  const removeTeam = useCallback((id: string) => {
    setState((s) => {
      if (s.teams.length <= 2) return s;
      return { ...s, teams: s.teams.filter((t) => t.id !== id) };
    });
  }, []);

  const renameTeam = useCallback((id: string, name: string) => {
    setState((s) => ({
      ...s,
      teams: s.teams.map((t) => (t.id === id ? { ...t, name } : t)),
    }));
  }, []);

  const cycleTeamAvatar = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      teams: s.teams.map((t) => {
        if (t.id !== id) return t;
        const idx = AVATARS.indexOf(t.emoji);
        const emoji = AVATARS[(idx + 1) % AVATARS.length];
        return { ...t, emoji };
      }),
    }));
  }, []);

  const startGame = useCallback(() => {
    setState((s) => ({
      ...s,
      teams: s.teams.map((t) => ({
        ...t,
        name: t.name.trim() || "Team",
        score: 0,
        roundGain: 0,
      })),
      round: 1,
      currentTeamIndex: 0,
      deck: buildDeck(s.settings.categories),
      deckIndex: 0,
      timeLeft: s.settings.roundLength,
      cardsPlayed: 0,
      screen: "pass",
    }));
  }, []);

  const currentCard = useCallback((): WordCard | null => {
    let deck = state.deck;
    let deckIndex = state.deckIndex;
    const exhausted = deckIndex >= deck.length;

    if (deck.length === 0) {
      deck = buildDeck(state.settings.categories);
      deckIndex = 0;
    } else if (exhausted) {
      if (state.settings.goalMode === "endless") {
        // In endless mode the deck is finite — once it runs out, stop dealing
        // cards so the game can end via endTurn()'s deckExhausted check.
        return null;
      }
      deck = buildDeck(state.settings.categories);
      deckIndex = 0;
    }
    if (deck !== state.deck || deckIndex !== state.deckIndex) {
      setState((s) => ({ ...s, deck, deckIndex }));
    }
    return deck[deckIndex] ?? null;
  }, [state.deck, state.deckIndex, state.settings.categories, state.settings.goalMode]);

  const onCorrect = useCallback(() => {
    setState((s) => {
      // In "card" mode the player holding the phone shows the clue and the
      // OTHER player guesses — so the guesser (next team in rotation) earns
      // the point. In "round" mode the acting team accumulates points for
      // their whole round, so the current team scores.
      const scoringIndex =
        s.settings.turnMode === "card"
          ? (s.currentTeamIndex + 1) % s.teams.length
          : s.currentTeamIndex;

      return {
        ...s,
        teams: s.teams.map((t, i) =>
          i === scoringIndex ? { ...t, score: t.score + 1, roundGain: t.roundGain + 1 } : t
        ),
        deckIndex: s.deckIndex + 1,
        cardsPlayed: s.cardsPlayed + 1,
      };
    });
  }, []);

  const onPass = useCallback(() => {
    setState((s) => ({ ...s, deckIndex: s.deckIndex + 1, cardsPlayed: s.cardsPlayed + 1 }));
  }, []);

  const endTurn = useCallback(() => {
    setState((s) => {
      const reachedTarget =
        s.settings.goalMode === "points" &&
        Math.max(...s.teams.map((t) => t.score)) >= s.settings.winTarget;
      const deckExhausted = s.settings.goalMode === "endless" && s.deckIndex >= s.deck.length;

      if (reachedTarget || deckExhausted) {
        return { ...s, screen: "gameover" };
      }

      if (s.settings.turnMode === "card") {
        // Card mode never shows a round summary — just keep rotating who
        // holds the phone until a win/deck-exhaustion ends the game.
        return {
          ...s,
          currentTeamIndex: (s.currentTeamIndex + 1) % s.teams.length,
          screen: "pass",
        };
      }

      if (s.currentTeamIndex < s.teams.length - 1) {
        return { ...s, currentTeamIndex: s.currentTeamIndex + 1, screen: "pass" };
      }
      return { ...s, screen: "roundend" };
    });
  }, []);

  const endGameEarly = useCallback(() => {
    setState((s) => ({ ...s, screen: "gameover" }));
  }, []);

  const nextRound = useCallback(() => {
    setState((s) => ({
      ...s,
      round: s.round + 1,
      currentTeamIndex: 0,
      teams: s.teams.map((t) => ({ ...t, roundGain: 0 })),
      screen: "pass",
    }));
  }, []);

  const resetGame = useCallback(() => {
    setState(defaultState());
  }, []);

  const value: GameContextValue = {
    state,
    setMode,
    setTurnMode,
    setGoalMode,
    setWinTarget,
    toggleCategory,
    setRoundLength,
    addTeam,
    removeTeam,
    renameTeam,
    cycleTeamAvatar,
    startGame,
    currentCard,
    onCorrect,
    onPass,
    endTurn,
    endGameEarly,
    nextRound,
    resetGame,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within a GameProvider");
  return ctx;
}
