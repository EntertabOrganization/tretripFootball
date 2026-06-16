export type Competition = {
  id: string;
  slug: string;
  title: {
    en: string;
    ar: string;
  };
  summary: {
    en: string;
    ar: string;
  };
  prize: {
    en: string;
    ar: string;
  };
  terms: {
    en: string[];
    ar: string[];
  };
  countryFocus: string[];
  opensAt: string;
  closesAt: string;
  status: 'Open' | 'Coming Soon';
};

export type CompetitionRegistrationInput = {
  competitionSlug: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  favoriteNationalTeam: string;
  entryAnswer: string;
};

export type CompetitionRegistrationRecord = CompetitionRegistrationInput & {
  id: string;
  submittedAt: string;
};

export const COMPETITIONS: Competition[] = [
  {
    id: 'arab-fans-challenge',
    slug: 'arab-fans-challenge',
    title: {
      en: 'Arab Fans Challenge',
      ar: 'تحدي الجماهير العربية',
    },
    summary: {
      en: 'A pan-Arab TreTrip competition built around match predictions, tie-break answers, and supporter storytelling.',
      ar: 'مسابقة عربية من TreTrip مبنية على توقعات المباريات وإجابات الحسم وقصص الجماهير.',
    },
    prize: {
      en: 'TreTrip supporter kit, featured fan spotlight, and partner rewards.',
      ar: 'حزمة تشجيعية من TreTrip، وظهور خاص للمشجعين، وجوائز من الشركاء.',
    },
    terms: {
      en: [
        'Open to fans aged 18+ or with guardian approval where required.',
        'Only one valid entry per person will be counted.',
        'TreTrip may contact winners using the submitted email or phone number.',
      ],
      ar: [
        'المسابقة متاحة للمشجعين من عمر 18 سنة فأكثر أو بموافقة ولي الأمر عند الحاجة.',
        'يتم احتساب مشاركة صحيحة واحدة فقط لكل شخص.',
        'يحق لـ TreTrip التواصل مع الفائزين عبر البريد الإلكتروني أو الهاتف المدخل.',
      ],
    },
    countryFocus: ['MAR', 'EGY', 'KSA', 'ALG', 'TUN', 'QAT', 'IRQ', 'JOR'],
    opensAt: '2026-06-16',
    closesAt: '2026-07-20',
    status: 'Open',
  },
  {
    id: 'group-stage-predictor',
    slug: 'group-stage-predictor',
    title: {
      en: 'Group Stage Predictor',
      ar: 'توقعات دور المجموعات',
    },
    summary: {
      en: 'Choose your favorite Arab team and submit your group-stage predictions before kickoff.',
      ar: 'اختر منتخبك العربي المفضل وقدم توقعاتك لدور المجموعات قبل انطلاق المباريات.',
    },
    prize: {
      en: 'VIP recognition on TreTrip channels and exclusive digital fan rewards.',
      ar: 'تكريم عبر قنوات TreTrip ومكافآت رقمية حصرية للجماهير.',
    },
    terms: {
      en: [
        'Entries close before the first relevant group-stage match.',
        'TreTrip reserves the right to validate entries manually.',
      ],
      ar: [
        'تغلق المشاركات قبل أول مباراة مرتبطة بالمنتخب أو المجموعة.',
        'تحتفظ TreTrip بحق مراجعة المشاركات يدوياً قبل اعتمادها.',
      ],
    },
    countryFocus: ['MAR', 'EGY', 'KSA', 'ALG', 'TUN', 'QAT', 'IRQ', 'JOR'],
    opensAt: '2026-06-16',
    closesAt: '2026-06-30',
    status: 'Open',
  },
];
