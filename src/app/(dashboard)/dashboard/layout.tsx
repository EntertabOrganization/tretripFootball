import { redirect } from "next/navigation";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getCurrentProfile } from "@/lib/auth";
import { getLocale } from "@/lib/i18n";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getCurrentProfile();
  const locale = await getLocale();

  if (!profile) {
    redirect("/login");
  }

  return (
    <DashboardShell locale={locale} profile={profile} path="/dashboard">
      {children}
    </DashboardShell>
  );
}
