import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export function CompetitionsTeaserSection() {
  const t = useTranslations('Competitions');

  return (
    <section className="border-t border-border bg-white py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="tretrip-soft-card grid gap-8 rounded-[2rem] p-8 md:grid-cols-[1.1fr_0.9fr] md:p-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">{t('eyebrow')}</p>
            <h2 className="mt-4 text-4xl font-heading font-bold text-foreground md:text-5xl">{t('title')}</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-foreground/72">{t('summary')}</p>
          </div>

          <div className="flex flex-col justify-center gap-4">
            <Link
              href="/competitions"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-4 text-center text-base font-bold text-white transition-colors hover:bg-accent"
            >
              {t('viewAll')}
            </Link>
            <Link
              href="/competitions/register"
              className="inline-flex items-center justify-center rounded-full border border-primary px-6 py-4 text-center text-base font-bold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              {t('registerNow')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
