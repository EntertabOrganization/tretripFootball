import { Calendar, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function MatchCenterSection() {
  const t = useTranslations('MatchCenterSection');

  const matches = [
    {
      homeTeam: 'Saudi Arabia',
      awayTeam: 'Uruguay',
      homeCode: 'KSA',
      awayCode: 'URU',
      date: '10 OCT 2025',
      time: '20:00 AST',
      stadium: 'King Abdullah Sports City',
    },
    {
      homeTeam: 'Saudi Arabia',
      awayTeam: 'Spain',
      homeCode: 'KSA',
      awayCode: 'ESP',
      date: '15 NOV 2025',
      time: '21:00 AST',
      stadium: 'Al-Awwal Park',
    },
  ];

  return (
    <section id="matches" className="w-full py-24 bg-giddam-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-primary uppercase tracking-widest transform -skew-x-12">
            {t('sectionTitle')}
          </h2>
          <div className="w-24 h-1 bg-giddam-gold mt-6 transform -skew-x-12" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {matches.map((match, idx) => (
            <div key={idx} className="bg-background border border-white/10 overflow-hidden group hover:border-primary/50 transition-colors">
              <div className="bg-primary/10 p-3 text-center border-b border-white/10 flex justify-between items-center px-6">
                <span className="text-primary font-bold uppercase tracking-widest text-sm">{t('upcoming')}</span>
                <span className="text-white/60 text-sm">{t('internationalFriendly')}</span>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex flex-col items-center gap-4 w-1/3">
                    <span className="text-3xl font-heading font-bold text-primary">{match.homeCode}</span>
                    <span className="text-lg font-bold text-white text-center">{match.homeTeam}</span>
                  </div>

                  <div className="flex flex-col items-center justify-center w-1/3">
                    <span className="text-3xl font-heading font-bold text-white/40 mb-2">VS</span>
                    <span className="px-4 py-1 bg-white/5 border border-white/10 text-giddam-light text-sm font-bold tracking-widest transform -skew-x-12">
                      TBD
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-4 w-1/3">
                    <span className="text-3xl font-heading font-bold text-primary">{match.awayCode}</span>
                    <span className="text-lg font-bold text-white text-center">{match.awayTeam}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 text-white/70">
                    <Calendar size={18} className="text-primary" />
                    <span>
                      {match.date} / {match.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <MapPin size={18} className="text-primary" />
                    <span>{match.stadium}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#" className="inline-block px-8 py-4 border-2 border-primary text-primary font-bold text-lg transform -skew-x-12 hover:bg-primary hover:text-primary-foreground transition-all">
            <span className="block transform skew-x-12 tracking-wider">{t('viewAllMatches')}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
