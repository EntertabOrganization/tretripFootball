import { deleteCompetitionAction, toggleWinnerAction } from "@/lib/actions";
import { getCurrentProfile } from "@/lib/auth";
import { getAllCompetitions } from "@/lib/data";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { hasMinimumRole } from "@/lib/permissions";
import { firstRelation } from "@/lib/utils";
import { redirect } from "next/navigation";
import { AdminDataTable } from "@/components/dashboard/admin-data-table";
import { DashboardModal } from "@/components/dashboard/dashboard-modal";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { CompetitionForm } from "@/components/dashboard/forms";

export default async function DashboardCompetitionsPage() {
  const profile = await getCurrentProfile();
  if (!profile || !hasMinimumRole(profile.role, "ADMIN")) redirect("/unauthorized");

  const competitions = await getAllCompetitions();
  const admin = createSupabaseAdminClient();
  const registrations = admin
    ? (await admin
        .from("competition_registrations")
        .select("id,is_winner,competition:competitions(title_en),profile:profiles(first_name,last_name)")
        .order("created_at", { ascending: false })).data ?? []
    : [];

  return (
    <>
      <DashboardPageHeader
        title="Competitions"
        subtitle="Create competitions, review dates, and manage winners."
        action={
          <DashboardModal title="Create Competition" triggerLabel="Create Competition">
            <CompetitionForm />
          </DashboardModal>
        }
      />

      <AdminDataTable
        columns={["Title", "Start", "End", "Action"]}
        rows={competitions.map((competition) => [
          competition.title_en,
          new Date(competition.start_date).toLocaleDateString(),
          new Date(competition.end_date).toLocaleDateString(),
          <div key={competition.id} className="flex items-center gap-2">
            <DashboardModal title="Competition Details" triggerLabel="View" triggerVariant="ghost">
              <div className="space-y-2 text-sm text-slate-600">
                <p><strong>EN:</strong> {competition.title_en}</p>
                <p><strong>AR:</strong> {competition.title_ar}</p>
                <p><strong>Description:</strong> {competition.description_en}</p>
              </div>
            </DashboardModal>
            <DashboardModal title="Edit Competition" triggerLabel="Edit" triggerVariant="secondary">
              <CompetitionForm initialData={competition} />
            </DashboardModal>
            <form action={deleteCompetitionAction}>
              <input type="hidden" name="id" value={competition.id} />
              <button type="submit" className="rounded-2xl border border-rose-200 px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50">
                Delete
              </button>
            </form>
          </div>,
        ])}
      />

      <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 font-display text-3xl text-slate-950">Winner Management</h2>
        <AdminDataTable
          columns={["Participant", "Competition", "Winner", "Action"]}
          rows={registrations.map((registration) => [
            `${firstRelation(registration.profile)?.first_name ?? ""} ${firstRelation(registration.profile)?.last_name ?? ""}`.trim(),
            firstRelation(registration.competition)?.title_en ?? "—",
            registration.is_winner ? "Yes" : "No",
            <form key={registration.id} action={toggleWinnerAction}>
              <input type="hidden" name="registrationId" value={registration.id} />
              <input type="hidden" name="isWinner" value={registration.is_winner ? "true" : "false"} />
              <button type="submit" className="rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                {registration.is_winner ? "Remove Winner" : "Mark Winner"}
              </button>
            </form>,
          ])}
        />
      </div>
    </>
  );
}
