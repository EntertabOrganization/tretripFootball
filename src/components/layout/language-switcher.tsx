"use client";

import { Globe } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";

import { setLocaleAction } from "@/lib/actions";
import type { Locale } from "@/lib/types";

type Props = {
  locale: Locale;
  path?: string;
};

export function LanguageSwitcher({ locale, path }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const nextLocale: Locale = locale === "en" ? "ar" : "en";
  const query = searchParams.toString();
  const currentPath = path && path !== "/" ? path : `${pathname}${query ? `?${query}` : ""}`;

  return (
    <form action={setLocaleAction}>
      <input type="hidden" name="locale" value={nextLocale} />
      <input type="hidden" name="path" value={currentPath} />
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-xl border border-white/22 bg-white/8 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/14"
      >
        <Globe size={16} />
        {locale === "en" ? "العربية" : "EN"}
      </button>
    </form>
  );
}
