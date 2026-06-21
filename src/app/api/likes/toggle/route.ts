import { LikeableType } from "@prisma/client";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { likeSchema } from "@/lib/validations";

async function ensureLikeTargetExists(likeableType: LikeableType, likeableId: string) {
  if (likeableType === LikeableType.BLOG) {
    const blog = await prisma.blog.findUnique({
      where: { id: likeableId },
      select: { id: true },
    });

    return Boolean(blog);
  }

  const comment = await prisma.comment.findUnique({
    where: { id: likeableId },
    select: { id: true },
  });

  return Boolean(comment);
}

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = likeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid like payload.", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const targetExists = await ensureLikeTargetExists(
      parsed.data.likeableType,
      parsed.data.likeableId,
    );

    if (!targetExists) {
      return NextResponse.json({ error: "Target not found." }, { status: 404 });
    }

    const existing = await prisma.like.findUnique({
      where: {
        userId_likeableType_likeableId: {
          userId: user.id,
          likeableType: parsed.data.likeableType,
          likeableId: parsed.data.likeableId,
        },
      },
    });

    if (existing) {
      await prisma.like.delete({
        where: { id: existing.id },
      });
    } else {
      await prisma.like.create({
        data: {
          userId: user.id,
          likeableType: parsed.data.likeableType,
          likeableId: parsed.data.likeableId,
        },
      });
    }

    const count = await prisma.like.count({
      where: {
        likeableType: parsed.data.likeableType,
        likeableId: parsed.data.likeableId,
      },
    });

    return NextResponse.json({
      success: true,
      liked: !existing,
      count,
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to toggle like." },
      { status: 500 },
    );
  }
}
