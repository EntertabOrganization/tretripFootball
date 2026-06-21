import { CalendarDays, MessageSquareText } from "lucide-react";
import { Link } from "@/i18n/routing";

type ArticleCardProps = {
  article: {
    title: string;
    slug: string;
    description: string;
    imageUrl: string | null;
    publishedAt: Date | null;
    category: {
      name: string;
      slug: string;
    };
    _count: {
      comments: number;
    };
  };
};

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="glass-card overflow-hidden">
      <div
        className="h-48 bg-cover bg-center"
        style={{
          backgroundImage: article.imageUrl
            ? `linear-gradient(rgba(15,23,33,0.05), rgba(15,23,33,0.25)), url(${article.imageUrl})`
            : "linear-gradient(135deg, rgba(21,71,52,0.9), rgba(15,118,110,0.8))",
        }}
      />
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          <span>{article.category.name}</span>
          <span>{article.publishedAt ? article.publishedAt.toLocaleDateString() : "Draft"}</span>
        </div>

        <div className="space-y-3">
          <h3 className="text-2xl font-semibold text-balance">{article.title}</h3>
          <p className="text-sm leading-6 text-muted-foreground">{article.description}</p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="size-4" />
              {article.publishedAt ? article.publishedAt.toLocaleDateString() : "Draft"}
            </span>
            <span className="inline-flex items-center gap-2">
              <MessageSquareText className="size-4" />
              {article._count.comments}
            </span>
          </div>

          <Link href={`/news/${article.slug}`} className="text-sm font-semibold text-primary transition hover:text-accent">
            Read more
          </Link>
        </div>
      </div>
    </article>
  );
}
