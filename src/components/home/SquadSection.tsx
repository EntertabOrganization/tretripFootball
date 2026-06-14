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
    KSA: { en: 'Green Falcons', ar: 'الصقور الخضر' },
    MAR: { en: 'Atlas Lions', ar: 'أسود الأطلس' },
    EGY: { en: 'Pharaohs', ar: 'الفراعنة' },
    JOR: { en: 'The Chivalrous', ar: 'النشامى' },
    IRQ: { en: 'Lions of Mesopotamia', ar: 'أسود الرافدين' },
    ALG: { en: 'Desert Warriors', ar: 'محاربو الصحراء' },
    QAT: { en: 'The Maroon', ar: 'العنابي' },
    TUN: { en: 'Eagles of Carthage', ar: 'نسور قرطاج' },
  };

  const CONF_COLORS: Record<string, string> = {
    AFC: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    CAF: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  };

  return (
    <section className="w-full py-24 bg-background relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary uppercase tracking-wide transform -skew-x-12">
              {t('sectionTitle')}
            </h2>
            <h3 className="text-2xl text-white/60 mt-2 font-heading transform -skew-x-12">{t('subtitle')}</h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-4 py-2 transform -skew-x-12 border transition-all font-bold tracking-widest text-sm ${
                  activeFilter === filter.key
                    ? 'bg-primary border-primary text-primary-foreground'
                    : 'bg-white/5 border-white/20 text-white hover:bg-white/10'
                }`}
              >
                <span className="block transform skew-x-12">{filter.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTeams.map((team) => {
            const isSelected = team.code === selectedTeamCode;
            const nickname = NICKNAMES[team.code]?.[locale as 'en' | 'ar'] || team.name;
            return (
              <div
                key={team.id}
                className={`group relative bg-giddam-secondary border overflow-hidden transition-all duration-300 hover:border-primary/60 hover:shadow-[0_0_30px_rgba(11,157,181,0.15)] ${
                  isSelected ? 'border-primary shadow-[0_0_20px_rgba(11,157,181,0.2)]' : 'border-white/10'
                }`}
              >
                {/* Background gradient */}
                <div className="aspect-[3/4] w-full bg-black/30 relative flex flex-col items-center justify-center overflow-hidden p-6">
                  <div className="absolute inset-0 bg-gradient-to-t from-giddam-secondary via-transparent to-transparent z-10 opacity-80"></div>
                  {/* Decorative background shape */}
                  <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/25 transition-colors duration-500"></div>
                  <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
                  
                  {/* Flag */}
                  <span className="text-8xl select-none relative z-20 drop-shadow-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {team.flag}
                  </span>

                  {/* Confederation Badge */}
                  <span className={`relative z-20 text-xs font-bold px-3 py-1 rounded-full border tracking-widest uppercase ${CONF_COLORS[team.confederation]}`}>
                    {team.confederation}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-5 z-20">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-primary text-xs font-bold tracking-widest uppercase mb-1">{nickname}</p>
                      <h4 className="text-lg font-bold text-white uppercase leading-tight">
                        {locale === 'ar' ? team.nameAr : team.name}
                      </h4>
                      <p className="text-white/50 text-sm mt-1">
                        {locale === 'en' ? `Group ${team.group}` : `المجموعة ${team.group}`}
                      </p>
                    </div>
                    <span className="text-2xl font-heading font-bold text-white/20 font-mono">{team.code}</span>
                  </div>
                </div>

                {/* Active/hover edge highlight */}
                <div className={`absolute top-0 left-0 w-1 h-full bg-primary transform origin-bottom transition-transform duration-300 ${isSelected ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'}`}></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
