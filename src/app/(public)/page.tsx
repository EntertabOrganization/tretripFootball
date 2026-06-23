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
    <div className="pb-16">
      <section id="home" className="px-4 pb-24 pt-8 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[40px] border border-white/10 bg-slate-950/55 p-8 shadow-2xl shadow-slate-950/25 backdrop-blur-xl sm:p-12">
            <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/75">
              {copy.home.eyebrow}
            </p>
            <h1 className="mt-6 max-w-4xl font-display text-5xl leading-none text-white sm:text-7xl">
              {copy.home.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">{copy.home.body}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/news">
                <Button>{copy.home.primary}</Button>
              </Link>
              <Link href="/competitions">
                <Button variant="secondary">{copy.home.secondary}</Button>
              </Link>
            </div>
          </div>
          <div className="grid gap-5">
            <div className="rounded-[32px] border border-white/15 bg-white/90 p-7 shadow-xl shadow-slate-900/10">
              <p className="text-sm uppercase tracking-[0.25em] text-[var(--color-primary)]">{copy.dashboard.stats}</p>
              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">Bilingual</p>
                  <p className="mt-3 font-display text-4xl text-slate-900">EN / AR</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">Modules</p>
                  <p className="mt-3 font-display text-4xl text-slate-900">6</p>
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-[32px] border border-white/15 bg-[var(--color-primary)] p-8 text-white shadow-xl shadow-cyan-900/20">
              <p className="text-sm uppercase tracking-[0.25em] text-white/75">{copy.common.globalLeaderboard}</p>
              <h2 className="mt-4 font-display text-4xl">TreTrip Champions</h2>
              <p className="mt-3 max-w-md leading-7 text-white/80">
                Editorial publishing, community registrations, and leaderboard momentum all live in the same platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-[36px] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-sm uppercase tracking-[0.25em] text-[var(--color-primary)]">{copy.nav.about}</p>
          <h2 className="mt-4 font-display text-4xl text-slate-950">{copy.home.aboutTitle}</h2>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-600">{copy.home.aboutBody}</p>
        </div>
      </section>

      <section id="competitions" className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-[var(--color-primary)]">{copy.nav.competitions}</p>
              <h2 className="mt-3 font-display text-4xl text-slate-950">{copy.home.liveCompetitions}</h2>
            </div>
            <Link href="/competitions" className="text-sm font-semibold text-[var(--color-primary)]">
              {copy.common.viewAll}
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {competitions.items.map((competition) => (
              <CompetitionCard key={competition.id} competition={competition} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <section id="news" className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-[var(--color-primary)]">{copy.nav.news}</p>
              <h2 className="mt-3 font-display text-4xl text-slate-950">{copy.home.latestNews}</h2>
            </div>
            <Link href="/news" className="text-sm font-semibold text-[var(--color-primary)]">
              {copy.common.viewAll}
            </Link>
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
