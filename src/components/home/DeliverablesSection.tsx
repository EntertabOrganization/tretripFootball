import { useTranslations } from 'next-intl';
import { CheckCircle2 } from 'lucide-react';

export function DeliverablesSection() {
  const t = useTranslations('Partnership');

  const tangible = [
    t('delTangible1'),
    t('delTangible2'),
    t('delTangible3')
  ];

  const intangible = [
    t('delIntangible1'),
    t('delIntangible2'),
    t('delIntangible3')
  ];

  return (
    <section className="relative overflow-hidden bg-giddam-secondary py-24 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 relative z-10">
        
        <div className="mb-16 text-center">
          <div className="mb-4 text-sm font-bold tracking-widest text-primary uppercase">
            {t('deliverablesTitle')}
          </div>
          <div className="mx-auto mb-8 h-1 w-24 bg-primary" />
          <h2 className="font-heading text-4xl font-bold uppercase leading-tight text-white md:text-5xl">
            {t('deliverablesHeadline')}
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          
          <div className="rounded-3xl border border-white/10 bg-[#0A2430] p-10 shadow-2xl">
            <h3 className="mb-8 text-2xl font-bold text-white uppercase tracking-widest border-b border-white/10 pb-4">
              {t('delTangible')}
            </h3>
            <ul className="space-y-6">
              {tangible.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-primary" />
                  <span className="text-lg text-white/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-sm">
            <h3 className="mb-8 text-2xl font-bold text-white uppercase tracking-widest border-b border-white/10 pb-4">
              {t('delIntangible')}
            </h3>
            <ul className="space-y-6">
              {intangible.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-giddam-gold" />
                  <span className="text-lg text-white/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
