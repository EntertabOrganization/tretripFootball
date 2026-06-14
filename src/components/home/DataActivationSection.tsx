import { useTranslations } from 'next-intl';
import { Database } from 'lucide-react';

export function DataActivationSection() {
  const t = useTranslations('Partnership');

  return (
    <section className="relative overflow-hidden border-t border-border bg-white py-20">
      <div className="mx-auto max-w-4xl px-4 relative z-10 text-center">
        
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <Database className="h-10 w-10 text-primary" />
        </div>
        
        <div className="mb-4 text-sm font-bold tracking-widest text-primary uppercase text-center">
          {t('dataTitle')}
        </div>
        
        <h2 className="mb-6 text-center font-heading text-3xl font-bold uppercase leading-tight text-foreground md:text-4xl">
          {t('dataHeadline')}
        </h2>
        
        <p className="text-center text-lg leading-relaxed text-foreground/80 md:text-xl">
          {t('dataDesc')}
        </p>

      </div>
    </section>
  );
}
