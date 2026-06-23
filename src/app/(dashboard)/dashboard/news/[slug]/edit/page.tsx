import { notFound, redirect } from "next/navigation";

import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { NewsEditorForm } from "@/components/dashboard/forms";
import { getCurrentProfile } from "@/lib/auth";
import { getCategories, getNewsBySlug } from "@/lib/data";
import { hasMinimumRole } from "@/lib/permissions";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function EditDashboardArticlePage({ params }: Props) {
  const profile = await getCurrentProfile();
  if (!profile || !hasMinimumRole(profile.role, "EDITOR")) redirect("/unauthorized");

  const { slug } = await params;
  const [article, categories] = await Promise.all([getNewsBySlug(slug), getCategories()]);
  if (!article) notFound();

  return (
    <div className="min-h-screen bg-[#f7f7f3] px-6 py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <DashboardPageHeader title="Edit Article" subtitle="Update content, metadata, and publishing state in a dedicated full-page editor." />
        <NewsEditorForm categories={categories} initialData={article} />
      </div>
    </div>
  );
}
