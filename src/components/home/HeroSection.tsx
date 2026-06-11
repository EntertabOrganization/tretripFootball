import { useTranslations } from 'next-intl';

export function HeroSection() {
  const t = useTranslations('HomePage');

  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-giddam-secondary">
      {/* Background overlay/image placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-giddam-secondary/60 to-black/80 z-0"></div>
      
      {/* Decorative skewed elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 transform skew-x-12 translate-x-32 z-0 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-giddam-teal/10 transform -skew-x-12 -translate-x-32 z-0 blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-bold text-primary uppercase tracking-wider mb-8 transform -skew-x-12 leading-none drop-shadow-2xl">
          <span className="block text-white text-3xl md:text-5xl lg:text-6xl mb-4">Giddam</span>
          {t('title')}
        </h1>
        
        <p className="text-xl md:text-3xl text-white/90 max-w-3xl mb-12 font-medium tracking-wide">
          Our road to the 2026 World Cup begins here.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full sm:w-auto">
          <a href="https://fifa.com/tickets" className="w-full sm:w-auto group relative px-12 py-5 bg-primary text-primary-foreground font-bold text-xl transform -skew-x-12 hover:bg-giddam-light transition-all overflow-hidden border-2 border-transparent hover:border-white/20 shadow-[0_0_30px_rgba(0,168,135,0.3)]">
            <span className="block transform skew-x-12 tracking-widest relative z-10">{t('bookTicket')}</span>
          </a>
          <a href="#matches" className="w-full sm:w-auto px-12 py-5 bg-white/5 backdrop-blur-md border border-white/20 text-white font-bold text-xl transform -skew-x-12 hover:bg-white/10 hover:border-white/40 transition-all">
            <span className="block transform skew-x-12 tracking-widest">{t('matchSchedule')}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
