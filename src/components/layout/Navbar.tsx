'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useState, useEffect } from 'react';
import { ChevronDown, Globe2, LogIn, Menu, UserPlus, X } from 'lucide-react';

export function Navbar() {
  const locale = useLocale();
  const t = useTranslations('Navbar');
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLocale = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  const navItems = [
    { label: t('home'), href: '/' },
    { label: t('about'), href: '#about', hasDropdown: true },
    { label: t('matches'), href: '#matches', hasDropdown: true },
    { label: t('saffFans'), href: '#fans' },
    { label: t('fanZone'), href: '#fan-zones' },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-lg py-0 px-0'
          : 'px-4 pt-8 md:px-8 lg:px-14'
      }`}
    >
      <div className={`mx-auto max-w-[112rem] ${scrolled ? 'px-4 md:px-8 lg:px-14' : ''}`}>
        <nav
          className={`transition-all duration-300 ${
            scrolled
              ? 'rounded-none border-0 bg-transparent px-4 py-3 shadow-none backdrop-blur-none md:px-8'
              : 'rounded-[1.25rem] border border-white/15 bg-white/12 px-4 py-4 shadow-[0_18px_55px_rgba(0,0,0,0.22)] backdrop-blur-xl md:px-8'
          }`}
        >
          <div className="flex items-center justify-between gap-8">
            <Link href="/" className="flex shrink-0 items-center gap-4">
              <Image
                src="/TreTrip.svg"
                alt="TreTrip"
                width={556}
                height={556}
                priority
                className={`h-14 w-auto transition-all duration-300 md:h-16 ${scrolled ? 'brightness-0' : 'brightness-0 invert'}`}
              />
              <span className={`hidden h-12 w-px sm:block transition-colors duration-300 ${scrolled ? 'bg-black/20' : 'bg-white/40'}`} />
            </Link>

            <div
              className={`hidden flex-1 items-center justify-center gap-8 rounded-2xl px-8 py-4 text-base font-semibold lg:flex transition-colors duration-300 ${
                scrolled
                  ? 'bg-transparent text-gray-800'
                  : 'bg-white/5 text-white/85 py-5 text-lg'
              }`}
            >
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-1.5 transition-colors hover:text-primary ${scrolled ? 'text-gray-700' : ''}`}
                >
                  {item.label}
                  {item.hasDropdown ? <ChevronDown size={16} /> : null}
                </a>
              ))}
            </div>

            <div className="hidden shrink-0 items-center gap-3 lg:flex">
              <a
                href="/sign-in"
                className={`flex min-w-36 items-center justify-center gap-2 rounded-md px-5 py-3.5 text-base font-bold transition-colors ${
                  scrolled
                    ? 'border-2 border-primary/80 bg-transparent text-primary hover:bg-primary hover:text-white'
                    : 'border-2 border-white/30 bg-white/5 text-white hover:bg-white/15'
                }`}
              >
                <LogIn size={18} />
                {t('signIn')}
              </a>
              <a
                href="/sign-up"
                className="flex min-w-36 items-center justify-center gap-2 rounded-md bg-primary px-5 py-3.5 text-base font-bold text-white shadow-[0_8px_20px_rgba(11,157,181,0.28)] transition-colors hover:bg-accent"
              >
                <UserPlus size={18} />
                {t('signUp')}
              </a>
              <button
                onClick={switchLocale}
                className={`flex h-11 w-11 items-center justify-center rounded-md border-2 font-bold transition-colors ${
                  scrolled
                    ? 'border-primary/60 bg-transparent text-primary hover:bg-primary hover:text-white'
                    : 'border-primary/80 bg-white/5 text-white hover:bg-primary'
                }`}
                title={locale === 'en' ? 'Switch to Arabic' : 'Switch to English'}
              >
                <Globe2 size={18} />
              </button>
            </div>

            <button
              className={`flex h-11 w-11 items-center justify-center rounded-lg border transition-colors lg:hidden ${
                scrolled
                  ? 'border-gray-300 bg-gray-100 text-gray-700 hover:text-primary'
                  : 'border-white/20 bg-white/10 text-white hover:text-primary'
              }`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isOpen ? (
            <div
              className={`mt-4 flex flex-col gap-3 border-t pt-4 lg:hidden ${
                scrolled ? 'border-gray-200' : 'border-white/10'
              }`}
            >
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center justify-between rounded-lg px-4 py-3 font-bold transition-colors hover:text-primary ${
                    scrolled ? 'bg-gray-100 text-gray-800' : 'bg-white/5 text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                  {item.hasDropdown ? <ChevronDown size={16} /> : null}
                </a>
              ))}
              <div className="flex gap-3 mt-2">
                <a
                  href="/sign-in"
                  className={`flex flex-1 items-center justify-center gap-2 rounded-md border-2 px-5 py-3.5 font-bold transition-colors ${
                    scrolled ? 'border-primary text-primary' : 'border-white/30 text-white'
                  }`}
                >
                  <LogIn size={18} />
                  {t('signIn')}
                </a>
                <a
                  href="/sign-up"
                  className="flex flex-1 items-center justify-center gap-2 rounded-md bg-primary px-5 py-3.5 font-bold text-white"
                >
                  <UserPlus size={18} />
                  {t('signUp')}
                </a>
              </div>
              <button
                onClick={switchLocale}
                className={`flex items-center justify-center gap-2 rounded-md border px-6 py-3.5 font-bold transition-colors ${
                  scrolled ? 'border-primary/60 text-primary' : 'border-primary text-white'
                }`}
              >
                <Globe2 size={18} />
                {locale === 'en' ? 'العربية' : 'English'}
              </button>
            </div>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
