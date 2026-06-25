import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Ticket, User } from "lucide-react";

import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { logoutAction } from "@/lib/actions";
import { t } from "@/lib/i18n";
import type { Locale, Profile } from "@/lib/types";

type Props = {
  locale: Locale;
  profile: Profile | null;
  path: string;
};

const navItems = [
  { href: "/#home", key: "home" },
  { href: "/#about", key: "about" },
  { href: "/#arab-teams", key: "competitions" },
  { href: "/news", key: "news" },
] as const;

export function SiteHeader({ locale, profile, path }: Props) {
  const copy = t(locale);

  return (
    <header className="absolute inset-x-0 top-0 z-40 px-4 py-6 sm:px-6">
      <div className="public-container">
        <div className="mb-5 flex items-center justify-between gap-4 text-white/88">
          <div className="inline-flex items-center gap-2 text-sm font-semibold">
            <CalendarDays className="h-4 w-4" />
            <span>Thursday, June 25, 2026</span>
          </div>

          {profile ? (
            <Link
              href="/profile"
              className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/8 px-4 py-2 text-sm font-semibold transition hover:bg-white/14"
            >
              <User className="h-4 w-4" />
              {copy.nav.profile}
            </Link>
          ) : null}
        </div>

        <div className="public-glass-dark flex flex-wrap items-center gap-5 rounded-[32px] px-6 py-5 text-white shadow-[0_30px_80px_-36px_rgba(0,0,0,0.6)]">
          <Link href="/" className="flex min-w-0 items-center gap-4">
            <Image src="/Logo.png" alt="TreTrip FanZone" width={74} height={74} className="h-[74px] w-[74px] rounded-2xl object-contain" priority />
            <div className="min-w-0">
              <p className="public-heading text-2xl font-extrabold tracking-tight sm:text-3xl">{copy.home.eyebrow}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.28em] text-white/64">Arab Cup Fan Experience</p>
            </div>
          </Link>

          <nav className="mx-auto hidden items-center gap-8 xl:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-lg font-medium text-white/84 transition hover:text-white">
                {copy.nav[item.key]}
              </Link>
            ))}
          </nav>

          <div className="ms-auto flex flex-wrap items-center gap-3">
            <Link
              href="/competitions"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#35c7a4] px-6 py-3.5 text-sm font-bold text-[#0f3c41] transition hover:bg-[#58d7b7]"
            >
              <Ticket className="h-4 w-4" />
              Buy Tickets
            </Link>

            <LanguageSwitcher locale={locale} path={path} />

            {profile ? (
              <>
                <Link
                  href="/dashboard"
                  className="rounded-2xl border border-white/18 bg-white/6 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/12"
                >
                  {copy.nav.dashboard}
                </Link>
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="rounded-2xl border border-white/18 bg-white/6 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/12"
                  >
                    {copy.nav.logout}
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-2xl border border-white/18 bg-white/6 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/12"
                >
                  {copy.nav.login}
                </Link>
                <Link href="/signup" className="rounded-2xl border border-white/18 bg-white/6 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/12">
                  {copy.nav.signup}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
