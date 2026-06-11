"use client";

import { ButtonHTMLAttributes } from "react";

type ChipColor = "sun" | "mint" | "sky" | "coral" | "plum";

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ChipColor;
  active?: boolean;
}

const idle: Record<ChipColor, string> = {
  sun:   "bg-sun-lt   text-sun-dk",
  mint:  "bg-mint-lt  text-mint-dk",
  sky:   "bg-sky-lt   text-sky-dk",
  coral: "bg-coral-lt text-coral-dk",
  plum:  "bg-plum-lt  text-plum-dk",
};

const on: Record<ChipColor, string> = {
  sun:   "bg-sun   text-txt",
  mint:  "bg-mint  text-white",
  sky:   "bg-sky   text-white",
  coral: "bg-coral text-white",
  plum:  "bg-plum  text-white",
};

export function Chip({
  color = "sun",
  active = false,
  className = "",
  children,
  ...props
}: ChipProps) {
  return (
    <button
      className={
        "inline-flex items-center gap-1.5 px-4 py-[7px] rounded-full " +
        "font-body text-[13px] font-bold border-none cursor-pointer " +
        "transition-[transform,filter] duration-200 " +
        "hover:scale-[1.06] hover:brightness-105 " +
        "active:scale-[.97] " +
        `${active ? on[color] : idle[color]} ${className}`
      }
      {...props}
    >
      {children}
    </button>
  );
}
