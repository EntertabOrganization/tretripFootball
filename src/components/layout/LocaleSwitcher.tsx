"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  function buildHref(nextLocale: string) {
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    return segments.join("/") || `/${nextLocale}`;
  }

  return (
    <div className="inline-flex rounded-full border border-border bg-card p-1 text-xs font-semibold">
      {["en", "ar"].map((item) => {
        const active = item === locale;
        return (
          <a
            key={item}
            href={buildHref(item)}
            className={[
              "rounded-full px-3 py-2 transition",
              active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            {item.toUpperCase()}
          </a>
        );
      })}
    </div>
  );
}
