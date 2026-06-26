import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getCurrentProfile } from "@/lib/auth";
import { getLocale } from "@/lib/i18n";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const profile = await getCurrentProfile();

  return (
    <div>
      <SiteHeader locale={locale} profile={profile} />
      <main>{children}</main>
      <SiteFooter locale={locale} />
    </div>
  );
}
