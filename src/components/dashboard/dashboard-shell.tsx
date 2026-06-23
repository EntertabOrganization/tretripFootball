"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, ChevronDown, LayoutGrid, MessageSquareText, Newspaper, Shield, Trophy, Users } from "lucide-react";
import type { ComponentType, ReactNode } from "react";

import type { Locale, Profile } from "@/lib/types";
import { dictionaries, t } from "@/lib/dictionaries";
import { hasMinimumRole } from "@/lib/permissions";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  locale: Locale;
  profile: Profile;
};

const baseItems = [
  { href: "/dashboard", key: "overview", minimumRole: "USER" as const, icon: LayoutGrid },
  { href: "/dashboard/news", key: "articles", minimumRole: "EDITOR" as const, icon: Newspaper },
  { href: "/dashboard/competitions", key: "competitions", minimumRole: "ADMIN" as const, icon: Trophy },
  { href: "/dashboard/comments", key: "comments", minimumRole: "ADMIN" as const, icon: MessageSquareText },
  { href: "/dashboard/categories", key: "categories", minimumRole: "ADMIN" as const, icon: Shield },
  { href: "/dashboard/users", key: "users", minimumRole: "ADMIN" as const, icon: Users },
] as const satisfies ReadonlyArray<{
  href: string;
  key: keyof typeof dictionaries.en.dashboard;
  minimumRole: "ADMIN" | "EDITOR" | "USER";
  icon: ComponentType<{ size?: number; className?: string }>;
}>;

export function DashboardShell({ children, locale, profile }: Props) {
  const copy = t(locale);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f7f7f3] text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-[285px_1fr]">
        <aside className="border-r border-[#e6e3d8] bg-[#f8f7f2] px-4 py-6">
          <div className="flex items-center gap-3 border-b border-[#e6e3d8] px-3 pb-6">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#1f7a68] font-display text-xl text-white">TF</div>
            <div>
              <p className="font-display text-4xl leading-none text-[#0f172a]">TreTrip</p>
              <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-400">FanZone CMS</p>
            </div>
          </div>

          <nav className="mt-6 space-y-1">
            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Workspace</p>
            {baseItems
              .filter((item) => hasMinimumRole(profile.role, item.minimumRole))
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition",
                    pathname === item.href
                      ? "bg-[#eef5f3] text-[#1f7a68]"
                      : "text-slate-500 hover:bg-white hover:text-slate-900",
                  )}
                >
                  <item.icon size={18} />
                  {copy.dashboard[item.key]}
                </Link>
              ))}
          </nav>

          <div className="mt-8 border-t border-[#e6e3d8] pt-6">
            <div className="rounded-[26px] bg-white px-4 py-4 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Signed in</p>
              <p className="mt-3 font-semibold text-slate-900">
                {profile.first_name} {profile.last_name}
              </p>
              <p className="mt-1 text-sm text-slate-500">{profile.role}</p>
            </div>
          </div>
        </aside>

        <div>
          <header className="flex items-center justify-between border-b border-[#e6e3d8] bg-white px-6 py-5">
            <div>
              <h1 className="font-display text-4xl text-slate-950">Dashboard</h1>
              <p className="text-sm text-slate-500">Overview of your workspace.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-500 md:flex">
                <CalendarDays size={18} />
                {new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-US", {
                  month: "short",
                  year: "numeric",
                }).format(new Date())}
              </div>
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[#1f7a68] to-[#2a7f8c] text-sm font-bold text-white">
                  {profile.first_name.slice(0, 1)}
                  {profile.last_name.slice(0, 1)}
                </div>
                <div className="hidden md:block">
                  <p className="font-semibold text-slate-900">
                    {profile.first_name} {profile.last_name}
                  </p>
                  <p className="text-sm text-slate-500">{profile.email}</p>
                </div>
                <ChevronDown size={18} className="text-slate-400" />
              </div>
            </div>
          </header>

          <main className="space-y-6 px-6 py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
