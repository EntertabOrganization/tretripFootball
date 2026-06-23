import { createClient } from "@supabase/supabase-js";

import { loadLocalEnv } from "./load-env";

loadLocalEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required for seeding.");
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function upsertCategories() {
  const categories = [
    {
      slug: "sports",
      title_en: "Sports",
      title_ar: "رياضة",
      description_en: "Sports coverage and football editorial content.",
      description_ar: "تغطية رياضية ومحتوى تحريري لكرة القدم.",
    },
    {
      slug: "internal",
      title_en: "Internal",
      title_ar: "داخلي",
      description_en: "Internal news and organizational updates.",
      description_ar: "أخبار داخلية وتحديثات تنظيمية.",
    },
  ];

  const { error } = await supabase.from("news_categories").upsert(categories, {
    onConflict: "slug",
  });

  if (error) {
    throw error;
  }
}

async function upsertAdmin() {
  const email = process.env.SEED_ADMIN_EMAIL ?? "Admin@tretrip.com";
  const password = process.env.SEED_ADMIN_PASSWORD ?? "Admin@1234";
  const firstName = process.env.SEED_ADMIN_FIRST_NAME ?? "TreTrip";
  const lastName = process.env.SEED_ADMIN_LAST_NAME ?? "Admin";
  const phoneNumber = process.env.SEED_ADMIN_PHONE ?? "+201000000000";

  const { data: users, error: listError } = await supabase.auth.admin.listUsers();

  if (listError) {
    throw listError;
  }

  let existing = users.users.find((user) => user.email?.toLowerCase() === email.toLowerCase());

  if (!existing) {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        first_name: firstName,
        last_name: lastName,
      },
    });

    if (error) {
      throw error;
    }

    existing = data.user;
  }

  if (!existing) {
    throw new Error("Unable to create or locate the seeded admin user.");
  }

  const { error: profileError } = await supabase.from("profiles").upsert(
    {
      id: existing.id,
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: phoneNumber,
      role: "ADMIN",
    },
    {
      onConflict: "id",
    },
  );

  if (profileError) {
    throw profileError;
  }

  return existing.id;
}

async function upsertStarterContent(adminUserId: string) {
  const { data: categories, error: categoryError } = await supabase
    .from("news_categories")
    .select("id, slug");

  if (categoryError) {
    throw categoryError;
  }

  const sportsCategoryId = categories.find((category) => category.slug === "sports")?.id;
  const internalCategoryId = categories.find((category) => category.slug === "internal")?.id;

  if (!sportsCategoryId || !internalCategoryId) {
    throw new Error("Seed categories were not found after insertion.");
  }

  const newsRows = [
    {
      slug: "tretrip-launches-fanzone",
      category_id: internalCategoryId,
      author_id: adminUserId,
      title_en: "TreTrip launches FanZone with a bilingual football-first experience",
      title_ar: "TreTrip تطلق FanZone بتجربة ثنائية اللغة تركز على كرة القدم",
      summary_en: "The new platform unifies news, competitions, and community engagement in one editorial product.",
      summary_ar: "المنصة الجديدة توحد الأخبار والمسابقات والتفاعل الجماهيري في منتج تحريري واحد.",
      content_en:
        "<h2>TreTrip FanZone goes live</h2><p>TreTrip FanZone is designed to support publishing, fan participation, and leaderboard-driven engagement across Arabic and English audiences.</p><p>The first release focuses on football storytelling, user competitions, and a professional editorial dashboard.</p>",
      content_ar:
        "<h2>إطلاق منصة TreTrip FanZone</h2><p>تم تصميم TreTrip FanZone لدعم النشر ومشاركة الجماهير والتفاعل المدفوع بلوحات الصدارة عبر جمهور عربي وإنجليزي.</p><p>يركز الإصدار الأول على قصص كرة القدم ومسابقات المستخدمين ولوحة تحكم تحريرية احترافية.</p>",
      cover_image_url:
        "https://images.unsplash.com/photo-1543357480-c60d40007a3f?auto=format&fit=crop&w=1200&q=80",
      status: "PUBLISHED",
      published_at: new Date().toISOString(),
    },
    {
      slug: "summer-competitions-open",
      category_id: sportsCategoryId,
      author_id: adminUserId,
      title_en: "Summer football competitions are now open for registration",
      title_ar: "تم فتح التسجيل في مسابقات كرة القدم الصيفية الآن",
      summary_en: "Users can now join the latest TreTrip football competitions and compete for top leaderboard spots.",
      summary_ar: "يمكن للمستخدمين الآن الانضمام إلى أحدث مسابقات TreTrip لكرة القدم والمنافسة على صدارة الترتيب.",
      content_en:
        "<h2>Join the season</h2><p>This season includes multiple community activations designed to increase participation, reward winners, and spotlight editorial coverage.</p><ul><li>Live competitions</li><li>Winner tracking</li><li>Global leaderboard visibility</li></ul>",
      content_ar:
        "<h2>انضم إلى الموسم</h2><p>يتضمن هذا الموسم عدة تفعيلات مجتمعية تهدف إلى زيادة المشاركة ومكافأة الفائزين وتسليط الضوء على التغطية التحريرية.</p><ul><li>مسابقات مباشرة</li><li>متابعة الفائزين</li><li>إظهار لوحة الصدارة العامة</li></ul>",
      cover_image_url:
        "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=1200&q=80",
      status: "PUBLISHED",
      published_at: new Date().toISOString(),
    },
  ];

  const { data: insertedNews, error: newsError } = await supabase
    .from("news")
    .upsert(newsRows, {
      onConflict: "slug",
    })
    .select("id, slug");

  if (newsError) {
    throw newsError;
  }

  if (!insertedNews || insertedNews.length === 0) {
    throw new Error("News seed did not create or return any rows.");
  }

  const competitionRows = [
    {
      slug: "summer-fan-challenge",
      title_en: "Summer Fan Challenge",
      title_ar: "تحدي المشجعين الصيفي",
      description_en: "A TreTrip summer competition built to reward participation and celebrate football communities.",
      description_ar: "مسابقة صيفية من TreTrip تهدف إلى مكافأة المشاركة والاحتفاء بمجتمعات كرة القدم.",
      cover_image_url:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
      start_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      end_date: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      slug: "editorial-cup",
      title_en: "Editorial Cup",
      title_ar: "كأس التحرير",
      description_en: "An internal competition spotlighting newsroom participation and creative football coverage.",
      description_ar: "مسابقة داخلية تسلط الضوء على مشاركة غرفة الأخبار والتغطية الإبداعية لكرة القدم.",
      cover_image_url:
        "https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?auto=format&fit=crop&w=1200&q=80",
      start_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const { data: insertedCompetitions, error: competitionError } = await supabase
    .from("competitions")
    .upsert(competitionRows, {
      onConflict: "slug",
    })
    .select("id, slug");

  if (competitionError) {
    throw competitionError;
  }

  if (!insertedCompetitions || insertedCompetitions.length === 0) {
    throw new Error("Competition seed did not create or return any rows.");
  }
}

async function main() {
  await upsertCategories();
  const adminUserId = await upsertAdmin();
  await upsertStarterContent(adminUserId);
  console.log("Seed completed successfully.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
