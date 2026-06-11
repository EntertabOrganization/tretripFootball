import { HeroSection } from '@/components/home/HeroSection';
import { AboutSection } from '@/components/home/AboutSection';
import { SquadSection } from '@/components/home/SquadSection';
import { CampaignVideoSection } from '@/components/home/CampaignVideoSection';
import { CampaignAssetsSection } from '@/components/home/CampaignAssetsSection';
import { MatchCenterSection } from '@/components/home/MatchCenterSection';
import { TicketGuideSection } from '@/components/home/TicketGuideSection';
import { AppDownloadSection } from '@/components/home/AppDownloadSection';
import { FanZonesSection } from '@/components/home/FanZonesSection';

export default function Home() {
  return (
    <main className="flex-1 flex flex-col w-full">
      <HeroSection />
      <AboutSection />
      <SquadSection />
      <CampaignVideoSection />
      <CampaignAssetsSection />
      <MatchCenterSection />
      <TicketGuideSection />
      <AppDownloadSection />
      <FanZonesSection />
    </main>
  );
}
