import "server-only";

import { cache } from "react";

import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase/server";
import { mockUsers } from "@/lib/mock-data";
import type { Profile } from "@/lib/types";

export const getSessionUser = cache(async () => {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ?? null;
});

export const getCurrentProfile = cache(async (): Promise<Profile | null> => {
  const user = await getSessionUser();

  if (!user) {
    return null;
  }

  const admin = createSupabaseAdminClient();
  const fallbackProfile = mockUsers.find((candidate) => candidate.email.toLowerCase() === (user.email ?? "").toLowerCase()) ?? null;

  if (!admin) {
    return fallbackProfile;
  }

  const { data, error } = await admin.from("profiles").select("*").eq("id", user.id).maybeSingle();

  if (error) {
    return fallbackProfile;
  }

  return data ?? fallbackProfile;
});
