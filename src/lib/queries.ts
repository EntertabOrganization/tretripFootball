import "server-only";

import {
  BlogStatus,
  CompetitionVisibility,
  LikeableType,
  Prisma,
  Role,
  UserType,
} from "@prisma/client";
import { withPrismaConnectionFallback } from "@/lib/prisma-errors";
import { prisma } from "@/lib/prisma";
import type { SessionUser } from "@/types";

const blogCardSelect = {
  id: true,
  title: true,
  slug: true,
  description: true,
  imageUrl: true,
  publishedAt: true,
  status: true,
  category: {
    select: {
      id: true,
      name: true,
      slug: true,
    },
  },
  _count: {
    select: {
      comments: {
        where: { isVisible: true },
      },
    },
  },
} satisfies Prisma.BlogSelect;

export async function getHomePageData() {
  const [latestNews, featuredCompetitions, categories] = await withPrismaConnectionFallback(
    () =>
      Promise.all([
        prisma.blog.findMany({
          where: { status: BlogStatus.PUBLISHED },
          orderBy: { publishedAt: "desc" },
          take: 3,
          select: blogCardSelect,
        }),
        prisma.competition.findMany({
          where: { endDate: { gte: new Date() } },
          orderBy: { startDate: "asc" },
          take: 3,
        }),
        prisma.category.findMany({
          orderBy: { name: "asc" },
        }),
      ]),
    [[], [], []],
    "homepage data query",
  );

  return { latestNews, featuredCompetitions, categories };
}

export async function getPublishedBlogs(categorySlug?: string) {
  return withPrismaConnectionFallback(
    () =>
      prisma.blog.findMany({
        where: {
          status: BlogStatus.PUBLISHED,
          ...(categorySlug
            ? {
                category: {
                  slug: categorySlug,
                },
              }
            : {}),
        },
        orderBy: { publishedAt: "desc" },
        select: blogCardSelect,
      }),
    [],
    "published blogs query",
  );
}

export async function getBlogBySlug(slug: string, viewer?: SessionUser | null) {
  return withPrismaConnectionFallback(
    () =>
      prisma.blog.findUnique({
        where: { slug },
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          content: true,
          imageUrl: true,
          publishedAt: true,
          status: true,
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          author: {
            select: {
              fullName: true,
            },
          },
          comments: {
            where:
              viewer?.role === Role.ADMIN || viewer?.role === Role.EDITOR
                ? undefined
                : { isVisible: true },
            orderBy: { createdAt: "desc" },
            select: {
              id: true,
              commentText: true,
              isVisible: true,
              createdAt: true,
              user: {
                select: {
                  fullName: true,
                },
              },
            },
          },
          _count: {
            select: {
              comments: {
                where: { isVisible: true },
              },
            },
          },
        },
      }),
    null,
    `blog lookup for slug "${slug}"`,
  );
}

export async function getBlogLikeSummary(blogId: string, userId?: string) {
  const [count, liked] = await withPrismaConnectionFallback(
    () =>
      Promise.all([
        prisma.like.count({
          where: {
            likeableType: LikeableType.BLOG,
            likeableId: blogId,
          },
        }),
        userId
          ? prisma.like.findUnique({
              where: {
                userId_likeableType_likeableId: {
                  userId,
                  likeableType: LikeableType.BLOG,
                  likeableId: blogId,
                },
              },
            })
          : null,
      ]),
    [0, null],
    `blog like summary for "${blogId}"`,
  );

  return { count, liked: Boolean(liked) };
}

export async function getCommentLikeSummaries(commentIds: string[], userId?: string) {
  if (commentIds.length === 0) {
    return new Map<string, { count: number; liked: boolean }>();
  }

  const likes = await withPrismaConnectionFallback(
    () =>
      prisma.like.findMany({
        where: {
          likeableType: LikeableType.COMMENT,
          likeableId: { in: commentIds },
        },
        select: {
          likeableId: true,
          userId: true,
        },
      }),
    [],
    "comment like summary query",
  );

  const map = new Map<string, { count: number; liked: boolean }>();

  for (const commentId of commentIds) {
    const items = likes.filter((item) => item.likeableId === commentId);
    map.set(commentId, {
      count: items.length,
      liked: userId ? items.some((item) => item.userId === userId) : false,
    });
  }

  return map;
}

export async function getVisibleCompetitions(user?: SessionUser | null) {
  return withPrismaConnectionFallback(
    () =>
      prisma.competition.findMany({
        where:
          user?.userType === UserType.INTERNAL
            ? undefined
            : {
                visibility: CompetitionVisibility.PUBLIC,
              },
        orderBy: [{ endDate: "asc" }, { startDate: "asc" }],
      }),
    [],
    "visible competitions query",
  );
}

export async function getCompetitionBySlug(slug: string) {
  return withPrismaConnectionFallback(
    () =>
      prisma.competition.findUnique({
        where: { slug },
        include: {
          _count: {
            select: {
              registrations: true,
            },
          },
        },
      }),
    null,
    `competition lookup for slug "${slug}"`,
  );
}

export async function getUserCompetitionStatus(userId: string, competitionId: string) {
  return withPrismaConnectionFallback(
    () =>
      prisma.userCompetition.findUnique({
        where: {
          userId_competitionId: {
            userId,
            competitionId,
          },
        },
      }),
    null,
    `competition registration lookup for "${competitionId}"`,
  );
}

export async function getCategories() {
  return withPrismaConnectionFallback(
    () =>
      prisma.category.findMany({
        orderBy: { name: "asc" },
      }),
    [],
    "categories query",
  );
}

export async function getProfileData(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      fullName: true,
      email: true,
      phoneNumber: true,
      role: true,
      userType: true,
      createdAt: true,
      competitionRegistrations: {
        orderBy: {
          registeredAt: "desc",
        },
        include: {
          competition: true,
        },
      },
      comments: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          blog: {
            select: {
              title: true,
              slug: true,
            },
          },
        },
      },
    },
  });
}

export async function getDashboardData() {
  const [
    users,
    categories,
    blogs,
    competitions,
    comments,
    totalUsers,
    totalInternalUsers,
    totalExternalUsers,
    totalArticles,
    totalPublishedArticles,
    totalDraftArticles,
    totalCompetitions,
    totalComments,
  ] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
    }),
    prisma.blog.findMany({
      include: {
        category: true,
        author: {
          select: {
            fullName: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.competition.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.comment.findMany({
      include: {
        user: {
          select: {
            fullName: true,
          },
        },
        blog: {
          select: {
            title: true,
            slug: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.count(),
    prisma.user.count({ where: { userType: UserType.INTERNAL } }),
    prisma.user.count({ where: { userType: UserType.EXTERNAL } }),
    prisma.blog.count(),
    prisma.blog.count({ where: { status: BlogStatus.PUBLISHED } }),
    prisma.blog.count({ where: { status: BlogStatus.DRAFT } }),
    prisma.competition.count(),
    prisma.comment.count(),
  ]);

  return {
    users,
    categories,
    blogs,
    competitions,
    comments,
    stats: {
      totalUsers,
      totalInternalUsers,
      totalExternalUsers,
      totalArticles,
      totalPublishedArticles,
      totalDraftArticles,
      totalCompetitions,
      totalComments,
    },
  };
}
