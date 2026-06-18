'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Link } from '@/i18n/routing';
import { FAN_UPLOAD_ITEMS } from '@/data/fanUploads';

export default function UploadStylesPage() {
  const locale = useLocale();
  const t = useTranslations('FanUploads');
  const [selectedTeamCode, setSelectedTeamCode] = useState('KSA');

  const imageItems = FAN_UPLOAD_ITEMS.filter((item) => item.type === 'image');
  const videoItems = FAN_UPLOAD_ITEMS.filter((item) => item.type === 'video');

  return (
    <>
      <Navbar selectedTeamCode={selectedTeamCode} onSelectTeam={setSelectedTeamCode} />
      <main className="min-h-screen bg-background pt-32">
        <section className="relative overflow-hidden bg-[#0b2f34] px-4 py-16 md:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_28%,rgba(255,255,255,0.12),transparent_30%),linear-gradient(135deg,rgba(11,157,181,0.22),rgba(4,44,48,0.85)_45%,rgba(3,71,67,0.96))]" />
          <div className="relative z-10 mx-auto max-w-[112rem]">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-primary/80 transition-colors hover:text-primary">
              ← {t('backHome')}
            </Link>
            <h1 className="mt-8 font-heading text-5xl font-bold uppercase leading-[0.92] text-white md:text-6xl lg:text-7xl">
              {t('pageTitle')}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">{t('pageSubtitle')}</p>
          </div>
        </section>

        <section className="px-4 py-16 md:px-10">
          <div className="mx-auto max-w-[112rem]">
            <div className="mb-8 flex items-center gap-4">
              <div className="h-10 w-2 bg-primary" />
              <h2 className="text-2xl font-heading font-bold uppercase tracking-widest text-foreground md:text-3xl">
                {t('imagesHeading')}
              </h2>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {imageItems.map((item) => (
                <article
                  key={item.id}
                  className={`relative overflow-hidden rounded-[2rem] border border-white/70 bg-gradient-to-br ${item.cardClassName} p-8 text-white shadow-[0_24px_60px_rgba(0,0,0,0.18)]`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.accentClassName}`} />
                  <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.12),transparent_40%,rgba(0,0,0,0.24))]" />
                  <div className="relative z-10">
                    <div className="mb-6 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-white/80">
                      {t(item.labelKey)}
                    </div>
                    <h3 className="max-w-xl font-heading text-3xl font-bold uppercase leading-tight md:text-4xl">
                      {t(item.titleKey)}
                    </h3>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-white/82">
                      {t(item.descriptionKey)}
                    </p>

                    <div className="mt-10 grid gap-5 sm:grid-cols-[1.2fr_0.8fr]">
                      <div className={`min-h-[20rem] rounded-[1.75rem] border p-5 ${item.frameClassName}`}>
                        <div className="h-full rounded-[1.4rem] border border-white/20 bg-white/10 p-4">
                          <div className="h-full rounded-[1.15rem] border border-dashed border-white/20 bg-black/10" />
                        </div>
                      </div>
                      <div className="grid gap-5">
                        <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-5">
                          <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/65">{locale === 'en' ? 'Format' : 'التنسيق'}</p>
                          <p className="mt-3 text-lg font-semibold">{locale === 'en' ? 'Static image' : 'صورة ثابتة'}</p>
                        </div>
                        <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-5">
                          <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/65">{locale === 'en' ? 'Usage' : 'الاستخدام'}</p>
                          <p className="mt-3 text-lg font-semibold">{locale === 'en' ? 'Website fan gallery' : 'معرض الجماهير في الموقع'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-[#071c25] px-4 py-16 md:px-10">
          <div className="mx-auto max-w-[112rem]">
            <div className="mb-8 flex items-center gap-4">
              <div className="h-10 w-2 bg-primary" />
              <h2 className="text-2xl font-heading font-bold uppercase tracking-widest text-white md:text-3xl">
                {t('videosHeading')}
              </h2>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {videoItems.map((item) => (
                <article
                  key={item.id}
                  className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br ${item.cardClassName} p-8 text-white shadow-[0_24px_60px_rgba(0,0,0,0.28)]`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.accentClassName}`} />
                  <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(0,0,0,0.04),rgba(0,0,0,0.55))]" />
                  <div className="relative z-10">
                    <div className="mb-6 flex items-center justify-between gap-4">
                      <div className="inline-flex rounded-full border border-primary/30 bg-primary/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-primary-foreground">
                        {t(item.labelKey)}
                      </div>
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg">
                        <Play size={24} fill="currentColor" className="ml-1" />
                      </div>
                    </div>

                    <h3 className="max-w-xl font-heading text-3xl font-bold uppercase leading-tight md:text-4xl">
                      {t(item.titleKey)}
                    </h3>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-white/82">
                      {t(item.descriptionKey)}
                    </p>

                    <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                      <div className={`min-h-[22rem] rounded-[1.75rem] border p-5 ${item.frameClassName}`}>
                        <div className="flex h-full items-center justify-center rounded-[1.3rem] border border-white/20 bg-black/25">
                          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/12 text-white">
                            <Play size={34} fill="currentColor" className="ml-1" />
                          </div>
                        </div>
                      </div>
                      <div className="grid gap-5">
                        <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5">
                          <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/55">{locale === 'en' ? 'Format' : 'التنسيق'}</p>
                          <p className="mt-3 text-lg font-semibold">{locale === 'en' ? 'Video upload' : 'رفع فيديو'}</p>
                        </div>
                        <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5">
                          <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/55">{locale === 'en' ? 'Usage' : 'الاستخدام'}</p>
                          <p className="mt-3 text-lg font-semibold">{locale === 'en' ? 'Reactions and supporter clips' : 'ردود الفعل ومقاطع الجماهير'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
