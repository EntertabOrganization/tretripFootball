import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "ghost";
    fullWidth?: boolean;
  }
>;

export function Button({ children, className, variant = "primary", fullWidth, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition duration-200",
        fullWidth && "w-full",
        variant === "primary" && "bg-[var(--color-primary)] text-white shadow-lg shadow-cyan-950/10 hover:bg-[var(--color-primary-strong)]",
        variant === "secondary" && "border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:bg-white/16",
        variant === "ghost" && "border border-[var(--color-outline)] bg-white text-slate-800 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
