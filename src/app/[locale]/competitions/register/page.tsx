'use client';

import { useMemo } from 'react';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CompetitionRegistrationForm } from '@/components/competitions/CompetitionRegistrationForm';
import { COMPETITIONS } from '@/data/competitions';

export default function CompetitionRegisterPage() {
  const locale = useLocale();
  const searchParams = useSearchParams();
  const selectedCompetitionSlug = searchParams.get('competition') ?? COMPETITIONS[0]?.slug;

  const selectedCompetition = useMemo(
    () => COMPETITIONS.find((competition) => competition.slug === selectedCompetitionSlug) ?? COMPETITIONS[0],
    [selectedCompetitionSlug]
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-32">
        <section className="px-4 py-16 md:px-10">
          <div className="mx-auto max-w-5xl">
            <p className="text-sm font-bold uppercase tracking-[0.32em] text-primary">
              {locale === 'en' ? 'Competition Registration' : 'تسجيل المسابقة'}
            </p>
            <h1 className="mt-4 text-5xl font-heading font-bold text-foreground md:text-6xl">
              {locale === 'en' ? selectedCompetition.title.en : selectedCompetition.title.ar}
            </h1>
            <p className="mt-6 text-lg leading-8 text-foreground/72">
              {locale === 'en' ? selectedCompetition.summary.en : selectedCompetition.summary.ar}
            </p>
          </div>
        </section>

        <section className="px-4 pb-24 md:px-10">
          <div className="mx-auto max-w-5xl">
            <CompetitionRegistrationForm defaultCompetitionSlug={selectedCompetition.slug} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
