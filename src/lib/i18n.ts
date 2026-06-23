import { cookies } from "next/headers";

import { DEFAULT_LOCALE, LOCALE_COOKIE } from "@/lib/constants";
import type { Locale, LocalizedText } from "@/lib/types";

export const dictionaries = {
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      competitions: "Competitions",
      news: "News",
      dashboard: "Dashboard",
      profile: "Profile",
      login: "Login",
      signup: "Sign Up",
      logout: "Logout",
    },
    home: {
      eyebrow: "TreTrip FanZone",
      title: "Football news, community competitions, and bilingual fan engagement in one professional platform.",
      body: "TreTrip FanZone brings together editorial publishing, role-based collaboration, and competition management with a polished Arabic and English experience.",
      primary: "Explore News",
      secondary: "View Competitions",
      aboutTitle: "About TreTrip",
      aboutBody:
        "TreTrip FanZone is built for football communities that need a modern publishing workflow, simple competition management, and leaderboard-driven engagement.",
      latestNews: "Latest News",
      liveCompetitions: "Open Competitions",
    },
    common: {
      readMore: "Read more",
      viewAll: "View all",
      save: "Save",
      cancel: "Cancel",
      create: "Create",
      update: "Update",
      actions: "Actions",
      status: "Status",
      published: "Published",
      draft: "Draft",
      hidden: "Hidden",
      visible: "Visible",
      page: "Page",
      noResults: "No results available yet.",
      language: "Language",
      english: "English",
      arabic: "Arabic",
      leaderboard: "Leaderboard",
      globalLeaderboard: "Global Leaderboard",
      competitionLeaderboard: "Competition Leaderboard",
    },
    auth: {
      title: "Access your TreTrip account",
      subtitle: "Sign in with email or Google to read, join, comment, and manage.",
      signupTitle: "Create your fan account",
      email: "Email",
      password: "Password",
      firstName: "First Name",
      lastName: "Last Name",
      phoneNumber: "Phone Number",
      signIn: "Sign In",
      signUp: "Create Account",
      google: "Continue with Google",
    },
    news: {
      title: "News",
      subtitle: "Paginated bilingual football and internal coverage.",
      category: "Category",
      comments: "Comments",
      addComment: "Add Comment",
      commentPlaceholder: "Share your perspective",
      like: "Like",
      unlike: "Unlike",
    },
    competitions: {
      title: "Competitions",
      subtitle: "Join competitions, follow registrations, and track winners.",
      join: "Join competition",
      joined: "Registered",
      startDate: "Start Date",
      endDate: "End Date",
      winners: "Winners",
      participants: "Participants",
    },
    dashboard: {
      title: "Dashboard",
      subtitle: "Role-based workspace for editorial and platform operations.",
      overview: "Overview",
      users: "Users",
      categories: "Categories",
      comments: "Comments",
      competitions: "Competitions",
      articles: "News",
      stats: "Platform Statistics",
      totalUsers: "Total Users",
      totalArticles: "Published Articles",
      totalCompetitions: "Competitions",
      totalComments: "Comments",
    },
    profile: {
      title: "Your Profile",
      subtitle: "Account details, registrations, and recent activity.",
      registrations: "Competition Registrations",
      recentComments: "Recent Comments",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      competitions: "المسابقات",
      news: "الأخبار",
      dashboard: "لوحة التحكم",
      profile: "الملف الشخصي",
      login: "تسجيل الدخول",
      signup: "إنشاء حساب",
      logout: "تسجيل الخروج",
    },
    home: {
      eyebrow: "TreTrip FanZone",
      title: "منصة احترافية تجمع أخبار كرة القدم والمسابقات والتفاعل الجماهيري بلغتين.",
      body: "تجمع TreTrip FanZone بين النشر التحريري والتعاون حسب الصلاحيات وإدارة المسابقات ضمن تجربة عربية وإنجليزية متقنة.",
      primary: "استكشف الأخبار",
      secondary: "عرض المسابقات",
      aboutTitle: "عن TreTrip",
      aboutBody:
        "تم تصميم TreTrip FanZone لمجتمعات كرة القدم التي تحتاج إلى منصة نشر حديثة وإدارة مسابقات بسيطة وتفاعل قائم على لوحات الصدارة.",
      latestNews: "أحدث الأخبار",
      liveCompetitions: "المسابقات المفتوحة",
    },
    common: {
      readMore: "اقرأ المزيد",
      viewAll: "عرض الكل",
      save: "حفظ",
      cancel: "إلغاء",
      create: "إنشاء",
      update: "تحديث",
      actions: "الإجراءات",
      status: "الحالة",
      published: "منشور",
      draft: "مسودة",
      hidden: "مخفي",
      visible: "ظاهر",
      page: "الصفحة",
      noResults: "لا توجد نتائج حتى الآن.",
      language: "اللغة",
      english: "English",
      arabic: "العربية",
      leaderboard: "لوحة الصدارة",
      globalLeaderboard: "لوحة الصدارة العامة",
      competitionLeaderboard: "لوحة صدارة المسابقة",
    },
    auth: {
      title: "الدخول إلى حساب TreTrip",
      subtitle: "سجل بالبريد أو Google للقراءة والانضمام والتعليق والإدارة.",
      signupTitle: "أنشئ حسابك الجماهيري",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      firstName: "الاسم الأول",
      lastName: "اسم العائلة",
      phoneNumber: "رقم الهاتف",
      signIn: "تسجيل الدخول",
      signUp: "إنشاء الحساب",
      google: "المتابعة باستخدام Google",
    },
    news: {
      title: "الأخبار",
      subtitle: "تغطية ثنائية اللغة لكرة القدم والأخبار الداخلية مع صفحات متعددة.",
      category: "الفئة",
      comments: "التعليقات",
      addComment: "إضافة تعليق",
      commentPlaceholder: "شارك رأيك",
      like: "إعجاب",
      unlike: "إلغاء الإعجاب",
    },
    competitions: {
      title: "المسابقات",
      subtitle: "انضم إلى المسابقات وتابع المشاركات والفائزين.",
      join: "انضم إلى المسابقة",
      joined: "تم التسجيل",
      startDate: "تاريخ البداية",
      endDate: "تاريخ النهاية",
      winners: "الفائزون",
      participants: "المشاركون",
    },
    dashboard: {
      title: "لوحة التحكم",
      subtitle: "مساحة عمل حسب الصلاحيات للإدارة والتحرير والتشغيل.",
      overview: "نظرة عامة",
      users: "المستخدمون",
      categories: "الفئات",
      comments: "التعليقات",
      competitions: "المسابقات",
      articles: "الأخبار",
      stats: "إحصاءات المنصة",
      totalUsers: "إجمالي المستخدمين",
      totalArticles: "المقالات المنشورة",
      totalCompetitions: "المسابقات",
      totalComments: "التعليقات",
    },
    profile: {
      title: "ملفك الشخصي",
      subtitle: "بيانات الحساب والتسجيلات والنشاط الأخير.",
      registrations: "تسجيلات المسابقات",
      recentComments: "أحدث التعليقات",
    },
  },
} as const;

export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const locale = store.get(LOCALE_COOKIE)?.value;
  return locale === "ar" ? "ar" : DEFAULT_LOCALE;
}

export function t(locale: Locale) {
  return dictionaries[locale];
}

export function localizeText(locale: Locale, value: LocalizedText) {
  return locale === "ar" ? value.ar : value.en;
}

export function getDirection(locale: Locale) {
  return locale === "ar" ? "rtl" : "ltr";
}
