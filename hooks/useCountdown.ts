"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface UseCountdownOptions {
  onExpire?: () => void;
}

export function useCountdown(durationSeconds: number, { onExpire }: UseCountdownOptions = {}) {
  const [current, setCurrent] = useState(durationSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setCurrent((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          onExpireRef.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(
    (next: number = durationSeconds) => {
      setIsRunning(false);
      setCurrent(next);
    },
    [durationSeconds]
  );

  return { current, isRunning, start, pause, reset };
}
