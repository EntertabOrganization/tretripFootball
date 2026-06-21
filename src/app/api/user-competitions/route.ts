import { CompetitionVisibility } from "@prisma/client";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { competitionId?: string };
    const competitionId = body.competitionId?.trim();

    if (!competitionId) {
      return NextResponse.json(
        { error: "competitionId is required." },
        { status: 400 },
      );
    }

    const competition = await prisma.competition.findUnique({
      where: { id: competitionId },
    });

    if (!competition) {
      return NextResponse.json({ error: "Competition not found." }, { status: 404 });
    }

    if (competition.endDate < new Date()) {
      return NextResponse.json(
        { error: "Registration for this competition has closed." },
        { status: 400 },
      );
    }

    if (
      competition.visibility === CompetitionVisibility.INTERNAL &&
      user.userType !== "INTERNAL"
    ) {
      return NextResponse.json(
        { error: "This competition is only open to internal users." },
        { status: 403 },
      );
    }

    await prisma.userCompetition.upsert({
      where: {
        userId_competitionId: {
          userId: user.id,
          competitionId,
        },
      },
      update: {},
      create: {
        userId: user.id,
        competitionId,
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to join competition." },
      { status: 500 },
    );
  }
}
