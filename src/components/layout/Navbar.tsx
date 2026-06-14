'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useState, useEffect } from 'react';
import { ChevronDown, Globe2, LayoutDashboard, LogIn, Menu, UserPlus, X } from 'lucide-react';
import { hasAdminSession } from '@/lib/admin-client';
import { ARAB_TEAMS } from '@/data/arabMatches';
import { supabase } from '@/lib/supabase';

interface NavbarProps {
  selectedTeamCode?: string;
  onSelectTeam?: (code: string) => void;
}

export function Navbar({ selectedTeamCode = 'KSA', onSelectTeam = () => {} }: NavbarProps) {
  const locale = useLocale();
  const t = useTranslations('Navbar');
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dashboardHref, setDashboardHref] = useState<'/dashboard' | '/admin'>('/dashboard');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const syncAuthState = async () => {
      const isAdmin = hasAdminSession();

      if (isAdmin) {
        setIsAuthenticated(true);
        setDashboardHref('/admin');
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      setIsAuthenticated(Boolean(session));
      setDashboardHref('/dashboard');
    };

    void syncAuthState();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (hasAdminSession()) {
        setIsAuthenticated(true);
        setDashboardHref('/admin');
        return;
      }

      setIsAuthenticated(Boolean(session));
      setDashboardHref('/dashboard');
    });

    const handleStorage = () => {
      void syncAuthState();
    };

    window.addEventListener('storage', handleStorage);

    return () => {
      data.subscription.unsubscribe();
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const switchLocale = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  const navItems = [
    { label: t('home'), href: '/' },
    { label: t('about'), href: '#about', hasDropdown: true },
    { label: t('matches'), href: '/matches', hasDropdown: false },
    { label: t('saffFans'), href: '#fans' },
    { label: t('fanZone'), href: '#fan-zones' },
  ];

  const currentTeam = ARAB_TEAMS.find(t => t.code === selectedTeamCode) || ARAB_TEAMS[0];

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
                className="h-14 w-auto transition-all duration-300 md:h-16"
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
                <Link
                  key={item.label}
                  href={item.href as '/' | '/matches'}
                  className={`flex items-center gap-1.5 transition-colors hover:text-primary ${scrolled ? 'text-gray-700' : ''}`}
                >
                  {item.label}
                  {item.hasDropdown ? <ChevronDown size={16} /> : null}
                </Link>
              ))}
            </div>

            <div className="hidden shrink-0 items-center gap-3 lg:flex">
              {isAuthenticated ? (
                <Link
                  href={dashboardHref}
                  className="flex min-w-36 items-center justify-center gap-2 rounded-md bg-primary px-5 py-3.5 text-base font-bold text-white shadow-[0_8px_20px_rgba(57,158,182,0.28)] transition-colors hover:bg-accent"
                >
                  <LayoutDashboard size={18} />
                  {t('dashboard')}
                </Link>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className={`flex min-w-36 items-center justify-center gap-2 rounded-md px-5 py-3.5 text-base font-bold transition-colors ${
                      scrolled
                        ? 'border-2 border-primary/80 bg-transparent text-primary hover:bg-primary hover:text-white'
                        : 'border-2 border-white/30 bg-white/5 text-white hover:bg-white/15'
                    }`}
                  >
                    <LogIn size={18} />
                    {t('signIn')}
                  </Link>
                  <Link
                    href="/sign-up"
                    className="flex min-w-36 items-center justify-center gap-2 rounded-md bg-primary px-5 py-3.5 text-base font-bold text-white shadow-[0_8px_20px_rgba(57,158,182,0.28)] transition-colors hover:bg-accent"
                  >
                    <UserPlus size={18} />
                    {t('signUp')}
                  </Link>
                </>
              )}

              {/* Team Selector Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsTeamDropdownOpen(!isTeamDropdownOpen)}
                  className={`flex h-11 items-center justify-center gap-2 rounded-md border-2 px-3 font-bold transition-colors cursor-pointer ${
                    scrolled
                      ? 'border-primary/60 bg-transparent text-primary hover:bg-primary hover:text-white'
                      : 'border-primary/80 bg-white/5 text-white hover:bg-primary'
                  }`}
                  title="Select National Team"
                >
                  <span className="text-lg">{currentTeam.flag}</span>
                  <span className="text-sm tracking-wider font-heading">{currentTeam.code}</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${isTeamDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isTeamDropdownOpen && (
                  <div className={`absolute right-0 mt-2 w-64 rounded-md shadow-lg border border-white/10 overflow-hidden z-50 ${
                    scrolled ? 'bg-white text-gray-800 border-gray-200' : 'bg-[#071C25] text-white'
                  }`}>
                    <div className="py-1">
                      {ARAB_TEAMS.map((team) => (
                        <button
                          key={team.code}
                          onClick={() => {
                            onSelectTeam(team.code);
                            setIsTeamDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-primary/20 transition-colors cursor-pointer ${
                            selectedTeamCode === team.code ? 'bg-primary/10 font-bold text-primary' : ''
                          }`}
                        >
                          <span className="text-xl">{team.flag}</span>
                          <span className="text-sm font-semibold">{locale === 'ar' ? team.nameAr : team.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={switchLocale}
                className={`flex h-11 w-11 items-center justify-center rounded-md border-2 font-bold transition-colors cursor-pointer ${
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
                <Link
                  key={item.label}
                  href={item.href as '/' | '/matches'}
                  className={`flex items-center justify-between rounded-lg px-4 py-3 font-bold transition-colors hover:text-primary ${
                    scrolled ? 'bg-gray-100 text-gray-800' : 'bg-white/5 text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                  {item.hasDropdown ? <ChevronDown size={16} /> : null}
                </Link>
              ))}
              <div className="mt-2 flex gap-3">
                {isAuthenticated ? (
                  <Link
                    href={dashboardHref}
                    className="flex flex-1 items-center justify-center gap-2 rounded-md bg-primary px-5 py-3.5 font-bold text-white"
                  >
                    <LayoutDashboard size={18} />
                    {t('dashboard')}
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/sign-in"
                      className={`flex flex-1 items-center justify-center gap-2 rounded-md border-2 px-5 py-3.5 font-bold transition-colors ${
                        scrolled ? 'border-primary text-primary' : 'border-white/30 text-white'
                      }`}
                    >
                      <LogIn size={18} />
                      {t('signIn')}
                    </Link>
                    <Link
                      href="/sign-up"
                      className="flex flex-1 items-center justify-center gap-2 rounded-md bg-primary px-5 py-3.5 font-bold text-white"
                    >
                      <UserPlus size={18} />
                      {t('signUp')}
                    </Link>
                  </>
                )}
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <span className={`text-xs font-bold uppercase tracking-wider ${scrolled ? 'text-gray-500' : 'text-white/60'}`}>
                  {locale === 'en' ? 'Select National Team' : 'اختر المنتخب الوطني'}
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {ARAB_TEAMS.map((team) => (
                    <button
                      key={team.code}
                      onClick={() => {
                        onSelectTeam(team.code);
                        setIsOpen(false);
                      }}
                      className={`flex flex-col items-center justify-center p-2 rounded-md border transition-all cursor-pointer ${
                        selectedTeamCode === team.code
                          ? 'border-primary bg-primary/20 text-primary font-bold'
                          : scrolled
                            ? 'border-gray-200 bg-gray-50 text-gray-800 hover:border-primary/50'
                            : 'border-white/15 bg-white/5 text-white hover:border-primary/50'
                      }`}
                      title={locale === 'ar' ? team.nameAr : team.name}
                    >
                      <span className="text-2xl">{team.flag}</span>
                      <span className="text-xs mt-1 font-semibold">{team.code}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={switchLocale}
                className={`flex items-center justify-center gap-2 rounded-md border px-6 py-3.5 font-bold transition-colors cursor-pointer ${
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
