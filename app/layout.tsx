import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { GameProvider } from "@/hooks/useGameState";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--loaded-font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--loaded-font-body",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Showrades — Charades for the whole family",
  description:
    "The free, open-source web app that brings generations together for game night. Picture mode for kids, word mode for everyone.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "oklch(84% .17 82)",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable}`}>
      <body className="min-h-dvh flex flex-col antialiased">
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}
