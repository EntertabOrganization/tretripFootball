import { Calendar, MapPin } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { getMatchesByTeam, ARAB_TEAMS } from '@/data/arabMatches';
import { Link } from '@/i18n/routing';

interface MatchCenterSectionProps {
  selectedTeamCode?: string;
}

const getLocalizedTeamName = (teamName: string, teamCode: string, locale: string) => {
  if (locale === 'ar') {
    const arabTeam = ARAB_TEAMS.find(t => t.code === teamCode);
    if (arabTeam) return arabTeam.nameAr;
    const dict: Record<string, string> = {
      'Germany': 'ألمانيا',
      'Scotland': 'اسكتلندا',
      'Brazil': 'البرازيل',
      'France': 'فرنسا',
      'Belgium': 'بلجيكا',
      'Japan': 'اليابان',
      'Argentina': 'الأرجنتين',
      'Chile': 'تشيلي',
      'Poland': 'بولندا',
      'Spain': 'إسبانيا',
      'Uruguay': 'أوروغواي',
      'USA': 'الولايات المتحدة',
      'Netherlands': 'هولندا',
      'Senegal': 'السنغال',
      'Portugal': 'البرتغال',
      'Italy': 'إيطاليا',
      'Colombia': 'كولومبيا',
      'Mexico': 'المكسيك',
      'England': 'إنجلترا',
      'Canada': 'كندا',
      'South Korea': 'كوريا الجنوبية',
      'Croatia': 'كرواتيا',
      'Ecuador': 'الإكوادور',
      'Australia': 'أستراليا'
    };
    return dict[teamName] || teamName;
  }
  return teamName;
};

export function MatchCenterSection({ selectedTeamCode = 'KSA' }: MatchCenterSectionProps) {
  const t = useTranslations('MatchCenterSection');
  const locale = useLocale();

  const matches = getMatchesByTeam(selectedTeamCode);

  return (
    <section id="matches" className="relative w-full overflow-hidden border-t border-white/10 bg-brand-light py-24">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-primary uppercase tracking-widest transform -skew-x-12">
            {t('sectionTitle')}
          </h2>
          <div className="w-24 h-1 bg-giddam-gold mt-6 transform -skew-x-12" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {matches.map((match) => (
            <div key={match.id} className="tretrip-soft-card-dark overflow-hidden text-white group transition-colors hover:border-primary/50">
              <div className="bg-primary/10 p-3 text-center border-b border-white/10 flex justify-between items-center px-6">
                <span className="text-primary font-bold uppercase tracking-widest text-sm">
                  {locale === 'en' ? `Group ${match.group}` : `المجموعة ${match.group}`}
                </span>
                <span className="text-white/60 text-sm">
                  {locale === 'en' ? match.status : (match.status === 'Upcoming' ? 'قادمة' : match.status === 'Live' ? 'مباشر' : 'انتهت')}
                </span>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex flex-col items-center gap-2 w-1/3">
                    <span className="text-4xl select-none" role="img" aria-label={match.homeTeam}>{match.homeFlag}</span>
                    <span className="text-2xl font-heading font-bold text-primary">{match.homeCode}</span>
                    <span className="text-sm font-bold text-white text-center line-clamp-1">{getLocalizedTeamName(match.homeTeam, match.homeCode, locale)}</span>
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
                    <span className="text-4xl select-none" role="img" aria-label={match.awayTeam}>{match.awayFlag}</span>
                    <span className="text-2xl font-heading font-bold text-primary">{match.awayCode}</span>
                    <span className="text-sm font-bold text-white text-center line-clamp-1">{getLocalizedTeamName(match.awayTeam, match.awayCode, locale)}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-4 border-t border-white/10 text-xs text-white/70">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-primary" />
                    <span>{match.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-primary" />
                    <span className="line-clamp-1">{match.stadium}, {match.city}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/matches" className="inline-block px-8 py-4 border-2 border-primary text-primary font-bold text-lg transform -skew-x-12 hover:bg-primary hover:text-primary-foreground transition-all">
            <span className="block transform skew-x-12 tracking-wider">{t('viewAllMatches')}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
