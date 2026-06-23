import type { Competition, CommentRecord, LeaderboardEntry, NewsArticle, NewsCategory, Profile } from "@/lib/types";

export const mockCategories: NewsCategory[] = [
  {
    id: "cat-sports",
    slug: "sports",
    title_en: "Sports",
    title_ar: "رياضة",
    description_en: "Match reports, club stories, and football culture.",
    description_ar: "تقارير المباريات وقصص الأندية وثقافة كرة القدم.",
  },
  {
    id: "cat-internal",
    slug: "internal",
    title_en: "Internal",
    title_ar: "داخلي",
    description_en: "Internal updates and TreTrip activations.",
    description_ar: "تحديثات داخلية وتفعيلات TreTrip.",
  },
];

export const mockUsers: Profile[] = [
  {
    id: "user-admin",
    first_name: "TreTrip",
    last_name: "Admin",
    email: "Admin@tretrip.com",
    phone_number: "+201000000000",
    role: "ADMIN",
  },
  {
    id: "user-editor",
    first_name: "Sara",
    last_name: "Editor",
    email: "editor@tretrip.com",
    phone_number: "+201000000001",
    role: "EDITOR",
  },
  {
    id: "user-fan",
    first_name: "Omar",
    last_name: "Fan",
    email: "fan@tretrip.com",
    phone_number: "+201000000002",
    role: "USER",
  },
];

export const mockNews: NewsArticle[] = [
  {
    id: "news-1",
    slug: "tretrip-launches-fanzone",
    category_id: "cat-internal",
    author_id: "user-admin",
    title_en: "TreTrip launches FanZone with a bilingual football-first experience",
    title_ar: "TreTrip تطلق FanZone بتجربة ثنائية اللغة تركز على كرة القدم",
    summary_en: "The new platform unifies news, competitions, and community engagement in one editorial product.",
    summary_ar: "المنصة الجديدة توحد الأخبار والمسابقات والتفاعل الجماهيري في منتج تحريري واحد.",
    content_en:
      "TreTrip FanZone is designed to support publishing, fan participation, and leaderboard-driven engagement across Arabic and English audiences.",
    content_ar:
      "تم تصميم TreTrip FanZone لدعم النشر ومشاركة الجماهير والتفاعل المدفوع بلوحات الصدارة عبر جمهور عربي وإنجليزي.",
    cover_image_url:
      "https://images.unsplash.com/photo-1543357480-c60d40007a3f?auto=format&fit=crop&w=1200&q=80",
    status: "PUBLISHED",
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: mockCategories[1],
    author: mockUsers[0],
    likes_count: 14,
    comments_count: 2,
  },
  {
    id: "news-2",
    slug: "summer-competitions-open",
    category_id: "cat-sports",
    author_id: "user-editor",
    title_en: "Summer football competitions are now open for registration",
    title_ar: "تم فتح التسجيل في مسابقات كرة القدم الصيفية الآن",
    summary_en: "Users can now join the latest TreTrip football competitions and compete for top leaderboard spots.",
    summary_ar: "يمكن للمستخدمين الآن الانضمام إلى أحدث مسابقات TreTrip لكرة القدم والمنافسة على صدارة الترتيب.",
    content_en:
      "This season includes multiple community activations designed to increase participation, reward winners, and spotlight editorial coverage.",
    content_ar:
      "يتضمن هذا الموسم عدة تفعيلات مجتمعية تهدف إلى زيادة المشاركة ومكافأة الفائزين وتسليط الضوء على التغطية التحريرية.",
    cover_image_url:
      "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=1200&q=80",
    status: "PUBLISHED",
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: mockCategories[0],
    author: mockUsers[1],
    likes_count: 21,
    comments_count: 1,
  },
];

export const mockCompetitions: Competition[] = [
  {
    id: "competition-1",
    slug: "summer-fan-challenge",
    title_en: "Summer Fan Challenge",
    title_ar: "تحدي المشجعين الصيفي",
    description_en: "A TreTrip summer competition built to reward participation and celebrate football communities.",
    description_ar: "مسابقة صيفية من TreTrip تهدف إلى مكافأة المشاركة والاحتفاء بمجتمعات كرة القدم.",
    cover_image_url:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
    start_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    registrations_count: 48,
    winners_count: 3,
  },
  {
    id: "competition-2",
    slug: "editorial-cup",
    title_en: "Editorial Cup",
    title_ar: "كأس التحرير",
    description_en: "An internal competition spotlighting newsroom participation and creative football coverage.",
    description_ar: "مسابقة داخلية تسلط الضوء على مشاركة غرفة الأخبار والتغطية الإبداعية لكرة القدم.",
    cover_image_url:
      "https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?auto=format&fit=crop&w=1200&q=80",
    start_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    registrations_count: 16,
    winners_count: 1,
  },
];

export const mockComments: CommentRecord[] = [
  {
    id: "comment-1",
    user_id: "user-fan",
    news_id: "news-1",
    comment_text: "This direction looks promising for the football community.",
    is_hidden: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    author: mockUsers[2],
    likes_count: 4,
  },
];

export const mockLeaderboard: LeaderboardEntry[] = [
  { user_id: "user-fan", full_name: "Omar Fan", wins: 2, participations: 5 },
  { user_id: "user-editor", full_name: "Sara Editor", wins: 1, participations: 3 },
  { user_id: "user-admin", full_name: "TreTrip Admin", wins: 1, participations: 2 },
];
