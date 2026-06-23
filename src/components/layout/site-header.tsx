import Image from "next/image";
import Link from "next/link";

import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { logoutAction } from "@/lib/actions";
import { t } from "@/lib/i18n";
import type { Locale, Profile } from "@/lib/types";

type Props = {
  locale: Locale;
  profile: Profile | null;
  path: string;
};

export function SiteHeader({ locale, profile, path }: Props) {
  const copy = t(locale);

  return (
    <header className="sticky top-0 z-40 px-4 py-4 sm:px-6">
      <div className="public-container">
        <div className="public-glass flex min-h-20 flex-wrap items-center justify-between gap-4 rounded-[28px] px-5 py-4 shadow-[0_24px_60px_-35px_rgba(15,23,42,0.55)]">
          <div className="flex min-w-0 items-center gap-4">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <Image src="/Logo.png" alt="TreTrip FanZone" width={54} height={54} className="h-12 w-12 rounded-2xl object-cover" priority />
              <div className="min-w-0">
                <p className="public-heading truncate text-xl font-bold text-white sm:text-2xl">{copy.home.eyebrow}</p>
                <p className="text-xs uppercase tracking-[0.26em] text-white/68">Global Sports Community</p>
              </div>
            </Link>

            <nav className="hidden items-center gap-6 lg:flex">
              <Link href="/#home" className="text-sm font-semibold text-white/80 transition hover:text-white">
                {copy.nav.home}
              </Link>
              <Link href="/#about" className="text-sm font-semibold text-white/80 transition hover:text-white">
                {copy.nav.about}
              </Link>
              <Link href="/competitions" className="text-sm font-semibold text-white/80 transition hover:text-white">
                {copy.nav.competitions}
              </Link>
              <Link href="/news" className="text-sm font-semibold text-white/80 transition hover:text-white">
                {copy.nav.news}
              </Link>
            </nav>
          </div>

          <div className="ms-auto flex flex-wrap items-center gap-3">
            <LanguageSwitcher locale={locale} path={path} />

            {profile ? (
              <>
                <Link
                  href="/dashboard"
                  className="rounded-xl border border-white/22 bg-white/8 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/14"
                >
                  {copy.nav.dashboard}
                </Link>
                <Link
                  href="/profile"
                  className="rounded-xl border border-white/22 bg-white/8 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/14"
                >
                  {copy.nav.profile}
                </Link>
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-[var(--color-primary)] transition hover:bg-[var(--color-primary-soft)]"
                  >
                    {copy.nav.logout}
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-xl border border-white/22 bg-white/8 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/14"
                >
                  {copy.nav.login}
                </Link>
                <Link href="/signup" className="rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-[var(--color-primary)] transition hover:bg-[var(--color-primary-soft)]">
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
