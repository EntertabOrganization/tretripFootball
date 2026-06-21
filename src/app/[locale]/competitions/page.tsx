import { getTranslations } from "next-intl/server";
import { CompetitionCard } from "@/components/competitions/CompetitionCard";
import { getCurrentUser } from "@/lib/auth";
import { getVisibleCompetitions } from "@/lib/queries";

export default async function CompetitionsPage() {
  const t = await getTranslations("Competitions");
  const user = await getCurrentUser();
  const competitions = await getVisibleCompetitions(user);

  return (
    <div className="shell space-y-8">
      <section className="glass-card p-8 sm:p-10">
        <div className="section-kicker">{t("title")}</div>
        <h1 className="mt-3 text-4xl font-semibold">{t("title")}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{t("subtitle")}</p>
      </section>

      <div className="soft-grid">
        {competitions.map((competition) => (
          <CompetitionCard key={competition.id} competition={competition} />
        ))}
      </div>
    </div>
  );
}
