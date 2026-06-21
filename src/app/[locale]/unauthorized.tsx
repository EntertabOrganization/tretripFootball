import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

export default async function UnauthorizedPage() {
  const t = await getTranslations("Errors");

  return (
    <div className="shell">
      <div className="glass-card mx-auto max-w-2xl space-y-5 p-10 text-center">
        <h1 className="text-4xl font-semibold">{t("unauthorizedTitle")}</h1>
        <p className="text-sm leading-7 text-muted-foreground">{t("unauthorizedSubtitle")}</p>
        <Link href="/" className="inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
          {t("backHome")}
        </Link>
      </div>
    </div>
  );
}
