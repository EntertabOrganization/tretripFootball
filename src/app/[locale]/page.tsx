'use client';

import { useState } from 'react';
import { AboutSection } from '@/components/home/AboutSection';
import { AppDownloadSection } from '@/components/home/AppDownloadSection';
import { FanZonesSection } from '@/components/home/FanZonesSection';
import { HeroSection } from '@/components/home/HeroSection';
import { MatchCenterSection } from '@/components/home/MatchCenterSection';
import { SquadSection } from '@/components/home/SquadSection';
import { TicketGuideSection } from '@/components/home/TicketGuideSection';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';

export default function Home() {
  const [selectedTeamCode, setSelectedTeamCode] = useState('KSA');

  return (
    <>
      <Navbar selectedTeamCode={selectedTeamCode} onSelectTeam={setSelectedTeamCode} />
      <main className="min-h-screen w-full bg-background">
        <HeroSection selectedTeamCode={selectedTeamCode} />
        <AboutSection selectedTeamCode={selectedTeamCode} />
        <MatchCenterSection selectedTeamCode={selectedTeamCode} />
        <SquadSection selectedTeamCode={selectedTeamCode} />
        <FanZonesSection />
        <TicketGuideSection />
        <AppDownloadSection />
      </main>
      <Footer />
    </>
  );
}
