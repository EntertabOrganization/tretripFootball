import { Smartphone } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function AppDownloadSection() {
  const t = useTranslations('AppDownloadSection');

  return (
    <section className="relative w-full border-t border-b border-white/10 bg-brand-light py-24">
      <div className="absolute left-0 top-0 z-0 h-full w-1/2 -translate-x-32 transform bg-white/8 skew-x-12"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">
        <div className="flex-1 space-y-8">
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white uppercase tracking-widest leading-tight">
            {t('title')} <br/>
            <span className="text-primary transform inline-block -skew-x-12 mt-2">{t('titleHighlight')}</span>
          </h2>
          
          <p className="text-xl text-white/80 max-w-xl">
            {t('description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a href="#" className="flex items-center justify-center gap-3 bg-white text-black px-6 py-4 rounded hover:bg-giddam-light transition-colors">
              <Smartphone size={24} />
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold opacity-70">{t('downloadOn')}</span>
                <span className="text-lg font-bold leading-none">{t('appStore')}</span>
              </div>
            </a>
            <a href="#" className="flex items-center justify-center gap-3 bg-white text-black px-6 py-4 rounded hover:bg-giddam-light transition-colors">
              <Smartphone size={24} />
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold opacity-70">{t('getItOn')}</span>
                <span className="text-lg font-bold leading-none">{t('googlePlay')}</span>
              </div>
            </a>
          </div>
        </div>
        
        <div className="w-full md:w-5/12 flex justify-center relative">
          {/* Abstract Phone Mockup Placeholder */}
          <div className="relative flex h-[500px] w-64 flex-col items-center justify-center overflow-hidden rounded-[3rem] border-4 border-white/20 bg-[#275f60] p-6 text-center shadow-2xl shadow-primary/20">
             <div className="absolute top-0 h-6 w-32 rounded-b-xl bg-brand-light"></div>
             <div className="text-primary font-heading text-3xl font-bold mb-4 transform -skew-x-12">TreTrip</div>
             <div className="w-full h-48 bg-primary/20 rounded-lg border border-primary/30 mb-4"></div>
             <div className="w-full h-24 bg-white/5 rounded-lg mb-2"></div>
             <div className="w-full h-24 bg-white/5 rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
