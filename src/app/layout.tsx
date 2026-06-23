import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Oswald, Plus_Jakarta_Sans } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getCurrentProfile } from "@/lib/auth";
import { APP_NAME, LOCALE_COOKIE } from "@/lib/constants";
import { getDirection } from "@/lib/i18n";

import "./globals.css";

const display = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: "Bilingual football news, competitions, and leaderboard platform.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = (await cookies()).get(LOCALE_COOKIE)?.value === "ar" ? "ar" : "en";
  const profile = await getCurrentProfile();
  return (
    <html lang={locale} dir={getDirection(locale)} data-scroll-behavior="smooth">
      <body className={`${display.variable} ${body.variable}`}>
        <SiteHeader locale={locale} profile={profile} path="/" />
        <main>{children}</main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
