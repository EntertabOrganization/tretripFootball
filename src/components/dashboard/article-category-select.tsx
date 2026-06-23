"use client";

import { useEffect, useState } from "react";

import type { NewsCategory } from "@/lib/types";

type Props = {
  initialCategories: NewsCategory[];
  defaultValue?: string;
};

export function ArticleCategorySelect({ initialCategories, defaultValue }: Props) {
  const [categories, setCategories] = useState<NewsCategory[]>(initialCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadCategories = async () => {
      try {
        const response = await fetch("/api/news-categories", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as { items?: NewsCategory[] };

        if (active && payload.items) {
          setCategories(payload.items);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadCategories();

    return () => {
      active = false;
    };
  }, []);

  return (
    <select
      name="categoryId"
      defaultValue={defaultValue}
      className="rounded-2xl border border-slate-200 px-4 py-3"
      required
      disabled={loading && categories.length === 0}
    >
      <option value="">{loading ? "Loading categories..." : "Select category"}</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.title_en}
        </option>
      ))}
    </select>
  );
}
