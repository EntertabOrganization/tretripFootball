import { cookies } from "next/headers";

import { DEFAULT_LOCALE, LOCALE_COOKIE } from "@/lib/constants";
import type { Locale } from "@/lib/types";

export { dictionaries, getDirection, localizeText, t } from "@/lib/dictionaries";

export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const locale = store.get(LOCALE_COOKIE)?.value;
  return locale === "ar" ? "ar" : DEFAULT_LOCALE;
}
