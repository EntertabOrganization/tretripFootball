'use client';

import { useState } from 'react';
import { AboutSection } from '@/components/home/AboutSection';
import { AppDownloadSection } from '@/components/home/AppDownloadSection';
import { LeaderboardSection } from '@/components/home/LeaderboardSection';
import { HeroSection } from '@/components/home/HeroSection';
import { MatchCenterSection } from '@/components/home/MatchCenterSection';
import { SquadSection } from '@/components/home/SquadSection';
import { TicketGuideSection } from '@/components/home/TicketGuideSection';
import { OpportunitySection } from '@/components/home/OpportunitySection';
import { VoicesSection } from '@/components/home/VoicesSection';
import { DataActivationSection } from '@/components/home/DataActivationSection';
import { ContentPreviewSection } from '@/components/home/ContentPreviewSection';
import { CitiesStrategySection } from '@/components/home/CitiesStrategySection';
import { WhatWeProvideSection } from '@/components/home/WhatWeProvideSection';
import { DeliverablesSection } from '@/components/home/DeliverablesSection';
import { SustainableValueSection } from '@/components/home/SustainableValueSection';
import { PartnerSection } from '@/components/home/PartnerSection';
import { MinistryContactCTA } from '@/components/home/MinistryContactCTA';
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
        <LeaderboardSection />
        <TicketGuideSection />
        <AppDownloadSection />
        
        {/* New Ministry Pitch Sections */}
        <OpportunitySection />
        <VoicesSection />
        <DataActivationSection />
        <ContentPreviewSection />
        <CitiesStrategySection />
        <WhatWeProvideSection />
        <DeliverablesSection />
        <SustainableValueSection />
        <PartnerSection />
        <MinistryContactCTA />
      </main>
      <Footer />
    </>
  );
}
