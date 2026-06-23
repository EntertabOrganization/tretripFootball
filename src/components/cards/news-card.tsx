import Link from "next/link";

import { localizeText } from "@/lib/i18n";
import type { Locale, NewsArticle } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function NewsCard({ article, locale }: { article: NewsArticle; locale: Locale }) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm shadow-slate-200/60">
      {article.cover_image_url ? (
        <div
          className="h-56 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(rgba(15,23,42,0.15), rgba(15,23,42,0.45)), url(${article.cover_image_url})` }}
        />
      ) : (
        <div className="h-56 bg-slate-200" />
      )}
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-slate-400">
          <span>{localizeText(locale, { en: article.category?.title_en ?? "General", ar: article.category?.title_ar ?? "عام" })}</span>
          {article.published_at ? <span>{formatDate(article.published_at, locale)}</span> : null}
        </div>
        <div>
          <h3 className="font-display text-2xl text-slate-950">
            {localizeText(locale, { en: article.title_en, ar: article.title_ar })}
          </h3>
          <p className="mt-3 leading-7 text-slate-600">
            {localizeText(locale, { en: article.summary_en, ar: article.summary_ar })}
          </p>
        </div>
        <Link href={`/news/${article.slug}`} className="inline-flex text-sm font-semibold text-[var(--color-primary)]">
          {locale === "ar" ? "قراءة الخبر" : "Read article"}
        </Link>
      </div>
    </article>
  );
}
