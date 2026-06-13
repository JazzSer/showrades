import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "sun" | "mint" | "coral" | "sky" | "plum" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const base =
  "inline-flex items-center justify-center gap-2 font-body font-bold rounded-full " +
  "leading-none whitespace-nowrap cursor-pointer border-none " +
  "transition-[transform,box-shadow] duration-200 " +
  "active:translate-y-[3px] active:!shadow-none";

const variants: Record<Variant, string> = {
  sun:
    "bg-sun text-txt " +
    "[box-shadow:0_5px_0_var(--sun-dk)] " +
    "hover:-translate-y-0.5 hover:[box-shadow:0_7px_0_var(--sun-dk)]",
  mint:
    "bg-mint text-white " +
    "[box-shadow:0_5px_0_var(--mint-dk)] " +
    "hover:-translate-y-0.5 hover:[box-shadow:0_7px_0_var(--mint-dk)]",
  coral:
    "bg-coral text-white " +
    "[box-shadow:0_5px_0_var(--coral-dk)] " +
    "hover:-translate-y-0.5 hover:[box-shadow:0_7px_0_var(--coral-dk)]",
  sky:
    "bg-sky text-white " +
    "[box-shadow:0_5px_0_var(--sky-dk)] " +
    "hover:-translate-y-0.5 hover:[box-shadow:0_7px_0_var(--sky-dk)]",
  plum:
    "bg-plum text-white " +
    "[box-shadow:0_5px_0_var(--plum-dk)] " +
    "hover:-translate-y-0.5 hover:[box-shadow:0_7px_0_var(--plum-dk)]",
  outline:
    "bg-surface text-txt border-2 border-[var(--border-dk)] " +
    "[box-shadow:0_5px_0_var(--border-dk)] " +
    "hover:-translate-y-0.5 hover:[box-shadow:0_7px_0_var(--border-dk)]",
  ghost:
    "bg-transparent text-txt2 " +
    "hover:bg-surf2 hover:text-txt",
};

const sizes: Record<Size, string> = {
  sm: "text-[13px] px-5 py-2",
  md: "text-base px-8 py-4",
  lg: "text-[22px] px-10 py-5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "sun", size = "md", className = "", ...props }, ref) => (
    <button
      ref={ref}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  )
);
Button.displayName = "Button";
