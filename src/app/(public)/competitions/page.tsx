import Link from "next/link";

import { CompetitionCard } from "@/components/cards/competition-card";
import { Button } from "@/components/ui/button";
import { getAllCompetitions } from "@/lib/data";
import { getLocale, t } from "@/lib/i18n";

export default async function CompetitionsPage() {
  const locale = await getLocale();
  const copy = t(locale);
  const competitions = await getAllCompetitions();

  return (
    <div className="pb-20">
      <section className="relative overflow-hidden px-4 pb-24 pt-44 text-white sm:px-6 sm:pt-48">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay loop muted playsInline preload="metadata" aria-hidden="true">
          <source src="/HeroVideo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,27,31,0.58)_0%,rgba(5,27,31,0.72)_38%,rgba(5,27,31,0.9)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(61,223,193,0.18),transparent_28%),radial-gradient(circle_at_right_center,rgba(255,255,255,0.08),transparent_24%)]" />

        <div className="public-container relative">
          <div className="max-w-5xl">
            <span className="public-pill text-white/88">{copy.nav.competitions}</span>
            <h1 className="public-heading mt-8 text-5xl font-black uppercase leading-[0.92] text-white sm:text-7xl xl:text-[6.4rem]">
              {copy.competitions.title}
            </h1>
            <p className="mt-8 max-w-4xl text-lg leading-8 text-white/82 sm:text-2xl">{copy.competitions.subtitle}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="#competitions-feed">
                <Button className="rounded-2xl px-8 py-4 text-base font-bold">{copy.competitions.viewCompetitions}</Button>
              </Link>
              <Link href="/news">
                <Button variant="secondary" className="rounded-2xl px-8 py-4 text-base font-bold">
                  {copy.competitions.latestNews}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="competitions-feed" className="public-section pt-0">
        <div className="public-container">
          <div className="grid gap-6 lg:grid-cols-2">
            {competitions.map((competition) => (
              <CompetitionCard key={competition.id} competition={competition} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
