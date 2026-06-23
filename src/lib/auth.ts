import "server-only";

import { cache } from "react";

import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase/server";
import { mockUsers } from "@/lib/mock-data";
import type { Profile } from "@/lib/types";

function logAuthFallback(message: string, error: unknown) {
  const details =
    error && typeof error === "object" && "message" in error
      ? String((error as { message?: unknown }).message ?? "")
      : "";

  if (process.env.NODE_ENV !== "production") {
    console.warn(`${message}. Falling back to unauthenticated profile state.${details ? ` ${details}` : ""}`);
  }
}

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

  if (!admin) {
    return mockUsers.find((candidate) => candidate.email === user.email) ?? null;
  }

  const { data, error } = await admin.from("profiles").select("*").eq("id", user.id).maybeSingle();

  if (error) {
    logAuthFallback("Failed to fetch current profile", error);
    return null;
  }

  return data;
});
