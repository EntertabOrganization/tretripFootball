'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Calendar, MapPin, ArrowLeft, ArrowRight } from 'lucide-react';
import { ALL_ARAB_MATCHES, ARAB_TEAMS } from '@/data/arabMatches';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Link } from '@/i18n/routing';

const getLocalizedTeamName = (teamName: string, teamCode: string, locale: string) => {
  if (locale === 'ar') {
    const arabTeam = ARAB_TEAMS.find((t) => t.code === teamCode);
    if (arabTeam) return arabTeam.nameAr;
    const dict: Record<string, string> = {
      Germany: 'ألمانيا',
      Scotland: 'اسكتلندا',
      Brazil: 'البرازيل',
      France: 'فرنسا',
      Belgium: 'بلجيكا',
      Japan: 'اليابان',
      Argentina: 'الأرجنتين',
      Chile: 'تشيلي',
      Poland: 'بولندا',
      Spain: 'إسبانيا',
      Uruguay: 'أوروغواي',
      USA: 'الولايات المتحدة',
      Netherlands: 'هولندا',
      Senegal: 'السنغال',
      Portugal: 'البرتغال',
      Italy: 'إيطاليا',
      Colombia: 'كولومبيا',
      Mexico: 'المكسيك',
      England: 'إنجلترا',
      Canada: 'كندا',
      'South Korea': 'كوريا الجنوبية',
      Croatia: 'كرواتيا',
      Ecuador: 'الإكوادور',
      Australia: 'أستراليا',
    };
    return dict[teamName] || teamName;
  }
  return teamName;
};

export default function MatchesPage() {
  const t = useTranslations('MatchesPage');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [selectedTeamCode, setSelectedTeamCode] = useState('KSA');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredMatches =
    activeFilter === 'All'
      ? ALL_ARAB_MATCHES
      : ALL_ARAB_MATCHES.filter(
          (m) => m.homeCode === activeFilter || m.awayCode === activeFilter
        );

  // Group matches by group letter
  const groupedMatches = filteredMatches.reduce(
    (acc, match) => {
      const g = match.group;
      if (!acc[g]) acc[g] = [];
      acc[g].push(match);
      return acc;
    },
    {} as Record<string, typeof filteredMatches>
  );

  const sortedGroups = Object.keys(groupedMatches).sort();

  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  return (
    <>
      <Navbar selectedTeamCode={selectedTeamCode} onSelectTeam={setSelectedTeamCode} />
      <main className="min-h-screen w-full bg-background">
        {/* Hero Header */}
        <section className="relative pt-40 pb-16 px-4 md:px-10 bg-[#0b2f34] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_28%,rgba(255,255,255,0.12),transparent_30%),linear-gradient(135deg,rgba(11,157,181,0.22),rgba(4,44,48,0.85)_45%,rgba(3,71,67,0.96))]" />
          <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(255,255,255,0.06)_0_18%,transparent_18%_40%,rgba(255,255,255,0.04)_40%_54%,transparent_54%)] opacity-70" />
          <div className="absolute bottom-0 right-0 h-2/3 w-1/2 -skew-x-12 bg-primary/10 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-[112rem]">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary/80 hover:text-primary transition-colors mb-8 font-bold tracking-wide uppercase text-sm"
            >
              <BackIcon size={16} />
              {t('backHome')}
            </Link>

            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold uppercase text-white leading-[0.9] tracking-wide drop-shadow-2xl">
              <span className="text-white">{locale === 'en' ? 'Arab Teams' : 'المنتخبات العربية'}</span>
              <br />
              <span className="text-primary">{locale === 'en' ? 'All Matches' : 'جميع المباريات'}</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-2xl">
              {t('subtitle')}
            </p>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="sticky top-[72px] z-40 bg-giddam-secondary border-b border-white/10 shadow-lg">
          <div className="mx-auto max-w-[112rem] px-4 py-4 overflow-x-auto">
            <div className="flex items-center gap-3 min-w-max">
              {/* All Teams button */}
              <button
                onClick={() => setActiveFilter('All')}
                className={`px-5 py-2.5 text-sm font-bold tracking-widest uppercase transform -skew-x-12 border transition-all whitespace-nowrap ${
                  activeFilter === 'All'
                    ? 'bg-primary border-primary text-white'
                    : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:border-white/40'
                }`}
              >
                <span className="block transform skew-x-12">{t('filterAll')}</span>
              </button>

              {/* Per-team filter buttons */}
              {ARAB_TEAMS.map((team) => (
                <button
                  key={team.code}
                  onClick={() => setActiveFilter(team.code)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-bold transform -skew-x-12 border transition-all whitespace-nowrap ${
                    activeFilter === team.code
                      ? 'bg-primary border-primary text-white'
                      : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:border-white/40'
                  }`}
                >
                  <span className="block transform skew-x-12 flex items-center gap-2">
                    <span className="text-base">{team.flag}</span>
                    <span>{team.code}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Matches Content */}
        <section className="py-16 px-4 md:px-10">
          <div className="mx-auto max-w-[112rem]">
            {sortedGroups.length === 0 ? (
              <div className="text-center py-24 text-white/40 text-xl">
                No matches found.
              </div>
            ) : (
              <div className="space-y-16">
                {sortedGroups.map((groupKey) => {
                  const groupTeam = ARAB_TEAMS.find(
                    (t) => t.group === groupKey && (activeFilter === 'All' || t.code === activeFilter)
                  );
                  return (
                    <div key={groupKey}>
                      {/* Group Header */}
                      <div className="flex items-center gap-4 mb-8">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-10 bg-primary transform -skew-x-12" />
                          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white uppercase tracking-widest">
                            {locale === 'en' ? `Group ${groupKey}` : `المجموعة ${groupKey}`}
                          </h2>
                        </div>
                        {groupTeam && (
                          <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-sm">
                            <span className="text-lg">{groupTeam.flag}</span>
                            <span className="text-primary text-sm font-bold tracking-wider">
                              {locale === 'ar' ? groupTeam.nameAr : groupTeam.name}
                            </span>
                          </div>
                        )}
                        <div className="flex-1 h-px bg-white/10" />
                      </div>

                      {/* Match Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {groupedMatches[groupKey].map((match) => (
                          <div
                            key={match.id}
                            className="bg-giddam-secondary border border-white/10 overflow-hidden group hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_24px_rgba(11,157,181,0.12)]"
                          >
                            {/* Card Header */}
                            <div className="bg-primary/10 p-3 text-center border-b border-white/10 flex justify-between items-center px-6">
                              <span className="text-primary font-bold uppercase tracking-widest text-sm">
                                {locale === 'en' ? `Group ${match.group}` : `المجموعة ${match.group}`}
                              </span>
                              <span className="text-white/60 text-sm">
                                {locale === 'en'
                                  ? match.status
                                  : match.status === 'Upcoming'
                                  ? 'قادمة'
                                  : match.status === 'Live'
                                  ? 'مباشر'
                                  : 'انتهت'}
                              </span>
                            </div>

                            {/* Teams */}
                            <div className="p-6">
                              <div className="flex justify-between items-center mb-6">
                                <div className="flex flex-col items-center gap-2 w-1/3">
                                  <span className="text-4xl select-none" role="img" aria-label={match.homeTeam}>
                                    {match.homeFlag}
                                  </span>
                                  <span className="text-2xl font-heading font-bold text-primary">{match.homeCode}</span>
                                  <span className="text-sm font-bold text-white text-center line-clamp-1">
                                    {getLocalizedTeamName(match.homeTeam, match.homeCode, locale)}
                                  </span>
                                </div>

                                <div className="flex flex-col items-center justify-center w-1/3">
                                  {match.status === 'Upcoming' ? (
                                    <>
                                      <span className="text-2xl font-heading font-bold text-white/40 mb-1">VS</span>
                                      <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 text-giddam-light text-xs font-bold tracking-widest transform -skew-x-12">
                                        {match.time}
                                      </span>
                                    </>
                                  ) : (
                                    <span className="text-3xl font-heading font-bold text-white">
                                      {match.homeScore} - {match.awayScore}
                                    </span>
                                  )}
                                </div>

                                <div className="flex flex-col items-center gap-2 w-1/3">
                                  <span className="text-4xl select-none" role="img" aria-label={match.awayTeam}>
                                    {match.awayFlag}
                                  </span>
                                  <span className="text-2xl font-heading font-bold text-primary">{match.awayCode}</span>
                                  <span className="text-sm font-bold text-white text-center line-clamp-1">
                                    {getLocalizedTeamName(match.awayTeam, match.awayCode, locale)}
                                  </span>
                                </div>
                              </div>

                              {/* Match Info */}
                              <div className="flex flex-col gap-2 pt-4 border-t border-white/10 text-xs text-white/70">
                                <div className="flex items-center gap-2">
                                  <Calendar size={14} className="text-primary shrink-0" />
                                  <span>{match.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin size={14} className="text-primary shrink-0" />
                                  <span className="line-clamp-1">
                                    {match.stadium}, {match.city}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
