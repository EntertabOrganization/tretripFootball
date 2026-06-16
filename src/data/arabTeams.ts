export type MatchStatus = 'Upcoming' | 'Live' | 'Finished';

export type TeamMatch = {
  id: number;
  group: string;
  homeTeam: string;
  awayTeam: string;
  homeCode: string;
  awayCode: string;
  homeFlag: string;
  awayFlag: string;
  date: string;
  time: string;
  stadium: string;
  city: string;
  status: MatchStatus;
};

export type ArabTeamProfile = {
  id: number;
  code: string;
  countryCode: string;
  countryName: string;
  countryNameAr: string;
  nickname: string;
  nicknameAr: string;
  confederation: 'AFC' | 'CAF';
  flagEmoji: string;
  flagImage: string;
  group: string;
  groupOpponents: string[];
  groupOpponentsAr: string[];
  shortDescription: string;
  shortDescriptionAr: string;
  keyPlayers: string[];
  keyPlayersAr: string[];
  officialColors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  fanContent: {
    en: string;
    ar: string;
  };
  competitionBlurb: {
    en: string;
    ar: string;
  };
  matchSchedule: TeamMatch[];
};

type CompetitionCopy = {
  en: {
    title: string;
    summary: string;
    prize: string;
    terms: string[];
    questionLabel: string;
    questionPlaceholder: string;
    successMessage: string;
  };
  ar: {
    title: string;
    summary: string;
    prize: string;
    terms: string[];
    questionLabel: string;
    questionPlaceholder: string;
    successMessage: string;
  };
};

export const NON_ARAB_TEAM_NAMES: Record<string, { en: string; ar: string; flag: string }> = {
  ARG: { en: 'Argentina', ar: 'الأرجنتين', flag: '🇦🇷' },
  AUT: { en: 'Austria', ar: 'النمسا', flag: '🇦🇹' },
  BEL: { en: 'Belgium', ar: 'بلجيكا', flag: '🇧🇪' },
  BIH: { en: 'Bosnia and Herzegovina', ar: 'البوسنة والهرسك', flag: '🇧🇦' },
  BRA: { en: 'Brazil', ar: 'البرازيل', flag: '🇧🇷' },
  CAN: { en: 'Canada', ar: 'كندا', flag: '🇨🇦' },
  CPV: { en: 'Cape Verde', ar: 'الرأس الأخضر', flag: '🇨🇻' },
  FRA: { en: 'France', ar: 'فرنسا', flag: '🇫🇷' },
  HAI: { en: 'Haiti', ar: 'هايتي', flag: '🇭🇹' },
  IRN: { en: 'Iran', ar: 'إيران', flag: '🇮🇷' },
  JPN: { en: 'Japan', ar: 'اليابان', flag: '🇯🇵' },
  NED: { en: 'Netherlands', ar: 'هولندا', flag: '🇳🇱' },
  NOR: { en: 'Norway', ar: 'النرويج', flag: '🇳🇴' },
  NZL: { en: 'New Zealand', ar: 'نيوزيلندا', flag: '🇳🇿' },
  SCO: { en: 'Scotland', ar: 'اسكتلندا', flag: '🏴' },
  SEN: { en: 'Senegal', ar: 'السنغال', flag: '🇸🇳' },
  ESP: { en: 'Spain', ar: 'إسبانيا', flag: '🇪🇸' },
  SWE: { en: 'Sweden', ar: 'السويد', flag: '🇸🇪' },
  SUI: { en: 'Switzerland', ar: 'سويسرا', flag: '🇨🇭' },
  URU: { en: 'Uruguay', ar: 'أوروغواي', flag: '🇺🇾' },
};

const ARAB_TEAM_META: Record<string, { name: string; nameAr: string; flag: string }> = {
  MAR: { name: 'Morocco', nameAr: 'المغرب', flag: '🇲🇦' },
  EGY: { name: 'Egypt', nameAr: 'مصر', flag: '🇪🇬' },
  KSA: { name: 'Saudi Arabia', nameAr: 'السعودية', flag: '🇸🇦' },
  ALG: { name: 'Algeria', nameAr: 'الجزائر', flag: '🇩🇿' },
  TUN: { name: 'Tunisia', nameAr: 'تونس', flag: '🇹🇳' },
  QAT: { name: 'Qatar', nameAr: 'قطر', flag: '🇶🇦' },
  IRQ: { name: 'Iraq', nameAr: 'العراق', flag: '🇮🇶' },
  JOR: { name: 'Jordan', nameAr: 'الأردن', flag: '🇯🇴' },
};

type MatchTeamMeta = { name: string; nameAr: string; flag: string } | { en: string; ar: string; flag: string };

function getMatchTeamName(team: MatchTeamMeta) {
  return 'name' in team ? team.name : team.en;
}

function createMatch(
  id: number,
  group: string,
  homeCode: string,
  awayCode: string,
  date: string,
  city: string
): TeamMatch {
  const home: MatchTeamMeta = ARAB_TEAM_META[homeCode] ?? NON_ARAB_TEAM_NAMES[homeCode];
  const away: MatchTeamMeta = ARAB_TEAM_META[awayCode] ?? NON_ARAB_TEAM_NAMES[awayCode];

  return {
    id,
    group,
    homeTeam: getMatchTeamName(home),
    awayTeam: getMatchTeamName(away),
    homeCode,
    awayCode,
    homeFlag: home.flag,
    awayFlag: away.flag,
    date,
    time: 'TBD',
    stadium: 'Host stadium TBD',
    city,
    status: 'Upcoming',
  };
}

export const ARAB_TEAMS_DATA: ArabTeamProfile[] = [
  {
    id: 1,
    code: 'MAR',
    countryCode: 'MA',
    countryName: 'Morocco',
    countryNameAr: 'المغرب',
    nickname: 'Atlas Lions',
    nicknameAr: 'أسود الأطلس',
    confederation: 'CAF',
    flagEmoji: '🇲🇦',
    flagImage: '/flags/morocco.svg',
    group: 'C',
    groupOpponents: ['Brazil', 'Haiti', 'Scotland'],
    groupOpponentsAr: ['البرازيل', 'هايتي', 'اسكتلندا'],
    shortDescription: 'Morocco arrive with technical quality, fearless pressing, and the confidence of a nation expecting another deep tournament run.',
    shortDescriptionAr: 'يدخل المغرب البطولة بجودة فنية عالية، وضغط جريء، وثقة جماهير تنتظر مشواراً كبيراً جديداً.',
    keyPlayers: ['Key players to be announced'],
    keyPlayersAr: ['سيتم إعلان أبرز اللاعبين لاحقاً'],
    officialColors: { primary: '#C1272D', secondary: '#0C7A43', accent: '#F4E7C1' },
    fanContent: {
      en: 'Fan zone focus: chants, tifo inspiration, and travel tips for Atlas Lions supporters.',
      ar: 'محتوى الجماهير: أهازيج، وأفكار للتيفو، ونصائح سفر لمساندي أسود الأطلس.',
    },
    competitionBlurb: {
      en: 'Predict Morocco’s group-stage finish and compete for travel and merch prizes.',
      ar: 'توقع ترتيب المغرب في المجموعة ونافس على جوائز سفر ومنتجات تشجيعية.',
    },
    matchSchedule: [
      createMatch(1, 'C', 'BRA', 'MAR', 'Matchday 1', 'North America'),
      createMatch(2, 'C', 'SCO', 'MAR', 'Matchday 2', 'North America'),
      createMatch(3, 'C', 'MAR', 'HAI', 'Matchday 3', 'North America'),
    ],
  },
  {
    id: 2,
    code: 'EGY',
    countryCode: 'EG',
    countryName: 'Egypt',
    countryNameAr: 'مصر',
    nickname: 'The Pharaohs',
    nicknameAr: 'الفراعنة',
    confederation: 'CAF',
    flagEmoji: '🇪🇬',
    flagImage: '/flags/egypt.svg',
    group: 'G',
    groupOpponents: ['Belgium', 'New Zealand', 'Iran'],
    groupOpponentsAr: ['بلجيكا', 'نيوزيلندا', 'إيران'],
    shortDescription: 'Egypt blend tournament experience with star power and a disciplined defensive identity built for tight group-stage matches.',
    shortDescriptionAr: 'تمزج مصر بين خبرة البطولات والنجومية والانضباط الدفاعي المناسب لمباريات المجموعات الصعبة.',
    keyPlayers: ['Key players to be announced'],
    keyPlayersAr: ['سيتم إعلان أبرز اللاعبين لاحقاً'],
    officialColors: { primary: '#D42027', secondary: '#111111', accent: '#FFFFFF' },
    fanContent: {
      en: 'Fan zone focus: match-day rituals, community watch parties, and Pharaohs playlist picks.',
      ar: 'محتوى الجماهير: طقوس يوم المباراة، ومشاهدة جماعية، وقائمة أغاني خاصة بالفراعنة.',
    },
    competitionBlurb: {
      en: 'Send your Egypt score predictions for a chance to win premium fan kits.',
      ar: 'أرسل توقعاتك لنتائج مصر للدخول في سحب على أطقم جماهيرية مميزة.',
    },
    matchSchedule: [
      createMatch(4, 'G', 'BEL', 'EGY', 'Matchday 1', 'North America'),
      createMatch(5, 'G', 'NZL', 'EGY', 'Matchday 2', 'North America'),
      createMatch(6, 'G', 'EGY', 'IRN', 'Matchday 3', 'North America'),
    ],
  },
  {
    id: 3,
    code: 'KSA',
    countryCode: 'SA',
    countryName: 'Saudi Arabia',
    countryNameAr: 'السعودية',
    nickname: 'The Green Falcons',
    nicknameAr: 'الصقور الخضر',
    confederation: 'AFC',
    flagEmoji: '🇸🇦',
    flagImage: '/flags/saudi-arabia.svg',
    group: 'H',
    groupOpponents: ['Uruguay', 'Spain', 'Cape Verde'],
    groupOpponentsAr: ['أوروغواي', 'إسبانيا', 'الرأس الأخضر'],
    shortDescription: 'Saudi Arabia carry pace in transition, aggressive midfield work, and the belief to unsettle traditional powers.',
    shortDescriptionAr: 'تحضر السعودية بسرعة التحول، وجهد كبير في الوسط، وثقة قادرة على إزعاج الكبار.',
    keyPlayers: ['Key players to be announced'],
    keyPlayersAr: ['سيتم إعلان أبرز اللاعبين لاحقاً'],
    officialColors: { primary: '#006C35', secondary: '#FFFFFF', accent: '#D7F8FC' },
    fanContent: {
      en: 'Fan zone focus: away-day guides, supporter packs, and Green Falcons challenge videos.',
      ar: 'محتوى الجماهير: دليل السفر، وحزم التشجيع، وفيديوهات تحدي الصقور الخضر.',
    },
    competitionBlurb: {
      en: 'Join the Saudi supporters challenge with score predictions and answer-based entries.',
      ar: 'انضم إلى تحدي جماهير السعودية عبر توقع النتائج والمشاركات التفاعلية.',
    },
    matchSchedule: [
      createMatch(7, 'H', 'KSA', 'URU', 'Matchday 1', 'North America'),
      createMatch(8, 'H', 'ESP', 'KSA', 'Matchday 2', 'North America'),
      createMatch(9, 'H', 'CPV', 'KSA', 'Matchday 3', 'North America'),
    ],
  },
  {
    id: 4,
    code: 'ALG',
    countryCode: 'DZ',
    countryName: 'Algeria',
    countryNameAr: 'الجزائر',
    nickname: 'Desert Warriors',
    nicknameAr: 'محاربو الصحراء',
    confederation: 'CAF',
    flagEmoji: '🇩🇿',
    flagImage: '/flags/algeria.svg',
    group: 'J',
    groupOpponents: ['Argentina', 'Jordan', 'Austria'],
    groupOpponentsAr: ['الأرجنتين', 'الأردن', 'النمسا'],
    shortDescription: 'Algeria bring sharp attacking transitions and a confident, front-foot style built for dramatic group battles.',
    shortDescriptionAr: 'تدخل الجزائر بأسلوب هجومي مباشر وتحولات سريعة وشخصية واثقة تناسب مواجهات المجموعة القوية.',
    keyPlayers: ['Key players to be announced'],
    keyPlayersAr: ['سيتم إعلان أبرز اللاعبين لاحقاً'],
    officialColors: { primary: '#006233', secondary: '#FFFFFF', accent: '#D21034' },
    fanContent: {
      en: 'Fan zone focus: supporter stories, travel checklists, and Desert Warriors match reactions.',
      ar: 'محتوى الجماهير: قصص المشجعين، وقوائم السفر، وردود فعل محاربو الصحراء.',
    },
    competitionBlurb: {
      en: 'Compete with Algeria fans by predicting goal scorers and final group standings.',
      ar: 'نافس جماهير الجزائر عبر توقع الهدافين وترتيب المجموعة النهائي.',
    },
    matchSchedule: [
      createMatch(10, 'J', 'ARG', 'ALG', 'Matchday 1', 'North America'),
      createMatch(11, 'J', 'JOR', 'ALG', 'Matchday 2', 'North America'),
      createMatch(12, 'J', 'ALG', 'AUT', 'Matchday 3', 'North America'),
    ],
  },
  {
    id: 5,
    code: 'TUN',
    countryCode: 'TN',
    countryName: 'Tunisia',
    countryNameAr: 'تونس',
    nickname: 'Eagles of Carthage',
    nicknameAr: 'نسور قرطاج',
    confederation: 'CAF',
    flagEmoji: '🇹🇳',
    flagImage: '/flags/tunisia.svg',
    group: 'F',
    groupOpponents: ['Sweden', 'Japan', 'Netherlands'],
    groupOpponentsAr: ['السويد', 'اليابان', 'هولندا'],
    shortDescription: 'Tunisia rely on structure, compact lines, and fearless counter-attacks to compete in a demanding group.',
    shortDescriptionAr: 'تعتمد تونس على التنظيم والتمركز الجيد والهجمات المرتدة الجريئة للمنافسة في مجموعة صعبة.',
    keyPlayers: ['Key players to be announced'],
    keyPlayersAr: ['سيتم إعلان أبرز اللاعبين لاحقاً'],
    officialColors: { primary: '#E70013', secondary: '#FFFFFF', accent: '#C9D7E3' },
    fanContent: {
      en: 'Fan zone focus: car caravan ideas, pre-match checklists, and Eagles of Carthage reactions.',
      ar: 'محتوى الجماهير: أفكار مواكب المشجعين، واستعدادات ما قبل المباراة، وردود فعل نسور قرطاج.',
    },
    competitionBlurb: {
      en: 'Submit your Tunisia predictions for exclusive supporter rewards.',
      ar: 'شارك بتوقعاتك لمنتخب تونس للدخول في جوائز جماهيرية حصرية.',
    },
    matchSchedule: [
      createMatch(13, 'F', 'SWE', 'TUN', 'Matchday 1', 'North America'),
      createMatch(14, 'F', 'TUN', 'JPN', 'Matchday 2', 'North America'),
      createMatch(15, 'F', 'TUN', 'NED', 'Matchday 3', 'North America'),
    ],
  },
  {
    id: 6,
    code: 'QAT',
    countryCode: 'QA',
    countryName: 'Qatar',
    countryNameAr: 'قطر',
    nickname: 'The Maroons',
    nicknameAr: 'العنابي',
    confederation: 'AFC',
    flagEmoji: '🇶🇦',
    flagImage: '/flags/qatar.svg',
    group: 'B',
    groupOpponents: ['Switzerland', 'Canada', 'Bosnia and Herzegovina'],
    groupOpponentsAr: ['سويسرا', 'كندا', 'البوسنة والهرسك'],
    shortDescription: 'Qatar combine possession phases with patient buildup and the confidence that comes from recent tournament experience.',
    shortDescriptionAr: 'يمتلك قطر بناءً هادئاً واستحواذاً منظماً وثقة ناتجة عن خبرة بطولات حديثة.',
    keyPlayers: ['Key players to be announced'],
    keyPlayersAr: ['سيتم إعلان أبرز اللاعبين لاحقاً'],
    officialColors: { primary: '#6D1830', secondary: '#FFFFFF', accent: '#C8A2B8' },
    fanContent: {
      en: 'Fan zone focus: maroon match-day looks, fan cam prompts, and travel-ready playlists.',
      ar: 'محتوى الجماهير: إطلالات يوم المباراة، وأفكار فيديوهات الجماهير، وقوائم تشغيل للسفر.',
    },
    competitionBlurb: {
      en: 'Predict Qatar’s results and enter prize draws tailored for Al Annabi supporters.',
      ar: 'توقع نتائج قطر وادخل في سحوبات جوائز مخصصة لجماهير العنابي.',
    },
    matchSchedule: [
      createMatch(16, 'B', 'QAT', 'SUI', 'Matchday 1', 'North America'),
      createMatch(17, 'B', 'CAN', 'QAT', 'Matchday 2', 'North America'),
      createMatch(18, 'B', 'BIH', 'QAT', 'Matchday 3', 'North America'),
    ],
  },
  {
    id: 7,
    code: 'IRQ',
    countryCode: 'IQ',
    countryName: 'Iraq',
    countryNameAr: 'العراق',
    nickname: 'Lions of Mesopotamia',
    nicknameAr: 'أسود الرافدين',
    confederation: 'AFC',
    flagEmoji: '🇮🇶',
    flagImage: '/flags/iraq.svg',
    group: 'I',
    groupOpponents: ['Norway', 'France', 'Senegal'],
    groupOpponentsAr: ['النرويج', 'فرنسا', 'السنغال'],
    shortDescription: 'Iraq bring intensity, edge, and a resilient collective spirit that makes every match emotionally charged.',
    shortDescriptionAr: 'يحضر العراق بقوة وحماس وروح جماعية صلبة تجعل كل مباراة مشحونة بالعاطفة والقتال.',
    keyPlayers: ['Key players to be announced'],
    keyPlayersAr: ['سيتم إعلان أبرز اللاعبين لاحقاً'],
    officialColors: { primary: '#0F7B3A', secondary: '#FFFFFF', accent: '#D32027' },
    fanContent: {
      en: 'Fan zone focus: terrace chants, supporter spotlights, and Lions of Mesopotamia travel plans.',
      ar: 'محتوى الجماهير: هتافات المدرجات، وتسليط الضوء على المشجعين، وخطط سفر أسود الرافدين.',
    },
    competitionBlurb: {
      en: 'Take part in Iraq-themed prediction contests and supporter answer challenges.',
      ar: 'شارك في مسابقات توقعات العراق وتحديات الأسئلة الخاصة بالجماهير.',
    },
    matchSchedule: [
      createMatch(19, 'I', 'IRQ', 'NOR', 'Matchday 1', 'North America'),
      createMatch(20, 'I', 'FRA', 'IRQ', 'Matchday 2', 'North America'),
      createMatch(21, 'I', 'SEN', 'IRQ', 'Matchday 3', 'North America'),
    ],
  },
  {
    id: 8,
    code: 'JOR',
    countryCode: 'JO',
    countryName: 'Jordan',
    countryNameAr: 'الأردن',
    nickname: 'The Chivalrous',
    nicknameAr: 'النشامى',
    confederation: 'AFC',
    flagEmoji: '🇯🇴',
    flagImage: '/flags/jordan.svg',
    group: 'J',
    groupOpponents: ['Austria', 'Algeria', 'Argentina'],
    groupOpponentsAr: ['النمسا', 'الجزائر', 'الأرجنتين'],
    shortDescription: 'Jordan arrive with bravery, togetherness, and a rising belief after memorable recent performances.',
    shortDescriptionAr: 'يدخل الأردن البطولة بشجاعة وروح جماعية وإيمان متصاعد بعد عروض قارية لافتة.',
    keyPlayers: ['Key players to be announced'],
    keyPlayersAr: ['سيتم إعلان أبرز اللاعبين لاحقاً'],
    officialColors: { primary: '#111111', secondary: '#FFFFFF', accent: '#1D8A42' },
    fanContent: {
      en: 'Fan zone focus: Al Nashama travel diaries, fan portraits, and chant suggestions.',
      ar: 'محتوى الجماهير: يوميات سفر النشامى، وصور المشجعين، واقتراحات الأهازيج.',
    },
    competitionBlurb: {
      en: 'Join Jordan’s contest stream with prediction answers and supporter registration.',
      ar: 'انضم إلى مسار مسابقات الأردن عبر التوقعات وتسجيل المشاركين.',
    },
    matchSchedule: [
      createMatch(22, 'J', 'AUT', 'JOR', 'Matchday 1', 'North America'),
      createMatch(23, 'J', 'JOR', 'ALG', 'Matchday 2', 'North America'),
      createMatch(24, 'J', 'JOR', 'ARG', 'Matchday 3', 'North America'),
    ],
  },
];

export const ARAB_TEAM_LOOKUP = Object.fromEntries(
  ARAB_TEAMS_DATA.map((team) => [team.code, team])
) as Record<string, ArabTeamProfile>;

export const ALL_ARAB_TEAM_MATCHES = ARAB_TEAMS_DATA.flatMap((team) => team.matchSchedule);

export function getTeamByCode(code: string) {
  return ARAB_TEAM_LOOKUP[code] ?? ARAB_TEAMS_DATA[0];
}

export function getMatchesByTeamCode(code: string) {
  return getTeamByCode(code).matchSchedule;
}

export function getLocalizedTeamName(teamCode: string, locale: 'en' | 'ar') {
  const arabTeam = ARAB_TEAM_LOOKUP[teamCode];
  if (arabTeam) {
    return locale === 'ar' ? arabTeam.countryNameAr : arabTeam.countryName;
  }

  const nonArab = NON_ARAB_TEAM_NAMES[teamCode];
  return locale === 'ar' ? nonArab?.ar ?? teamCode : nonArab?.en ?? teamCode;
}

export function getCompetitionCopy(teamCode: string, locale: 'en' | 'ar') {
  const team = getTeamByCode(teamCode);
  return locale === 'ar' ? team.competitionBlurb.ar : team.competitionBlurb.en;
}

export function getTeamDisplayDescription(teamCode: string, locale: 'en' | 'ar') {
  const team = getTeamByCode(teamCode);
  return locale === 'ar' ? team.shortDescriptionAr : team.shortDescription;
}

export function getFanZoneText(teamCode: string, locale: 'en' | 'ar') {
  const team = getTeamByCode(teamCode);
  return locale === 'ar' ? team.fanContent.ar : team.fanContent.en;
}

export const DEFAULT_COMPETITION_COPY: CompetitionCopy = {
  en: {
    title: 'TreTrip Arab Fans Challenge',
    summary: 'Predict, answer, and take part in official TreTrip football campaigns built for Arab fans heading into World Cup 2026.',
    prize: 'Official fan packs, partner gifts, and VIP campaign recognition.',
    terms: [
      'One entry per competition per participant.',
      'Participants must provide valid contact details.',
      'Duplicate submissions by email or phone are rejected.',
      'TreTrip may verify eligibility before confirming any winner.',
    ],
    questionLabel: 'Prediction or entry',
    questionPlaceholder: 'Write your prediction, tie-break answer, or campaign entry here.',
    successMessage: 'Your entry has been received successfully.',
  },
  ar: {
    title: 'تحدي TreTrip للجماهير العربية',
    summary: 'شارك في التوقعات والإجابات والحملات التفاعلية الرسمية من TreTrip الخاصة بجماهير كأس العالم 2026.',
    prize: 'حزم جماهيرية رسمية، وهدايا من الشركاء، وتكريم خاص ضمن الحملة.',
    terms: [
      'مشاركة واحدة فقط لكل متسابق في كل مسابقة.',
      'يجب إدخال بيانات تواصل صحيحة.',
      'يتم رفض المشاركات المكررة عبر البريد الإلكتروني أو رقم الهاتف.',
      'يحق لـ TreTrip التحقق من أهلية الفائزين قبل التأكيد النهائي.',
    ],
    questionLabel: 'التوقع أو المشاركة',
    questionPlaceholder: 'اكتب توقعك أو إجابتك أو مشاركتك هنا.',
    successMessage: 'تم استلام مشاركتك بنجاح.',
  },
};
