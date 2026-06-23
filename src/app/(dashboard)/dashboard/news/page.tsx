import { redirect } from "next/navigation";

import { NewsCreateForm } from "@/components/dashboard/forms";
import { getCurrentProfile } from "@/lib/auth";
import { getCategories, getNewsList } from "@/lib/data";
import { hasMinimumRole } from "@/lib/permissions";

export default async function DashboardNewsPage() {
  const profile = await getCurrentProfile();

  if (!profile || !hasMinimumRole(profile.role, "EDITOR")) {
    redirect("/unauthorized");
  }

  const [categories, news] = await Promise.all([getCategories(), getNewsList({ includeDrafts: true })]);

  return (
    <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
      <NewsCreateForm categories={categories} />
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-display text-3xl text-slate-950">All Articles</h2>
        <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {news.items.map((article) => (
                <tr key={article.id}>
                  <td className="px-4 py-3">{article.title_en}</td>
                  <td className="px-4 py-3">{article.category?.title_en}</td>
                  <td className="px-4 py-3">{article.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
