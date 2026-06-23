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

  if (!competition) {
    notFound();
  }

  const leaderboard = await getCompetitionLeaderboard(competition.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <section className="overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-sm">
        <div
          className="h-80 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(8,47,73,0.2), rgba(15,23,42,0.72)), url(${competition.cover_image_url ?? ""})`,
          }}
        />
        <div className="grid gap-8 p-8 lg:grid-cols-[1fr_340px]">
          <div>
            <h1 className="font-display text-5xl text-slate-950">
              {localizeText(locale, { en: competition.title_en, ar: competition.title_ar })}
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              {localizeText(locale, { en: competition.description_en, ar: competition.description_ar })}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-slate-600">
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">{copy.competitions.startDate}</p>
                <p className="mt-2">{formatDate(competition.start_date, locale)}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">{copy.competitions.endDate}</p>
                <p className="mt-2">{formatDate(competition.end_date, locale)}</p>
              </div>
            </div>
          </div>
          <div className="rounded-[32px] bg-slate-950 p-6 text-white">
            <p className="text-sm uppercase tracking-[0.25em] text-white/65">{copy.common.leaderboard}</p>
            <p className="mt-3 font-display text-4xl">{competition.registrations_count ?? 0}</p>
            <p className="mt-2 text-white/75">{locale === "ar" ? "إجمالي المشاركين الحاليين" : "Total current participants"}</p>
            <form action={registerCompetitionAction} className="mt-6">
              <input type="hidden" name="competitionId" value={competition.id} />
              <input type="hidden" name="competitionSlug" value={competition.slug} />
              <button type="submit" className="w-full rounded-full bg-[var(--color-primary)] px-5 py-3 font-semibold text-white">
                {copy.competitions.join}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[36px] border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="font-display text-3xl text-slate-950">{copy.common.competitionLeaderboard}</h2>
        <div className="mt-6 overflow-hidden rounded-[28px] border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-slate-500">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Wins</th>
                <th className="px-4 py-3">Participations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {leaderboard.map((entry) => (
                <tr key={entry.user_id}>
                  <td className="px-4 py-3 text-slate-900">{entry.full_name}</td>
                  <td className="px-4 py-3">{entry.wins}</td>
                  <td className="px-4 py-3">{entry.participations}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
