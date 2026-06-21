import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

export async function SiteFooter() {
  const t = await getTranslations("Footer");

  return (
    <footer className="border-t border-border/70 py-10">
      <div className="shell flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl space-y-3">
          <div className="font-heading text-2xl font-semibold">Tretrip</div>
          <p className="text-sm leading-6 text-muted-foreground">{t("summary")}</p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <Link href="/" className="transition hover:text-foreground">
            {t("home")}
          </Link>
          <Link href="/news" className="transition hover:text-foreground">
            {t("news")}
          </Link>
          <Link href="/competitions" className="transition hover:text-foreground">
            {t("competitions")}
          </Link>
          <Link href="/login" className="transition hover:text-foreground">
            {t("login")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
