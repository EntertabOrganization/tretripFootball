import { redirect } from "next/navigation";

import { CompetitionCreateForm } from "@/components/dashboard/forms";
import { toggleWinnerAction } from "@/lib/actions";
import { getCurrentProfile } from "@/lib/auth";
import { getCompetitionsList } from "@/lib/data";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { hasMinimumRole } from "@/lib/permissions";
import { firstRelation } from "@/lib/utils";

export default async function DashboardCompetitionsPage() {
  const profile = await getCurrentProfile();

  if (!profile || !hasMinimumRole(profile.role, "ADMIN")) {
    redirect("/unauthorized");
  }

  const competitions = await getCompetitionsList();
  const admin = createSupabaseAdminClient();
  const registrations = admin
    ? (await admin
        .from("competition_registrations")
        .select("id,is_winner,competition:competitions(title_en),profile:profiles(first_name,last_name)")
        .order("created_at", { ascending: false })).data ?? []
    : [];

  return (
    <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
      <CompetitionCreateForm />
      <div className="space-y-6">
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-display text-3xl text-slate-950">Competitions</h2>
          <div className="mt-6 grid gap-4">
            {competitions.items.map((competition) => (
              <div key={competition.id} className="rounded-3xl border border-slate-200 p-5">
                <p className="font-semibold text-slate-900">{competition.title_en}</p>
                <p className="mt-2 text-sm text-slate-600">{competition.description_en}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-display text-3xl text-slate-950">Winner Management</h2>
          <div className="mt-6 space-y-3">
            {registrations.map((registration) => (
              <div key={registration.id} className="flex items-center justify-between rounded-3xl border border-slate-200 p-4">
                <div>
                  <p className="font-semibold text-slate-900">
                    {firstRelation(registration.profile)?.first_name} {firstRelation(registration.profile)?.last_name}
                  </p>
                  <p className="text-sm text-slate-500">{firstRelation(registration.competition)?.title_en}</p>
                </div>
                <form action={toggleWinnerAction}>
                  <input type="hidden" name="registrationId" value={registration.id} />
                  <input type="hidden" name="isWinner" value={registration.is_winner ? "true" : "false"} />
                  <button type="submit" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900">
                    {registration.is_winner ? "Remove Winner" : "Mark Winner"}
                  </button>
                </form>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
