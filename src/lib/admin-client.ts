import type { Match } from '@/data/arabMatches';

const ADMIN_SESSION_KEY = 'tretrip-admin-session';
const ADMIN_MATCHES_KEY = 'tretrip-admin-matches';
const PREDICTIONS_KEY = 'tretrip-user-predictions';

export const SUPER_ADMIN = {
  email: 'admin@entertab.com',
  password: 'Admin@1234',
};

export type MatchDraft = Omit<Match, 'id' | 'status' | 'homeFlag' | 'awayFlag'> & {
  homeFlag?: string;
  awayFlag?: string;
};

export type StoredPrediction = {
  matchId: number;
  homeScore: number;
  awayScore: number;
  submittedAt: string;
};

function isBrowser() {
  return typeof window !== 'undefined';
}

export function isSuperAdminCredentials(email: string, password: string) {
  return email.trim().toLowerCase() === SUPER_ADMIN.email && password === SUPER_ADMIN.password;
}

export function setAdminSession() {
  if (!isBrowser()) return;
  window.localStorage.setItem(ADMIN_SESSION_KEY, 'true');
}

export function clearAdminSession() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(ADMIN_SESSION_KEY);
}

export function hasAdminSession() {
  if (!isBrowser()) return false;
  return window.localStorage.getItem(ADMIN_SESSION_KEY) === 'true';
}

export function getAdminMatches() {
  if (!isBrowser()) return [] as Match[];

  const raw = window.localStorage.getItem(ADMIN_MATCHES_KEY);
  if (!raw) return [] as Match[];

  try {
    return JSON.parse(raw) as Match[];
  } catch {
    return [] as Match[];
  }
}

export function saveAdminMatch(matchDraft: MatchDraft) {
  if (!isBrowser()) return [] as Match[];

  const nextMatch: Match = {
    id: Date.now(),
    homeTeam: matchDraft.homeTeam,
    awayTeam: matchDraft.awayTeam,
    homeCode: matchDraft.homeCode,
    awayCode: matchDraft.awayCode,
    homeFlag: matchDraft.homeFlag || '⚽',
    awayFlag: matchDraft.awayFlag || '⚽',
    date: matchDraft.date,
    time: matchDraft.time,
    stadium: matchDraft.stadium,
    city: matchDraft.city,
    group: matchDraft.group,
    status: 'Upcoming',
  };

  const matches = [nextMatch, ...getAdminMatches()];
  window.localStorage.setItem(ADMIN_MATCHES_KEY, JSON.stringify(matches));
  return matches;
}

export function deleteAdminMatch(matchId: number) {
  if (!isBrowser()) return [] as Match[];
  const matches = getAdminMatches().filter((match) => match.id !== matchId);
  window.localStorage.setItem(ADMIN_MATCHES_KEY, JSON.stringify(matches));
  return matches;
}

export function getStoredPredictions() {
  if (!isBrowser()) return [] as StoredPrediction[];

  const raw = window.localStorage.getItem(PREDICTIONS_KEY);
  if (!raw) return [] as StoredPrediction[];

  try {
    return JSON.parse(raw) as StoredPrediction[];
  } catch {
    return [] as StoredPrediction[];
  }
}

export function savePrediction(prediction: StoredPrediction) {
  if (!isBrowser()) return [] as StoredPrediction[];

  const predictions = getStoredPredictions();
  const remaining = predictions.filter((item) => item.matchId !== prediction.matchId);
  const next = [prediction, ...remaining];
  window.localStorage.setItem(PREDICTIONS_KEY, JSON.stringify(next));
  return next;
}
