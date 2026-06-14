import { useTranslations, useLocale } from 'next-intl';
import { LogIn, UserPlus } from 'lucide-react';
import { ARAB_TEAMS } from '@/data/arabMatches';
import { Link } from '@/i18n/routing';

interface HeroSectionProps {
  selectedTeamCode?: string;
}

export function HeroSection({ selectedTeamCode = 'KSA' }: HeroSectionProps) {
  const t = useTranslations('HomePage');
  const locale = useLocale();
  const currentTeam = ARAB_TEAMS.find(team => team.code === selectedTeamCode) || ARAB_TEAMS[0];

  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#0b2f34] px-4 pt-40 md:px-10 lg:px-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_28%,rgba(255,255,255,0.18),transparent_28%),linear-gradient(135deg,rgba(11,157,181,0.28),rgba(4,44,48,0.82)_45%,rgba(3,71,67,0.94))]" />
      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(255,255,255,0.08)_0_18%,transparent_18%_40%,rgba(255,255,255,0.06)_40%_54%,transparent_54%)] opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-giddam-secondary/30 to-background/70" />
      <div className="absolute bottom-0 right-0 h-2/3 w-1/2 -skew-x-12 bg-primary/15 blur-3xl" />

      <div className="relative z-10 mx-auto flex w-full max-w-[112rem] flex-col items-start">
        <div className="mb-6 flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-bold tracking-widest text-primary uppercase">
          <span className="text-xl leading-none">{currentTeam.flag}</span>
          <span className="font-heading">
            {locale === 'en'
              ? `FIFA World Cup 2026 • ${currentTeam.name}`
              : `كأس العالم ٢٠٢٦ • ${currentTeam.nameAr}`}
          </span>
        </div>

        <h1 className="max-w-[80rem] font-heading text-5xl font-bold uppercase leading-[0.9] tracking-normal text-white drop-shadow-2xl sm:text-5xl md:text-6xl lg:text-[5.8rem] xl:text-[7rem]">
          <span className="text-white">{t('heroLine1')} </span>
          <span className="text-primary">{t('heroLine2')}</span>
        </h1>

        <p className="mt-8 max-w-3xl text-lg font-medium leading-relaxed text-white/90 md:text-xl">
          {t('heroSubtitle')}
        </p>

        <div className="mt-8 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <Link
            href="/sign-in"
            className="inline-flex min-w-56 -skew-x-12 items-center justify-center gap-3 rounded-md bg-primary px-10 py-4 text-lg font-bold italic text-[#07333a] shadow-[0_18px_35px_rgba(11,157,181,0.26)] transition-colors hover:bg-accent"
          >
            <span className="skew-x-12 flex items-center gap-2">
              <LogIn size={20} />
              {t('signIn')}
            </span>
          </Link>
          <Link
            href="/sign-up"
            className="inline-flex min-w-56 -skew-x-12 items-center justify-center gap-3 rounded-md border border-white/35 bg-white/5 px-10 py-4 text-lg font-bold italic text-white backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            <span className="skew-x-12 flex items-center gap-2">
              <UserPlus size={20} />
              {t('signUp')}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
