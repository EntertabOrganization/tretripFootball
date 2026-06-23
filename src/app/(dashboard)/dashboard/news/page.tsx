import Link from "next/link";
import { redirect } from "next/navigation";

import { deleteNewsAction } from "@/lib/actions";
import { getCurrentProfile } from "@/lib/auth";
import { getAllNews } from "@/lib/data";
import { hasMinimumRole } from "@/lib/permissions";
import { AdminDataTable } from "@/components/dashboard/admin-data-table";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";

export default async function DashboardNewsPage() {
  const profile = await getCurrentProfile();
  if (!profile || !hasMinimumRole(profile.role, "EDITOR")) redirect("/unauthorized");

  const news = await getAllNews(true);

  return (
    <>
      <DashboardPageHeader
        title="Articles"
        subtitle="Manage every article with search, pagination, and full content editing."
        action={
          <Link
            href="/dashboard/news/new"
            target="_blank"
            className="rounded-2xl bg-[#1f7a68] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#176454]"
          >
            Create Article
          </Link>
        }
      />
      <AdminDataTable
        columns={["Title", "Category", "Status", "Published", "Action"]}
        rows={news.map((article) => [
          article.title_en,
          article.category?.title_en ?? "Unassigned",
          article.status,
          article.published_at ? new Date(article.published_at).toLocaleDateString() : "—",
          <div key={article.id} className="flex items-center gap-2">
            <Link href={`/news/${article.slug}`} target="_blank" className="rounded-2xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
              View
            </Link>
            <Link href={`/dashboard/news/${article.slug}/edit`} target="_blank" className="rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Edit
            </Link>
            <form action={deleteNewsAction}>
              <input type="hidden" name="id" value={article.id} />
              <input type="hidden" name="slug" value={article.slug} />
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
