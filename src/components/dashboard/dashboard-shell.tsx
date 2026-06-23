"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  LayoutGrid,
  LogOut,
  Menu,
  MessageSquareText,
  Newspaper,
  Shield,
  Trophy,
  UserCircle2,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ComponentType, ReactNode } from "react";

import { logoutAction } from "@/lib/actions";
import { dictionaries, t } from "@/lib/dictionaries";
import { hasMinimumRole } from "@/lib/permissions";
import type { Locale, Profile } from "@/lib/types";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!profileMenuRef.current?.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const initials = useMemo(
    () => `${profile.first_name.slice(0, 1)}${profile.last_name.slice(0, 1)}`.toUpperCase(),
    [profile.first_name, profile.last_name],
  );

  const isItemActive = (href: string) => pathname === href || (href !== "/dashboard" && pathname.startsWith(`${href}/`));

  return (
    <div className="min-h-screen bg-[#f7f7f3] text-slate-900">
      <div className="flex min-h-screen">
        {isSidebarOpen ? (
          <button
            type="button"
            aria-label="Close sidebar overlay"
            className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        ) : null}

        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex h-screen flex-col border-r border-[#e6e3d8] bg-[#f8f7f2] px-3 py-5 transition-transform duration-300 lg:sticky lg:top-0 lg:z-30 lg:translate-x-0",
            isSidebarCollapsed ? "lg:w-[104px]" : "lg:w-[285px]",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between gap-3 border-b border-[#e6e3d8] px-2 pb-5">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <Image src="/Logo.png" alt="TreTrip FanZone" width={52} height={52} className="h-12 w-12 rounded-2xl object-cover" priority />
              <div className={cn("min-w-0", isSidebarCollapsed && "hidden")}>
                <p className="font-display text-4xl leading-none text-[#0f172a]">TreTrip</p>
                <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-400">FanZone CMS</p>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 lg:hidden"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="mt-6 flex-1 space-y-1 overflow-y-auto">
            <p className={cn("px-3 pb-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400", isSidebarCollapsed && "text-center")}>
              {isSidebarCollapsed ? "CMS" : "Workspace"}
            </p>
            {baseItems
              .filter((item) => hasMinimumRole(profile.role, item.minimumRole))
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  title={isSidebarCollapsed ? copy.dashboard[item.key] : undefined}
                  className={cn(
                    "flex items-center rounded-2xl px-4 py-3 text-sm font-semibold transition",
                    isSidebarCollapsed ? "justify-center" : "gap-3",
                    isItemActive(item.href) ? "bg-[#eef5f3] text-[#1f7a68]" : "text-slate-500 hover:bg-white hover:text-slate-900",
                  )}
                >
                  <item.icon size={18} />
                  <span className={cn(isSidebarCollapsed && "hidden")}>{copy.dashboard[item.key]}</span>
                </Link>
              ))}
          </nav>

          <div className="mt-6 hidden border-t border-[#e6e3d8] pt-5 lg:block">
            <button
              type="button"
              onClick={() => setIsSidebarCollapsed((value) => !value)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              <span className={cn(isSidebarCollapsed && "hidden")}>{isSidebarCollapsed ? "Expand" : "Collapse"}</span>
            </button>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-4 border-b border-[#e6e3d8] bg-white/95 px-4 py-4 backdrop-blur sm:px-6 sm:py-5">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsSidebarOpen(true)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-600 lg:hidden"
              >
                <Menu size={18} />
              </button>
              <button
                type="button"
                onClick={() => setIsSidebarCollapsed((value) => !value)}
                className="hidden h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-600 lg:inline-flex"
              >
                {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              </button>

              <div className="flex items-center gap-3">
                <Image src="/Logo.png" alt="TreTrip FanZone" width={44} height={44} className="h-11 w-11 rounded-2xl object-cover sm:hidden" />
                <div>
                  <h1 className="font-display text-3xl text-slate-950 sm:text-4xl">Dashboard</h1>
                  <p className="text-sm text-slate-500">Overview of your workspace.</p>
                </div>
              </div>
            </div>

            <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end sm:gap-4">
              <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-500 md:flex">
                <CalendarDays size={18} />
                {new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-US", {
                  month: "short",
                  year: "numeric",
                }).format(new Date())}
              </div>

              <div ref={profileMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setIsProfileMenuOpen((value) => !value)}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:bg-slate-50"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[#1f7a68] to-[#2a7f8c] text-sm font-bold text-white">
                    {initials}
                  </div>
                  <div className="hidden text-left md:block">
                    <p className="font-semibold text-slate-900">
                      {profile.first_name} {profile.last_name}
                    </p>
                    <p className="text-sm text-slate-500">{profile.email}</p>
                  </div>
                  <ChevronDown size={18} className={cn("text-slate-400 transition", isProfileMenuOpen && "rotate-180")} />
                </button>

                {isProfileMenuOpen ? (
                  <div className="absolute end-0 top-[calc(100%+12px)] z-30 w-60 rounded-[24px] border border-slate-200 bg-white p-2 shadow-2xl">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      <UserCircle2 size={18} />
                      {copy.nav.profile}
                    </Link>
                    <Link
                      href="/"
                      className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      <ExternalLink size={18} />
                      Website
                    </Link>
                    <form action={logoutAction}>
                      <button
                        type="submit"
                        className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                      >
                        <LogOut size={18} />
                        {copy.nav.logout}
                      </button>
                    </form>
                  </div>
                ) : null}
              </div>
            </div>
          </header>

          <main className="space-y-6 px-4 py-6 sm:px-6 sm:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
