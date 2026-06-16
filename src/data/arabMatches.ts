import {
  ALL_ARAB_TEAM_MATCHES,
  ARAB_TEAMS_DATA,
  getMatchesByTeamCode,
} from '@/data/arabTeams';

export type Match = (typeof ALL_ARAB_TEAM_MATCHES)[number];

export type ArabTeam = {
  id: number;
  name: string;
  nameAr: string;
  code: string;
  flag: string;
  confederation: 'AFC' | 'CAF';
  group: string;
  worldCupAppearances: number;
  manager: string;
  bestResult: string;
};

const TEAM_METADATA: Record<string, { appearances: number; manager: string; bestResult: string }> = {
  MAR: { appearances: 7, manager: 'To be announced', bestResult: '4th Place (2022)' },
  EGY: { appearances: 4, manager: 'To be announced', bestResult: 'Round of 16 (1990)' },
  KSA: { appearances: 7, manager: 'To be announced', bestResult: 'Round of 16 (1994)' },
  ALG: { appearances: 5, manager: 'To be announced', bestResult: 'Round of 16 (2014)' },
  TUN: { appearances: 6, manager: 'To be announced', bestResult: 'Group Stage' },
  QAT: { appearances: 2, manager: 'To be announced', bestResult: 'Group Stage' },
  IRQ: { appearances: 2, manager: 'To be announced', bestResult: 'Group Stage (1986)' },
  JOR: { appearances: 1, manager: 'To be announced', bestResult: 'Group Stage (2026)' },
};

export const ARAB_TEAMS: ArabTeam[] = ARAB_TEAMS_DATA.map((team) => ({
  id: team.id,
  name: team.countryName,
  nameAr: team.countryNameAr,
  code: team.code,
  flag: team.flagEmoji,
  confederation: team.confederation,
  group: team.group,
  worldCupAppearances: TEAM_METADATA[team.code].appearances,
  manager: TEAM_METADATA[team.code].manager,
  bestResult: TEAM_METADATA[team.code].bestResult,
}));

export const ALL_ARAB_MATCHES = ALL_ARAB_TEAM_MATCHES;

export function getNearestMatches(count: number): Match[] {
  return ALL_ARAB_MATCHES.slice(0, count);
}

export function getMatchesByTeam(teamCode: string): Match[] {
  return getMatchesByTeamCode(teamCode);
}
