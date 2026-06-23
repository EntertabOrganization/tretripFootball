import { createCategoryAction, createCompetitionAction, createNewsAction } from "@/lib/actions";
import type { NewsCategory } from "@/lib/types";
import { RichTextEditor } from "@/components/ui/rich-text-editor";

export function CategoryCreateForm() {
  return (
    <form action={createCategoryAction} className="grid gap-3 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="font-display text-2xl text-slate-900">Create Category</h3>
      <input name="titleEn" placeholder="Title (EN)" className="rounded-2xl border border-slate-200 px-4 py-3" required />
      <input name="titleAr" placeholder="Title (AR)" className="rounded-2xl border border-slate-200 px-4 py-3" required />
      <textarea name="descriptionEn" placeholder="Description (EN) - optional" className="min-h-28 rounded-2xl border border-slate-200 px-4 py-3" />
      <textarea name="descriptionAr" placeholder="Description (AR) - optional" className="min-h-28 rounded-2xl border border-slate-200 px-4 py-3" />
      <button type="submit" className="rounded-full bg-[var(--color-primary)] px-5 py-3 font-semibold text-white">
        Create Category
      </button>
    </form>
  );
}

export function NewsCreateForm({ categories }: { categories: NewsCategory[] }) {
  return (
    <form action={createNewsAction} className="grid gap-3 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="font-display text-2xl text-slate-900">Create Article</h3>
      <select name="categoryId" className="rounded-2xl border border-slate-200 px-4 py-3" required>
        <option value="">Select category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.title_en}
          </option>
        ))}
      </select>
      <input name="titleEn" placeholder="Title (EN)" className="rounded-2xl border border-slate-200 px-4 py-3" required />
      <input name="titleAr" placeholder="Title (AR)" className="rounded-2xl border border-slate-200 px-4 py-3" required />
      <textarea name="summaryEn" placeholder="Summary (EN)" className="min-h-24 rounded-2xl border border-slate-200 px-4 py-3" required />
      <textarea name="summaryAr" placeholder="Summary (AR)" className="min-h-24 rounded-2xl border border-slate-200 px-4 py-3" required />
      <RichTextEditor
        name="contentEn"
        label="Content (EN)"
        placeholder="Write the full English article with headings, lists, links, and rich formatting..."
        required
      />
      <RichTextEditor
        name="contentAr"
        label="Content (AR)"
        placeholder="اكتب المقال العربي الكامل مع العناوين والقوائم والروابط والتنسيق الاحترافي..."
        dir="rtl"
        required
      />
      <input name="coverImageUrl" placeholder="Cover image URL" className="rounded-2xl border border-slate-200 px-4 py-3" />
      <select name="status" className="rounded-2xl border border-slate-200 px-4 py-3">
        <option value="PUBLISHED">Published</option>
        <option value="DRAFT">Draft</option>
      </select>
      <button type="submit" className="rounded-full bg-[var(--color-primary)] px-5 py-3 font-semibold text-white">
        Save Article
      </button>
    </form>
  );
}

export function CompetitionCreateForm() {
  return (
    <form action={createCompetitionAction} className="grid gap-3 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="font-display text-2xl text-slate-900">Create Competition</h3>
      <input name="titleEn" placeholder="Title (EN)" className="rounded-2xl border border-slate-200 px-4 py-3" required />
      <input name="titleAr" placeholder="Title (AR)" className="rounded-2xl border border-slate-200 px-4 py-3" required />
      <textarea name="descriptionEn" placeholder="Description (EN)" className="min-h-24 rounded-2xl border border-slate-200 px-4 py-3" required />
      <textarea name="descriptionAr" placeholder="Description (AR)" className="min-h-24 rounded-2xl border border-slate-200 px-4 py-3" required />
      <input name="coverImageUrl" placeholder="Cover image URL" className="rounded-2xl border border-slate-200 px-4 py-3" />
      <input name="startDate" type="datetime-local" className="rounded-2xl border border-slate-200 px-4 py-3" required />
      <input name="endDate" type="datetime-local" className="rounded-2xl border border-slate-200 px-4 py-3" required />
      <button type="submit" className="rounded-full bg-[var(--color-primary)] px-5 py-3 font-semibold text-white">
        Save Competition
      </button>
    </form>
  );
}
