'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SquadSection } from '@/components/home/SquadSection';
import { AboutSection } from '@/components/home/AboutSection';
import { MatchCenterSection } from '@/components/home/MatchCenterSection';
import { getTeamByCode } from '@/data/arabTeams';

export default function ArabTeamsPage() {
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
              {locale === 'en' ? 'Arab Teams' : 'المنتخبات العربية'}
            </p>
            <h1 className="mt-4 text-5xl font-heading font-bold text-foreground md:text-6xl">
              {locale === 'en' ? `${team.countryName} Team Hub` : `منصة منتخب ${team.countryNameAr}`}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground/72">
              {locale === 'en'
                ? 'Choose any participating Arab team to instantly update the nickname, group, schedule, and fan-facing content across the page.'
                : 'اختر أي منتخب عربي مشارك ليتم تحديث اللقب والمجموعة والجدول والمحتوى الجماهيري فوراً عبر الصفحة.'}
            </p>
          </div>
        </section>
        <SquadSection selectedTeamCode={selectedTeamCode} onSelectTeam={setSelectedTeamCode} />
        <AboutSection selectedTeamCode={selectedTeamCode} />
        <MatchCenterSection selectedTeamCode={selectedTeamCode} />
      </main>
      <Footer />
    </>
  );
}
