import { getDashboardStats, getGlobalLeaderboard } from "@/lib/data";
import { getLocale, t } from "@/lib/i18n";

export default async function DashboardPage() {
  const locale = await getLocale();
  const copy = t(locale);
  const [stats, leaderboard] = await Promise.all([getDashboardStats(), getGlobalLeaderboard()]);

  return (
    <>
      <section className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm uppercase tracking-[0.25em] text-[var(--color-primary)]">{copy.dashboard.subtitle}</p>
        <h1 className="mt-3 font-display text-5xl text-slate-950">{copy.dashboard.title}</h1>
      </section>

      <section className="grid gap-5 lg:grid-cols-4">
        {[
          [copy.dashboard.totalUsers, stats.profiles],
          [copy.dashboard.totalArticles, stats.articles],
          [copy.dashboard.totalCompetitions, stats.competitions],
          [copy.dashboard.totalComments, stats.comments],
        ].map(([label, value]) => (
          <div key={String(label)} className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-4 font-display text-5xl text-slate-950">{value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="font-display text-3xl text-slate-950">{copy.common.globalLeaderboard}</h2>
        <div className="mt-6 overflow-hidden rounded-[28px] border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Wins</th>
                <th className="px-4 py-3 text-left">Participations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {leaderboard.map((entry) => (
                <tr key={entry.user_id}>
                  <td className="px-4 py-3">{entry.full_name}</td>
                  <td className="px-4 py-3">{entry.wins}</td>
                  <td className="px-4 py-3">{entry.participations}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
