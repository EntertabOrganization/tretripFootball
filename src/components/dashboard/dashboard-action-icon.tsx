import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

type BaseProps = {
  label: string;
  tone?: "default" | "danger";
  children: ReactNode;
};

const baseClasses =
  "inline-flex h-10 w-10 items-center justify-center rounded-2xl border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2a7f8c] focus-visible:ring-offset-2";

const toneClasses = {
  default: "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-950",
  danger: "border-rose-200 bg-white text-rose-600 hover:bg-rose-50 hover:text-rose-700",
} as const;

export function DashboardActionLink({
  label,
  tone = "default",
  children,
  className,
  ...props
}: BaseProps & ComponentProps<typeof Link>) {
  return (
    <Link aria-label={label} title={label} className={cn(baseClasses, toneClasses[tone], className)} {...props}>
      {children}
      <span className="sr-only">{label}</span>
    </Link>
  );
}

export function DashboardActionButton({
  label,
  tone = "default",
  children,
  className,
  ...props
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      aria-label={label}
      title={label}
      className={cn(baseClasses, toneClasses[tone], className)}
      {...props}
    >
      {children}
      <span className="sr-only">{label}</span>
    </button>
  );
}
