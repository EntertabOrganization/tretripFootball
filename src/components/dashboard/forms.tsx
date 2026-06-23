import {
  createAdminCommentAction,
  createCategoryAction,
  createCompetitionAction,
  createNewsAction,
  createUserAction,
  updateCategoryAction,
  updateCommentAction,
  updateCompetitionAction,
  updateNewsAction,
  updateUserRoleAction,
} from "@/lib/actions";
import type { CommentRecord, Competition, NewsArticle, NewsCategory, Profile } from "@/lib/types";
import { ArticleCategorySelect } from "@/components/dashboard/article-category-select";
import { RichTextEditor } from "@/components/ui/rich-text-editor";

const inputClass = "rounded-2xl border border-slate-200 px-4 py-3";
const textareaClass = "min-h-24 rounded-2xl border border-slate-200 px-4 py-3";

export function CategoryForm({ initialData }: { initialData?: NewsCategory }) {
  const action = initialData ? updateCategoryAction : createCategoryAction;

  return (
    <form action={action} className="grid gap-3">
      {initialData ? <input type="hidden" name="id" value={initialData.id} /> : null}
      <input name="titleEn" defaultValue={initialData?.title_en} placeholder="Title (EN)" className={inputClass} required />
      <input name="titleAr" defaultValue={initialData?.title_ar} placeholder="Title (AR)" className={inputClass} required />
      <textarea name="descriptionEn" defaultValue={initialData?.description_en} placeholder="Description (EN) - optional" className={textareaClass} />
      <textarea name="descriptionAr" defaultValue={initialData?.description_ar} placeholder="Description (AR) - optional" className={textareaClass} />
      <button type="submit" className="rounded-2xl bg-[#1f7a68] px-4 py-3 font-semibold text-white">
        {initialData ? "Update Category" : "Create Category"}
      </button>
    </form>
  );
}

export function CompetitionForm({ initialData }: { initialData?: Competition }) {
  const action = initialData ? updateCompetitionAction : createCompetitionAction;

  return (
    <form action={action} className="grid gap-3">
      {initialData ? <input type="hidden" name="id" value={initialData.id} /> : null}
      <input name="titleEn" defaultValue={initialData?.title_en} placeholder="Title (EN)" className={inputClass} required />
      <input name="titleAr" defaultValue={initialData?.title_ar} placeholder="Title (AR)" className={inputClass} required />
      <textarea name="descriptionEn" defaultValue={initialData?.description_en} placeholder="Description (EN)" className={textareaClass} required />
      <textarea name="descriptionAr" defaultValue={initialData?.description_ar} placeholder="Description (AR)" className={textareaClass} required />
      <input name="coverImageUrl" defaultValue={initialData?.cover_image_url ?? ""} placeholder="Cover image URL" className={inputClass} />
      <input
        name="startDate"
        type="datetime-local"
        defaultValue={initialData?.start_date ? initialData.start_date.slice(0, 16) : ""}
        className={inputClass}
        required
      />
      <input
        name="endDate"
        type="datetime-local"
        defaultValue={initialData?.end_date ? initialData.end_date.slice(0, 16) : ""}
        className={inputClass}
        required
      />
      <button type="submit" className="rounded-2xl bg-[#1f7a68] px-4 py-3 font-semibold text-white">
        {initialData ? "Update Competition" : "Create Competition"}
      </button>
    </form>
  );
}

export function UserForm({ initialData }: { initialData?: Profile }) {
  const action = initialData ? updateUserRoleAction : createUserAction;

  return (
    <form action={action} className="grid gap-3">
      {initialData ? <input type="hidden" name="userId" value={initialData.id} /> : null}
      {!initialData ? (
        <>
          <input name="firstName" placeholder="First name" className={inputClass} required />
          <input name="lastName" placeholder="Last name" className={inputClass} required />
          <input name="email" type="email" placeholder="Email" className={inputClass} required />
          <input name="phoneNumber" placeholder="Phone number" className={inputClass} />
          <input name="password" type="password" placeholder="Password" className={inputClass} required />
        </>
      ) : (
        <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
          {initialData.first_name} {initialData.last_name} · {initialData.email}
        </div>
      )}
      <select name="role" defaultValue={initialData?.role ?? "USER"} className={inputClass}>
        <option value="USER">USER</option>
        <option value="EDITOR">EDITOR</option>
        <option value="ADMIN">ADMIN</option>
      </select>
      <button type="submit" className="rounded-2xl bg-[#1f7a68] px-4 py-3 font-semibold text-white">
        {initialData ? "Update User" : "Create User"}
      </button>
    </form>
  );
}

export function CommentForm({
  initialData,
  newsOptions,
}: {
  initialData?: CommentRecord;
  newsOptions: NewsArticle[];
}) {
  const action = initialData ? updateCommentAction : createAdminCommentAction;

  return (
    <form action={action} className="grid gap-3">
      {initialData ? <input type="hidden" name="id" value={initialData.id} /> : null}
      {!initialData ? (
        <select name="newsId" className={inputClass} required>
          <option value="">Select article</option>
          {newsOptions.map((article) => (
            <option key={article.id} value={article.id}>
              {article.title_en}
            </option>
          ))}
        </select>
      ) : null}
      <textarea
        name="commentText"
        defaultValue={initialData?.comment_text}
        placeholder="Comment text"
        className="min-h-32 rounded-2xl border border-slate-200 px-4 py-3"
        required
      />
      {initialData ? (
        <label className="flex items-center gap-3 text-sm text-slate-600">
          <input type="checkbox" name="isHidden" value="true" defaultChecked={initialData.is_hidden} />
          Hidden
        </label>
      ) : null}
      <button type="submit" className="rounded-2xl bg-[#1f7a68] px-4 py-3 font-semibold text-white">
        {initialData ? "Update Comment" : "Create Comment"}
      </button>
    </form>
  );
}

export function NewsEditorForm({
  categories,
  initialData,
}: {
  categories: NewsCategory[];
  initialData?: NewsArticle;
}) {
  const action = initialData ? updateNewsAction : createNewsAction;

  return (
    <form action={action} className="grid gap-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      {initialData ? (
        <>
          <input type="hidden" name="id" value={initialData.id} />
          <input type="hidden" name="slug" value={initialData.slug} />
        </>
      ) : null}
      <ArticleCategorySelect initialCategories={categories} defaultValue={initialData?.category_id} />
      <input name="titleEn" defaultValue={initialData?.title_en} placeholder="Title (EN)" className={inputClass} required />
      <input name="titleAr" defaultValue={initialData?.title_ar} placeholder="Title (AR)" className={inputClass} required />
      <textarea name="summaryEn" defaultValue={initialData?.summary_en} placeholder="Summary (EN)" className={textareaClass} required />
      <textarea name="summaryAr" defaultValue={initialData?.summary_ar} placeholder="Summary (AR)" className={textareaClass} required />
      <RichTextEditor
        name="contentEn"
        label="Content (EN)"
        placeholder="Write the full English article with headings, lists, links, and rich formatting..."
        initialValue={initialData?.content_en}
        required
      />
      <RichTextEditor
        name="contentAr"
        label="Content (AR)"
        placeholder="اكتب المقال العربي الكامل مع العناوين والقوائم والروابط والتنسيق الاحترافي..."
        dir="rtl"
        initialValue={initialData?.content_ar}
        required
      />
      <input name="coverImageUrl" defaultValue={initialData?.cover_image_url ?? ""} placeholder="Cover image URL" className={inputClass} />
      <select name="status" defaultValue={initialData?.status ?? "PUBLISHED"} className={inputClass}>
        <option value="PUBLISHED">Published</option>
        <option value="DRAFT">Draft</option>
      </select>
      <button type="submit" className="rounded-2xl bg-[#1f7a68] px-4 py-3 font-semibold text-white">
        {initialData ? "Update Article" : "Create Article"}
      </button>
    </form>
  );
}
