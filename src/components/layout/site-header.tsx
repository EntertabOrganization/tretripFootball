"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { logoutAction } from "@/lib/actions";
import { t } from "@/lib/dictionaries";
import type { Locale, Profile } from "@/lib/types";

type Props = {
  locale: Locale;
  profile: Profile | null;
  path?: string;
};

const navItems = [
  { href: "/#home", key: "home" },
  { href: "/#about", key: "about" },
  { href: "/#arab-teams", key: "competitions" },
  { href: "/news", key: "news" },
] as const;

export function SiteHeader({ locale, profile, path }: Props) {
  const copy = t(locale);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logoSrc = isScrolled ? "/SecondLogo.svg" : "/Logo.png";

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 24);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    const closeMenu = () => setIsMobileMenuOpen(false);
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, []);

  const actionClass =
    "rounded-2xl border border-white/24 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10";

  return (
    <header className={`fixed inset-x-0 top-0 z-[1000] px-4 transition-all duration-300 sm:px-6 ${isScrolled ? "py-3" : "py-6"}`}>
      <div className="public-container">
        <div
          className={`rounded-[32px] border px-5 transition-all duration-300 sm:px-6 ${
            isScrolled
              ? "border-white/12 bg-[var(--color-primary)] py-4 text-white shadow-[0_24px_50px_-28px_rgba(10,41,46,0.85)] backdrop-blur-2xl"
              : "border-white/16 py-5 text-white shadow-[0_30px_80px_-36px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          }`}
        >
          <div className="flex items-center gap-4">
            <Link href="/" className="flex min-w-0 items-center gap-4">
              <Image
                src={logoSrc}
                alt="TreTrip FanZone"
                width={74}
                height={74}
                className={`${
                  isScrolled
                    ? "h-[60px] w-[60px] brightness-0 invert sm:h-[64px] sm:w-[64px]"
                    : "h-[64px] w-[64px] sm:h-[74px] sm:w-[74px]"
                } rounded-2xl object-contain transition-all duration-300`}
                priority
              />
            </Link>

            <nav className="mx-auto hidden items-center gap-6 xl:flex">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="text-lg font-medium text-white/88 transition hover:text-white">
                  {copy.nav[item.key]}
                </Link>
              ))}
            </nav>

            <div className="ms-auto hidden items-center gap-3 xl:flex">
              <LanguageSwitcher locale={locale} path={path} />

              {profile ? (
                <>
                  <Link href="/dashboard" className={actionClass}>
                    {copy.nav.dashboard}
                  </Link>
                  <form action={logoutAction}>
                    <button type="submit" className={actionClass}>
                      {copy.nav.logout}
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link href="/login" className={actionClass}>
                    {copy.nav.login}
                  </Link>
                  <Link href="/signup" className={actionClass}>
                    {copy.nav.signup}
                  </Link>
                </>
              )}
            </div>

            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="ms-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/24 text-white transition hover:bg-white/10 xl:hidden"
              onClick={() => setIsMobileMenuOpen((value) => !value)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {isMobileMenuOpen ? (
            <div className="mt-4 space-y-3 border-t border-white/14 pt-4 xl:hidden">
              <nav className="grid gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-2xl border border-white/12 px-4 py-3 text-base font-medium text-white/92 transition hover:bg-white/10"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {copy.nav[item.key]}
                  </Link>
                ))}
              </nav>

              <div className="flex flex-col gap-3 pt-2">
                <LanguageSwitcher locale={locale} path={path} />

                {profile ? (
                  <>
                    <Link href="/dashboard" className={actionClass} onClick={() => setIsMobileMenuOpen(false)}>
                      {copy.nav.dashboard}
                    </Link>
                    <form action={logoutAction}>
                      <button type="submit" className={`${actionClass} w-full text-start`}>
                        {copy.nav.logout}
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <Link href="/login" className={actionClass} onClick={() => setIsMobileMenuOpen(false)}>
                      {copy.nav.login}
                    </Link>
                    <Link href="/signup" className={actionClass} onClick={() => setIsMobileMenuOpen(false)}>
                      {copy.nav.signup}
                    </Link>
                  </>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
