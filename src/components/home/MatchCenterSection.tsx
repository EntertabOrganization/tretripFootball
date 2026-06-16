import { Calendar, MapPin } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { getLocalizedTeamName, getMatchesByTeamCode } from '@/data/arabTeams';
import { Link } from '@/i18n/routing';

interface MatchCenterSectionProps {
  selectedTeamCode?: string;
}

export function MatchCenterSection({ selectedTeamCode = 'KSA' }: MatchCenterSectionProps) {
  const t = useTranslations('MatchCenterSection');
  const locale = useLocale();
  const matches = getMatchesByTeamCode(selectedTeamCode);

  return (
    <section id="matches" className="relative w-full overflow-hidden border-t border-white/10 bg-brand-light py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="mb-16 flex flex-col items-center">
          <h2 className="text-center text-5xl font-heading font-bold uppercase tracking-widest text-primary md:text-6xl">
            {t('sectionTitle')}
          </h2>
          <div className="mt-6 h-1 w-24 bg-giddam-gold" />
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {matches.map((match) => (
            <div key={match.id} className="tretrip-soft-card-dark overflow-hidden text-white transition-colors hover:border-primary/50">
              <div className="flex items-center justify-between border-b border-white/10 bg-primary/10 px-6 py-3">
                <span className="text-sm font-bold uppercase tracking-widest text-primary">
                  {locale === 'en' ? `Group ${match.group}` : `المجموعة ${match.group}`}
                </span>
                <span className="text-sm text-white/60">{locale === 'en' ? match.status : 'قادمة'}</span>
              </div>

              <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex w-1/3 flex-col items-center gap-2">
                    <span className="text-4xl">{match.homeFlag}</span>
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
                    <span className="text-4xl">{match.awayFlag}</span>
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

        <div className="mt-12 text-center">
          <Link href="/matches" className="inline-flex rounded-md border-2 border-primary px-8 py-4 text-lg font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground">
            {t('viewAllMatches')}
          </Link>
        </div>
      </div>
    </section>
  );
}
