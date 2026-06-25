import Link from "next/link";

import { NewsCard } from "@/components/cards/news-card";
import { Button } from "@/components/ui/button";
import { getCategories, getNewsList } from "@/lib/data";
import { getLocale, localizeText, t } from "@/lib/i18n";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function NewsPage({ searchParams }: Props) {
  const params = await searchParams;
  const locale = await getLocale();
  const copy = t(locale);
  const category = typeof params.category === "string" ? params.category : undefined;
  const page = typeof params.page === "string" ? params.page : undefined;
  const pageSize = typeof params.pageSize === "string" ? params.pageSize : undefined;

  const [news, categories] = await Promise.all([getNewsList({ page, pageSize, category }), getCategories()]);

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
            <span className="public-pill text-white/88">{copy.nav.news}</span>
            <h1 className="public-heading mt-8 text-5xl font-black uppercase leading-[0.92] text-white sm:text-7xl xl:text-[6.4rem]">{copy.news.title}</h1>
            <p className="mt-8 max-w-4xl text-lg leading-8 text-white/82 sm:text-2xl">{copy.news.subtitle}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="#news-feed">
                <Button className="rounded-2xl px-8 py-4 text-base font-bold">{copy.news.browse}</Button>
              </Link>
              <Link href="/#competitions">
                <Button variant="secondary" className="rounded-2xl px-8 py-4 text-base font-bold">
                  {copy.news.exploreCompetitions}
                </Button>
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/news"
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${!category ? "bg-[var(--color-primary)] text-white" : "border border-white/25 bg-white/10 text-white hover:bg-white/16"}`}
              >
                {copy.common.all}
              </Link>
              {categories.map((item) => (
                <Link
                  key={item.id}
                  href={`/news?category=${item.slug}`}
                  className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${category === item.slug ? "bg-[var(--color-primary)] text-white" : "border border-white/25 bg-white/10 text-white hover:bg-white/16"}`}
                >
                  {localizeText(locale, { en: item.title_en, ar: item.title_ar })}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="news-feed" className="public-section pt-0">
        <div className="public-container">
          <div className="grid gap-6 lg:grid-cols-2">
            {news.items.map((article) => (
              <NewsCard key={article.id} article={article} locale={locale} />
            ))}
          </div>

          <div className="public-card mt-8 flex flex-wrap items-center justify-between gap-4 rounded-[24px] p-5 text-sm text-[var(--color-text-muted)]">
            <span>
              {copy.common.page} {news.page} / {news.totalPages}
            </span>
            <div className="flex gap-3">
              {news.page > 1 ? (
                <a className="rounded-xl border border-[var(--color-outline)] px-4 py-2 font-semibold text-[var(--color-text)]" href={`/news?page=${news.page - 1}${category ? `&category=${category}` : ""}`}>
                  {copy.common.previous}
                </a>
              ) : null}
              {news.page < news.totalPages ? (
                <a className="rounded-xl border border-[var(--color-outline)] px-4 py-2 font-semibold text-[var(--color-text)]" href={`/news?page=${news.page + 1}${category ? `&category=${category}` : ""}`}>
                  {copy.common.next}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
