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
}

async function main() {
  await upsertCategories();
  await upsertAdmin();
  console.log("Seed completed successfully.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
