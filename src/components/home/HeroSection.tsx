import { LogIn, UserPlus } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { getCompetitionCopy, getTeamByCode } from '@/data/arabTeams';
import { TeamFlag } from '@/components/teams/TeamFlag';

interface HeroSectionProps {
  selectedTeamCode?: string;
}

export function HeroSection({ selectedTeamCode = 'KSA' }: HeroSectionProps) {
  const t = useTranslations('HomePage');
  const locale = useLocale();
  const currentTeam = getTeamByCode(selectedTeamCode);

  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#0b2f34] px-4 pt-40 md:px-10 lg:px-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_28%,rgba(255,255,255,0.18),transparent_28%),linear-gradient(135deg,rgba(11,157,181,0.28),rgba(4,44,48,0.82)_45%,rgba(3,71,67,0.94))]" />
      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(255,255,255,0.08)_0_18%,transparent_18%_40%,rgba(255,255,255,0.06)_40%_54%,transparent_54%)] opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-giddam-secondary/30 to-background/70" />
      <div className="absolute bottom-0 right-0 h-2/3 w-1/2 bg-primary/15 blur-3xl" />

      <div className="relative z-10 mx-auto grid w-full max-w-[112rem] gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="flex flex-col items-start">
          <div className="mb-6 flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-bold uppercase tracking-widest text-primary">
            <TeamFlag
              teamCode={currentTeam.code}
              alt={locale === 'ar' ? currentTeam.countryNameAr : currentTeam.countryName}
              className="h-6 w-8 rounded-sm"
              priority
            />
            <span className="font-heading">
              {locale === 'en'
                ? `FIFA World Cup 2026 • ${currentTeam.countryName}`
                : `كأس العالم 2026 • ${currentTeam.countryNameAr}`}
            </span>
          </div>

          <h1 className="max-w-[80rem] font-heading text-5xl font-bold uppercase leading-[0.9] tracking-normal text-white drop-shadow-2xl sm:text-5xl md:text-6xl lg:text-[5.6rem] xl:text-[6.4rem]">
            <span className="text-white">{t('heroLine1')} </span>
            <span className="text-primary">{t('heroLine2')}</span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg font-medium leading-relaxed text-white/90 md:text-xl">
            {t('heroSubtitle')}
          </p>

          <div className="mt-8 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <Link
              href="/sign-in"
              className="inline-flex min-w-56 items-center justify-center gap-3 rounded-md bg-primary px-10 py-4 text-lg font-bold text-[#07333a] shadow-[0_18px_35px_rgba(11,157,181,0.26)] transition-colors hover:bg-accent hover:text-white"
            >
              <LogIn size={20} />
              {t('signIn')}
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex min-w-56 items-center justify-center gap-3 rounded-md border border-white/35 bg-white/5 px-10 py-4 text-lg font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              <UserPlus size={20} />
              {t('signUp')}
            </Link>
          </div>
        </div>

        <div className="tretrip-soft-card-dark rounded-[2rem] p-7 text-white">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-primary/90">
            {locale === 'en' ? 'Selected Team' : 'المنتخب المختار'}
          </p>
          <div className="mt-5 flex items-center gap-4">
            <TeamFlag
              teamCode={currentTeam.code}
              alt={locale === 'ar' ? currentTeam.countryNameAr : currentTeam.countryName}
              className="h-14 w-20 rounded-xl border border-white/15"
              priority
            />
            <div>
              <h2 className="text-3xl font-bold">{locale === 'ar' ? currentTeam.countryNameAr : currentTeam.countryName}</h2>
              <p className="mt-1 text-white/70">{locale === 'ar' ? currentTeam.nicknameAr : currentTeam.nickname}</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-white/55">{locale === 'en' ? 'Group' : 'المجموعة'}</p>
              <p className="mt-2 text-xl font-semibold">{currentTeam.group}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-white/55">{locale === 'en' ? 'Competition' : 'المسابقة'}</p>
              <p className="mt-2 text-sm leading-6 text-white/88">{getCompetitionCopy(currentTeam.code, locale as 'en' | 'ar')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
