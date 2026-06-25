import Link from "next/link";

import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = t(locale);

  return (
    <footer className="border-t border-[var(--color-outline)] bg-white">
      <div className="public-container py-16">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <p className="public-heading text-3xl font-bold text-[var(--color-primary)]">TreTrip FanZone</p>
            <p className="mt-4 max-w-xl text-base leading-8 text-[var(--color-text-muted)]">{copy.home.body}</p>
          </div>
          <div>
            <p className="public-kicker">{copy.common.platform}</p>
            <div className="mt-5 space-y-3 text-sm font-medium text-[var(--color-text-muted)]">
              <Link href="/#about" className="block transition hover:text-[var(--color-primary)]">{copy.nav.about}</Link>
              <Link href="/competitions" className="block transition hover:text-[var(--color-primary)]">{copy.nav.competitions}</Link>
              <Link href="/news" className="block transition hover:text-[var(--color-primary)]">{copy.nav.news}</Link>
            </div>
          </div>
          <div>
            <p className="public-kicker">{copy.common.community}</p>
            <div className="mt-5 space-y-3 text-sm leading-7 text-[var(--color-text-muted)]">
              <p>{copy.common.footerCommunityBody}</p>
              <p className="font-semibold text-[var(--color-text)]">{"\u00A9"} 2026 TreTrip FanZone</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
