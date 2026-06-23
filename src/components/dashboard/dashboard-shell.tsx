import Link from "next/link";
import type { ReactNode } from "react";

import type { Locale, Profile } from "@/lib/types";
import { dictionaries, t } from "@/lib/i18n";
import { hasMinimumRole } from "@/lib/permissions";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  locale: Locale;
  profile: Profile;
  path: string;
};

const baseItems = [
  { href: "/dashboard", key: "overview", minimumRole: "USER" as const },
  { href: "/dashboard/news", key: "articles", minimumRole: "EDITOR" as const },
  { href: "/dashboard/competitions", key: "competitions", minimumRole: "ADMIN" as const },
  { href: "/dashboard/comments", key: "comments", minimumRole: "ADMIN" as const },
  { href: "/dashboard/categories", key: "categories", minimumRole: "ADMIN" as const },
  { href: "/dashboard/users", key: "users", minimumRole: "ADMIN" as const },
] as const satisfies ReadonlyArray<{
  href: string;
  key: keyof typeof dictionaries.en.dashboard;
  minimumRole: "ADMIN" | "EDITOR" | "USER";
}>;

export function DashboardShell({ children, locale, profile, path }: Props) {
  const copy = t(locale);

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[280px_1fr]">
      <aside className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="border-b border-slate-100 pb-5">
          <p className="font-display text-2xl text-slate-900">TreTrip Workspace</p>
          <p className="mt-2 text-sm text-slate-500">
            {profile.first_name} {profile.last_name} · {profile.role}
          </p>
        </div>
        <nav className="mt-5 space-y-2">
          {baseItems
            .filter((item) => hasMinimumRole(profile.role, item.minimumRole))
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block rounded-2xl px-4 py-3 text-sm font-medium transition",
                  path === item.href
                    ? "bg-[var(--color-primary)] text-white"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                )}
              >
                {copy.dashboard[item.key]}
              </Link>
            ))}
        </nav>
      </aside>
      <div className="space-y-6">{children}</div>
    </div>
  );
}
