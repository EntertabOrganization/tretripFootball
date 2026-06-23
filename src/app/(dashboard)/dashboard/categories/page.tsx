import { redirect } from "next/navigation";

import { CategoryCreateForm } from "@/components/dashboard/forms";
import { getCurrentProfile } from "@/lib/auth";
import { getCategories } from "@/lib/data";
import { hasMinimumRole } from "@/lib/permissions";

export default async function DashboardCategoriesPage() {
  const profile = await getCurrentProfile();

  if (!profile || !hasMinimumRole(profile.role, "ADMIN")) {
    redirect("/unauthorized");
  }

  const categories = await getCategories();

  return (
    <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
      <CategoryCreateForm />
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-display text-3xl text-slate-950">Categories</h2>
        <div className="mt-6 grid gap-4">
          {categories.map((category) => (
            <div key={category.id} className="rounded-3xl border border-slate-200 p-5">
              <p className="font-semibold text-slate-900">{category.title_en} / {category.title_ar}</p>
              <p className="mt-2 text-sm text-slate-600">{category.description_en}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
