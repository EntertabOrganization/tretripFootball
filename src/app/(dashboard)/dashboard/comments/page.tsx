import { redirect } from "next/navigation";

import { toggleCommentVisibilityAction } from "@/lib/actions";
import { getCurrentProfile } from "@/lib/auth";
import { getAllComments } from "@/lib/data";
import { hasMinimumRole } from "@/lib/permissions";

export default async function DashboardCommentsPage() {
  const profile = await getCurrentProfile();

  if (!profile || !hasMinimumRole(profile.role, "ADMIN")) {
    redirect("/unauthorized");
  }

  const comments = await getAllComments();

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="font-display text-3xl text-slate-950">Comments</h2>
      <div className="mt-6 space-y-3">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start justify-between gap-4 rounded-3xl border border-slate-200 p-4">
            <div>
              <p className="font-semibold text-slate-900">
                {comment.author?.first_name} {comment.author?.last_name}
              </p>
              <p className="mt-2 text-sm text-slate-600">{comment.comment_text}</p>
            </div>
            <form action={toggleCommentVisibilityAction}>
              <input type="hidden" name="commentId" value={comment.id} />
              <input type="hidden" name="nextState" value={comment.is_hidden ? "visible" : "hidden"} />
              <button type="submit" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900">
                {comment.is_hidden ? "Show" : "Hide"}
              </button>
            </form>
          </div>
        ))}
      </div>
    </section>
  );
}
