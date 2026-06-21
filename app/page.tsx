"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/brand/Logo";
import { MimoMascot } from "@/components/brand/MimoMascot";
import { cx } from "@/lib/styles";
import { useAudio } from "@/hooks/useAudio";

export default function Home() {
  const router = useRouter();
  const { muted, toggleMute, setScene } = useAudio();

  useEffect(() => {
    setScene("menu");
  }, [setScene]);

  return (
    <div
      className={cx.pageRoot}
      style={{
        background: "var(--sun-lt)",
        backgroundImage:
          "radial-gradient(circle, oklch(84% .17 82 / .28) 1.6px, transparent 1.6px)",
        backgroundSize: "26px 26px",
      }}
    >
      <main className="flex-1 w-full max-w-md mx-auto flex flex-col items-center text-center px-6 py-4">
        {/* Top-right icon buttons */}
        <div className="w-full flex justify-end gap-2">
          <button
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            className="w-[44px] h-[44px] rounded-full bg-surface border border-[var(--border)] flex items-center justify-center text-txt2 [box-shadow:var(--sh1)]"
          >
            {muted ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
            )}
          </button>
          <Link
            href="/how-to-play"
            title="How to play"
            aria-label="How to play"
            className="w-11 h-11 rounded-full bg-surface border border-[var(--border)] flex items-center justify-center text-txt2 [box-shadow:var(--sh1)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3" strokeLinecap="round" />
              <line x1="12" y1="17" x2="12" y2="17" strokeLinecap="round" strokeWidth="2.6" />
            </svg>
          </Link>
        </div>

        {/* Brand mark */}
        <div className="mt-3">
          <Logo size="lg" />
        </div>
        <p className="text-[15px] font-bold text-txt2 mt-1">
          Charades for the whole family.
        </p>

        {/* Mascot */}
        <div className="flex-1 flex items-center justify-center min-h-[200px]">
          <MimoMascot state="happy" size={168} className="animate-bounce-spring" />
        </div>

        {/* CTA */}
        <div className="w-full flex flex-col gap-3.5">
          <Button
            variant="sun"
            size="lg"
            className="w-full"
            onClick={() => router.push("/setup")}
          >
            Start Game
          </Button>
        </div>

        <p className="text-[12px] font-bold text-txt3 mt-4">
          No reading required · Plays offline · Free
        </p>
      </main>
    </div>
  );
}
