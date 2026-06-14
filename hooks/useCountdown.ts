"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface UseCountdownOptions {
  onExpire?: () => void;
}

export function useCountdown(durationSeconds: number, { onExpire }: UseCountdownOptions = {}) {
  const [current, setCurrent] = useState(durationSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const onExpireRef = useRef(onExpire);
  const currentRef = useRef(current);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      // Read/write through a ref (rather than a setState updater) so the
      // expiry side effects below run exactly once per tick — React may
      // invoke setState updater functions more than once (e.g. under Strict
      // Mode in dev), which would otherwise double-fire onPass()/endTurn().
      const next = currentRef.current <= 1 ? 0 : currentRef.current - 1;
      currentRef.current = next;
      setCurrent(next);

      if (next === 0) {
        setIsRunning(false);
        onExpireRef.current?.();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(
    (next: number = durationSeconds) => {
      setIsRunning(false);
      currentRef.current = next;
      setCurrent(next);
    },
    [durationSeconds]
  );

  return { current, isRunning, start, pause, reset };
}
