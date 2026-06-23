"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { getCurrentProfile, getSessionUser } from "@/lib/auth";
import { assertRole, hasMinimumRole } from "@/lib/permissions";
import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase/server";
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

export async function loginAction(formData: FormData) {
  const values = authSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!values.success) {
    console.error(values.error.issues[0]?.message ?? "Invalid credentials.");
    return;
  }

  const supabase = await createSupabaseServerClient();
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

  const supabase = await createSupabaseServerClient();
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
  const supabase = await createSupabaseServerClient();
  await supabase?.auth.signOut();
  redirect("/");
}

export async function createCategoryAction(formData: FormData) {
  const profile = await getCurrentProfile();
  assertRole(profile?.role, "ADMIN");
  const admin = createSupabaseAdminClient();
  if (!admin) return;

  const titleEn = String(formData.get("titleEn") ?? "");
  await admin.from("news_categories").insert({
    slug: slugify(titleEn),
    title_en: titleEn,
    title_ar: String(formData.get("titleAr") ?? ""),
    description_en: String(formData.get("descriptionEn") ?? ""),
    description_ar: String(formData.get("descriptionAr") ?? ""),
  });

  revalidatePath("/dashboard/categories");
  revalidatePath("/news");
}

export async function createNewsAction(formData: FormData) {
  const profile = await getCurrentProfile();
  assertRole(profile?.role, "EDITOR");
  const admin = createSupabaseAdminClient();
  if (!admin) return;

  const titleEn = String(formData.get("titleEn") ?? "");
  const status = formData.get("status") === "PUBLISHED" ? "PUBLISHED" : "DRAFT";

  await admin.from("news").insert({
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
  });

  revalidatePath("/dashboard/news");
  revalidatePath("/news");
  revalidatePath("/");
}

export async function createCompetitionAction(formData: FormData) {
  const profile = await getCurrentProfile();
  assertRole(profile?.role, "ADMIN");
  const admin = createSupabaseAdminClient();
  if (!admin) return;

  const titleEn = String(formData.get("titleEn") ?? "");
  await admin.from("competitions").insert({
    slug: slugify(titleEn),
    title_en: titleEn,
    title_ar: String(formData.get("titleAr") ?? ""),
    description_en: String(formData.get("descriptionEn") ?? ""),
    description_ar: String(formData.get("descriptionAr") ?? ""),
    cover_image_url: String(formData.get("coverImageUrl") ?? ""),
    start_date: String(formData.get("startDate") ?? ""),
    end_date: String(formData.get("endDate") ?? ""),
  });

  revalidatePath("/dashboard/competitions");
  revalidatePath("/competitions");
  revalidatePath("/");
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
  const supabase = await createSupabaseServerClient();
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
