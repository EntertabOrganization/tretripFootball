"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function GoogleSignInButton({ label }: { label: string }) {
  const [pending, setPending] = useState(false);
  const pathname = usePathname();

  async function handleGoogleSignIn() {
    setPending(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(pathname)}`;
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      className="w-full rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
      disabled={pending}
    >
      {pending ? "Loading..." : label}
    </button>
  );
}
