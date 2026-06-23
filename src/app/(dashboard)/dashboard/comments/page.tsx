import { Eye, PencilLine, Trash2 } from "lucide-react";
import { redirect } from "next/navigation";

import { DashboardActionButton } from "@/components/dashboard/dashboard-action-icon";
import { AdminDataTable } from "@/components/dashboard/admin-data-table";
import { CommentForm } from "@/components/dashboard/forms";
import { DashboardModal } from "@/components/dashboard/dashboard-modal";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { deleteCommentAction } from "@/lib/actions";
import { getCurrentProfile } from "@/lib/auth";
import { getAllComments, getAllNews } from "@/lib/data";
import { hasMinimumRole } from "@/lib/permissions";

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
            <DashboardModal
              title="Comment Details"
              triggerLabel="View Comment"
              triggerVariant="ghost"
              triggerClassName="h-10 w-10 border border-slate-200 bg-white p-0 hover:bg-slate-50"
              triggerContent={<Eye size={18} />}
            >
              <p className="text-sm leading-7 text-slate-600">{comment.comment_text}</p>
            </DashboardModal>
            <DashboardModal
              title="Edit Comment"
              triggerLabel="Edit Comment"
              triggerVariant="secondary"
              triggerClassName="h-10 w-10 p-0"
              triggerContent={<PencilLine size={18} />}
            >
              <CommentForm initialData={comment} newsOptions={news} />
            </DashboardModal>
            <form action={deleteCommentAction}>
              <input type="hidden" name="id" value={comment.id} />
              <DashboardActionButton label="Delete Comment" tone="danger" type="submit">
                <Trash2 size={18} />
              </DashboardActionButton>
            </form>
          </div>,
        ])}
      />
    </>
  );
}
