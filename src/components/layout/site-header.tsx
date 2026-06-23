import Image from "next/image";
import Link from "next/link";

import { logoutAction } from "@/lib/actions";
import { t } from "@/lib/i18n";
import type { Locale, Profile } from "@/lib/types";
import { LanguageSwitcher } from "@/components/layout/language-switcher";

type Props = {
  locale: Locale;
  profile: Profile | null;
  path: string;
};

export function SiteHeader({ locale, profile, path }: Props) {
  const copy = t(locale);

  return (
    <header className="sticky top-0 z-40 px-4 py-4 sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center gap-4 rounded-[28px] border border-white/15 bg-slate-950/55 px-5 py-4 shadow-2xl shadow-slate-950/25 backdrop-blur-xl">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image src="/Logo.png" alt="TreTrip FanZone" width={52} height={52} className="h-11 w-11 rounded-2xl object-cover" priority />
          <div className="min-w-0">
            <p className="truncate font-display text-xl text-white">{copy.home.eyebrow}</p>
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Football Platform</p>
          </div>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-7 lg:flex">
          <Link href="/#home" className="text-sm text-white/80 transition hover:text-white">
            {copy.nav.home}
          </Link>
          <Link href="/#about" className="text-sm text-white/80 transition hover:text-white">
            {copy.nav.about}
          </Link>
          <Link href="/competitions" className="text-sm text-white/80 transition hover:text-white">
            {copy.nav.competitions}
          </Link>
          <Link href="/news" className="text-sm text-white/80 transition hover:text-white">
            {copy.nav.news}
          </Link>
          {profile ? (
            <Link href="/dashboard" className="text-sm text-white/80 transition hover:text-white">
              {copy.nav.dashboard}
            </Link>
          ) : null}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <LanguageSwitcher locale={locale} path={path} />

          {profile ? (
            <>
              <Link
                href="/profile"
                className="hidden rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 sm:inline-flex"
              >
                {copy.nav.profile}
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-strong)]"
                >
                  {copy.nav.logout}
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 sm:inline-flex"
              >
                {copy.nav.login}
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-strong)]"
              >
                {copy.nav.signup}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
