import { useTranslations } from 'next-intl';
import { Mail, MessageCircle } from 'lucide-react';

export function MinistryContactCTA() {
  const t = useTranslations('Partnership');

  return (
    <section className="relative overflow-hidden bg-[#0A2430] py-32 border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(11,157,181,0.1),transparent_60%)]" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      
      <div className="mx-auto max-w-5xl px-4 relative z-10 text-center">
        
        <h2 className="mb-8 font-heading text-5xl font-bold uppercase leading-tight text-white md:text-7xl drop-shadow-lg">
          {t('ctaHeadline')}
        </h2>
        
        <p className="mx-auto mb-12 max-w-3xl text-xl text-white/80 md:text-2xl font-medium">
          {t('ctaDesc')}
        </p>

        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row mb-12">
          <a 
            href="mailto:farraj@tretrip.com" 
            className="flex min-w-[200px] items-center justify-center gap-3 rounded-full bg-white/10 border border-white/20 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-white hover:text-black shadow-xl"
          >
            <Mail size={24} />
            {t('ctaEmail')}
          </a>
          <a 
            href="https://wa.me/12028608888" 
            target="_blank"
            rel="noreferrer"
            className="flex min-w-[200px] items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-lg font-bold text-[#0A2430] transition-all hover:bg-giddam-light shadow-[0_0_30px_rgba(11,157,181,0.4)]"
          >
            <MessageCircle size={24} fill="currentColor" className="text-[#0A2430]" />
            {t('ctaWhatsapp')}
          </a>
        </div>

        <p className="text-white/50 font-medium">
          {t('ctaFooter')}
        </p>

      </div>
    </section>
  );
}
