'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AboutSection } from '@/components/home/AboutSection';
import { SquadSection } from '@/components/home/SquadSection';
import { CompetitionsTeaserSection } from '@/components/home/CompetitionsTeaserSection';
import { getTeamByCode } from '@/data/arabTeams';

export default function AboutPage() {
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
              {locale === 'en' ? 'About TreTrip' : 'عن TreTrip'}
            </p>
            <h1 className="mt-4 text-5xl font-heading font-bold text-foreground md:text-6xl">
              {locale === 'en' ? 'Official Arab Teams Platform' : 'المنصة الرسمية للمنتخبات العربية'}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground/72">
              {locale === 'en'
                ? `TreTrip now serves localized content for ${team.countryName}, including group data, fan content, competitions, and match schedules from one centralized source.`
                : `تعرض TreTrip الآن محتوى محلياً لمنتخب ${team.countryNameAr} يشمل بيانات المجموعة والجماهير والمسابقات وجدول المباريات من مصدر موحد واحد.`}
            </p>
          </div>
        </section>
        <AboutSection selectedTeamCode={selectedTeamCode} />
        <SquadSection selectedTeamCode={selectedTeamCode} onSelectTeam={setSelectedTeamCode} />
        <CompetitionsTeaserSection />
      </main>
      <Footer />
    </>
  );
}
