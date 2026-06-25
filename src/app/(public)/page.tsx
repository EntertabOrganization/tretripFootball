import Image from "next/image";
import Link from "next/link";

import { AboutImageSlider } from "@/components/about/about-image-slider";
import { CompetitionCard } from "@/components/cards/competition-card";
import { NewsCard } from "@/components/cards/news-card";
import { Button } from "@/components/ui/button";
import { getCompetitionsList, getNewsList } from "@/lib/data";
import { getLocale, t } from "@/lib/i18n";
import { getAboutImagePaths, getTeamFlags } from "@/lib/site-assets";

export default async function HomePage() {
  const locale = await getLocale();
  const copy = t(locale);
  const [news, competitions, aboutImages, teamFlags] = await Promise.all([
    getNewsList({ page: "1", pageSize: "3" }),
    getCompetitionsList({ page: "1", pageSize: "2" }),
    getAboutImagePaths(),
    getTeamFlags(),
  ]);

  return (
    <div className="pb-20">
      <section id="home" className="relative overflow-hidden px-4 pb-24 pt-44 text-white sm:px-6 sm:pt-48">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay loop muted playsInline preload="metadata" aria-hidden="true">
          <source src="/HeroVideo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,27,31,0.58)_0%,rgba(5,27,31,0.72)_38%,rgba(5,27,31,0.9)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(61,223,193,0.18),transparent_28%),radial-gradient(circle_at_right_center,rgba(255,255,255,0.08),transparent_24%)]" />

        <div className="public-container relative">
          <div className="max-w-5xl">
            <span className="public-pill text-white/88">{copy.home.eyebrow}</span>
            <h1 className="public-heading mt-8 whitespace-pre-line text-5xl font-black uppercase leading-[0.92] text-white sm:text-7xl xl:text-[6.4rem]">
              {copy.home.heroTitle}
            </h1>
            <p className="mt-8 max-w-4xl text-lg leading-8 text-white/82 sm:text-2xl">{copy.home.heroBody}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/competitions">
                <Button className="rounded-2xl px-8 py-4 text-base font-bold">{copy.home.heroPrimary}</Button>
              </Link>
              <Link href="/news">
                <Button variant="secondary" className="rounded-2xl px-8 py-4 text-base font-bold">
                  {copy.home.heroSecondary}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="public-section">
        <div className="public-container">
          <div className="text-center">
            <p className="public-kicker">{copy.nav.about}</p>
            <h2 className="public-heading mt-4 text-4xl font-black text-[var(--color-text)] sm:text-5xl">{copy.home.aboutTitle}</h2>
          </div>

          <div className="mt-14 grid items-center gap-8 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <div className="overflow-hidden rounded-[34px] border border-[var(--color-outline)] bg-[linear-gradient(145deg,#edf7f7_0%,#d4ebea_100%)] p-6 shadow-[0_28px_70px_-42px_rgba(17,67,74,0.45)]">
                <AboutImageSlider images={aboutImages} locale={locale} />
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="public-card rounded-[34px] p-8 sm:p-10">
                <p className="public-kicker">{copy.home.eyebrow}</p>
                <h3 className="public-heading mt-4 text-3xl font-black text-[var(--color-text)] sm:text-4xl">{copy.home.aboutTitle}</h3>
                <p className="mt-5 text-lg leading-8 text-[var(--color-text-muted)]">{copy.home.aboutBody}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="arab-teams" className="public-section pt-0">
        <div className="public-container">
          <div className="mb-8 text-center">
            <p className="public-kicker">{copy.home.teamsKicker}</p>
            <h2 className="public-heading mt-4 text-4xl font-black text-[var(--color-text)] sm:text-5xl">{copy.home.teamsTitle}</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {teamFlags.map((team) => (
              <article key={team.name} className="public-card rounded-[28px] p-6 transition duration-200 hover:-translate-y-1 hover:shadow-[0_26px_60px_-36px_rgba(15,66,72,0.4)]">
                <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[24px] border border-[var(--color-outline)] bg-[var(--color-surface-muted)] p-6">
                  <Image
                    src={team.imagePath}
                    alt={`${team.name} flag`}
                    fill
                    className="object-contain p-6"
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <h3 className="public-heading mt-5 text-2xl font-bold text-[var(--color-text)]">{team.name}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="competitions" className="public-section pt-0">
        <div className="public-container">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="public-kicker">{copy.nav.competitions}</p>
              <h2 className="public-heading mt-3 text-4xl font-bold text-[var(--color-text)] sm:text-5xl">{copy.home.liveCompetitions}</h2>
            </div>
            <Link href="/competitions" className="text-sm font-bold text-[var(--color-primary)]">{copy.common.viewAll}</Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {competitions.items.map((competition) => (
              <CompetitionCard key={competition.id} competition={competition} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <section id="news" className="public-section pt-0">
        <div className="public-container">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="public-kicker">{copy.nav.news}</p>
              <h2 className="public-heading mt-3 text-4xl font-bold text-[var(--color-text)] sm:text-5xl">{copy.home.latestNews}</h2>
            </div>
            <Link href="/news" className="text-sm font-bold text-[var(--color-primary)]">{copy.common.viewAll}</Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {news.items.map((article) => (
              <NewsCard key={article.id} article={article} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
