'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ARAB_TEAMS_DATA } from '@/data/arabTeams';
import { TeamFlag } from '@/components/teams/TeamFlag';

interface SquadSectionProps {
  selectedTeamCode?: string;
  onSelectTeam?: (code: string) => void;
}

export function SquadSection({ selectedTeamCode, onSelectTeam = () => {} }: SquadSectionProps) {
  const t = useTranslations('SquadSection');
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState<'All' | 'AFC' | 'CAF'>('All');

  const filters = [
    { key: 'All' as const, label: t('filterAll') },
    { key: 'AFC' as const, label: t('filterAFC') },
    { key: 'CAF' as const, label: t('filterCAF') },
  ];

  const filteredTeams = ARAB_TEAMS_DATA.filter((team) => activeFilter === 'All' || team.confederation === activeFilter);

  const confColors: Record<'AFC' | 'CAF', string> = {
    AFC: 'border-blue-200 bg-blue-50 text-blue-700',
    CAF: 'border-amber-200 bg-amber-50 text-amber-700',
  };

  return (
    <section id="arab-teams" className="relative w-full border-t border-border bg-white py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-4xl font-heading font-bold text-primary md:text-5xl">{t('sectionTitle')}</h2>
            <h3 className="mt-2 font-heading text-2xl text-foreground/60">{t('subtitle')}</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`rounded-full border px-4 py-2 text-sm font-bold tracking-widest transition-all ${
                  activeFilter === filter.key
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredTeams.map((team) => {
            const isSelected = team.code === selectedTeamCode;

            return (
              <button
                key={team.id}
                onClick={() => onSelectTeam(team.code)}
                className={`group relative overflow-hidden rounded-[1.75rem] border bg-white text-left transition-all duration-300 hover:border-primary/60 hover:shadow-[0_0_30px_rgba(11,157,181,0.15)] ${
                  isSelected ? 'border-primary shadow-[0_0_20px_rgba(11,157,181,0.2)]' : 'border-border'
                }`}
              >
                <div className="relative flex aspect-[3/4] w-full flex-col items-center justify-center overflow-hidden bg-muted p-6">
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-white via-transparent to-transparent opacity-90" />
                  <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-primary/10 blur-3xl transition-colors duration-500 group-hover:bg-primary/20" />
                  <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />
                  <TeamFlag
                    teamCode={team.code}
                    alt={locale === 'ar' ? team.countryNameAr : team.countryName}
                    className="relative z-20 mb-4 h-24 w-36 rounded-2xl border border-white/70 shadow-2xl transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className={`relative z-20 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest ${confColors[team.confederation]}`}>
                    {team.confederation}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 z-20 w-full p-5">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">
                        {locale === 'ar' ? team.nicknameAr : team.nickname}
                      </p>
                      <h4 className="text-lg font-bold leading-tight text-foreground">
                        {locale === 'ar' ? team.countryNameAr : team.countryName}
                      </h4>
                      <p className="mt-1 text-sm text-foreground/50">
                        {locale === 'en' ? `Group ${team.group}` : `المجموعة ${team.group}`}
                      </p>
                    </div>
                    <span className="font-heading text-2xl font-bold text-foreground/20">{team.code}</span>
                  </div>
                </div>

                <div className={`absolute left-0 top-0 h-full w-1 bg-primary transition-transform duration-300 ${isSelected ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'}`} />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
