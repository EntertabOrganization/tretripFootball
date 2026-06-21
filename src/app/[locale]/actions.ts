"use server";

import { BlogStatus, CompetitionVisibility, Role, UserType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSession, destroySession, getCurrentUser, hashPassword, isInternalEmail, verifyPassword } from "@/lib/auth";
import { canManageCompetitions, canManageEditorial, canManageUsers, requireAuth, requireRole } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";
import {
  blogSchema,
  categorySchema,
  commentSchema,
  competitionSchema,
  flattenZodError,
  loginSchema,
  profileSchema,
  registerSchema,
  userRoleTypeSchema,
  visibilitySchema,
} from "@/lib/validations";
import type { ActionState } from "@/types";

function cleanOptional(value: FormDataEntryValue | null) {
  const text = value?.toString().trim() ?? "";
  return text.length > 0 ? text : undefined;
}

function pathFor(locale: string, path = "") {
  return `/${locale}${path}`;
}

function revalidateLocalePaths(locale: string) {
  revalidatePath(pathFor(locale));
  revalidatePath(pathFor(locale, "/news"));
  revalidatePath(pathFor(locale, "/competitions"));
  revalidatePath(pathFor(locale, "/dashboard"));
}

export async function registerAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const locale = formData.get("locale")?.toString() ?? "en";
  const parsed = registerSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
    phoneNumber: cleanOptional(formData.get("phoneNumber")) ?? "",
  });

  if (!parsed.success) {
    return { errors: flattenZodError(parsed.error) };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });

  if (existingUser) {
    return { message: "An account with this email already exists." };
  }

  const user = await prisma.user.create({
    data: {
      fullName: parsed.data.fullName,
      email: parsed.data.email,
      passwordHash: await hashPassword(parsed.data.password),
      phoneNumber: parsed.data.phoneNumber || null,
      role: Role.USER,
      userType: isInternalEmail(parsed.data.email)
        ? UserType.INTERNAL
        : UserType.EXTERNAL,
    },
    select: {
      id: true,
      email: true,
      fullName: true,
      role: true,
      userType: true,
    },
  });

  await createSession(user);
  redirect(pathFor(locale, "/profile"));
}

export async function loginAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const locale = formData.get("locale")?.toString() ?? "en";
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { errors: flattenZodError(parsed.error) };
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });

  if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    return { message: "Invalid email or password." };
  }

  await createSession({
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
    userType: user.userType,
  });

  redirect(pathFor(locale, "/profile"));
}

export async function logoutAction(formData: FormData) {
  const locale = formData.get("locale")?.toString() ?? "en";
  await destroySession();
  redirect(pathFor(locale, "/login"));
}

export async function updateProfileAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const locale = formData.get("locale")?.toString() ?? "en";
  const user = await requireAuth();
  const parsed = profileSchema.safeParse({
    fullName: formData.get("fullName"),
    phoneNumber: cleanOptional(formData.get("phoneNumber")) ?? "",
  });

  if (!parsed.success) {
    return { errors: flattenZodError(parsed.error) };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      fullName: parsed.data.fullName,
      phoneNumber: parsed.data.phoneNumber || null,
    },
  });

  revalidatePath(pathFor(locale, "/profile"));
  return { success: true, message: "Profile updated successfully." };
}

export async function updateProfileFormAction(formData: FormData) {
  await updateProfileAction({}, formData);
}

export async function createCategoryAction(formData: FormData) {
  const locale = formData.get("locale")?.toString() ?? "en";
  const user = await requireRole([Role.ADMIN, Role.EDITOR]);

  if (!canManageEditorial(user.role)) {
    redirect(pathFor(locale, "/unauthorized"));
  }

  const parsed = categorySchema.safeParse({
    name: formData.get("name"),
    slug: slugify(formData.get("slug")?.toString() || formData.get("name")?.toString() || ""),
  });

  if (!parsed.success) {
    throw new Error("Invalid category data.");
  }

  await prisma.category.create({
    data: parsed.data,
  });

  revalidateLocalePaths(locale);
}

export async function updateCategoryAction(formData: FormData) {
  const locale = formData.get("locale")?.toString() ?? "en";
  await requireRole([Role.ADMIN, Role.EDITOR]);

  const id = formData.get("id")?.toString();
  if (!id) {
    throw new Error("Category ID is required.");
  }

  const parsed = categorySchema.safeParse({
    id,
    name: formData.get("name"),
    slug: slugify(formData.get("slug")?.toString() || formData.get("name")?.toString() || ""),
  });

  if (!parsed.success) {
    throw new Error("Invalid category data.");
  }

  await prisma.category.update({
    where: { id },
    data: {
      name: parsed.data.name,
      slug: parsed.data.slug,
    },
  });

  revalidateLocalePaths(locale);
}

export async function deleteCategoryAction(formData: FormData) {
  const locale = formData.get("locale")?.toString() ?? "en";
  await requireRole([Role.ADMIN, Role.EDITOR]);
  const id = formData.get("id")?.toString();

  if (!id) {
    throw new Error("Category ID is required.");
  }

  await prisma.category.delete({
    where: { id },
  });

  revalidateLocalePaths(locale);
}

export async function createBlogAction(formData: FormData) {
  const locale = formData.get("locale")?.toString() ?? "en";
  const user = await requireRole([Role.ADMIN, Role.EDITOR]);
  const parsed = blogSchema.safeParse({
    title: formData.get("title"),
    slug: slugify(formData.get("slug")?.toString() || formData.get("title")?.toString() || ""),
    description: formData.get("description"),
    content: formData.get("content"),
    imageUrl: cleanOptional(formData.get("imageUrl")) ?? "",
    categoryId: formData.get("categoryId"),
    status: (formData.get("status")?.toString() as BlogStatus) ?? BlogStatus.DRAFT,
  });

  if (!parsed.success) {
    throw new Error("Invalid blog data.");
  }

  await prisma.blog.create({
    data: {
      ...parsed.data,
      imageUrl: parsed.data.imageUrl || null,
      authorId: user.id,
      publishedAt: parsed.data.status === BlogStatus.PUBLISHED ? new Date() : null,
    },
  });

  revalidateLocalePaths(locale);
}

export async function updateBlogAction(formData: FormData) {
  const locale = formData.get("locale")?.toString() ?? "en";
  await requireRole([Role.ADMIN, Role.EDITOR]);
  const id = formData.get("id")?.toString();
  const currentSlug = formData.get("currentSlug")?.toString();

  if (!id) {
    throw new Error("Blog ID is required.");
  }

  const parsed = blogSchema.safeParse({
    id,
    title: formData.get("title"),
    slug: slugify(formData.get("slug")?.toString() || formData.get("title")?.toString() || ""),
    description: formData.get("description"),
    content: formData.get("content"),
    imageUrl: cleanOptional(formData.get("imageUrl")) ?? "",
    categoryId: formData.get("categoryId"),
    status: (formData.get("status")?.toString() as BlogStatus) ?? BlogStatus.DRAFT,
  });

  if (!parsed.success) {
    throw new Error("Invalid blog data.");
  }

  await prisma.blog.update({
    where: { id },
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      description: parsed.data.description,
      content: parsed.data.content,
      imageUrl: parsed.data.imageUrl || null,
      categoryId: parsed.data.categoryId,
      status: parsed.data.status,
      publishedAt: parsed.data.status === BlogStatus.PUBLISHED ? new Date() : null,
    },
  });

  revalidateLocalePaths(locale);
  revalidatePath(pathFor(locale, `/news/${parsed.data.slug}`));
  if (currentSlug && currentSlug !== parsed.data.slug) {
    revalidatePath(pathFor(locale, `/news/${currentSlug}`));
  }
}

export async function deleteBlogAction(formData: FormData) {
  const locale = formData.get("locale")?.toString() ?? "en";
  await requireRole([Role.ADMIN, Role.EDITOR]);
  const id = formData.get("id")?.toString();
  const slug = formData.get("currentSlug")?.toString();

  if (!id) {
    throw new Error("Blog ID is required.");
  }

  await prisma.blog.delete({
    where: { id },
  });

  revalidateLocalePaths(locale);
  if (slug) {
    revalidatePath(pathFor(locale, `/news/${slug}`));
  }
}

export async function createCompetitionAction(formData: FormData) {
  const locale = formData.get("locale")?.toString() ?? "en";
  const user = await requireRole([Role.ADMIN]);

  if (!canManageCompetitions(user.role)) {
    redirect(pathFor(locale, "/unauthorized"));
  }

  const parsed = competitionSchema.safeParse({
    title: formData.get("title"),
    slug: slugify(formData.get("slug")?.toString() || formData.get("title")?.toString() || ""),
    description: formData.get("description"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    visibility:
      (formData.get("visibility")?.toString() as CompetitionVisibility) ??
      CompetitionVisibility.PUBLIC,
  });

  if (!parsed.success) {
    throw new Error("Invalid competition data.");
  }

  await prisma.competition.create({
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      description: parsed.data.description,
      startDate: new Date(parsed.data.startDate),
      endDate: new Date(parsed.data.endDate),
      visibility: parsed.data.visibility,
    },
  });

  revalidateLocalePaths(locale);
}

export async function updateCompetitionAction(formData: FormData) {
  const locale = formData.get("locale")?.toString() ?? "en";
  await requireRole([Role.ADMIN]);
  const id = formData.get("id")?.toString();
  const currentSlug = formData.get("currentSlug")?.toString();

  if (!id) {
    throw new Error("Competition ID is required.");
  }

  const parsed = competitionSchema.safeParse({
    id,
    title: formData.get("title"),
    slug: slugify(formData.get("slug")?.toString() || formData.get("title")?.toString() || ""),
    description: formData.get("description"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    visibility:
      (formData.get("visibility")?.toString() as CompetitionVisibility) ??
      CompetitionVisibility.PUBLIC,
  });

  if (!parsed.success) {
    throw new Error("Invalid competition data.");
  }

  await prisma.competition.update({
    where: { id },
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      description: parsed.data.description,
      startDate: new Date(parsed.data.startDate),
      endDate: new Date(parsed.data.endDate),
      visibility: parsed.data.visibility,
    },
  });

  revalidateLocalePaths(locale);
  revalidatePath(pathFor(locale, `/competitions/${parsed.data.slug}`));
  if (currentSlug && currentSlug !== parsed.data.slug) {
    revalidatePath(pathFor(locale, `/competitions/${currentSlug}`));
  }
}

export async function deleteCompetitionAction(formData: FormData) {
  const locale = formData.get("locale")?.toString() ?? "en";
  await requireRole([Role.ADMIN]);
  const id = formData.get("id")?.toString();
  const slug = formData.get("currentSlug")?.toString();

  if (!id) {
    throw new Error("Competition ID is required.");
  }

  await prisma.competition.delete({
    where: { id },
  });

  revalidateLocalePaths(locale);
  if (slug) {
    revalidatePath(pathFor(locale, `/competitions/${slug}`));
  }
}

export async function updateCommentVisibilityAction(formData: FormData) {
  const locale = formData.get("locale")?.toString() ?? "en";
  await requireRole([Role.ADMIN, Role.EDITOR]);

  const parsed = visibilitySchema.safeParse({
    commentId: formData.get("commentId"),
    isVisible: formData.get("isVisible"),
  });

  if (!parsed.success) {
    throw new Error("Invalid comment visibility data.");
  }

  const comment = await prisma.comment.update({
    where: { id: parsed.data.commentId },
    data: {
      isVisible: parsed.data.isVisible,
    },
    include: {
      blog: {
        select: {
          slug: true,
        },
      },
    },
  });

  revalidatePath(pathFor(locale, `/news/${comment.blog.slug}`));
  revalidatePath(pathFor(locale, "/dashboard"));
}

export async function updateUserAccessAction(formData: FormData) {
  const locale = formData.get("locale")?.toString() ?? "en";
  const user = await requireRole([Role.ADMIN]);

  if (!canManageUsers(user.role)) {
    redirect(pathFor(locale, "/unauthorized"));
  }

  const parsed = userRoleTypeSchema.safeParse({
    userId: formData.get("userId"),
    role: formData.get("role"),
    userType: formData.get("userType"),
  });

  if (!parsed.success) {
    throw new Error("Invalid user role data.");
  }

  await prisma.user.update({
    where: { id: parsed.data.userId },
    data: {
      role: parsed.data.role,
      userType: parsed.data.userType,
    },
  });

  revalidatePath(pathFor(locale, "/dashboard"));
}

export async function createCommentAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const locale = formData.get("locale")?.toString() ?? "en";
  const slug = formData.get("slug")?.toString() ?? "";
  const user = await requireAuth();
  const parsed = commentSchema.safeParse({
    blogId: formData.get("blogId"),
    commentText: formData.get("commentText"),
  });

  if (!parsed.success) {
    return { errors: flattenZodError(parsed.error) };
  }

  await prisma.comment.create({
    data: {
      blogId: parsed.data.blogId,
      userId: user.id,
      commentText: parsed.data.commentText,
      isVisible: true,
    },
  });

  revalidatePath(pathFor(locale, `/news/${slug}`));
  return { success: true, message: "Comment added successfully." };
}

export async function joinCompetitionAction(formData: FormData) {
  const locale = formData.get("locale")?.toString() ?? "en";
  const slug = formData.get("slug")?.toString() ?? "";
  const user = await requireAuth();
  const competitionId = formData.get("competitionId")?.toString();

  if (!competitionId) {
    throw new Error("Competition ID is required.");
  }

  const competition = await prisma.competition.findUnique({
    where: { id: competitionId },
  });

  if (!competition) {
    throw new Error("Competition not found.");
  }

  if (competition.endDate < new Date()) {
    throw new Error("Registration for this competition has closed.");
  }

  if (
    competition.visibility === CompetitionVisibility.INTERNAL &&
    user.userType !== UserType.INTERNAL
  ) {
    throw new Error("This competition is only open to internal users.");
  }

  await prisma.userCompetition.upsert({
    where: {
      userId_competitionId: {
        userId: user.id,
        competitionId: competition.id,
      },
    },
    update: {},
    create: {
      userId: user.id,
      competitionId: competition.id,
    },
  });

  revalidatePath(pathFor(locale, `/competitions/${slug}`));
  revalidatePath(pathFor(locale, "/profile"));
}

export async function getAuthenticatedUserAction() {
  return getCurrentUser();
}
