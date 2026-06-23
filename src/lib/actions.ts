"use server";

import { randomUUID } from "node:crypto";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { getCurrentProfile, getSessionUser } from "@/lib/auth";
import { mockCategories, mockCompetitions, mockNews } from "@/lib/mock-data";
import { assertRole, hasMinimumRole } from "@/lib/permissions";
import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase/server";
import type { Competition, NewsArticle, NewsCategory, PublishStatus } from "@/lib/types";
import { slugify } from "@/lib/utils";

const authSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

const signupSchema = authSchema.extend({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phoneNumber: z.string().min(5),
});

function isMissingTableError(error: unknown) {
  const message =
    error && typeof error === "object" && "message" in error
      ? String((error as { message?: unknown }).message ?? "")
      : "";

  return message.includes("Could not find the table");
}

export async function loginAction(formData: FormData) {
  const values = authSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!values.success) {
    console.error(values.error.issues[0]?.message ?? "Invalid credentials.");
    return;
  }

  const supabase = await createSupabaseServerClient({ writeCookies: true });
  if (!supabase) {
    console.error("Supabase environment variables are missing.");
    return;
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: values.data.email,
    password: values.data.password,
  });

  if (error) {
    console.error(error.message);
    return;
  }

  redirect("/dashboard");
}

export async function signupAction(formData: FormData) {
  const values = signupSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phoneNumber: formData.get("phoneNumber"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!values.success) {
    console.error(values.error.issues[0]?.message ?? "Invalid input.");
    return;
  }

  const supabase = await createSupabaseServerClient({ writeCookies: true });
  const admin = createSupabaseAdminClient();

  if (!supabase || !admin) {
    console.error("Supabase environment variables are missing.");
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email: values.data.email,
    password: values.data.password,
    options: {
      data: {
        first_name: values.data.firstName,
        last_name: values.data.lastName,
      },
    },
  });

  if (error) {
    console.error(error.message);
    return;
  }

  if (data.user) {
    await admin.from("profiles").upsert(
      {
        id: data.user.id,
        first_name: values.data.firstName,
        last_name: values.data.lastName,
        email: values.data.email,
        phone_number: values.data.phoneNumber,
        role: "USER",
      },
      { onConflict: "id" },
    );
  }

  redirect("/dashboard");
}

export async function logoutAction() {
  const supabase = await createSupabaseServerClient({ writeCookies: true });
  await supabase?.auth.signOut();
  redirect("/");
}

export async function createCategoryAction(formData: FormData) {
  const profile = await getCurrentProfile();
  assertRole(profile?.role, "ADMIN");
  const admin = createSupabaseAdminClient();

  const titleEn = String(formData.get("titleEn") ?? "");
  const payload: Omit<NewsCategory, "id"> = {
    slug: slugify(titleEn),
    title_en: titleEn,
    title_ar: String(formData.get("titleAr") ?? ""),
    description_en: String(formData.get("descriptionEn") ?? "").trim(),
    description_ar: String(formData.get("descriptionAr") ?? "").trim(),
  };

  if (!admin) {
    mockCategories.unshift({
      id: `mock-category-${randomUUID()}`,
      ...payload,
    });
  } else {
    const { error } = await admin.from("news_categories").insert(payload);

    if (error && isMissingTableError(error)) {
      mockCategories.unshift({
        id: `mock-category-${randomUUID()}`,
        ...payload,
      });
    } else if (error) {
      throw error;
    }
  }

  revalidatePath("/dashboard/categories");
  revalidatePath("/news");
}

export async function updateCategoryAction(formData: FormData) {
  const profile = await getCurrentProfile();
  assertRole(profile?.role, "ADMIN");
  const admin = createSupabaseAdminClient();

  const id = String(formData.get("id") ?? "");
  const titleEn = String(formData.get("titleEn") ?? "");
  const payload: Omit<NewsCategory, "id"> = {
    slug: slugify(titleEn),
    title_en: titleEn,
    title_ar: String(formData.get("titleAr") ?? ""),
    description_en: String(formData.get("descriptionEn") ?? "").trim(),
    description_ar: String(formData.get("descriptionAr") ?? "").trim(),
  };

  if (!admin) {
    const index = mockCategories.findIndex((item) => item.id === id);
    if (index >= 0) mockCategories[index] = { id, ...payload };
  } else {
    const { error } = await admin.from("news_categories").update(payload).eq("id", id);
    if (error && isMissingTableError(error)) {
      const index = mockCategories.findIndex((item) => item.id === id);
      if (index >= 0) mockCategories[index] = { id, ...payload };
    } else if (error) {
      throw error;
    }
  }

  revalidatePath("/dashboard/categories");
  revalidatePath("/news");
}

export async function deleteCategoryAction(formData: FormData) {
  const profile = await getCurrentProfile();
  assertRole(profile?.role, "ADMIN");
  const admin = createSupabaseAdminClient();
  const id = String(formData.get("id") ?? "");

  if (!admin) {
    const index = mockCategories.findIndex((item) => item.id === id);
    if (index >= 0) mockCategories.splice(index, 1);
  } else {
    const { error } = await admin.from("news_categories").delete().eq("id", id);
    if (error && isMissingTableError(error)) {
      const index = mockCategories.findIndex((item) => item.id === id);
      if (index >= 0) mockCategories.splice(index, 1);
    } else if (error) {
      throw error;
    }
  }

  revalidatePath("/dashboard/categories");
  revalidatePath("/news");
}

export async function createNewsAction(formData: FormData) {
  const profile = await getCurrentProfile();
  assertRole(profile?.role, "EDITOR");
  const admin = createSupabaseAdminClient();

  const titleEn = String(formData.get("titleEn") ?? "");
  const status: PublishStatus = formData.get("status") === "PUBLISHED" ? "PUBLISHED" : "DRAFT";
  const payload: Omit<NewsArticle, "id" | "created_at" | "updated_at" | "likes_count" | "comments_count" | "category" | "author"> = {
    slug: slugify(titleEn),
    category_id: String(formData.get("categoryId") ?? ""),
    author_id: profile?.id ?? null,
    title_en: titleEn,
    title_ar: String(formData.get("titleAr") ?? ""),
    summary_en: String(formData.get("summaryEn") ?? ""),
    summary_ar: String(formData.get("summaryAr") ?? ""),
    content_en: String(formData.get("contentEn") ?? ""),
    content_ar: String(formData.get("contentAr") ?? ""),
    cover_image_url: String(formData.get("coverImageUrl") ?? ""),
    status,
    published_at: status === "PUBLISHED" ? new Date().toISOString() : null,
  };

  if (!admin) {
    const category = mockCategories.find((item) => item.id === payload.category_id);
    mockNews.unshift({
      id: `mock-news-${randomUUID()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      likes_count: 0,
      comments_count: 0,
      category: category ?? undefined,
      author: profile ?? undefined,
      ...payload,
    });
  } else {
    const { error } = await admin.from("news").insert(payload);

    if (error && isMissingTableError(error)) {
      const category = mockCategories.find((item) => item.id === payload.category_id);
      mockNews.unshift({
        id: `mock-news-${randomUUID()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        likes_count: 0,
        comments_count: 0,
        category: category ?? undefined,
        author: profile ?? undefined,
        ...payload,
      });
    } else if (error) {
      throw error;
    }
  }

  revalidatePath("/dashboard/news");
  revalidatePath("/news");
  revalidatePath("/");
}

export async function updateNewsAction(formData: FormData) {
  const profile = await getCurrentProfile();
  assertRole(profile?.role, "EDITOR");
  const admin = createSupabaseAdminClient();

  const id = String(formData.get("id") ?? "");
  const slug = String(formData.get("slug") ?? "");
  const titleEn = String(formData.get("titleEn") ?? "");
  const status: PublishStatus = formData.get("status") === "PUBLISHED" ? "PUBLISHED" : "DRAFT";
  const payload = {
    slug: slugify(titleEn || slug),
    category_id: String(formData.get("categoryId") ?? ""),
    author_id: profile?.id ?? null,
    title_en: titleEn,
    title_ar: String(formData.get("titleAr") ?? ""),
    summary_en: String(formData.get("summaryEn") ?? ""),
    summary_ar: String(formData.get("summaryAr") ?? ""),
    content_en: String(formData.get("contentEn") ?? ""),
    content_ar: String(formData.get("contentAr") ?? ""),
    cover_image_url: String(formData.get("coverImageUrl") ?? ""),
    status,
    published_at: status === "PUBLISHED" ? new Date().toISOString() : null,
  };

  if (!admin) {
    const index = mockNews.findIndex((item) => item.id === id);
    if (index >= 0) {
      const existing = mockNews[index];
      mockNews[index] = { ...existing, ...payload, updated_at: new Date().toISOString() };
    }
  } else {
    const { error } = await admin.from("news").update(payload).eq("id", id);
    if (error && isMissingTableError(error)) {
      const index = mockNews.findIndex((item) => item.id === id);
      if (index >= 0) {
        const existing = mockNews[index];
        mockNews[index] = { ...existing, ...payload, updated_at: new Date().toISOString() };
      }
    } else if (error) {
      throw error;
    }
  }

  revalidatePath("/dashboard/news");
  revalidatePath("/news");
  revalidatePath(`/news/${slug}`);
}

export async function deleteNewsAction(formData: FormData) {
  const profile = await getCurrentProfile();
  assertRole(profile?.role, "EDITOR");
  const admin = createSupabaseAdminClient();
  const id = String(formData.get("id") ?? "");
  const slug = String(formData.get("slug") ?? "");

  if (!admin) {
    const index = mockNews.findIndex((item) => item.id === id);
    if (index >= 0) mockNews.splice(index, 1);
  } else {
    const { error } = await admin.from("news").delete().eq("id", id);
    if (error && isMissingTableError(error)) {
      const index = mockNews.findIndex((item) => item.id === id);
      if (index >= 0) mockNews.splice(index, 1);
    } else if (error) {
      throw error;
    }
  }

  revalidatePath("/dashboard/news");
  revalidatePath("/news");
  revalidatePath(`/news/${slug}`);
}

export async function createCompetitionAction(formData: FormData) {
  const profile = await getCurrentProfile();
  assertRole(profile?.role, "ADMIN");
  const admin = createSupabaseAdminClient();

  const titleEn = String(formData.get("titleEn") ?? "");
  const payload: Omit<Competition, "id" | "created_at" | "updated_at" | "registrations_count" | "winners_count"> = {
    slug: slugify(titleEn),
    title_en: titleEn,
    title_ar: String(formData.get("titleAr") ?? ""),
    description_en: String(formData.get("descriptionEn") ?? ""),
    description_ar: String(formData.get("descriptionAr") ?? ""),
    cover_image_url: String(formData.get("coverImageUrl") ?? ""),
    start_date: String(formData.get("startDate") ?? ""),
    end_date: String(formData.get("endDate") ?? ""),
  };

  if (!admin) {
    mockCompetitions.unshift({
      id: `mock-competition-${randomUUID()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      registrations_count: 0,
      winners_count: 0,
      ...payload,
    });
  } else {
    const { error } = await admin.from("competitions").insert(payload);

    if (error && isMissingTableError(error)) {
      mockCompetitions.unshift({
        id: `mock-competition-${randomUUID()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        registrations_count: 0,
        winners_count: 0,
        ...payload,
      });
    } else if (error) {
      throw error;
    }
  }

  revalidatePath("/dashboard/competitions");
  revalidatePath("/competitions");
  revalidatePath("/");
}

export async function updateCompetitionAction(formData: FormData) {
  const profile = await getCurrentProfile();
  assertRole(profile?.role, "ADMIN");
  const admin = createSupabaseAdminClient();
  const id = String(formData.get("id") ?? "");
  const titleEn = String(formData.get("titleEn") ?? "");
  const payload = {
    slug: slugify(titleEn),
    title_en: titleEn,
    title_ar: String(formData.get("titleAr") ?? ""),
    description_en: String(formData.get("descriptionEn") ?? ""),
    description_ar: String(formData.get("descriptionAr") ?? ""),
    cover_image_url: String(formData.get("coverImageUrl") ?? ""),
    start_date: String(formData.get("startDate") ?? ""),
    end_date: String(formData.get("endDate") ?? ""),
  };

  if (!admin) {
    const index = mockCompetitions.findIndex((item) => item.id === id);
    if (index >= 0) {
      const existing = mockCompetitions[index];
      mockCompetitions[index] = { ...existing, ...payload, updated_at: new Date().toISOString() };
    }
  } else {
    const { error } = await admin.from("competitions").update(payload).eq("id", id);
    if (error && isMissingTableError(error)) {
      const index = mockCompetitions.findIndex((item) => item.id === id);
      if (index >= 0) {
        const existing = mockCompetitions[index];
        mockCompetitions[index] = { ...existing, ...payload, updated_at: new Date().toISOString() };
      }
    } else if (error) {
      throw error;
    }
  }

  revalidatePath("/dashboard/competitions");
  revalidatePath("/competitions");
}

export async function deleteCompetitionAction(formData: FormData) {
  const profile = await getCurrentProfile();
  assertRole(profile?.role, "ADMIN");
  const admin = createSupabaseAdminClient();
  const id = String(formData.get("id") ?? "");

  if (!admin) {
    const index = mockCompetitions.findIndex((item) => item.id === id);
    if (index >= 0) mockCompetitions.splice(index, 1);
  } else {
    const { error } = await admin.from("competitions").delete().eq("id", id);
    if (error && isMissingTableError(error)) {
      const index = mockCompetitions.findIndex((item) => item.id === id);
      if (index >= 0) mockCompetitions.splice(index, 1);
    } else if (error) {
      throw error;
    }
  }

  revalidatePath("/dashboard/competitions");
  revalidatePath("/competitions");
}

export async function updateUserRoleAction(formData: FormData) {
  const profile = await getCurrentProfile();
  assertRole(profile?.role, "ADMIN");
  const admin = createSupabaseAdminClient();
  if (!admin) return;

  await admin
    .from("profiles")
    .update({ role: String(formData.get("role") ?? "USER") })
    .eq("id", String(formData.get("userId") ?? ""));

  revalidatePath("/dashboard/users");
}

export async function createUserAction(formData: FormData) {
  const profile = await getCurrentProfile();
  assertRole(profile?.role, "ADMIN");
  const admin = createSupabaseAdminClient();
  if (!admin) return;

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const firstName = String(formData.get("firstName") ?? "");
  const lastName = String(formData.get("lastName") ?? "");
  const phoneNumber = String(formData.get("phoneNumber") ?? "");
  const role = String(formData.get("role") ?? "USER");

  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      first_name: firstName,
      last_name: lastName,
      role,
    },
  });

  if (error) {
    throw error;
  }

  if (data.user) {
    const { error: profileError } = await admin.from("profiles").upsert(
      {
        id: data.user.id,
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phoneNumber,
        role,
      },
      { onConflict: "id" },
    );

    if (profileError) throw profileError;
  }

  revalidatePath("/dashboard/users");
}

export async function deleteUserAction(formData: FormData) {
  const profile = await getCurrentProfile();
  assertRole(profile?.role, "ADMIN");
  const admin = createSupabaseAdminClient();
  if (!admin) return;

  const id = String(formData.get("id") ?? "");
  const { error } = await admin.auth.admin.deleteUser(id);
  if (error) throw error;
  revalidatePath("/dashboard/users");
}

export async function toggleCommentVisibilityAction(formData: FormData) {
  const profile = await getCurrentProfile();
  assertRole(profile?.role, "ADMIN");
  const admin = createSupabaseAdminClient();
  if (!admin) return;

  const isHidden = formData.get("nextState") === "hidden";
  await admin
    .from("comments")
    .update({ is_hidden: isHidden })
    .eq("id", String(formData.get("commentId") ?? ""));

  revalidatePath("/dashboard/comments");
}

export async function updateCommentAction(formData: FormData) {
  const profile = await getCurrentProfile();
  assertRole(profile?.role, "ADMIN");
  const admin = createSupabaseAdminClient();
  if (!admin) return;

  const id = String(formData.get("id") ?? "");
  const { error } = await admin
    .from("comments")
    .update({
      comment_text: String(formData.get("commentText") ?? ""),
      is_hidden: formData.get("isHidden") === "true",
    })
    .eq("id", id);

  if (error) throw error;
  revalidatePath("/dashboard/comments");
}

export async function deleteCommentAction(formData: FormData) {
  const profile = await getCurrentProfile();
  assertRole(profile?.role, "ADMIN");
  const admin = createSupabaseAdminClient();
  if (!admin) return;

  const id = String(formData.get("id") ?? "");
  const { error } = await admin.from("comments").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/dashboard/comments");
}

export async function createAdminCommentAction(formData: FormData) {
  const profile = await getCurrentProfile();
  assertRole(profile?.role, "ADMIN");
  const admin = createSupabaseAdminClient();
  if (!admin || !profile) return;

  const { error } = await admin.from("comments").insert({
    user_id: profile.id,
    news_id: String(formData.get("newsId") ?? ""),
    comment_text: String(formData.get("commentText") ?? ""),
  });
  if (error) throw error;
  revalidatePath("/dashboard/comments");
}

export async function addCommentAction(formData: FormData) {
  const currentUser = await getSessionUser();
  if (!currentUser) {
    redirect("/login");
  }

  const admin = createSupabaseAdminClient();
  if (!admin) return;

  await admin.from("comments").insert({
    user_id: currentUser.id,
    news_id: String(formData.get("newsId") ?? ""),
    comment_text: String(formData.get("commentText") ?? ""),
  });

  revalidatePath(`/news/${String(formData.get("newsSlug") ?? "")}`);
}

export async function toggleNewsLikeAction(formData: FormData) {
  const currentUser = await getSessionUser();
  if (!currentUser) {
    redirect("/login");
  }

  const admin = createSupabaseAdminClient();
  if (!admin) return;

  const newsId = String(formData.get("newsId") ?? "");
  const liked = formData.get("liked") === "true";

  if (liked) {
    await admin.from("news_likes").delete().eq("user_id", currentUser.id).eq("news_id", newsId);
  } else {
    await admin.from("news_likes").insert({ user_id: currentUser.id, news_id: newsId });
  }

  revalidatePath(`/news/${String(formData.get("newsSlug") ?? "")}`);
}

export async function toggleCommentLikeAction(formData: FormData) {
  const currentUser = await getSessionUser();
  if (!currentUser) {
    redirect("/login");
  }

  const admin = createSupabaseAdminClient();
  if (!admin) return;

  const commentId = String(formData.get("commentId") ?? "");
  const liked = formData.get("liked") === "true";

  if (liked) {
    await admin.from("comment_likes").delete().eq("user_id", currentUser.id).eq("comment_id", commentId);
  } else {
    await admin.from("comment_likes").insert({ user_id: currentUser.id, comment_id: commentId });
  }

  revalidatePath(`/news/${String(formData.get("newsSlug") ?? "")}`);
}

export async function registerCompetitionAction(formData: FormData) {
  const currentUser = await getSessionUser();
  if (!currentUser) {
    redirect("/login");
  }

  const admin = createSupabaseAdminClient();
  if (!admin) return;

  await admin.from("competition_registrations").upsert(
    {
      user_id: currentUser.id,
      competition_id: String(formData.get("competitionId") ?? ""),
    },
    { onConflict: "user_id,competition_id" },
  );

  const slug = String(formData.get("competitionSlug") ?? "");
  revalidatePath(`/competitions/${slug}`);
  revalidatePath("/competitions");
  revalidatePath("/profile");
}

export async function toggleWinnerAction(formData: FormData) {
  const profile = await getCurrentProfile();
  assertRole(profile?.role, "ADMIN");
  const admin = createSupabaseAdminClient();
  if (!admin) return;

  await admin
    .from("competition_registrations")
    .update({ is_winner: formData.get("isWinner") !== "true" })
    .eq("id", String(formData.get("registrationId") ?? ""));

  revalidatePath("/dashboard/competitions");
}

export async function setLocaleAction(formData: FormData) {
  const locale = String(formData.get("locale") ?? "en");
  const path = String(formData.get("path") ?? "/");
  const supabase = await createSupabaseServerClient({ writeCookies: true });
  const profile = await getCurrentProfile();

  const { cookies } = await import("next/headers");
  const store = await cookies();
  store.set("tretrip-locale", locale === "ar" ? "ar" : "en", {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  if (supabase && profile && hasMinimumRole(profile.role, "USER")) {
    await createSupabaseAdminClient()
      ?.from("profiles")
      .update({ locale_preference: locale === "ar" ? "ar" : "en" })
      .eq("id", profile.id);
  }

  redirect(path);
}
