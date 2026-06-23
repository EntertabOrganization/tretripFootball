import { deleteCommentAction } from "@/lib/actions";
import { getCurrentProfile } from "@/lib/auth";
import { getAllComments, getAllNews } from "@/lib/data";
import { hasMinimumRole } from "@/lib/permissions";
import { redirect } from "next/navigation";
import { AdminDataTable } from "@/components/dashboard/admin-data-table";
import { DashboardModal } from "@/components/dashboard/dashboard-modal";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { CommentForm } from "@/components/dashboard/forms";

export default async function DashboardCommentsPage() {
  const profile = await getCurrentProfile();
  if (!profile || !hasMinimumRole(profile.role, "ADMIN")) redirect("/unauthorized");

  const [comments, news] = await Promise.all([getAllComments(), getAllNews(true)]);

  return (
    <>
      <DashboardPageHeader
        title="Comments"
        subtitle="Moderate, edit, and add dashboard comments tied to articles."
        action={
          <DashboardModal title="Create Comment" triggerLabel="Create Comment">
            <CommentForm newsOptions={news} />
          </DashboardModal>
        }
      />
      <AdminDataTable
        columns={["Author", "Comment", "Visibility", "Action"]}
        rows={comments.map((comment) => [
          `${comment.author?.first_name ?? ""} ${comment.author?.last_name ?? ""}`.trim() || "Unknown",
          comment.comment_text,
          comment.is_hidden ? "Hidden" : "Visible",
          <div key={comment.id} className="flex items-center gap-2">
            <DashboardModal title="Comment Details" triggerLabel="View" triggerVariant="ghost">
              <p className="text-sm leading-7 text-slate-600">{comment.comment_text}</p>
            </DashboardModal>
            <DashboardModal title="Edit Comment" triggerLabel="Edit" triggerVariant="secondary">
              <CommentForm initialData={comment} newsOptions={news} />
            </DashboardModal>
            <form action={deleteCommentAction}>
              <input type="hidden" name="id" value={comment.id} />
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
