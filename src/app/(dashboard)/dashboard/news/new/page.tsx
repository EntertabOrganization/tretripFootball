import { redirect } from "next/navigation";

import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { NewsEditorForm } from "@/components/dashboard/forms";
import { getCurrentProfile } from "@/lib/auth";
import { getCategories } from "@/lib/data";
import { hasMinimumRole } from "@/lib/permissions";

export default async function NewDashboardArticlePage() {
  const profile = await getCurrentProfile();
  if (!profile || !hasMinimumRole(profile.role, "EDITOR")) redirect("/unauthorized");

  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-[#f7f7f3] px-6 py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <DashboardPageHeader title="Create Article" subtitle="Write a polished bilingual article in a dedicated editor tab." />
        <NewsEditorForm categories={categories} />
      </div>
    </div>
  );
}
