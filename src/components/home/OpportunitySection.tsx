import { useTranslations } from 'next-intl';

export function OpportunitySection() {
  const t = useTranslations('Partnership');

  return (
    <section className="relative overflow-hidden border-t border-border bg-white py-24">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="mb-4 text-sm font-bold tracking-widest text-primary uppercase">
            {t('opportunityTitle')}
          </div>
          <div className="mb-8 h-1 w-24 bg-primary" />
          
          <h2 className="mb-8 font-heading text-4xl font-bold uppercase leading-tight text-foreground md:text-5xl">
            {t('opportunityHeadline')}
          </h2>
          
          <p className="mb-6 text-lg text-foreground/80 leading-relaxed md:text-xl">
            {t('opportunityDesc1')}
          </p>
          
          <p className="text-lg font-medium leading-relaxed text-accent md:text-xl">
            {t('opportunityDesc2')}
          </p>
        </div>
      </div>
    </section>
  );
}
