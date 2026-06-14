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
    <section className="w-full py-24 bg-white relative border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="w-20 h-20 bg-[#f0fbfd] rounded-full flex items-center justify-center mb-6">
            <Trophy size={40} className="text-[#0B9DB5]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#071C25] uppercase tracking-widest transform -skew-x-12">
            {t('sectionTitle')} <span className="text-[#0B9DB5] block mt-2 md:inline md:mt-0">{t('sectionTitleHighlight')}</span>
          </h2>
          <p className="mt-4 text-[#071C25]/60 text-lg max-w-2xl">{t('subtitle')}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f0fbfd] border-b border-[#0B9DB5]/20">
                  <th className="py-5 px-6 text-[#0B9DB5] font-bold uppercase tracking-wider text-sm">{t('rank')}</th>
                  <th className="py-5 px-6 text-[#0B9DB5] font-bold uppercase tracking-wider text-sm">{t('predictor')}</th>
                  <th className="py-5 px-6 text-[#0B9DB5] font-bold uppercase tracking-wider text-sm text-center">{t('predictions')}</th>
                  <th className="py-5 px-6 text-[#0B9DB5] font-bold uppercase tracking-wider text-sm text-center">{t('correct')}</th>
                  <th className="py-5 px-6 text-[#0B9DB5] font-bold uppercase tracking-wider text-sm text-right">{t('points')}</th>
                </tr>
              </thead>
              <tbody>
                {LEADERBOARD_DATA.length > 0 ? (
                  LEADERBOARD_DATA.map((user, index) => (
                    <tr 
                      key={user.id} 
                      className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${index < 3 ? 'bg-gradient-to-r from-transparent to-gray-50/50' : ''}`}
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
                          <div className="w-10 h-10 rounded-full bg-[#0B9DB5]/10 text-[#0B9DB5] flex items-center justify-center font-bold">
                            {user.name.charAt(0)}
                          </div>
                          <span className="font-bold text-[#071C25]">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center font-medium text-[#071C25]/70">{user.predictions}</td>
                      <td className="py-4 px-6 text-center font-medium text-green-600">{user.correct}</td>
                      <td className="py-4 px-6 text-right font-bold text-[#0B9DB5] text-lg">{user.points}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-[#071C25]/50 font-medium">
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
