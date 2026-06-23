import Link from "next/link";
import { Eye, PencilLine, Trash2 } from "lucide-react";
import { redirect } from "next/navigation";

import { DashboardActionButton, DashboardActionLink } from "@/components/dashboard/dashboard-action-icon";
import { AdminDataTable } from "@/components/dashboard/admin-data-table";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { deleteNewsAction } from "@/lib/actions";
import { getCurrentProfile } from "@/lib/auth";
import { getAllNews } from "@/lib/data";
import { hasMinimumRole } from "@/lib/permissions";

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
          article.published_at ? new Date(article.published_at).toLocaleDateString() : "-",
          <div key={article.id} className="flex items-center gap-2">
            <DashboardActionLink href={`/news/${article.slug}`} target="_blank" label="View Article">
              <Eye size={18} />
            </DashboardActionLink>
            <DashboardActionLink href={`/dashboard/news/${article.slug}/edit`} label="Edit Article">
              <PencilLine size={18} />
            </DashboardActionLink>
            <form action={deleteNewsAction}>
              <input type="hidden" name="id" value={article.id} />
              <input type="hidden" name="slug" value={article.slug} />
              <DashboardActionButton label="Delete Article" tone="danger" type="submit">
                <Trash2 size={18} />
              </DashboardActionButton>
            </form>
          </div>,
        ])}
      />
    </>
  );
}
