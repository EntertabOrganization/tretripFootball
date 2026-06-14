'use client';

import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const socialLinks = ['f', 'X', 'IG', 'SC', 'TT', 'YT'];

export function Footer() {
  const t = useTranslations('Footer');

  const quickLinks = [
    { label: t('saff'), href: 'https://saff.com.sa/' },
    { label: t('fifa'), href: 'https://www.fifa.com/' },
    { label: t('saffFansApp'), href: '#' },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#2f7374] px-4 py-16 md:px-10">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_0_40%,rgba(255,255,255,0.07)_40%_52%,transparent_52%_68%,rgba(255,255,255,0.06)_68%_80%,transparent_80%)]" />
      <div className="relative mx-auto max-w-[112rem] overflow-hidden rounded-[1.35rem] border border-white/15 bg-white/8 px-6 py-16 shadow-[0_20px_70px_rgba(0,0,0,0.18)] backdrop-blur-sm md:px-12">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 -skew-x-12 bg-black/10" />

        <div className="relative grid gap-14 md:grid-cols-[1fr_1.05fr]">
          <div className="flex flex-col items-start">
            <Image
              src="/TreTrip.svg"
              alt="TreTrip"
              width={556}
              height={556}
              className="h-28 w-auto md:h-32"
            />

            <p className="mt-14 text-xl font-bold text-[#d6aa24]">#TreTrip2026</p>

            <div className="mt-8 flex flex-wrap gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-[#0b3a3d] transition-transform hover:scale-110 hover:bg-giddam-light"
                  aria-label={social}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-start pt-4">
            <h2 className="text-2xl font-bold text-white">{t('quickLinks')}</h2>
            <div className="mt-8 flex flex-col gap-7">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="text-lg font-bold text-white transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mt-16 border-t border-white/15 pt-10 text-center">
          <p className="text-xl text-white">
            {'\u00A9'} 2026 {t('copyright')}{' '}
            <a href="https://www.entertab.net" className="text-[#d6aa24] transition-colors hover:text-white">
              Entertab.net
            </a>
          </p>
          <div className="mt-7 flex justify-center gap-8 text-lg text-white">
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
