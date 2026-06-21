import { BlogStatus, CompetitionVisibility, LikeableType, Role, UserType } from "@prisma/client";
import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.email().trim().toLowerCase(),
  password: z
    .string()
    .min(8)
    .max(100)
    .regex(/[A-Z]/, "Must include an uppercase letter")
    .regex(/[a-z]/, "Must include a lowercase letter")
    .regex(/[0-9]/, "Must include a number"),
  phoneNumber: z.string().trim().min(7).max(30).optional().or(z.literal("")),
});

export const loginSchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(1),
});

export const profileSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  phoneNumber: z.string().trim().min(7).max(30).optional().or(z.literal("")),
});

export const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(2).max(80),
  slug: z.string().trim().min(2).max(80),
});

export const blogSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(5).max(160),
  slug: z.string().trim().min(3).max(180),
  description: z.string().trim().min(20).max(300),
  content: z.string().trim().min(50),
  imageUrl: z.union([z.url(), z.literal("")]).optional(),
  categoryId: z.string().min(1),
  status: z.nativeEnum(BlogStatus),
});

export const competitionSchema = z
  .object({
    id: z.string().optional(),
    title: z.string().trim().min(5).max(160),
    slug: z.string().trim().min(3).max(180),
    description: z.string().trim().min(20),
    startDate: z.string().min(1),
    endDate: z.string().min(1),
    visibility: z.nativeEnum(CompetitionVisibility),
  })
  .refine((value) => new Date(value.endDate) > new Date(value.startDate), {
    message: "End date must be after start date",
    path: ["endDate"],
  });

export const commentSchema = z.object({
  blogId: z.string().min(1),
  commentText: z.string().trim().min(2).max(1000),
});

export const likeSchema = z.object({
  likeableType: z.nativeEnum(LikeableType),
  likeableId: z.string().min(1),
});

export const userRoleTypeSchema = z.object({
  userId: z.string().min(1),
  role: z.nativeEnum(Role),
  userType: z.nativeEnum(UserType),
});

export const visibilitySchema = z.object({
  commentId: z.string().min(1),
  isVisible: z
    .string()
    .transform((value) => value === "true"),
});

export function flattenZodError(error: z.ZodError) {
  return error.flatten().fieldErrors;
}
