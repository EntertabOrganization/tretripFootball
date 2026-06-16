'use client';

import { useLocale, useTranslations } from 'next-intl';
import { BriefcaseBusiness, Camera, Globe, MessageCircle } from 'lucide-react';
import { BrandLogo } from '@/components/branding/BrandLogo';
import { Link } from '@/i18n/routing';

const socialLinks = [
  { label: 'Website', href: 'https://www.tretrip.com/', icon: Globe },
  { label: 'Instagram', href: 'https://www.instagram.com/tretrip/', icon: Camera },
  { label: 'Facebook', href: 'https://www.facebook.com/tretrip20/', icon: MessageCircle },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/tretrip-llc', icon: BriefcaseBusiness },
];

export function Footer() {
  const t = useTranslations('Footer');
  const locale = useLocale();

  const quickLinks = [
    { label: t('about'), href: '/about' as const },
    { label: t('arabTeams'), href: '/arab-teams' as const },
    { label: t('fanZone'), href: '/fan-zone' as const },
    { label: t('competitions'), href: '/competitions' as const },
    { label: t('matches'), href: '/matches' as const },
  ];

  return (
    <footer className="tretrip-pattern-bg relative overflow-hidden border-t border-white/10 px-4 py-16 md:px-10">
      <div className="relative mx-auto max-w-[112rem] overflow-hidden rounded-[2rem] border border-white/18 bg-white/8 px-6 py-14 shadow-[0_30px_80px_rgba(0,0,0,0.18)] backdrop-blur-sm md:px-10 lg:px-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_38%)]" />

        <div className="relative grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.85fr)] lg:gap-20">
          <div className="flex flex-col items-start">
            <BrandLogo className="h-24 w-auto md:h-28" />
            <p className="mt-10 max-w-xl text-lg leading-8 text-white/80">
              {locale === 'en'
                ? 'TreTrip is the official supporter hub for Arab national teams on the road to FIFA World Cup 2026.'
                : 'TreTrip هي منصة الجماهير الرسمية لمتابعة المنتخبات العربية في طريقها إلى كأس العالم 2026.'}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/95 text-sm font-black text-[#124244] shadow-[0_12px_24px_rgba(54,197,180,0.24)] transition-transform hover:scale-105 hover:bg-[#7fe4d7]"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-start pt-2">
            <h2 className="text-3xl font-bold text-white">{t('quickLinks')}</h2>
            <div className="mt-8 flex flex-col gap-5">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-lg font-bold text-white transition-colors hover:text-[#8ef0e3]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mt-16 border-t border-white/15 pt-10 text-center">
          <p className="text-lg text-white md:text-xl">
            {'\u00A9'} 2026 {t('copyright')}
          </p>
          <p className="mt-4 text-base text-white/80 md:text-lg">
            {locale === 'en' ? 'Designed and developed by ' : 'تصميم وتطوير '}
            <a
              href="https://entertab.net/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-primary transition-colors hover:text-[#8ef0e3]"
            >
              Entertab
            </a>
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-8 text-lg text-white">
            <Link href="/" className="transition-colors hover:text-primary">
              {t('privacyPolicy')}
            </Link>
            <Link href="/" className="transition-colors hover:text-primary">
              {t('termsOfService')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
