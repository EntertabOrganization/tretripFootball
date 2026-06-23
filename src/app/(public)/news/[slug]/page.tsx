import { notFound } from "next/navigation";

import { addCommentAction, toggleCommentLikeAction, toggleNewsLikeAction } from "@/lib/actions";
import { getCurrentProfile } from "@/lib/auth";
import { getCommentsForNews, getNewsBySlug } from "@/lib/data";
import { getLocale, localizeText, t } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getLocale();
  const copy = t(locale);
  const [article, profile] = await Promise.all([getNewsBySlug(slug), getCurrentProfile()]);

  if (!article) {
    notFound();
  }

  const comments = await getCommentsForNews(article.id);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <article className="overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-sm">
        {article.cover_image_url ? (
          <div
            className="h-80 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(8,47,73,0.2), rgba(15,23,42,0.65)), url(${article.cover_image_url})`,
            }}
          />
        ) : null}
        <div className="space-y-6 p-8 sm:p-10">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span className="rounded-full bg-slate-100 px-3 py-1">
              {localizeText(locale, { en: article.category?.title_en ?? "General", ar: article.category?.title_ar ?? "عام" })}
            </span>
            {article.published_at ? <span>{formatDate(article.published_at, locale)}</span> : null}
            <span>{article.likes_count ?? 0} likes</span>
            <span>{article.comments_count ?? 0} comments</span>
          </div>
          <div>
            <h1 className="font-display text-5xl text-slate-950">
              {localizeText(locale, { en: article.title_en, ar: article.title_ar })}
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              {localizeText(locale, { en: article.summary_en, ar: article.summary_ar })}
            </p>
          </div>
          <div className="prose-content text-lg leading-8 text-slate-700">
            {localizeText(locale, { en: article.content_en, ar: article.content_ar })}
          </div>

          <form action={toggleNewsLikeAction} className="inline-flex">
            <input type="hidden" name="newsId" value={article.id} />
            <input type="hidden" name="newsSlug" value={article.slug} />
            <input type="hidden" name="liked" value="false" />
            <button type="submit" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900">
              {copy.news.like}
            </button>
          </form>
        </div>
      </article>

      <section className="mt-8 rounded-[36px] border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="font-display text-3xl text-slate-950">{copy.news.comments}</h2>

        {profile ? (
          <form action={addCommentAction} className="mt-6 grid gap-3">
            <input type="hidden" name="newsId" value={article.id} />
            <input type="hidden" name="newsSlug" value={article.slug} />
            <textarea
              name="commentText"
              className="min-h-28 rounded-3xl border border-slate-200 px-4 py-4"
              placeholder={copy.news.commentPlaceholder}
              required
            />
            <button type="submit" className="w-fit rounded-full bg-[var(--color-primary)] px-5 py-3 font-semibold text-white">
              {copy.news.addComment}
            </button>
          </form>
        ) : null}

        <div className="mt-8 space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="rounded-[28px] border border-slate-200 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-slate-900">
                    {comment.author?.first_name} {comment.author?.last_name}
                  </p>
                  <p className="text-sm text-slate-500">{formatDate(comment.created_at, locale)}</p>
                </div>
                {profile ? (
                  <form action={toggleCommentLikeAction}>
                    <input type="hidden" name="commentId" value={comment.id} />
                    <input type="hidden" name="newsSlug" value={article.slug} />
                    <input type="hidden" name="liked" value="false" />
                    <button type="submit" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900">
                      {copy.news.like} · {comment.likes_count ?? 0}
                    </button>
                  </form>
                ) : null}
              </div>
              <p className="mt-4 leading-7 text-slate-700">{comment.comment_text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
