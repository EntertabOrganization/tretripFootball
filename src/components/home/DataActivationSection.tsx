import { useTranslations } from 'next-intl';
import { Database } from 'lucide-react';

export function DataActivationSection() {
  const t = useTranslations('Partnership');

  return (
    <section className="relative overflow-hidden bg-giddam-secondary py-20 border-t border-white/5">
      <div className="mx-auto max-w-4xl px-4 relative z-10 text-center">
        
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <Database className="h-10 w-10 text-primary" />
        </div>
        
        <div className="mb-4 text-sm font-bold tracking-widest text-primary uppercase text-center">
          {t('dataTitle')}
        </div>
        
        <h2 className="mb-6 font-heading text-3xl font-bold uppercase leading-tight text-white md:text-4xl text-center">
          {t('dataHeadline')}
        </h2>
        
        <p className="text-lg text-white/80 leading-relaxed md:text-xl text-center">
          {t('dataDesc')}
        </p>

      </div>
    </section>
  );
}
