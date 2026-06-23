import { deleteCategoryAction } from "@/lib/actions";
import { getCurrentProfile } from "@/lib/auth";
import { getCategories } from "@/lib/data";
import { hasMinimumRole } from "@/lib/permissions";
import { redirect } from "next/navigation";
import { AdminDataTable } from "@/components/dashboard/admin-data-table";
import { DashboardModal } from "@/components/dashboard/dashboard-modal";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { CategoryForm } from "@/components/dashboard/forms";

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
          category.description_en || "—",
          <div key={category.id} className="flex items-center gap-2">
            <DashboardModal title="Category Details" triggerLabel="View" triggerVariant="ghost">
              <div className="space-y-2 text-sm text-slate-600">
                <p><strong>EN:</strong> {category.title_en}</p>
                <p><strong>AR:</strong> {category.title_ar}</p>
                <p><strong>Description EN:</strong> {category.description_en || "—"}</p>
                <p><strong>Description AR:</strong> {category.description_ar || "—"}</p>
              </div>
            </DashboardModal>
            <DashboardModal title="Edit Category" triggerLabel="Edit" triggerVariant="secondary">
              <CategoryForm initialData={category} />
            </DashboardModal>
            <form action={deleteCategoryAction}>
              <input type="hidden" name="id" value={category.id} />
              <button type="submit" className="rounded-2xl border border-rose-200 px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50">
                Delete
              </button>
            </form>
          </div>,
        ])}
      />
    </>
  );
}
