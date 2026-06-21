import { getTranslations } from "next-intl/server";
import { ArticleCard } from "@/components/news/ArticleCard";
import { Link } from "@/i18n/routing";
import { getPublishedBlogs } from "@/lib/queries";
import { prisma } from "@/lib/prisma";

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const t = await getTranslations("News");
  const { category } = await searchParams;
  const [articles, categories] = await Promise.all([
    getPublishedBlogs(category),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="shell space-y-8">
      <section className="glass-card p-8 sm:p-10">
        <div className="section-kicker">{t("title")}</div>
        <h1 className="mt-3 text-4xl font-semibold">{t("title")}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{t("subtitle")}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/news"
            className={[
              "rounded-full border px-4 py-2 text-sm font-medium transition",
              !category
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card hover:border-primary hover:text-primary",
            ].join(" ")}
          >
            {t("allCategories")}
          </Link>
          {categories.map((item) => (
            <Link
              key={item.id}
              href={`/news?category=${item.slug}`}
              className={[
                "rounded-full border px-4 py-2 text-sm font-medium transition",
                category === item.slug
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:border-primary hover:text-primary",
              ].join(" ")}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </section>

      <div className="soft-grid">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
