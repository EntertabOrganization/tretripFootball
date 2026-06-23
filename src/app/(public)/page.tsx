import Link from "next/link";

import { CompetitionCard } from "@/components/cards/competition-card";
import { NewsCard } from "@/components/cards/news-card";
import { Button } from "@/components/ui/button";
import { getCompetitionsList, getNewsList } from "@/lib/data";
import { getLocale, t } from "@/lib/i18n";

export default async function HomePage() {
  const locale = await getLocale();
  const copy = t(locale);
  const [news, competitions] = await Promise.all([
    getNewsList({ page: "1", pageSize: "3" }),
    getCompetitionsList({ page: "1", pageSize: "2" }),
  ]);

  return (
    <div className="pb-20">
      <section id="home" className="px-4 pb-20 pt-6 sm:px-6">
        <div className="public-container grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6 rounded-[36px] border border-white/12 bg-slate-950/18 p-8 text-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.85)] backdrop-blur-md sm:p-12">
            <span className="public-pill text-white/88">{copy.home.eyebrow}</span>
            <h1 className="public-heading max-w-4xl text-5xl font-bold leading-none text-white sm:text-7xl">
              {copy.home.title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-white/82">{copy.home.body}</p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/news">
                <Button className="px-7 py-4">{copy.home.primary}</Button>
              </Link>
              <Link href="/competitions">
                <Button variant="secondary" className="px-7 py-4">{copy.home.secondary}</Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="public-card rounded-[30px] p-7">
              <p className="public-kicker">{copy.dashboard.stats}</p>
              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-[24px] bg-[var(--color-surface-muted)] p-5">
                  <p className="text-sm text-[var(--color-text-muted)]">Bilingual</p>
                  <p className="public-heading mt-3 text-4xl font-bold text-[var(--color-text)]">EN / AR</p>
                </div>
                <div className="rounded-[24px] bg-[var(--color-surface-muted)] p-5">
                  <p className="text-sm text-[var(--color-text-muted)]">Modules</p>
                  <p className="public-heading mt-3 text-4xl font-bold text-[var(--color-text)]">6</p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[30px] bg-white/12 p-8 text-white shadow-[0_30px_60px_-30px_rgba(9,17,25,0.75)] backdrop-blur-md">
              <p className="public-kicker text-white/75">{copy.common.globalLeaderboard}</p>
              <h2 className="public-heading mt-4 text-4xl font-bold">TreTrip Champions</h2>
              <p className="mt-3 max-w-md leading-7 text-white/78">
                Editorial publishing, community registrations, and leaderboard momentum all live in the same premium football platform.
              </p>
              <div className="mt-6 flex flex-wrap gap-6">
                <div>
                  <p className="public-heading text-3xl font-bold text-white">1.2M</p>
                  <p className="mt-1 text-sm uppercase tracking-[0.2em] text-white/60">Fans</p>
                </div>
                <div>
                  <p className="public-heading text-3xl font-bold text-white">24/7</p>
                  <p className="mt-1 text-sm uppercase tracking-[0.2em] text-white/60">Coverage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="public-section">
        <div className="public-container">
          <div className="public-card rounded-[32px] p-8 sm:p-10">
            <p className="public-kicker">{copy.nav.about}</p>
            <h2 className="public-heading mt-4 text-4xl font-bold text-[var(--color-text)] sm:text-5xl">{copy.home.aboutTitle}</h2>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-[var(--color-text-muted)]">{copy.home.aboutBody}</p>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <div className="rounded-[24px] border border-[var(--color-outline)] bg-[var(--color-surface)] p-6">
                <p className="public-heading text-2xl font-bold text-[var(--color-primary)]">News</p>
                <p className="mt-3 leading-7 text-[var(--color-text-muted)]">Professional bilingual editorial coverage for sports and internal updates.</p>
              </div>
              <div className="rounded-[24px] border border-[var(--color-outline)] bg-[var(--color-surface)] p-6">
                <p className="public-heading text-2xl font-bold text-[var(--color-primary)]">Competitions</p>
                <p className="mt-3 leading-7 text-[var(--color-text-muted)]">Structured fan challenges with clear registration, participation, and winner management.</p>
              </div>
              <div className="rounded-[24px] border border-[var(--color-outline)] bg-[var(--color-surface)] p-6">
                <p className="public-heading text-2xl font-bold text-[var(--color-primary)]">Leaderboards</p>
                <p className="mt-3 leading-7 text-[var(--color-text-muted)]">Competition and global rankings designed to reward community momentum.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="competitions" className="public-section">
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

      <section id="news" className="public-section">
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
