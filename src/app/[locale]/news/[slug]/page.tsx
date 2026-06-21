import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { CommentForm } from "@/components/comments/CommentForm";
import { LikeToggleButton } from "@/components/likes/LikeToggleButton";
import { buttonVariants } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import { getBlogBySlug, getBlogLikeSummary, getCommentLikeSummaries } from "@/lib/queries";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";

export default async function NewsDetailsPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations("News");
  const user = await getCurrentUser();
  const article = await getBlogBySlug(slug, user);

  if (!article || (article.status !== "PUBLISHED" && user?.role !== "ADMIN" && user?.role !== "EDITOR")) {
    notFound();
  }

  const [blogLike, commentLikes] = await Promise.all([
    getBlogLikeSummary(article.id, user?.id),
    getCommentLikeSummaries(
      article.comments.map((comment) => comment.id),
      user?.id,
    ),
  ]);

  return (
    <div className="shell space-y-8">
      <article className="glass-card overflow-hidden">
        <div
          className="h-72 bg-cover bg-center sm:h-96"
          style={{
            backgroundImage: article.imageUrl
              ? `linear-gradient(rgba(10,15,20,0.2), rgba(10,15,20,0.46)), url(${article.imageUrl})`
              : "linear-gradient(135deg, rgba(21,71,52,0.95), rgba(15,118,110,0.82))",
          }}
        />
        <div className="space-y-6 p-8 sm:p-10">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            <span>{article.category.name}</span>
            <span>{article.publishedAt?.toLocaleDateString() ?? "Draft"}</span>
            {article.author?.fullName ? <span>{article.author.fullName}</span> : null}
          </div>

          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-balance sm:text-5xl">
              {article.title}
            </h1>
            <p className="max-w-3xl text-base leading-7 text-muted-foreground">{article.description}</p>
          </div>

          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p className="whitespace-pre-line text-base leading-8 text-foreground/90">{article.content}</p>
          </div>

          <LikeToggleButton
            likeableType="BLOG"
            likeableId={article.id}
            initialCount={blogLike.count}
            initialLiked={blogLike.liked}
            disabled={!user}
          />
        </div>
      </article>

      <section className="space-y-6">
        <div>
          <div className="section-kicker">{t("commentsTitle")}</div>
          <h2 className="section-title">{t("commentsTitle")}</h2>
        </div>

        {user ? (
          <CommentForm
            locale={locale}
            slug={slug}
            blogId={article.id}
            title={t("commentFormTitle")}
            placeholder={t("commentPlaceholder")}
            submitLabel={t("commentSubmit")}
          />
        ) : (
          <div className="glass-card flex items-center justify-between gap-4 p-6">
            <p className="text-sm text-muted-foreground">{t("loginToComment")}</p>
            <Link href="/login" className={cn(buttonVariants({ variant: "default" }))}>
              Login
            </Link>
          </div>
        )}

        <div className="space-y-4">
          {article.comments.map((comment) => {
            const like = commentLikes.get(comment.id) ?? { count: 0, liked: false };
            return (
              <article key={comment.id} className="glass-card space-y-4 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-semibold">{comment.user.fullName}</div>
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {comment.createdAt.toLocaleDateString()}
                    </div>
                  </div>
                  {!comment.isVisible ? (
                    <span className="rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-secondary-foreground">
                      Hidden
                    </span>
                  ) : null}
                </div>
                <p className="text-sm leading-7 text-foreground/88">{comment.commentText}</p>
                <LikeToggleButton
                  likeableType="COMMENT"
                  likeableId={comment.id}
                  initialCount={like.count}
                  initialLiked={like.liked}
                  disabled={!user}
                />
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
