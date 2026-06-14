import { Play } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function TicketGuideSection() {
  const t = useTranslations('TicketGuideSection');

  const steps = [
    {
      id: 1,
      title: t('step1Title'),
      description: t('step1Desc'),
      videoSrc: '', // Placeholder for later
    },
    {
      id: 2,
      title: t('step2Title'),
      description: t('step2Desc'),
      videoSrc: '', // Placeholder for later
    },
    {
      id: 3,
      title: t('step3Title'),
      description: t('step3Desc'),
      videoSrc: '', // Placeholder for later
    },
  ];

  return (
    <section className="relative w-full overflow-hidden border-t border-white/10 bg-brand-light py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white uppercase tracking-widest transform -skew-x-12">
            {t('sectionTitle')}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-6" />
        </div>
        
        <div className="flex overflow-x-auto pb-8 -mx-4 px-4 snap-x snap-mandatory hide-scrollbar gap-6 md:grid md:grid-cols-3 md:overflow-visible md:pb-0 md:mx-0 md:px-0">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="min-w-[85vw] sm:min-w-[300px] md:min-w-0 snap-center relative aspect-[4/5] rounded-3xl overflow-hidden group cursor-pointer border border-white/10 hover:border-primary/50 transition-colors bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]"
            >
              {/* Background styling to mimic the diet hub cards */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/20 to-transparent z-10" />
              
              {/* Decorative side text */}
              <div className="absolute left-4 top-1/4 -rotate-90 origin-left text-primary/20 font-bold text-4xl tracking-widest uppercase whitespace-nowrap z-0 pointer-events-none select-none">
                GUIDE STEP 0{step.id}
              </div>

              {/* Play button */}
              <div className="absolute top-6 right-6 z-20">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                  <Play size={24} fill="currentColor" className="ml-1" />
                </div>
              </div>

              {/* Content block */}
              <div className="absolute bottom-8 left-6 right-6 z-20">
                <div className="inline-block bg-white text-black font-black text-xl md:text-2xl uppercase tracking-widest px-4 py-2 transform -skew-x-12 mb-3 shadow-xl">
                  <span className="block transform skew-x-12">{step.title.split('.')[1] || step.title}</span>
                </div>
                
                <h3 className="text-4xl font-heading font-black text-transparent stroke-text bg-clip-text text-white drop-shadow-md mb-4 uppercase">
                  STEP #{step.id}
                </h3>
                
                <p className="text-white/80 font-medium text-sm md:text-base leading-relaxed max-w-[90%]">
                  {step.description}
                </p>
              </div>

              {/* Video placeholder - this will be visible when user clicks play in a real implementation */}
              {step.videoSrc && (
                <video 
                  src={step.videoSrc} 
                  className="absolute inset-0 w-full h-full object-cover z-0 opacity-0 group-hover:opacity-30 transition-opacity"
                  muted 
                  loop 
                  playsInline
                />
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a href="https://fifa.com/tickets" target="_blank" rel="noreferrer" className="inline-block px-10 py-5 bg-primary text-primary-foreground font-bold text-xl hover:bg-white hover:text-black transition-all rounded-full shadow-[0_0_20px_rgba(11,157,181,0.4)]">
            <span>{t('startApplication')}</span>
          </a>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.8);
        }
      `}</style>
    </section>
  );
}
