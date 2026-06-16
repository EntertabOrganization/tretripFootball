import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function PartnerSection() {
  const t = useTranslations('Partnership');

  return (
    <section className="relative overflow-hidden border-t border-border bg-white py-24">
      <div className="mx-auto max-w-4xl px-4 relative z-10">
        
        <div className="mb-16 text-center">
          <div className="mb-4 text-sm font-bold tracking-widest text-primary uppercase">
            {t('partnerTitle')}
          </div>
          <div className="mx-auto mb-8 h-1 w-24 bg-primary" />
          <h2 className="font-heading text-4xl font-bold uppercase leading-tight text-foreground md:text-5xl">
            {t('partnerHeadline')}
          </h2>
        </div>

        <div className="rounded-3xl border border-border bg-muted/35 p-12 text-center backdrop-blur-sm shadow-2xl">
          <Image
            src="/TreTrip.png"
            alt="TreTrip"
            width={558}
            height={539}
            className="mx-auto mb-8 h-16 w-auto"
          />
          <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-foreground/90">
            {t('partnerDesc')}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {['IATA', 'FIFA', 'USA Certified', '18+ Cities'].map((badge) => (
              <span key={badge} className="rounded-full border border-primary/50 bg-primary/10 px-6 py-2 text-sm font-bold text-primary">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
