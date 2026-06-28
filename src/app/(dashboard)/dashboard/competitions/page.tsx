import { Eye, PencilLine, Trash2 } from "lucide-react";
import { redirect } from "next/navigation";

import { DashboardActionButton } from "@/components/dashboard/dashboard-action-icon";
import { AdminDataTable } from "@/components/dashboard/admin-data-table";
import { CompetitionForm } from "@/components/dashboard/forms";
import { DashboardModal } from "@/components/dashboard/dashboard-modal";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { deleteCompetitionAction, toggleWinnerAction } from "@/lib/actions";
import { getCurrentProfile } from "@/lib/auth";
import { getAllCompetitions } from "@/lib/data";
import { getLocale, localizeText } from "@/lib/i18n";
import { hasMinimumRole } from "@/lib/permissions";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { firstRelation } from "@/lib/utils";

export default async function DashboardCompetitionsPage() {
  const locale = await getLocale();
  const profile = await getCurrentProfile();
  if (!profile || !hasMinimumRole(profile.role, "ADMIN")) redirect("/unauthorized");

  const competitions = await getAllCompetitions();
  const admin = createSupabaseAdminClient();
  const registrations = admin
    ? (await admin
        .from("competition_registrations")
        .select("id,is_winner,competition:competitions(title_en,title_ar),profile:profiles(first_name,last_name)")
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
            <DashboardModal
              title="Competition Details"
              triggerLabel="View Competition"
              triggerVariant="ghost"
              triggerClassName="h-10 w-10 border border-slate-200 bg-white p-0 hover:bg-slate-50"
              triggerContent={<Eye size={18} />}
            >
              <div className="space-y-2 text-sm text-slate-600">
                <p><strong>EN:</strong> {competition.title_en}</p>
                <p><strong>AR:</strong> {competition.title_ar}</p>
                <p><strong>Description (EN):</strong> {competition.description_en}</p>
                <p dir="rtl"><strong>Description (AR):</strong> {competition.description_ar}</p>
              </div>
            </DashboardModal>
            <DashboardModal
              title="Edit Competition"
              triggerLabel="Edit Competition"
              triggerVariant="secondary"
              triggerClassName="h-10 w-10 p-0"
              triggerContent={<PencilLine size={18} />}
            >
              <CompetitionForm initialData={competition} />
            </DashboardModal>
            <form action={deleteCompetitionAction}>
              <input type="hidden" name="id" value={competition.id} />
              <DashboardActionButton label="Delete Competition" tone="danger" type="submit">
                <Trash2 size={18} />
              </DashboardActionButton>
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
            firstRelation(registration.competition)
              ? localizeText(locale, {
                  en: firstRelation(registration.competition)?.title_en ?? "-",
                  ar: firstRelation(registration.competition)?.title_ar ?? firstRelation(registration.competition)?.title_en ?? "-",
                })
              : "-",
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
