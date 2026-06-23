import { notFound } from "next/navigation";

import { registerCompetitionAction } from "@/lib/actions";
import { getCompetitionBySlug, getCompetitionLeaderboard } from "@/lib/data";
import { getLocale, localizeText, t } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CompetitionDetailPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getLocale();
  const copy = t(locale);
  const competition = await getCompetitionBySlug(slug);

  if (!competition) notFound();

  const leaderboard = await getCompetitionLeaderboard(competition.id);

  return (
    <div className="public-section">
      <div className="public-container max-w-6xl">
        <section className="public-card overflow-hidden rounded-[36px]">
          <div
            className="h-80 bg-cover bg-center"
            style={{ backgroundImage: `linear-gradient(rgba(0,102,114,0.3), rgba(15,23,42,0.62)), url(${competition.cover_image_url ?? ""})` }}
          />
          <div className="grid gap-8 p-8 lg:grid-cols-[1fr_340px]">
            <div>
              <p className="public-kicker">{copy.nav.competitions}</p>
              <h1 className="public-heading mt-3 text-5xl font-bold text-[var(--color-text)]">
                {localizeText(locale, { en: competition.title_en, ar: competition.title_ar })}
              </h1>
              <p className="mt-4 text-lg leading-8 text-[var(--color-text-muted)]">
                {localizeText(locale, { en: competition.description_en, ar: competition.description_ar })}
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-[24px] bg-[var(--color-surface-muted)] p-4">
                  <p className="font-semibold text-[var(--color-text)]">{copy.competitions.startDate}</p>
                  <p className="mt-2 text-[var(--color-text-muted)]">{formatDate(competition.start_date, locale)}</p>
                </div>
                <div className="rounded-[24px] bg-[var(--color-surface-muted)] p-4">
                  <p className="font-semibold text-[var(--color-text)]">{copy.competitions.endDate}</p>
                  <p className="mt-2 text-[var(--color-text-muted)]">{formatDate(competition.end_date, locale)}</p>
                </div>
              </div>
            </div>
            <div className="rounded-[28px] bg-slate-950 p-6 text-white">
              <p className="public-kicker text-white/68">{copy.common.leaderboard}</p>
              <p className="public-heading mt-3 text-4xl font-bold">{competition.registrations_count ?? 0}</p>
              <p className="mt-2 text-white/72">{locale === "ar" ? "إجمالي المشاركين الحاليين" : "Total current participants"}</p>
              <form action={registerCompetitionAction} className="mt-6">
                <input type="hidden" name="competitionId" value={competition.id} />
                <input type="hidden" name="competitionSlug" value={competition.slug} />
                <button type="submit" className="w-full rounded-xl bg-[var(--color-primary)] px-5 py-3 font-semibold text-white">
                  {copy.competitions.join}
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="public-card mt-8 rounded-[36px] p-8">
          <h2 className="public-heading text-3xl font-bold text-[var(--color-text)]">{copy.common.competitionLeaderboard}</h2>
          <div className="mt-6 overflow-hidden rounded-[24px] border border-[var(--color-outline)]">
            <table className="min-w-full divide-y divide-[var(--color-outline)] text-sm">
              <thead className="bg-[var(--color-surface-muted)] text-left text-[var(--color-text-muted)]">
                <tr>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Wins</th>
                  <th className="px-4 py-3">Participations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {leaderboard.map((entry) => (
                  <tr key={entry.user_id}>
                    <td className="px-4 py-3 text-[var(--color-text)]">{entry.full_name}</td>
                    <td className="px-4 py-3">{entry.wins}</td>
                    <td className="px-4 py-3">{entry.participations}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
