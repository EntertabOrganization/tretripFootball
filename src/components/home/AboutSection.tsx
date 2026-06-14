import { useTranslations } from 'next-intl';

export function AboutSection() {
  const t = useTranslations('AboutSection');

  return (
    <section className="w-full py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main content */}
          <div className="flex-1 space-y-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary uppercase tracking-wide transform -skew-x-12 mb-6">
                {t('journeyTitle')}
              </h2>
              <p className="text-lg text-white/80 leading-relaxed font-sans">
                {t('journeyText')}
              </p>
            </div>
            
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary uppercase tracking-wide transform -skew-x-12 mb-6">
                {t('roadTitle')}
              </h2>
              <p className="text-lg text-white/80 leading-relaxed font-sans">
                {t('roadText')}
              </p>
            </div>
          </div>
          
          {/* Basic Information Panel */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white/5 border border-white/10 p-8 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-2 h-full bg-primary transform skew-x-12 translate-x-1"></div>
              
              <h3 className="text-2xl font-heading font-bold text-white uppercase mb-8 border-b border-white/10 pb-4">
                {t('basicInfoTitle')}
              </h3>
              
              <div className="space-y-6">
                <div className="flex flex-col gap-1">
                  <span className="text-primary text-sm uppercase font-bold tracking-widest">{t('nickname')}</span>
                  <span className="text-xl text-white font-medium">{t('nicknameValue')}</span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="text-primary text-sm uppercase font-bold tracking-widest">{t('manager')}</span>
                  <span className="text-xl text-white font-medium">{t('managerValue')}</span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="text-primary text-sm uppercase font-bold tracking-widest">{t('worldCupAppearances')}</span>
                  <span className="text-xl text-white font-medium">7</span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="text-primary text-sm uppercase font-bold tracking-widest">{t('confederation')}</span>
                  <span className="text-xl text-white font-medium">AFC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
