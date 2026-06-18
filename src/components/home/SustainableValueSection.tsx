import { useTranslations } from 'next-intl';
import { Database, Network, Repeat } from 'lucide-react';

export function SustainableValueSection() {
  const t = useTranslations('Partnership');

  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-white py-24">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 relative z-10">
        
        <div className="mb-16 text-center">
          <div className="mb-4 text-sm font-bold tracking-widest text-blue-400 uppercase">
            {t('valueTitle')}
          </div>
          <div className="mx-auto mb-8 h-1 w-24 bg-blue-400" />
          <h2 className="font-heading text-4xl font-bold uppercase leading-tight text-brand-light md:text-5xl">
            {t('valueHeadline')}
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          
          <div className="flex flex-col items-center text-center p-8">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/10">
              <Database className="h-10 w-10 text-primary" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-primary uppercase tracking-wide">
              {t('value1')}
            </h3>
            <p className="text-brand-light/70 leading-relaxed text-lg">
              {t('value1Desc')}
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-8">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-blue-400/30 bg-blue-400/10">
              <Network className="h-10 w-10 text-blue-400" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-blue-400 uppercase tracking-wide">
              {t('value2')}
            </h3>
            <p className="text-brand-light/70 leading-relaxed text-lg">
              {t('value2Desc')}
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-8">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#FF6B6B]/30 bg-[#FF6B6B]/10">
              <Repeat className="h-10 w-10 text-[#FF6B6B]" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-[#FF6B6B] uppercase tracking-wide">
              {t('value3')}
            </h3>
            <p className="text-brand-light/70 leading-relaxed text-lg">
              {t('value3Desc')}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
