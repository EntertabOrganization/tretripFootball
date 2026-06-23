import "server-only";

import { cache } from "react";

import { PAGE_SIZE_DEFAULT } from "@/lib/constants";
import { mockCategories, mockComments, mockCompetitions, mockLeaderboard, mockNews, mockUsers } from "@/lib/mock-data";
import { parsePageParam, parsePageSizeParam } from "@/lib/pagination";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { firstRelation } from "@/lib/utils";
import type {
  Competition,
  CommentRecord,
  LeaderboardEntry,
  NewsArticle,
  NewsCategory,
  PaginatedResult,
  Profile,
} from "@/lib/types";

function logFallback(message: string, error: unknown) {
  const details =
    error && typeof error === "object" && "message" in error
      ? String((error as { message?: unknown }).message ?? "")
      : "";

  if (process.env.NODE_ENV !== "production") {
    console.warn(`${message}. Falling back to local mock data.${details ? ` ${details}` : ""}`);
  }
}

function paginateArray<T>(items: T[], page = 1, pageSize = PAGE_SIZE_DEFAULT): PaginatedResult<T> {
  const start = (page - 1) * pageSize;
  const paginatedItems = items.slice(start, start + pageSize);
  return {
    items: paginatedItems,
    page,
    pageSize,
    totalItems: items.length,
    totalPages: Math.max(1, Math.ceil(items.length / pageSize)),
  };
}

export const getCategories = cache(async (): Promise<NewsCategory[]> => {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return mockCategories;
  }

  const { data, error } = await supabase.from("news_categories").select("*").order("title_en");

  if (error) {
    logFallback("Failed to fetch categories", error);
    return mockCategories;
  }

  return data;
});

export async function getNewsList(searchParams?: {
  page?: string;
  pageSize?: string;
  category?: string;
  includeDrafts?: boolean;
}): Promise<PaginatedResult<NewsArticle>> {
  const page = parsePageParam(searchParams?.page);
  const pageSize = parsePageSizeParam(searchParams?.pageSize);
  const supabase = createSupabaseAdminClient();
  const includeDrafts = searchParams?.includeDrafts ?? false;

  if (!supabase) {
    const filtered = mockNews.filter((item) => {
      if (!includeDrafts && item.status !== "PUBLISHED") return false;
      if (searchParams?.category) return item.category?.slug === searchParams.category;
      return true;
    });

    return paginateArray(filtered, page, pageSize);
  }

  let query = supabase
    .from("news")
    .select(
      "*, category:news_categories(*), author:profiles(*), comments:comments(count), likes:news_likes(count)",
      { count: "exact" },
    )
    .order("published_at", { ascending: false, nullsFirst: false });

  if (!includeDrafts) {
    query = query.eq("status", "PUBLISHED");
  }

  if (searchParams?.category) {
    const { data: category } = await supabase
      .from("news_categories")
      .select("id")
      .eq("slug", searchParams.category)
      .maybeSingle();

    if (category?.id) {
      query = query.eq("category_id", category.id);
    }
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const { data, count, error } = await query.range(from, to);

  if (error) {
    logFallback("Failed to fetch news", error);
    return paginateArray(mockNews, page, pageSize);
  }

  const items = (data ?? []).map((item) => ({
    ...item,
    comments_count: item.comments?.[0]?.count ?? 0,
    likes_count: item.likes?.[0]?.count ?? 0,
  }));

  return {
    items,
    page,
    pageSize,
    totalItems: count ?? items.length,
    totalPages: Math.max(1, Math.ceil((count ?? items.length) / pageSize)),
  };
}

export async function getNewsBySlug(slug: string) {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return mockNews.find((item) => item.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from("news")
    .select(
      "*, category:news_categories(*), author:profiles(*), comments:comments(count), likes:news_likes(count)",
    )
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    logFallback("Failed to fetch news detail", error);
    return mockNews.find((item) => item.slug === slug) ?? null;
  }

  if (!data) {
    return null;
  }

  return {
    ...data,
    comments_count: data.comments?.[0]?.count ?? 0,
    likes_count: data.likes?.[0]?.count ?? 0,
  } satisfies NewsArticle;
}

export async function getCommentsForNews(newsId: string): Promise<CommentRecord[]> {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return mockComments.filter((item) => item.news_id === newsId);
  }

  const { data, error } = await supabase
    .from("comments")
    .select("*, author:profiles(*), likes:comment_likes(count)")
    .eq("news_id", newsId)
    .order("created_at", { ascending: false });

  if (error) {
    logFallback("Failed to fetch comments", error);
    return mockComments.filter((item) => item.news_id === newsId);
  }

  return (data ?? []).map((item) => ({
    ...item,
    likes_count: item.likes?.[0]?.count ?? 0,
  }));
}

export async function getCompetitionsList(searchParams?: {
  page?: string;
  pageSize?: string;
}): Promise<PaginatedResult<Competition>> {
  const page = parsePageParam(searchParams?.page);
  const pageSize = parsePageSizeParam(searchParams?.pageSize);
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return paginateArray(mockCompetitions, page, pageSize);
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const { data, count, error } = await supabase
    .from("competitions")
    .select("*, registrations:competition_registrations(count)", { count: "exact" })
    .order("start_date", { ascending: false })
    .range(from, to);

  if (error) {
    logFallback("Failed to fetch competitions", error);
    return paginateArray(mockCompetitions, page, pageSize);
  }

  const items = (data ?? []).map((item) => ({
    ...item,
    registrations_count: item.registrations?.[0]?.count ?? 0,
  }));

  return {
    items,
    page,
    pageSize,
    totalItems: count ?? items.length,
    totalPages: Math.max(1, Math.ceil((count ?? items.length) / pageSize)),
  };
}

export async function getCompetitionBySlug(slug: string) {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return mockCompetitions.find((item) => item.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from("competitions")
    .select("*, registrations:competition_registrations(count)")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    logFallback("Failed to fetch competition detail", error);
    return mockCompetitions.find((item) => item.slug === slug) ?? null;
  }

  if (!data) {
    return null;
  }

  return {
    ...data,
    registrations_count: data.registrations?.[0]?.count ?? 0,
  } satisfies Competition;
}

export async function getCompetitionLeaderboard(competitionId: string): Promise<LeaderboardEntry[]> {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return mockLeaderboard;
  }

  const { data, error } = await supabase
    .from("competition_registrations")
    .select("user_id, is_winner, profile:profiles!competition_registrations_user_id_fkey(first_name,last_name)")
    .eq("competition_id", competitionId);

  if (error) {
    logFallback("Failed to fetch competition leaderboard", error);
    return mockLeaderboard;
  }

  const grouped = new Map<string, LeaderboardEntry>();

  for (const row of data ?? []) {
    const profile = firstRelation(row.profile);
    const fullName = `${profile?.first_name ?? ""} ${profile?.last_name ?? ""}`.trim();
    const current = grouped.get(row.user_id) ?? {
      user_id: row.user_id,
      full_name: fullName,
      wins: 0,
      participations: 0,
    };

    current.participations += 1;
    if (row.is_winner) {
      current.wins += 1;
    }

    grouped.set(row.user_id, current);
  }

  return [...grouped.values()].sort((a, b) => b.wins - a.wins || b.participations - a.participations);
}

export async function getGlobalLeaderboard(): Promise<LeaderboardEntry[]> {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return mockLeaderboard;
  }

  const { data, error } = await supabase
    .from("competition_registrations")
    .select("user_id, is_winner, profile:profiles!competition_registrations_user_id_fkey(first_name,last_name)");

  if (error) {
    logFallback("Failed to fetch global leaderboard", error);
    return mockLeaderboard;
  }

  const grouped = new Map<string, LeaderboardEntry>();

  for (const row of data ?? []) {
    const profile = firstRelation(row.profile);
    const fullName = `${profile?.first_name ?? ""} ${profile?.last_name ?? ""}`.trim();
    const current = grouped.get(row.user_id) ?? {
      user_id: row.user_id,
      full_name: fullName,
      wins: 0,
      participations: 0,
    };

    current.participations += 1;
    if (row.is_winner) {
      current.wins += 1;
    }

    grouped.set(row.user_id, current);
  }

  return [...grouped.values()].sort((a, b) => b.wins - a.wins || b.participations - a.participations);
}

export async function getProfiles(): Promise<Profile[]> {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return mockUsers;
  }

  const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });

  if (error) {
    logFallback("Failed to fetch profiles", error);
    return mockUsers;
  }

  return data;
}

export async function getDashboardStats() {
  const [profiles, categories, news, competitions, comments] = await Promise.all([
    getProfiles(),
    getCategories(),
    getNewsList({ includeDrafts: true }),
    getCompetitionsList(),
    getAllComments(),
  ]);

  return {
    profiles: profiles.length,
    categories: categories.length,
    articles: news.totalItems,
    competitions: competitions.totalItems,
    comments: comments.length,
  };
}

export async function getAllComments(): Promise<CommentRecord[]> {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return mockComments;
  }

  const { data, error } = await supabase
    .from("comments")
    .select("*, author:profiles(*), news:news(title_en,title_ar)")
    .order("created_at", { ascending: false });

  if (error) {
    logFallback("Failed to fetch all comments", error);
    return mockComments;
  }

  return data ?? [];
}
