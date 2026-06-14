import { useTranslations } from 'next-intl';

export function WhatWeProvideSection() {
  const t = useTranslations('Partnership');

  const steps = [
    { num: '01', title: t('provide1'), desc: t('provide1Desc') },
    { num: '02', title: t('provide2'), desc: t('provide2Desc') },
    { num: '03', title: t('provide3'), desc: t('provide3Desc') },
    { num: '04', title: t('provide4'), desc: t('provide4Desc') },
  ];

  return (
    <section className="relative overflow-hidden bg-[#0A2430] py-24 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 relative z-10">
        
        <div className="mb-16">
          <div className="mb-4 text-sm font-bold tracking-widest text-blue-400 uppercase">
            {t('provideTitle')}
          </div>
          <div className="mb-8 h-1 w-24 bg-blue-400" />
          <h2 className="mb-6 font-heading text-4xl font-bold uppercase leading-tight text-white md:text-5xl">
            {t('provideHeadline')}
          </h2>
          <p className="max-w-3xl text-lg text-white/80">
            {t('provideDesc')}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div 
              key={step.num}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-colors hover:bg-white/10"
            >
              <div className="mb-6 text-5xl font-heading font-black text-white/10 group-hover:text-blue-400/20 transition-colors">
                {step.num}
              </div>
              <h3 className="mb-3 text-xl font-bold text-white uppercase tracking-wide">
                {step.title}
              </h3>
              <p className="text-white/70">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
