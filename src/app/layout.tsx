import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Oswald, Plus_Jakarta_Sans } from "next/font/google";

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
  icons: {
    icon: "/Logo.png",
    shortcut: "/Logo.png",
    apple: "/Logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = (await cookies()).get(LOCALE_COOKIE)?.value === "ar" ? "ar" : "en";
  return (
    <html lang={locale} dir={getDirection(locale)} data-scroll-behavior="smooth">
      <body className={`${display.variable} ${body.variable}`}>{children}</body>
    </html>
  );
}
