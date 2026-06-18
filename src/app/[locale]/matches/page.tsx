'use client';

import { useMemo, useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { ALL_ARAB_TEAM_MATCHES, ARAB_TEAMS_DATA, getLocalizedTeamName } from '@/data/arabTeams';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Link } from '@/i18n/routing';
import { TeamFlag } from '@/components/teams/TeamFlag';

export default function MatchesPage() {
  const t = useTranslations('MatchesPage');
  const locale = useLocale();
  const [selectedTeamCode, setSelectedTeamCode] = useState('KSA');
  const [activeFilter, setActiveFilter] = useState('All');

  const matches = useMemo(
    () =>
      activeFilter === 'All'
        ? ALL_ARAB_TEAM_MATCHES
        : ALL_ARAB_TEAM_MATCHES.filter(
            (match) => match.homeCode === activeFilter || match.awayCode === activeFilter
          ),
    [activeFilter]
  );

  const groupedMatches = useMemo(() => {
    return matches.reduce<Record<string, typeof matches>>((accumulator, match) => {
      if (!accumulator[match.group]) {
        accumulator[match.group] = [];
      }

      accumulator[match.group].push(match);
      return accumulator;
    }, {});
  }, [matches]);

  return (
    <>
      <Navbar
        selectedTeamCode={selectedTeamCode}
        onSelectTeam={(code) => {
          setSelectedTeamCode(code);
          setActiveFilter(code);
        }}
      />
      <main className="min-h-screen bg-background pt-32">
        <section className="relative overflow-hidden bg-[#0b2f34] px-4 py-16 md:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_28%,rgba(255,255,255,0.12),transparent_30%),linear-gradient(135deg,rgba(11,157,181,0.22),rgba(4,44,48,0.85)_45%,rgba(3,71,67,0.96))]" />
          <div className="relative z-10 mx-auto max-w-[112rem]">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-primary/80 transition-colors hover:text-primary">
              ← {t('backHome')}
            </Link>
            <h1 className="mt-8 font-heading text-5xl font-bold uppercase leading-[0.92] text-white md:text-6xl lg:text-7xl">
              {t('title')}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/80">{t('subtitle')}</p>
          </div>
        </section>

        <section className="sticky top-[72px] z-40 border-b border-white/10 bg-giddam-secondary shadow-lg">
          <div className="mx-auto max-w-[112rem] overflow-x-auto px-4 py-4">
            <div className="flex min-w-max items-center gap-3">
              <button
                onClick={() => setActiveFilter('All')}
                className={`rounded-full border px-5 py-2.5 text-sm font-bold uppercase tracking-widest transition-all ${
                  activeFilter === 'All'
                    ? 'border-primary bg-primary text-white'
                    : 'border-white/20 bg-white/5 text-white/80 hover:bg-white/10 hover:border-white/40'
                }`}
              >
                {t('filterAll')}
              </button>

              {ARAB_TEAMS_DATA.map((team) => (
                <button
                  key={team.code}
                  onClick={() => {
                    setSelectedTeamCode(team.code);
                    setActiveFilter(team.code);
                  }}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold transition-all ${
                    activeFilter === team.code
                      ? 'border-primary bg-primary text-white'
                      : 'border-white/20 bg-white/5 text-white/80 hover:bg-white/10 hover:border-white/40'
                  }`}
                >
                  <TeamFlag
                    teamCode={team.code}
                    alt={locale === 'ar' ? team.countryNameAr : team.countryName}
                    className="h-5 w-7 rounded-sm"
                  />
                  <span>{team.code}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:px-10">
          <div className="mx-auto max-w-[112rem] space-y-16">
            {Object.keys(groupedMatches)
              .sort()
              .map((groupKey) => (
                <div key={groupKey}>
                  <div className="mb-8 flex items-center gap-4">
                    <div className="h-10 w-2 bg-primary" />
                    <h2 className="text-2xl font-heading font-bold uppercase tracking-widest text-foreground md:text-3xl">
                      {locale === 'en' ? `Group ${groupKey}` : `المجموعة ${groupKey}`}
                    </h2>
                    <div className="h-px flex-1 bg-border" />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {groupedMatches[groupKey].map((match) => (
                      <div key={match.id} className="tretrip-soft-card-dark overflow-hidden text-white">
                        <div className="flex items-center justify-between border-b border-white/10 bg-primary/10 px-6 py-3">
                          <span className="text-sm font-bold uppercase tracking-widest text-primary">
                            {locale === 'en' ? `Group ${match.group}` : `المجموعة ${match.group}`}
                          </span>
                          <span className="text-sm text-white/60">{locale === 'en' ? match.status : 'قادمة'}</span>
                        </div>

                        <div className="p-6">
                          <div className="mb-6 flex items-center justify-between">
                            <div className="flex w-1/3 flex-col items-center gap-2">
                              <TeamFlag
                                teamCode={match.homeCode}
                                src={match.homeFlag}
                                alt={getLocalizedTeamName(match.homeCode, locale as 'en' | 'ar')}
                                className="h-12 w-16 rounded-lg"
                              />
                              <span className="text-2xl font-heading font-bold text-primary">{match.homeCode}</span>
                              <span className="text-center text-sm font-bold text-white">
                                {getLocalizedTeamName(match.homeCode, locale as 'en' | 'ar')}
                              </span>
                            </div>

                            <div className="flex w-1/3 flex-col items-center justify-center">
                              <span className="mb-1 text-2xl font-heading font-bold text-white/40">VS</span>
                              <span className="border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-bold tracking-widest text-giddam-light">
                                {match.time}
                              </span>
                            </div>

                            <div className="flex w-1/3 flex-col items-center gap-2">
                              <TeamFlag
                                teamCode={match.awayCode}
                                src={match.awayFlag}
                                alt={getLocalizedTeamName(match.awayCode, locale as 'en' | 'ar')}
                                className="h-12 w-16 rounded-lg"
                              />
                              <span className="text-2xl font-heading font-bold text-primary">{match.awayCode}</span>
                              <span className="text-center text-sm font-bold text-white">
                                {getLocalizedTeamName(match.awayCode, locale as 'en' | 'ar')}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2 border-t border-white/10 pt-4 text-xs text-white/70">
                            <div className="flex items-center gap-2">
                              <Calendar size={14} className="text-primary" />
                              <span>{match.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin size={14} className="text-primary" />
                              <span>{match.stadium}, {match.city}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
