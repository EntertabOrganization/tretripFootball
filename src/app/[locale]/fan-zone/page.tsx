'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FanZoneSection } from '@/components/home/FanZoneSection';
import { LeaderboardSection } from '@/components/home/LeaderboardSection';
import { getTeamByCode } from '@/data/arabTeams';

export default function FanZonePage() {
  const locale = useLocale();
  const [selectedTeamCode, setSelectedTeamCode] = useState('KSA');
  const team = getTeamByCode(selectedTeamCode);

  return (
    <>
      <Navbar selectedTeamCode={selectedTeamCode} onSelectTeam={setSelectedTeamCode} />
      <main className="min-h-screen bg-background pt-32">
        <section className="px-4 py-16 md:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-bold uppercase tracking-[0.32em] text-primary">
              {locale === 'en' ? 'Fan Zone' : 'منطقة المشجعين'}
            </p>
            <h1 className="mt-4 text-5xl font-heading font-bold text-foreground md:text-6xl">
              {locale === 'en' ? `${team.countryName} Supporter Mode` : `وضع جماهير ${team.countryNameAr}`}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground/72">
              {locale === 'en'
                ? 'Country-based fan content now follows the selected team, including themed prompts and campaign-ready engagement ideas.'
                : 'أصبح محتوى الجماهير مرتبطاً مباشرة بالمنتخب المختار، بما يشمل الأفكار التفاعلية والحملات الجاهزة للتنفيذ.'}
            </p>
          </div>
        </section>
        <FanZoneSection selectedTeamCode={selectedTeamCode} />
        <LeaderboardSection />
      </main>
      <Footer />
    </>
  );
}
