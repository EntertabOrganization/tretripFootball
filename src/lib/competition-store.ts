import { COMPETITIONS, type CompetitionRegistrationInput, type CompetitionRegistrationRecord } from '@/data/competitions';

const registrationStore = new Map<string, CompetitionRegistrationRecord>();

function getDuplicateKey(input: CompetitionRegistrationInput) {
  return `${input.competitionSlug}:${input.email.trim().toLowerCase()}:${input.phone.trim()}`;
}

export function getCompetitionBySlug(slug: string) {
  return COMPETITIONS.find((competition) => competition.slug === slug);
}

export function listCompetitions() {
  return COMPETITIONS;
}

export function createCompetitionRegistration(input: CompetitionRegistrationInput) {
  const duplicateKey = getDuplicateKey(input);

  if (registrationStore.has(duplicateKey)) {
    return {
      ok: false as const,
      error: 'A registration with this email or phone already exists for this competition.',
    };
  }

  const record: CompetitionRegistrationRecord = {
    ...input,
    id: `entry-${Date.now()}`,
    submittedAt: new Date().toISOString(),
  };

  registrationStore.set(duplicateKey, record);

  return {
    ok: true as const,
    record,
  };
}
