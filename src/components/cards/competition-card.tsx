import Link from "next/link";

import { localizeText } from "@/lib/i18n";
import type { Competition, Locale } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function CompetitionCard({ competition, locale }: { competition: Competition; locale: Locale }) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm shadow-slate-200/60">
      <div
        className="h-52 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(8,47,73,0.25), rgba(15,23,42,0.65)), url(${competition.cover_image_url ?? ""})`,
        }}
      />
      <div className="space-y-4 p-6">
        <h3 className="font-display text-2xl text-slate-950">
          {localizeText(locale, { en: competition.title_en, ar: competition.title_ar })}
        </h3>
        <p className="leading-7 text-slate-600">
          {localizeText(locale, { en: competition.description_en, ar: competition.description_ar })}
        </p>
        <div className="grid grid-cols-2 gap-3 text-sm text-slate-500">
          <div>
            <p className="font-semibold text-slate-700">{locale === "ar" ? "البداية" : "Start"}</p>
            <p>{formatDate(competition.start_date, locale)}</p>
          </div>
          <div>
            <p className="font-semibold text-slate-700">{locale === "ar" ? "النهاية" : "End"}</p>
            <p>{formatDate(competition.end_date, locale)}</p>
          </div>
        </div>
        <Link href={`/competitions/${competition.slug}`} className="inline-flex text-sm font-semibold text-[var(--color-primary)]">
          {locale === "ar" ? "عرض التفاصيل" : "View details"}
        </Link>
      </div>
    </article>
  );
}
