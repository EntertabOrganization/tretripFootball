'use client';

import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const socialLinks = [
  { label: 'f', href: '#' },
  { label: 'X', href: '#' },
  { label: 'IG', href: '#' },
  { label: 'SC', href: '#' },
  { label: 'TT', href: '#' },
  { label: 'YT', href: '#' },
];

export function Footer() {
  const t = useTranslations('Footer');

  const quickLinks = [
    { label: t('saff'), href: 'https://saff.com.sa/' },
    { label: t('fifa'), href: 'https://www.fifa.com/' },
    { label: t('saffFansApp'), href: '#' },
  ];

  return (
    <footer className="tretrip-pattern-bg relative overflow-hidden border-t border-white/10 px-4 py-16 md:px-10">
      <div className="relative mx-auto max-w-[112rem] overflow-hidden rounded-[2rem] border border-white/18 bg-white/8 px-6 py-14 shadow-[0_30px_80px_rgba(0,0,0,0.18)] backdrop-blur-sm md:px-10 lg:px-14">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(130deg,transparent_0_52%,rgba(255,255,255,0.06)_52%_70%,transparent_70%)]" />
        <div className="pointer-events-none absolute inset-y-0 right-[-10%] w-[48%] -skew-x-12 bg-black/6" />

        <div className="relative grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.85fr)] lg:gap-20">
          <div className="flex flex-col items-start">
            <Image
              src="/TreTrip.svg"
              alt="TreTrip"
              width={556}
              height={556}
              className="h-24 w-auto md:h-28"
            />

            <p className="mt-12 text-2xl font-bold tracking-tight text-[#d9b037]">#TreTrip2026</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/95 text-sm font-black text-[#124244] shadow-[0_12px_24px_rgba(54,197,180,0.24)] transition-transform hover:scale-105 hover:bg-[#7fe4d7]"
                  aria-label={social.label}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-start pt-2">
            <h2 className="text-3xl font-bold text-white">{t('quickLinks')}</h2>
            <div className="mt-8 flex flex-col gap-7">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="text-lg font-bold text-white transition-colors hover:text-[#8ef0e3]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mt-16 border-t border-white/15 pt-10 text-center">
          <p className="text-lg text-white md:text-xl">
            {'\u00A9'} 2026 {t('copyright')}{' '}
            <a
              href="https://www.saff.com.sa/"
              target="_blank"
              rel="noreferrer"
              className="text-[#d9b037] transition-colors hover:text-white"
            >
              Saudi Arabian Football Federation (SAFF)
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
