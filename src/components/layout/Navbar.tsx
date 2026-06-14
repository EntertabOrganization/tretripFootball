'use client';

import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useState } from 'react';
import { CalendarDays, ChevronDown, Eye, Globe2, Menu, Ticket, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '#about', hasDropdown: true },
  { label: 'Matches', href: '#matches', hasDropdown: true },
  { label: 'SAFF Fans', href: '#fans' },
  { label: 'Fan Zones', href: '#fan-zones' },
  { label: 'Design Your Jersey', href: '#jersey' },
];

export function Navbar() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const switchLocale = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  const toggleColorBlindMode = () => {
    document.body.classList.toggle('color-blind-mode');
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-8 md:px-8 lg:px-14">
      <div className="mx-auto max-w-[112rem]">
        <div className="mb-3 flex items-center justify-between px-3 text-sm font-bold text-white/90 md:px-12 md:text-base">
          <div className="flex items-center gap-2">
            <CalendarDays size={18} className="text-white/90" />
            <span>Sunday, June 14, 2026</span>
          </div>
          <button
            onClick={toggleColorBlindMode}
            className="hidden h-10 w-10 items-center justify-center rounded-lg border border-white/25 bg-white/10 text-white/90 transition-colors hover:border-primary hover:text-primary md:flex"
            title="Color Blind Mode"
          >
            <Eye size={20} />
          </button>
        </div>

        <nav className="rounded-[1.25rem] border border-white/15 bg-white/12 px-4 py-4 shadow-[0_18px_55px_rgba(0,0,0,0.22)] backdrop-blur-xl md:px-8">
          <div className="flex items-center justify-between gap-8">
            <Link href="/" className="flex shrink-0 items-center gap-4">
              <Image
                src="/TreTrip.svg"
                alt="TreTrip"
                width={556}
                height={556}
                priority
                className="h-16 w-auto brightness-0 invert md:h-20"
              />
              <span className="hidden h-16 w-px bg-white/40 sm:block" />
            </Link>

            <div className="hidden flex-1 items-center justify-center gap-8 rounded-2xl bg-white/5 px-8 py-5 text-lg font-semibold text-white/85 lg:flex">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} className="flex items-center gap-1.5 transition-colors hover:text-primary">
                  {item.label}
                  {item.hasDropdown ? <ChevronDown size={18} /> : null}
                </a>
              ))}
            </div>

            <div className="hidden shrink-0 items-center gap-4 lg:flex">
              <a
                href="https://fifa.com/tickets"
                target="_blank"
                rel="noreferrer"
                className="flex min-w-44 items-center justify-center gap-3 rounded-md bg-primary px-6 py-4 text-lg font-bold text-white shadow-[0_12px_28px_rgba(11,157,181,0.28)] transition-colors hover:bg-accent"
              >
                <Ticket size={19} />
                Buy Tickets
              </a>
              <button
                onClick={switchLocale}
                className="flex min-w-36 items-center justify-center gap-3 rounded-md border-2 border-primary/80 bg-white/5 px-6 py-3.5 text-lg font-bold text-white transition-colors hover:bg-primary"
              >
                <Globe2 size={20} />
                {locale === 'en' ? 'EN' : 'AR'}
              </button>
            </div>

            <button
              className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white transition-colors hover:text-primary lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {isOpen ? (
            <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-5 lg:hidden">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3 font-bold text-white transition-colors hover:text-primary">
                  {item.label}
                  {item.hasDropdown ? <ChevronDown size={18} /> : null}
                </a>
              ))}
              <a href="https://fifa.com/tickets" className="mt-2 flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-4 font-bold text-white">
                <Ticket size={18} />
                Buy Tickets
              </a>
              <button onClick={switchLocale} className="flex items-center justify-center gap-2 rounded-md border border-primary px-6 py-4 font-bold text-white">
                <Globe2 size={18} />
                {locale === 'en' ? 'EN' : 'AR'}
              </button>
            </div>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
