import { useTranslations } from 'next-intl';
import { Users, Globe2, Sparkles } from 'lucide-react';

export function VoicesSection() {
  const t = useTranslations('Partnership');

  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-brand-light py-24">
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-giddam-gold/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-8 items-center">
          
          <div>
            <div className="mb-4 text-sm font-bold tracking-widest text-giddam-gold uppercase">
              {t('voicesTitle')}
            </div>
            <div className="mb-8 h-1 w-24 bg-giddam-gold" />
            
            <h2 className="mb-8 font-heading text-4xl font-bold uppercase leading-tight text-white md:text-5xl">
              {t('voicesHeadline')}
            </h2>
            
            <p className="mb-8 text-lg text-white/80 leading-relaxed md:text-xl">
              {t('voicesDesc1')}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="tretrip-soft-card-dark rounded-2xl p-8 text-white transition-transform hover:-translate-y-1 hover:border-primary/50">
              <Users className="mb-4 h-10 w-10 text-primary" />
              <div className="mb-2 text-3xl font-bold text-white">{t('voicesReach')}</div>
              <p className="text-sm text-white/60">{t('voicesReachDesc')}</p>
            </div>
            
            <div className="tretrip-soft-card-dark rounded-2xl p-8 text-white transition-transform hover:-translate-y-1 hover:border-blue-400/50">
              <Globe2 className="mb-4 h-10 w-10 text-blue-400" />
              <div className="mb-2 text-3xl font-bold text-white">{t('voicesEnglish')}</div>
              <p className="text-sm text-white/60">{t('voicesEnglishDesc')}</p>
            </div>
            
            <div className="tretrip-soft-card-dark rounded-2xl p-8 text-white transition-transform hover:-translate-y-1 hover:border-giddam-gold/50 sm:col-span-2">
              <Sparkles className="mb-4 h-10 w-10 text-giddam-gold" />
              <div className="mb-2 text-3xl font-bold text-white">{t('voicesAuthentic')}</div>
              <p className="text-sm text-white/60">{t('voicesAuthenticDesc')}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
