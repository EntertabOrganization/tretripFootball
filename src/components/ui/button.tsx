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
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition",
        fullWidth && "w-full",
        variant === "primary" && "bg-[var(--color-primary)] text-white shadow-lg shadow-cyan-950/20 hover:bg-[var(--color-primary-strong)]",
        variant === "secondary" && "border border-white/50 bg-white/10 text-white hover:bg-white/20",
        variant === "ghost" && "border border-slate-200 bg-white text-slate-800 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
