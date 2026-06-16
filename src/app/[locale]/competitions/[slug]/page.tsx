import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Link } from '@/i18n/routing';
import { COMPETITIONS } from '@/data/competitions';

export default async function CompetitionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const locale = await getLocale();
  const { slug } = await params;
  const competition = COMPETITIONS.find((item) => item.slug === slug);

  if (!competition) {
    notFound();
  }

  const terms = locale === 'en' ? competition.terms.en : competition.terms.ar;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-32">
        <section className="px-4 py-16 md:px-10">
          <div className="mx-auto max-w-5xl">
            <p className="text-sm font-bold uppercase tracking-[0.32em] text-primary">
              {locale === 'en' ? 'Competition Detail' : 'تفاصيل المسابقة'}
            </p>
            <h1 className="mt-4 text-5xl font-heading font-bold text-foreground md:text-6xl">
              {locale === 'en' ? competition.title.en : competition.title.ar}
            </h1>
            <p className="mt-6 text-lg leading-8 text-foreground/72">
              {locale === 'en' ? competition.summary.en : competition.summary.ar}
            </p>
          </div>
        </section>

        <section className="px-4 pb-24 md:px-10">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-[1.1fr_0.9fr]">
            <div className="tretrip-soft-card rounded-[2rem] p-7">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                {locale === 'en' ? 'Participation Terms' : 'شروط المشاركة'}
              </h2>
              <ul className="mt-5 space-y-3 text-base leading-8 text-foreground/72">
                {terms.map((term) => (
                  <li key={term}>• {term}</li>
                ))}
              </ul>
            </div>

            <div className="tretrip-soft-card rounded-[2rem] p-7">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                {locale === 'en' ? 'Prize Information' : 'معلومات الجوائز'}
              </h2>
              <p className="mt-5 text-base leading-8 text-foreground/72">
                {locale === 'en' ? competition.prize.en : competition.prize.ar}
              </p>
              <Link
                href={`/competitions/register?competition=${competition.slug}`}
                className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-accent"
              >
                {locale === 'en' ? 'Register for this competition' : 'سجل في هذه المسابقة'}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
