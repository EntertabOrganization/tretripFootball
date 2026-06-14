'use client';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ARAB_TEAMS } from '@/data/arabMatches';

interface SquadSectionProps {
  selectedTeamCode?: string;
}

export function SquadSection({ selectedTeamCode }: SquadSectionProps) {
  const t = useTranslations('SquadSection');
  const locale = useLocale();

  const FILTERS = [
    { key: 'All', label: t('filterAll') },
    { key: 'AFC', label: t('filterAFC') },
    { key: 'CAF', label: t('filterCAF') },
  ];

  const [activeFilter, setActiveFilter] = useState('All');

  const filteredTeams = ARAB_TEAMS.filter((team) => {
    if (activeFilter === 'All') return true;
    return team.confederation === activeFilter;
  });

  const NICKNAMES: Record<string, { en: string; ar: string }> = {
    KSA: { en: 'Green Falcons', ar: 'Ø§Ù„ØµÙ‚ÙˆØ± Ø§Ù„Ø®Ø¶Ø±' },
    MAR: { en: 'Atlas Lions', ar: 'Ø£Ø³ÙˆØ¯ Ø§Ù„Ø£Ø·Ù„Ø³' },
    EGY: { en: 'Pharaohs', ar: 'Ø§Ù„ÙØ±Ø§Ø¹Ù†Ø©' },
    JOR: { en: 'The Chivalrous', ar: 'Ø§Ù„Ù†Ø´Ø§Ù…Ù‰' },
    IRQ: { en: 'Lions of Mesopotamia', ar: 'Ø£Ø³ÙˆØ¯ Ø§Ù„Ø±Ø§ÙØ¯ÙŠÙ†' },
    ALG: { en: 'Desert Warriors', ar: 'Ù…Ø­Ø§Ø±Ø¨Ùˆ Ø§Ù„ØµØ­Ø±Ø§Ø¡' },
    QAT: { en: 'The Maroon', ar: 'Ø§Ù„Ø¹Ù†Ø§Ø¨ÙŠ' },
    TUN: { en: 'Eagles of Carthage', ar: 'Ù†Ø³ÙˆØ± Ù‚Ø±Ø·Ø§Ø¬' },
  };

  const CONF_COLORS: Record<string, string> = {
    AFC: 'border-blue-200 bg-blue-50 text-blue-700',
    CAF: 'border-amber-200 bg-amber-50 text-amber-700',
  };

  return (
    <section className="relative w-full border-t border-border bg-white py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 flex flex-col items-end gap-6 md:flex-row md:justify-between">
          <div>
            <h2 className="transform -skew-x-12 text-4xl font-heading font-bold uppercase tracking-wide text-primary md:text-5xl">
              {t('sectionTitle')}
            </h2>
            <h3 className="mt-2 transform -skew-x-12 font-heading text-2xl text-foreground/60">{t('subtitle')}</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`transform -skew-x-12 border px-4 py-2 text-sm font-bold tracking-widest transition-all ${
                  activeFilter === filter.key
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                <span className="block skew-x-12 transform">{filter.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredTeams.map((team) => {
            const isSelected = team.code === selectedTeamCode;
            const nickname = NICKNAMES[team.code]?.[locale as 'en' | 'ar'] || team.name;

            return (
              <div
                key={team.id}
                className={`group relative overflow-hidden rounded-[1.75rem] border bg-white transition-all duration-300 hover:border-primary/60 hover:shadow-[0_0_30px_rgba(11,157,181,0.15)] ${
                  isSelected ? 'border-primary shadow-[0_0_20px_rgba(11,157,181,0.2)]' : 'border-border'
                }`}
              >
                <div className="relative flex aspect-[3/4] w-full flex-col items-center justify-center overflow-hidden bg-muted p-6">
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-white via-transparent to-transparent opacity-90" />
                  <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-primary/10 blur-3xl transition-colors duration-500 group-hover:bg-primary/20" />
                  <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />

                  <span className="relative z-20 mb-4 select-none text-8xl drop-shadow-2xl transition-transform duration-300 group-hover:scale-110">
                    {team.flag}
                  </span>

                  <span className={`relative z-20 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest ${CONF_COLORS[team.confederation]}`}>
                    {team.confederation}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 z-20 w-full p-5">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">{nickname}</p>
                      <h4 className="text-lg font-bold uppercase leading-tight text-foreground">
                        {locale === 'ar' ? team.nameAr : team.name}
                      </h4>
                      <p className="mt-1 text-sm text-foreground/50">
                        {locale === 'en' ? `Group ${team.group}` : `Ø§Ù„Ù…Ø¬Ù…ÙˆØ¹Ø© ${team.group}`}
                      </p>
                    </div>
                    <span className="font-mono text-2xl font-heading font-bold text-foreground/20">{team.code}</span>
                  </div>
                </div>

                <div className={`absolute left-0 top-0 h-full w-1 origin-bottom transform bg-primary transition-transform duration-300 ${isSelected ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'}`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
