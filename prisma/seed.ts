import "dotenv/config";

import bcrypt from "bcryptjs";
import {
  BlogStatus,
  CompetitionVisibility,
  PrismaClient,
  Role,
  UserType,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Password123!", 10);

  const users = [
    {
      fullName: "Tretrip Admin",
      email: "admin@tretrip.com",
      phoneNumber: "+10000000001",
      role: Role.ADMIN,
      userType: UserType.INTERNAL,
    },
    {
      fullName: "Tretrip Editor",
      email: "editor@tretrip.com",
      phoneNumber: "+10000000002",
      role: Role.EDITOR,
      userType: UserType.INTERNAL,
    },
    {
      fullName: "Internal Member",
      email: "member@tretrip.com",
      phoneNumber: "+10000000003",
      role: Role.USER,
      userType: UserType.INTERNAL,
    },
    {
      fullName: "External Supporter",
      email: "supporter@example.com",
      phoneNumber: "+10000000004",
      role: Role.USER,
      userType: UserType.EXTERNAL,
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: { ...user, passwordHash },
      create: { ...user, passwordHash },
    });
  }

  const sportsCategory = await prisma.category.upsert({
    where: { slug: "sports" },
    update: { name: "Sports" },
    create: { name: "Sports", slug: "sports" },
  });

  const admin = await prisma.user.findUniqueOrThrow({
    where: { email: "admin@tretrip.com" },
  });

  const externalUser = await prisma.user.findUniqueOrThrow({
    where: { email: "supporter@example.com" },
  });

  const publishedBlog = await prisma.blog.upsert({
    where: { slug: "tretrip-launches-football-news-platform" },
    update: {
      title: "Tretrip launches its football news platform",
      description:
        "Tretrip opens a bilingual sports desk covering football stories, competitions, and fan engagement.",
      content:
        "Tretrip is launching a new editorial platform focused on football storytelling, internal campaigns, and public-facing competitions. The experience is designed for scale, moderation, and fast publishing across multiple categories in the future.",
      status: BlogStatus.PUBLISHED,
      categoryId: sportsCategory.id,
      authorId: admin.id,
      publishedAt: new Date(),
      imageUrl:
        "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=1200&q=80",
    },
    create: {
      title: "Tretrip launches its football news platform",
      slug: "tretrip-launches-football-news-platform",
      description:
        "Tretrip opens a bilingual sports desk covering football stories, competitions, and fan engagement.",
      content:
        "Tretrip is launching a new editorial platform focused on football storytelling, internal campaigns, and public-facing competitions. The experience is designed for scale, moderation, and fast publishing across multiple categories in the future.",
      status: BlogStatus.PUBLISHED,
      categoryId: sportsCategory.id,
      authorId: admin.id,
      publishedAt: new Date(),
      imageUrl:
        "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=1200&q=80",
    },
  });

  await prisma.blog.upsert({
    where: { slug: "inside-the-next-tretrip-internal-challenge" },
    update: {
      title: "Inside the next Tretrip internal challenge",
      description:
        "A preview of the next internal football activation built for Tretrip staff and collaborators.",
      content:
        "The next internal Tretrip challenge is focused on participation, prediction habits, and editorial collaboration. Editors can keep it as draft content until the campaign is ready for launch.",
      status: BlogStatus.DRAFT,
      categoryId: sportsCategory.id,
      authorId: admin.id,
      publishedAt: null,
      imageUrl: null,
    },
    create: {
      title: "Inside the next Tretrip internal challenge",
      slug: "inside-the-next-tretrip-internal-challenge",
      description:
        "A preview of the next internal football activation built for Tretrip staff and collaborators.",
      content:
        "The next internal Tretrip challenge is focused on participation, prediction habits, and editorial collaboration. Editors can keep it as draft content until the campaign is ready for launch.",
      status: BlogStatus.DRAFT,
      categoryId: sportsCategory.id,
      authorId: admin.id,
      imageUrl: null,
    },
  });

  const internalCompetition = await prisma.competition.upsert({
    where: { slug: "tretrip-internal-prediction-cup" },
    update: {
      title: "Tretrip Internal Prediction Cup",
      description:
        "An internal-only football prediction competition for Tretrip team members.",
      startDate: new Date("2026-07-01T00:00:00.000Z"),
      endDate: new Date("2026-08-01T00:00:00.000Z"),
      visibility: CompetitionVisibility.INTERNAL,
    },
    create: {
      title: "Tretrip Internal Prediction Cup",
      slug: "tretrip-internal-prediction-cup",
      description:
        "An internal-only football prediction competition for Tretrip team members.",
      startDate: new Date("2026-07-01T00:00:00.000Z"),
      endDate: new Date("2026-08-01T00:00:00.000Z"),
      visibility: CompetitionVisibility.INTERNAL,
    },
  });

  const publicCompetition = await prisma.competition.upsert({
    where: { slug: "public-matchday-giveaway" },
    update: {
      title: "Public Matchday Giveaway",
      description:
        "A public Tretrip football giveaway open to internal and external supporters.",
      startDate: new Date("2026-07-05T00:00:00.000Z"),
      endDate: new Date("2026-08-10T00:00:00.000Z"),
      visibility: CompetitionVisibility.PUBLIC,
    },
    create: {
      title: "Public Matchday Giveaway",
      slug: "public-matchday-giveaway",
      description:
        "A public Tretrip football giveaway open to internal and external supporters.",
      startDate: new Date("2026-07-05T00:00:00.000Z"),
      endDate: new Date("2026-08-10T00:00:00.000Z"),
      visibility: CompetitionVisibility.PUBLIC,
    },
  });

  const existingComment = await prisma.comment.findFirst({
    where: {
      userId: externalUser.id,
      blogId: publishedBlog.id,
      commentText:
        "Looking forward to more Tretrip football coverage this season.",
    },
  });

  if (!existingComment) {
    await prisma.comment.create({
      data: {
        userId: externalUser.id,
        blogId: publishedBlog.id,
        commentText:
          "Looking forward to more Tretrip football coverage this season.",
        isVisible: true,
      },
    });
  }

  await prisma.userCompetition.upsert({
    where: {
      userId_competitionId: {
        userId: externalUser.id,
        competitionId: publicCompetition.id,
      },
    },
    update: {},
    create: {
      userId: externalUser.id,
      competitionId: publicCompetition.id,
    },
  });

  await prisma.userCompetition.upsert({
    where: {
      userId_competitionId: {
        userId: admin.id,
        competitionId: internalCompetition.id,
      },
    },
    update: {},
    create: {
      userId: admin.id,
      competitionId: internalCompetition.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
