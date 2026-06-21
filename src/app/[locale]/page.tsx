import { ArrowRight, Newspaper, Trophy } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { CompetitionCard } from "@/components/competitions/CompetitionCard";
import { ArticleCard } from "@/components/news/ArticleCard";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { getHomePageData } from "@/lib/queries";
import { cn } from "@/lib/utils";

export default async function HomePage() {
  const t = await getTranslations("Home");
  const { latestNews, featuredCompetitions, categories } = await getHomePageData();

  return (
    <div className="shell space-y-14">
      <section className="hero-panel overflow-hidden rounded-[36px] px-6 py-10 text-primary-foreground shadow-[0_32px_90px_rgba(9,32,26,0.24)] sm:px-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.9fr] lg:items-end">
          <div className="space-y-6">
            <span className="gold-chip">{t("badge")}</span>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[0.94] text-balance sm:text-5xl lg:text-7xl">
              {t("title")}
            </h1>
            <p className="max-w-2xl text-base leading-7 text-primary-foreground/78 sm:text-lg">
              {t("subtitle")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/news" className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}>
                <Newspaper className="size-4" />
                {t("primaryCta")}
              </Link>
              <Link href="/competitions" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-white/25 bg-white/10 text-white hover:bg-white/16 hover:text-white")}>
                <Trophy className="size-4" />
                {t("secondaryCta")}
              </Link>
            </div>
          </div>

          <div className="glass-card grid gap-6 p-6 text-foreground">
            <div className="space-y-2">
              <div className="section-kicker">{t("categories")}</div>
              <h2 className="text-3xl font-semibold">Editorial structure</h2>
              <p className="text-sm leading-6 text-muted-foreground">
                Curated coverage, competition launches, and bilingual fan touchpoints shaped for a modern Tretrip editorial desk.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 rounded-[24px] bg-primary/5 p-4 text-center">
              <div>
                <div className="font-heading text-3xl font-semibold text-primary">24/7</div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">News flow</div>
              </div>
              <div>
                <div className="font-heading text-3xl font-semibold text-primary">2</div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Languages</div>
              </div>
              <div>
                <div className="font-heading text-3xl font-semibold text-primary">V1</div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Platform</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/news?category=${category.slug}`}
                  className="rounded-full border border-border bg-background/80 px-4 py-2 text-sm font-medium transition hover:border-primary hover:bg-primary/5 hover:text-primary"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="section-kicker">{t("latestNews")}</div>
            <h2 className="section-title">Latest published coverage</h2>
          </div>
          <Link href="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-accent">
            View all
            <ArrowRight className="size-4" />
          </Link>
        </div>
        {latestNews.length ? (
          <div className="soft-grid">
            {latestNews.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="glass-card p-8 text-sm text-muted-foreground">{t("emptyNews")}</div>
        )}
      </section>

      <section className="space-y-6">
        <div>
          <div className="section-kicker">{t("featuredCompetitions")}</div>
          <h2 className="section-title">Current competitions</h2>
        </div>
        {featuredCompetitions.length ? (
          <div className="soft-grid">
            {featuredCompetitions.map((competition) => (
              <CompetitionCard key={competition.id} competition={competition} />
            ))}
          </div>
        ) : (
          <div className="glass-card p-8 text-sm text-muted-foreground">{t("emptyCompetitions")}</div>
        )}
      </section>
    </div>
  );
}
