import { getTranslations } from "next-intl/server";
import { getCurrentUser } from "@/lib/auth";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/utils";

export async function SiteHeader() {
  const t = await getTranslations("Nav");
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="shell flex min-h-18 items-center justify-between gap-4 py-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground">
              T
            </div>
            <div>
              <div className="font-heading text-lg font-semibold">Tretrip</div>
              <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Football Desk
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-5 text-sm text-muted-foreground lg:flex">
            <Link href="/" className="transition hover:text-foreground">
              {t("home")}
            </Link>
            <Link href="/news" className="transition hover:text-foreground">
              {t("news")}
            </Link>
            <Link href="/competitions" className="transition hover:text-foreground">
              {t("competitions")}
            </Link>
            {user ? (
              <>
                <Link href="/profile" className="transition hover:text-foreground">
                  {t("profile")}
                </Link>
                {(user.role === "ADMIN" || user.role === "EDITOR") && (
                  <Link href="/dashboard" className="transition hover:text-foreground">
                    {t("dashboard")}
                  </Link>
                )}
              </>
            ) : null}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <ThemeToggle />
          {user ? (
            <Link href="/profile" className={cn(buttonVariants({ variant: "default" }))}>
              {user.fullName.split(" ")[0]}
            </Link>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link href="/login" className={cn(buttonVariants({ variant: "ghost" }))}>
                {t("login")}
              </Link>
              <Link href="/register" className={cn(buttonVariants({ variant: "default" }))}>
                {t("register")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
