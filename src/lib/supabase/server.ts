import "server-only";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

import { getSupabaseEnv } from "@/lib/supabase/env";

type CreateSupabaseServerClientOptions = {
  writeCookies?: boolean;
};

export async function createSupabaseServerClient(options: CreateSupabaseServerClientOptions = {}) {
  const cookieStore = await cookies();
  const env = getSupabaseEnv();
  const canWriteCookies = options.writeCookies === true;

  if (!env.url || !env.anonKey) {
    return null;
  }

  return createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookieList: Array<{ name: string; value: string; options?: Parameters<typeof cookieStore.set>[2] }>) {
        if (!canWriteCookies) {
          return;
        }

        for (const cookie of cookieList) {
          cookieStore.set(cookie.name, cookie.value, cookie.options);
        }
      },
    },
  });
}

export function createSupabaseAdminClient() {
  const env = getSupabaseEnv();

  if (!env.url || !env.serviceRoleKey) {
    return null;
  }

  return createClient(env.url, env.serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
