import { Eye, PencilLine, Trash2 } from "lucide-react";
import { redirect } from "next/navigation";

import { DashboardActionButton } from "@/components/dashboard/dashboard-action-icon";
import { AdminDataTable } from "@/components/dashboard/admin-data-table";
import { CategoryForm } from "@/components/dashboard/forms";
import { DashboardModal } from "@/components/dashboard/dashboard-modal";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { deleteCategoryAction } from "@/lib/actions";
import { getCurrentProfile } from "@/lib/auth";
import { getCategories } from "@/lib/data";
import { hasMinimumRole } from "@/lib/permissions";

export default async function DashboardCategoriesPage() {
  const profile = await getCurrentProfile();
  if (!profile || !hasMinimumRole(profile.role, "ADMIN")) redirect("/unauthorized");

  const categories = await getCategories();

  return (
    <>
      <DashboardPageHeader
        title="Categories"
        subtitle="Organize editorial publishing with bilingual category management."
        action={
          <DashboardModal title="Create Category" triggerLabel="Create Category">
            <CategoryForm />
          </DashboardModal>
        }
      />
      <AdminDataTable
        columns={["English Title", "Arabic Title", "Description", "Action"]}
        rows={categories.map((category) => [
          category.title_en,
          category.title_ar,
          category.description_en || "-",
          <div key={category.id} className="flex items-center gap-2">
            <DashboardModal
              title="Category Details"
              triggerLabel="View Category"
              triggerVariant="ghost"
              triggerClassName="h-10 w-10 border border-slate-200 bg-white p-0 hover:bg-slate-50"
              triggerContent={<Eye size={18} />}
            >
              <div className="space-y-2 text-sm text-slate-600">
                <p><strong>EN:</strong> {category.title_en}</p>
                <p><strong>AR:</strong> {category.title_ar}</p>
                <p><strong>Description EN:</strong> {category.description_en || "-"}</p>
                <p><strong>Description AR:</strong> {category.description_ar || "-"}</p>
              </div>
            </DashboardModal>
            <DashboardModal
              title="Edit Category"
              triggerLabel="Edit Category"
              triggerVariant="secondary"
              triggerClassName="h-10 w-10 p-0"
              triggerContent={<PencilLine size={18} />}
            >
              <CategoryForm initialData={category} />
            </DashboardModal>
            <form action={deleteCategoryAction}>
              <input type="hidden" name="id" value={category.id} />
              <DashboardActionButton label="Delete Category" tone="danger" type="submit">
                <Trash2 size={18} />
              </DashboardActionButton>
            </form>
          </div>,
        ])}
      />
    </>
  );
}
