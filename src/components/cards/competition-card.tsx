import Link from "next/link";

import { localizeText } from "@/lib/i18n";
import type { Competition, Locale } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function CompetitionCard({ competition, locale }: { competition: Competition; locale: Locale }) {
  return (
    <article className="public-card group overflow-hidden rounded-[28px]">
      <div
        className="h-64 bg-cover bg-center transition duration-500 group-hover:scale-[1.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 102, 114, 0.32), rgba(15, 23, 42, 0.56)), url(${competition.cover_image_url ?? ""})`,
        }}
      />
      <div className="space-y-5 p-6">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
          <span>{locale === "ar" ? "مسابقة مفتوحة" : "Active Competition"}</span>
        </div>
        <div>
          <h3 className="public-heading text-[1.7rem] font-bold text-[var(--color-text)]">
            {localizeText(locale, { en: competition.title_en, ar: competition.title_ar })}
          </h3>
          <p className="mt-3 line-clamp-3 leading-7 text-[var(--color-text-muted)]">
            {localizeText(locale, { en: competition.description_en, ar: competition.description_ar })}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 rounded-2xl bg-[var(--color-surface-muted)] p-4 text-sm">
          <div>
            <p className="font-semibold text-[var(--color-text)]">{locale === "ar" ? "البداية" : "Start"}</p>
            <p className="mt-1 text-[var(--color-text-muted)]">{formatDate(competition.start_date, locale)}</p>
          </div>
          <div>
            <p className="font-semibold text-[var(--color-text)]">{locale === "ar" ? "النهاية" : "End"}</p>
            <p className="mt-1 text-[var(--color-text-muted)]">{formatDate(competition.end_date, locale)}</p>
          </div>
        </div>
        <Link href={`/competitions/${competition.slug}`} className="inline-flex rounded-xl bg-[var(--color-primary)] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[var(--color-primary-strong)]">
          {locale === "ar" ? "عرض التفاصيل" : "View details"}
        </Link>
      </div>
    </article>
  );
}
