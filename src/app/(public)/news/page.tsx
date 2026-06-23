import Link from "next/link";

import { NewsCard } from "@/components/cards/news-card";
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
    <div className="public-section">
      <div className="public-container">
        <div className="public-card rounded-[32px] p-8 sm:p-10">
          <p className="public-kicker">{copy.nav.news}</p>
          <h1 className="public-heading mt-3 text-5xl font-bold text-[var(--color-text)]">{copy.news.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--color-text-muted)]">{copy.news.subtitle}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/news"
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold ${!category ? "bg-[var(--color-primary)] text-white" : "border border-[var(--color-outline)] bg-[var(--color-surface-muted)] text-[var(--color-text)]"}`}
            >
              All
            </Link>
            {categories.map((item) => (
              <Link
                key={item.id}
                href={`/news?category=${item.slug}`}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold ${category === item.slug ? "bg-[var(--color-primary)] text-white" : "border border-[var(--color-outline)] bg-[var(--color-surface-muted)] text-[var(--color-text)]"}`}
              >
                {localizeText(locale, { en: item.title_en, ar: item.title_ar })}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
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
                Prev
              </a>
            ) : null}
            {news.page < news.totalPages ? (
              <a className="rounded-xl border border-[var(--color-outline)] px-4 py-2 font-semibold text-[var(--color-text)]" href={`/news?page=${news.page + 1}${category ? `&category=${category}` : ""}`}>
                Next
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
