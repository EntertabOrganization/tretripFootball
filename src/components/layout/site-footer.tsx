import type { Locale } from "@/lib/types";
import { t } from "@/lib/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = t(locale);

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 text-sm text-slate-600 sm:px-6 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <p className="font-display text-2xl text-slate-900">TreTrip FanZone</p>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">{copy.home.body}</p>
        </div>
        <div className="flex items-end justify-start lg:justify-end">
          <p className="text-slate-500">© 2026 TreTrip FanZone. Built for bilingual football communities.</p>
        </div>
      </div>
    </footer>
  );
}
