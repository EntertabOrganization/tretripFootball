import { NextResponse } from 'next/server';
import { createCompetitionRegistration, getCompetitionBySlug } from '@/lib/competition-store';
import type { CompetitionRegistrationInput } from '@/data/competitions';

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Partial<CompetitionRegistrationInput>;

    if (
      !payload.competitionSlug?.trim() ||
      !payload.fullName?.trim() ||
      !payload.email?.trim() ||
      !payload.phone?.trim() ||
      !payload.country?.trim() ||
      !payload.favoriteNationalTeam?.trim() ||
      !payload.entryAnswer?.trim()
    ) {
      return NextResponse.json({ error: 'Missing required competition fields.' }, { status: 400 });
    }

    const competition = getCompetitionBySlug(payload.competitionSlug);
    if (!competition) {
      return NextResponse.json({ error: 'Competition not found.' }, { status: 404 });
    }

    const result = createCompetitionRegistration({
      competitionSlug: payload.competitionSlug.trim(),
      fullName: payload.fullName.trim(),
      email: payload.email.trim().toLowerCase(),
      phone: payload.phone.trim(),
      country: payload.country.trim(),
      favoriteNationalTeam: payload.favoriteNationalTeam.trim(),
      entryAnswer: payload.entryAnswer.trim(),
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 409 });
    }

    return NextResponse.json({
      success: true,
      message: 'Competition registration submitted successfully.',
      record: result.record,
    });
  } catch {
    return NextResponse.json({ error: 'Unable to submit competition registration.' }, { status: 500 });
  }
}
