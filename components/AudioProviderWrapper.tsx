"use client";
import { AudioProvider } from "@/hooks/useAudio";

export function AudioProviderWrapper({ children }: { children: React.ReactNode }) {
  return <AudioProvider>{children}</AudioProvider>;
}
