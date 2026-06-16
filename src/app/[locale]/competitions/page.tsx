import { getLocale } from 'next-intl/server';
import { COMPETITIONS } from '@/data/competitions';
import { Link } from '@/i18n/routing';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default async function CompetitionsPage() {
  const locale = await getLocale();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-32">
        <section className="px-4 py-16 md:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-bold uppercase tracking-[0.32em] text-primary">
              {locale === 'en' ? 'Competitions' : 'المسابقات'}
            </p>
            <h1 className="mt-4 text-5xl font-heading font-bold text-foreground md:text-6xl">
              {locale === 'en' ? 'TreTrip Campaigns & Contests' : 'حملات ومسابقات TreTrip'}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground/72">
              {locale === 'en'
                ? 'Browse active football campaigns, review prizes and participation terms, and register online.'
                : 'تصفح الحملات الكروية النشطة وراجع الجوائز وشروط المشاركة وسجل مباشرة عبر الموقع.'}
            </p>
          </div>
        </section>

        <section className="px-4 pb-24 md:px-10">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
            {COMPETITIONS.map((competition) => (
              <article key={competition.id} className="tretrip-soft-card rounded-[2rem] p-7">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">{competition.status}</p>
                <h2 className="mt-4 text-3xl font-heading font-bold text-foreground">
                  {locale === 'en' ? competition.title.en : competition.title.ar}
                </h2>
                <p className="mt-4 text-base leading-8 text-foreground/72">
                  {locale === 'en' ? competition.summary.en : competition.summary.ar}
                </p>
                <p className="mt-5 text-sm font-semibold text-accent">
                  {locale === 'en' ? competition.prize.en : competition.prize.ar}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/competitions/${competition.slug}`}
                    className="inline-flex rounded-full border border-primary px-5 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-white"
                  >
                    {locale === 'en' ? 'View details' : 'عرض التفاصيل'}
                  </Link>
                  <Link
                    href={`/competitions/register?competition=${competition.slug}`}
                    className="inline-flex rounded-full bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-accent"
                  >
                    {locale === 'en' ? 'Register now' : 'سجل الآن'}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
