"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/brand/Logo";
import { MimoMascot } from "@/components/brand/MimoMascot";

export default function Home() {
  const router = useRouter();

  return (
    <div
      className="min-h-dvh flex flex-col"
      style={{
        background: "var(--sun-lt)",
        backgroundImage:
          "radial-gradient(circle, oklch(84% .17 82 / .28) 1.6px, transparent 1.6px)",
        backgroundSize: "26px 26px",
      }}
    >
      <main className="flex-1 w-full max-w-md mx-auto flex flex-col items-center text-center px-6 py-4">
        <div className="w-full flex justify-end">
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

        <div className="mt-3">
          <Logo size="lg" />
        </div>
        <p className="text-[15px] font-bold text-txt2 mt-1">
          Charades for the whole family.
        </p>

        <div className="flex-1 flex items-center justify-center min-h-[200px]">
          <MimoMascot state="happy" size={168} className="animate-bounce-spring" />
        </div>

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
