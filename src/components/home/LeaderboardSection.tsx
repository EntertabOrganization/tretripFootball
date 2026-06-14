'use client';
import { Trophy, Medal } from 'lucide-react';
import { useTranslations } from 'next-intl';

// Mock data for the leaderboard until Supabase is connected
const LEADERBOARD_DATA = [
  { id: 1, name: 'Fahad Al-Dossari', predictions: 12, correct: 8, points: 24 },
  { id: 2, name: 'Mohammed Ali', predictions: 10, correct: 7, points: 21 },
  { id: 3, name: 'Sarah Hassan', predictions: 11, correct: 6, points: 18 },
  { id: 4, name: 'Omar Khalid', predictions: 8, correct: 5, points: 15 },
  { id: 5, name: 'Noura Ahmed', predictions: 9, correct: 4, points: 12 },
];

export function LeaderboardSection() {
  const t = useTranslations('LeaderboardSection');

  return (
    <section className="relative w-full border-t border-border bg-white py-24">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Trophy size={40} className="text-primary" />
          </div>
          <h2 className="transform -skew-x-12 text-4xl font-heading font-bold uppercase tracking-widest text-foreground md:text-5xl">
            {t('sectionTitle')} <span className="mt-2 block text-primary md:mt-0 md:inline">{t('sectionTitleHighlight')}</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-foreground/60">{t('subtitle')}</p>
        </div>

        <div className="overflow-hidden rounded-[1.75rem] border border-primary/15 bg-white shadow-[0_26px_60px_rgba(18,53,58,0.08)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-primary/15 bg-primary/8">
                  <th className="px-6 py-5 text-sm font-bold uppercase tracking-wider text-accent">{t('rank')}</th>
                  <th className="px-6 py-5 text-sm font-bold uppercase tracking-wider text-accent">{t('predictor')}</th>
                  <th className="px-6 py-5 text-center text-sm font-bold uppercase tracking-wider text-accent">{t('predictions')}</th>
                  <th className="px-6 py-5 text-center text-sm font-bold uppercase tracking-wider text-accent">{t('correct')}</th>
                  <th className="px-6 py-5 text-right text-sm font-bold uppercase tracking-wider text-accent">{t('points')}</th>
                </tr>
              </thead>
              <tbody>
                {LEADERBOARD_DATA.length > 0 ? (
                  LEADERBOARD_DATA.map((user, index) => (
                    <tr 
                      key={user.id} 
                      className={`border-b border-border/60 transition-colors hover:bg-muted/40 ${index < 3 ? 'bg-gradient-to-r from-transparent to-primary/5' : ''}`}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full font-bold">
                          {index === 0 ? (
                            <Medal size={24} className="text-yellow-500 drop-shadow-md" />
                          ) : index === 1 ? (
                            <Medal size={24} className="text-gray-400 drop-shadow-md" />
                          ) : index === 2 ? (
                            <Medal size={24} className="text-amber-700 drop-shadow-md" />
                          ) : (
                            <span className="text-[#071C25]/50">{index + 1}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                            {user.name.charAt(0)}
                          </div>
                          <span className="font-bold text-foreground">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center font-medium text-foreground/70">{user.predictions}</td>
                      <td className="py-4 px-6 text-center font-medium text-green-600">{user.correct}</td>
                      <td className="py-4 px-6 text-right text-lg font-bold text-primary">{user.points}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center font-medium text-foreground/50">
                      {t('noData')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
