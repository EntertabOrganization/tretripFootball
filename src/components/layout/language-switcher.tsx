import { Globe } from "lucide-react";

import { setLocaleAction } from "@/lib/actions";
import type { Locale } from "@/lib/types";

type Props = {
  locale: Locale;
  path: string;
};

export function LanguageSwitcher({ locale, path }: Props) {
  const nextLocale: Locale = locale === "en" ? "ar" : "en";

  return (
    <form action={setLocaleAction}>
      <input type="hidden" name="locale" value={nextLocale} />
      <input type="hidden" name="path" value={path} />
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-white transition hover:border-white hover:bg-white/10"
      >
        <Globe size={16} />
        {locale === "en" ? "العربية" : "EN"}
      </button>
    </form>
  );
}
