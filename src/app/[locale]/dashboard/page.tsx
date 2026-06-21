import { Role } from "@prisma/client";
import { getTranslations } from "next-intl/server";
import {
  createBlogAction,
  createCategoryAction,
  createCompetitionAction,
  deleteBlogAction,
  deleteCategoryAction,
  deleteCompetitionAction,
  updateBlogAction,
  updateCategoryAction,
  updateCommentVisibilityAction,
  updateCompetitionAction,
  updateUserAccessAction,
} from "@/app/[locale]/actions";
import { requireRole } from "@/lib/permissions";
import { getDashboardData } from "@/lib/queries";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Dashboard");
  const viewer = await requireRole([Role.ADMIN, Role.EDITOR]);
  const { stats, users, categories, blogs, competitions, comments } = await getDashboardData();

  return (
    <div className="shell space-y-8">
      <section className="glass-card p-8 sm:p-10">
        <div className="section-kicker">{t("title")}</div>
        <h1 className="mt-3 text-4xl font-semibold">{t("title")}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{t("subtitle")}</p>
      </section>

      <section className="soft-grid">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="glass-card p-6">
            <div className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{key}</div>
            <div className="mt-4 text-4xl font-semibold">{value}</div>
          </div>
        ))}
      </section>

      {viewer.role === "ADMIN" ? (
        <section className="glass-card p-8">
          <h2 className="text-2xl font-semibold">{t("users")}</h2>
          <div className="mt-6 space-y-4">
            {users.map((user) => (
              <form key={user.id} action={updateUserAccessAction} className="grid gap-4 rounded-3xl border border-border bg-background p-4 lg:grid-cols-[1.3fr_0.7fr_0.7fr_auto]">
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="userId" value={user.id} />
                <div>
                  <div className="font-semibold">{user.fullName}</div>
                  <div className="text-sm text-muted-foreground">{user.email}</div>
                </div>
                <select name="role" defaultValue={user.role}>
                  <option value="ADMIN">ADMIN</option>
                  <option value="EDITOR">EDITOR</option>
                  <option value="USER">USER</option>
                </select>
                <select name="userType" defaultValue={user.userType}>
                  <option value="INTERNAL">INTERNAL</option>
                  <option value="EXTERNAL">EXTERNAL</option>
                </select>
                <button className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                  {t("update")}
                </button>
              </form>
            ))}
          </div>
        </section>
      ) : null}

      <section className="grid gap-8 xl:grid-cols-2">
        <div className="glass-card p-8">
          <h2 className="text-2xl font-semibold">{t("categories")}</h2>
          <form action={createCategoryAction} className="mt-6 space-y-4 rounded-3xl border border-border bg-background p-4">
            <input type="hidden" name="locale" value={locale} />
            <input name="name" placeholder="Category name" />
            <input name="slug" placeholder="Category slug" />
            <button className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
              {t("create")}
            </button>
          </form>
          <div className="mt-6 space-y-4">
            {categories.map((category) => (
              <div key={category.id} className="rounded-3xl border border-border bg-background p-4">
                <form action={updateCategoryAction} className="space-y-3">
                  <input type="hidden" name="locale" value={locale} />
                  <input type="hidden" name="id" value={category.id} />
                  <input name="name" defaultValue={category.name} />
                  <input name="slug" defaultValue={category.slug} />
                  <div className="flex gap-3">
                    <button className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                      {t("update")}
                    </button>
                    <button
                      formAction={deleteCategoryAction}
                      className="rounded-full border border-border px-4 py-2 text-sm font-semibold"
                    >
                      {t("delete")}
                    </button>
                  </div>
                </form>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-8">
          <h2 className="text-2xl font-semibold">{t("blogs")}</h2>
          <form action={createBlogAction} className="mt-6 space-y-4 rounded-3xl border border-border bg-background p-4">
            <input type="hidden" name="locale" value={locale} />
            <input name="title" placeholder="Article title" />
            <input name="slug" placeholder="Article slug" />
            <input name="description" placeholder="Short description" />
            <input name="imageUrl" placeholder="Image URL" />
            <select name="categoryId" defaultValue="">
              <option value="" disabled>Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            <select name="status" defaultValue="DRAFT">
              <option value="DRAFT">DRAFT</option>
              <option value="PUBLISHED">PUBLISHED</option>
            </select>
            <textarea name="content" placeholder="Article content" />
            <button className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
              {t("create")}
            </button>
          </form>
          <div className="mt-6 space-y-4">
            {blogs.map((blog) => (
              <div key={blog.id} className="rounded-3xl border border-border bg-background p-4">
                <form action={updateBlogAction} className="space-y-3">
                  <input type="hidden" name="locale" value={locale} />
                  <input type="hidden" name="id" value={blog.id} />
                  <input type="hidden" name="currentSlug" value={blog.slug} />
                  <input name="title" defaultValue={blog.title} />
                  <input name="slug" defaultValue={blog.slug} />
                  <input name="description" defaultValue={blog.description} />
                  <input name="imageUrl" defaultValue={blog.imageUrl ?? ""} />
                  <select name="categoryId" defaultValue={blog.categoryId}>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                  <select name="status" defaultValue={blog.status}>
                    <option value="DRAFT">DRAFT</option>
                    <option value="PUBLISHED">PUBLISHED</option>
                  </select>
                  <textarea name="content" defaultValue={blog.content} />
                  <div className="flex gap-3">
                    <button className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                      {t("update")}
                    </button>
                    <button formAction={deleteBlogAction} className="rounded-full border border-border px-4 py-2 text-sm font-semibold">
                      {t("delete")}
                    </button>
                  </div>
                </form>
              </div>
            ))}
          </div>
        </div>
      </section>

      {viewer.role === "ADMIN" ? (
        <section className="glass-card p-8">
          <h2 className="text-2xl font-semibold">{t("competitions")}</h2>
          <form action={createCompetitionAction} className="mt-6 grid gap-4 rounded-3xl border border-border bg-background p-4 md:grid-cols-2">
            <input type="hidden" name="locale" value={locale} />
            <input name="title" placeholder="Competition title" />
            <input name="slug" placeholder="Competition slug" />
            <input name="startDate" type="date" />
            <input name="endDate" type="date" />
            <select name="visibility" defaultValue="PUBLIC">
              <option value="PUBLIC">PUBLIC</option>
              <option value="INTERNAL">INTERNAL</option>
            </select>
            <textarea name="description" placeholder="Competition description" className="md:col-span-2" />
            <button className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground md:w-fit">
              {t("create")}
            </button>
          </form>
          <div className="mt-6 space-y-4">
            {competitions.map((competition) => (
              <div key={competition.id} className="rounded-3xl border border-border bg-background p-4">
                <form action={updateCompetitionAction} className="grid gap-3 md:grid-cols-2">
                  <input type="hidden" name="locale" value={locale} />
                  <input type="hidden" name="id" value={competition.id} />
                  <input type="hidden" name="currentSlug" value={competition.slug} />
                  <input name="title" defaultValue={competition.title} />
                  <input name="slug" defaultValue={competition.slug} />
                  <input name="startDate" type="date" defaultValue={competition.startDate.toISOString().slice(0, 10)} />
                  <input name="endDate" type="date" defaultValue={competition.endDate.toISOString().slice(0, 10)} />
                  <select name="visibility" defaultValue={competition.visibility}>
                    <option value="PUBLIC">PUBLIC</option>
                    <option value="INTERNAL">INTERNAL</option>
                  </select>
                  <textarea name="description" defaultValue={competition.description} className="md:col-span-2" />
                  <div className="flex gap-3 md:col-span-2">
                    <button className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                      {t("update")}
                    </button>
                    <button formAction={deleteCompetitionAction} className="rounded-full border border-border px-4 py-2 text-sm font-semibold">
                      {t("delete")}
                    </button>
                  </div>
                </form>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="glass-card p-8">
        <h2 className="text-2xl font-semibold">{t("comments")}</h2>
        <div className="mt-6 space-y-4">
          {comments.map((comment) => (
            <form key={comment.id} action={updateCommentVisibilityAction} className="grid gap-4 rounded-3xl border border-border bg-background p-4 lg:grid-cols-[1fr_auto]">
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="commentId" value={comment.id} />
              <input type="hidden" name="isVisible" value={comment.isVisible ? "false" : "true"} />
              <div>
                <div className="font-semibold">{comment.user.fullName}</div>
                <div className="text-sm text-muted-foreground">{comment.blog.title}</div>
                <p className="mt-3 text-sm leading-6">{comment.commentText}</p>
              </div>
              <button className="rounded-full border border-border px-4 py-2 text-sm font-semibold">
                {comment.isVisible ? t("hide") : t("show")}
              </button>
            </form>
          ))}
        </div>
      </section>
    </div>
  );
}
