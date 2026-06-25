import Link from "next/link";

import { localizeText, t } from "@/lib/i18n";
import type { Locale, NewsArticle } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function NewsCard({ article, locale }: { article: NewsArticle; locale: Locale }) {
  const articleHref = article.external_url ?? `/news/${article.slug}`;
  const isExternalArticle = Boolean(article.external_url);
  const copy = t(locale);

  return (
    <article className="public-card group overflow-hidden rounded-[28px]">
      {article.cover_image_url ? (
        <div
          className="h-64 bg-cover bg-center transition duration-500 group-hover:scale-[1.03]"
          style={{ backgroundImage: `linear-gradient(rgba(12,29,37,0.16), rgba(12,29,37,0.52)), url(${article.cover_image_url})` }}
        />
      ) : (
        <div className="h-64 bg-[var(--color-surface-soft)]" />
      )}
      <div className="space-y-5 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
          <span>{localizeText(locale, { en: article.category?.title_en ?? copy.common.general, ar: article.category?.title_ar ?? copy.common.general })}</span>
          {article.published_at ? <span>{formatDate(article.published_at, locale)}</span> : null}
        </div>
        <div>
          <h3 className="public-heading text-[1.7rem] font-bold text-[var(--color-text)]">
            {localizeText(locale, { en: article.title_en, ar: article.title_ar })}
          </h3>
          <p className="mt-3 line-clamp-3 leading-7 text-[var(--color-text-muted)]">
            {localizeText(locale, { en: article.summary_en, ar: article.summary_ar })}
          </p>
        </div>
        <div className="flex items-center justify-between border-t border-[var(--color-outline)] pt-4">
          <span className="text-sm font-semibold text-[var(--color-primary)]">{article.source_name ?? copy.common.sourceEditorial}</span>
          <Link
            href={articleHref}
            className="rounded-xl border border-[var(--color-outline)] px-4 py-2 text-sm font-semibold text-[var(--color-text)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
            target={isExternalArticle ? "_blank" : undefined}
            rel={isExternalArticle ? "noreferrer" : undefined}
          >
            {isExternalArticle ? copy.common.openSource : copy.common.readMore}
          </Link>
        </div>
      </div>
    </article>
  );
}
