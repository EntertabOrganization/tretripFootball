import { createClient } from "@supabase/supabase-js";

import { loadLocalEnv } from "./load-env";

loadLocalEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required for auth seeding.");
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL ?? "Admin@tretrip.com";
  const password = process.env.SEED_ADMIN_PASSWORD ?? "Admin@1234";
  const firstName = process.env.SEED_ADMIN_FIRST_NAME ?? "TreTrip";
  const lastName = process.env.SEED_ADMIN_LAST_NAME ?? "Admin";

  const { data: users, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    throw listError;
  }

  const existing = users.users.find((user) => user.email?.toLowerCase() === email.toLowerCase());

  if (existing) {
    console.log(`Auth user already exists for ${email}.`);
    return;
  }

  const { error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      first_name: firstName,
      last_name: lastName,
      role: "ADMIN",
    },
  });

  if (error) {
    throw error;
  }

  console.log(`Auth user created for ${email}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
