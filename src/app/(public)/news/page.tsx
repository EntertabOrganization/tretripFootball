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

  const [news, categories] = await Promise.all([
    getNewsList({ page, pageSize, category }),
    getCategories(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm uppercase tracking-[0.25em] text-[var(--color-primary)]">{copy.nav.news}</p>
        <h1 className="mt-3 font-display text-5xl text-slate-950">{copy.news.title}</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-600">{copy.news.subtitle}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/news"
            className={`rounded-full px-4 py-2 text-sm font-medium ${!category ? "bg-[var(--color-primary)] text-white" : "border border-slate-200 bg-slate-50 text-slate-700"}`}
          >
            All
          </Link>
          {categories.map((item) => (
            <Link
              key={item.id}
              href={`/news?category=${item.slug}`}
              className={`rounded-full px-4 py-2 text-sm font-medium ${category === item.slug ? "bg-[var(--color-primary)] text-white" : "border border-slate-200 bg-slate-50 text-slate-700"}`}
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

      <div className="mt-8 flex items-center justify-between rounded-[28px] border border-slate-200 bg-white p-5 text-sm text-slate-600">
        <span>
          {copy.common.page} {news.page} / {news.totalPages}
        </span>
        <div className="flex gap-3">
          {news.page > 1 ? (
            <a className="rounded-full border border-slate-200 px-4 py-2" href={`/news?page=${news.page - 1}${category ? `&category=${category}` : ""}`}>
              Prev
            </a>
          ) : null}
          {news.page < news.totalPages ? (
            <a className="rounded-full border border-slate-200 px-4 py-2" href={`/news?page=${news.page + 1}${category ? `&category=${category}` : ""}`}>
              Next
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
