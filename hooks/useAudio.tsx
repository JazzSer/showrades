"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const BASE = process.env.NODE_ENV === "production" ? "/showrades" : "";

export type SfxName =
  | "correct"
  | "pass"
  | "timeup"
  | "tick"
  | "roundend"
  | "cardflip"
  | "click";

export type AudioScene = "menu" | "game" | "none";

const SFX_FILES: Record<SfxName, string> = {
  correct:  `${BASE}/sounds/game/correct.wav`,
  pass:     `${BASE}/sounds/game/wrong.wav`,
  timeup:   `${BASE}/sounds/game/timer-tick-2.wav`, // TODO: source proper time-up sound
  tick:     `${BASE}/sounds/game/timer-tick.wav`,
  roundend: `${BASE}/sounds/game/wrong.wav`, // TODO: source proper round-end/winner sound
  cardflip: `${BASE}/sounds/ui/card-flip.wav`,
  click:    `${BASE}/sounds/ui/click.wav`,
};

const BGM_FILES: Record<Exclude<AudioScene, "none">, string> = {
  menu: `${BASE}/sounds/music/Picnic Dice Parade.mp3`,
  game: `${BASE}/sounds/music/Kalimba Drift Loop.mp3`,
};

const BGM_VOLUME: Record<Exclude<AudioScene, "none">, number> = {
  menu: 0.55,
  game: 0.22,
};

const MUTE_KEY = "showrades_muted";

interface AudioContextValue {
  muted: boolean;
  toggleMute: () => void;
  playSfx: (name: SfxName) => void;
  setScene: (scene: AudioScene) => void;
}

const AudioCtx = createContext<AudioContextValue>({
  muted: false,
  toggleMute: () => {},
  playSfx: () => {},
  setScene: () => {},
});

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [muted, setMuted] = useState(false);
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const sceneRef = useRef<AudioScene>("none");

  useEffect(() => {
    // Hydration-safe load: SSR/initial render defaults to unmuted, then we
    // sync from localStorage once mounted on the client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMuted(localStorage.getItem(MUTE_KEY) === "true");
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      localStorage.setItem(MUTE_KEY, String(next));
      if (bgmRef.current) bgmRef.current.muted = next;
      return next;
    });
  }, []);

  const playSfx = useCallback(
    (name: SfxName) => {
      if (muted) return;
      const audio = new Audio(SFX_FILES[name]);
      audio.volume = 0.7;
      audio.play().catch(() => {});
    },
    [muted]
  );

  const setScene = useCallback(
    (scene: AudioScene) => {
      if (sceneRef.current === scene) return;
      sceneRef.current = scene;

      // Fade out and stop existing BGM
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current = null;
      }

      if (scene === "none") return;

      const audio = new Audio(BGM_FILES[scene]);
      audio.loop = true;
      audio.volume = muted ? 0 : BGM_VOLUME[scene];
      audio.muted = muted;
      bgmRef.current = audio;
      audio.play().catch(() => {});
    },
    [muted]
  );

  // Clean up BGM on unmount
  useEffect(() => {
    return () => {
      bgmRef.current?.pause();
    };
  }, []);

  return (
    <AudioCtx.Provider value={{ muted, toggleMute, playSfx, setScene }}>
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  return useContext(AudioCtx);
}
