import { LockKeyhole, Trophy, Users } from "lucide-react";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { joinCompetitionAction } from "@/app/[locale]/actions";
import { buttonVariants } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import { getCompetitionBySlug, getUserCompetitionStatus } from "@/lib/queries";
import { cn } from "@/lib/utils";

export default async function CompetitionDetailsPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations("Competitions");
  const user = await getCurrentUser();
  const competition = await getCompetitionBySlug(slug);

  if (!competition) {
    notFound();
  }

  if (competition.visibility === "INTERNAL" && user?.userType !== "INTERNAL" && user?.role !== "ADMIN") {
    notFound();
  }

  const registration = user
    ? await getUserCompetitionStatus(user.id, competition.id)
    : null;
  const isClosed = competition.endDate < new Date();

  return (
    <div className="shell">
      <article className="glass-card space-y-8 p-8 sm:p-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-3">
            <div className="gold-chip">
              {competition.visibility === "INTERNAL" ? (
                <>
                  <LockKeyhole className="size-3.5" />
                  {t("internalOnly")}
                </>
              ) : (
                <>
                  <Users className="size-3.5" />
                  {t("public")}
                </>
              )}
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold text-balance">{competition.title}</h1>
            <p className="max-w-3xl text-sm leading-7 text-muted-foreground">{competition.description}</p>
          </div>

          <div className="rounded-[28px] border border-border bg-background p-5 text-sm text-muted-foreground">
            <div className="inline-flex items-center gap-2 font-medium text-foreground">
              <Trophy className="size-4" />
              {competition._count.registrations} registrations
            </div>
            <div className="mt-3">Starts: {competition.startDate.toLocaleDateString()}</div>
            <div>Ends: {competition.endDate.toLocaleDateString()}</div>
          </div>
        </div>

        {registration ? (
          <div className="rounded-3xl border border-primary/30 bg-primary/10 p-5 text-sm font-medium text-primary">
            {t("joined")}
          </div>
        ) : isClosed ? (
          <div className="rounded-3xl border border-secondary/30 bg-secondary/10 p-5 text-sm font-medium text-secondary-foreground">
            {t("registrationClosed")}
          </div>
        ) : user ? (
          <form action={joinCompetitionAction} className="rounded-3xl border border-border bg-background p-5">
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="slug" value={slug} />
            <input type="hidden" name="competitionId" value={competition.id} />
            <button type="submit" className={cn(buttonVariants({ variant: "default", size: "lg" }))}>
              {t("join")}
            </button>
          </form>
        ) : (
          <div className="rounded-3xl border border-border bg-background p-5 text-sm text-muted-foreground">
            {t("join")} requires an account.
          </div>
        )}
      </article>
    </div>
  );
}
