import { useLocale, useTranslations } from 'next-intl';
import { MapPin } from 'lucide-react';
import { getTeamByCode } from '@/data/arabTeams';

interface CitiesStrategySectionProps {
  selectedTeamCode: string;
}

export function CitiesStrategySection({ selectedTeamCode }: CitiesStrategySectionProps) {
  const t = useTranslations('Partnership');
  const locale = useLocale();
  const team = getTeamByCode(selectedTeamCode);
  const cardStyles = [
    {
      color: 'text-primary',
      borderColor: 'border-primary',
      bgClass: 'from-primary/10 to-transparent',
    },
    {
      color: 'text-giddam-gold',
      borderColor: 'border-giddam-gold',
      bgClass: 'from-giddam-gold/10 to-transparent',
    },
    {
      color: 'text-blue-400',
      borderColor: 'border-blue-400',
      bgClass: 'from-blue-400/10 to-transparent',
    },
  ] as const;

  return (
    <section className="relative overflow-hidden border-t border-border bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 relative z-10">
        
        <div className="mb-16 text-center">
          <div className="mb-4 text-sm font-bold tracking-widest text-[#FF6B6B] uppercase">
            {t('citiesTitle')}
          </div>
          <div className="mx-auto mb-8 h-1 w-24 bg-[#FF6B6B]" />
          <h2 className="mb-6 font-heading text-4xl font-bold uppercase leading-tight text-foreground md:text-5xl">
            {t('citiesHeadline')}
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-foreground/80">
            {t('citiesDesc')}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {team.matchSchedule.map((match, index) => {
            const style = cardStyles[index % cardStyles.length];
            const activationCopy =
              locale === 'ar'
                ? `تفعيل جماهيري حول ${match.city} لدعم منتخب ${team.countryNameAr} في ${match.date}.`
                : `Fan activation around ${match.city} for ${team.countryName} on ${match.date}.`;

            return (
              <div
                key={`${match.id}-${match.city}`}
                className={`relative overflow-hidden rounded-3xl border-2 ${style.borderColor} bg-white p-8 shadow-xl transition-transform hover:-translate-y-2`}
              >
                <div className={`absolute inset-0 bg-gradient-to-b ${style.bgClass} opacity-50`} />

                <div className="relative z-10 flex flex-col items-center text-center">
                  <MapPin className={`mb-6 h-12 w-12 ${style.color}`} />
                  <h3 className="mb-4 font-heading text-3xl font-bold uppercase text-foreground">
                    {match.city}
                  </h3>
                  <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-foreground/45">
                    {match.date}
                  </p>
                  <p className="font-semibold leading-relaxed text-foreground">
                    {match.homeTeam} vs {match.awayTeam}
                  </p>
                  <p className="mt-3 font-medium leading-relaxed text-foreground/80">
                    {activationCopy}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
