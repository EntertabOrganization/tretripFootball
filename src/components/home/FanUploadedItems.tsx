import { Play } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { FAN_UPLOAD_ITEMS } from '@/data/fanUploads';

export function FanUploadedItems() {
  const t = useTranslations('FanUploads');

  return (
    <section className="relative w-full overflow-hidden border-t border-white/10 bg-brand-light py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-heading font-bold uppercase tracking-widest text-white md:text-5xl">
            {t('sectionTitle')}
          </h2>
          <div className="mx-auto mt-6 h-1 w-24 bg-primary" />
        </div>

        <div className="hide-scrollbar -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-8 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
          {FAN_UPLOAD_ITEMS.map((item, index) => (
            <div
              key={item.id}
              className={`group relative aspect-[4/5] min-w-[85vw] snap-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b ${item.cardClassName} transition-colors hover:border-primary/50 sm:min-w-[300px] md:min-w-0`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.accentClassName}`} />
              <div className="absolute inset-0 z-10 bg-gradient-to-tr from-black/75 via-black/10 to-transparent" />

              <div
                className={`absolute inset-x-6 top-6 bottom-6 rounded-[2rem] border backdrop-blur-[2px] ${item.frameClassName}`}
              />

              {item.type === 'image' ? (
                <>
                  <div className="absolute left-12 right-12 top-14 z-20 h-52 rounded-[1.75rem] border border-white/25 bg-white/10 shadow-[0_24px_50px_rgba(0,0,0,0.25)]" />
                  <div className="absolute left-20 right-20 top-24 z-20 h-52 rounded-[1.75rem] border border-white/20 bg-black/15 shadow-[0_18px_36px_rgba(0,0,0,0.22)]" />
                  <div className="absolute bottom-14 left-12 right-12 z-20 h-24 rounded-[1.5rem] border border-white/15 bg-white/10" />
                </>
              ) : (
                <>
                  <div className="absolute right-6 top-6 z-20">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform group-hover:scale-110">
                      <Play size={24} fill="currentColor" className="ml-1" />
                    </div>
                  </div>

                  <div className="pointer-events-none absolute left-4 top-1/4 z-0 origin-left -rotate-90 whitespace-nowrap text-4xl font-bold uppercase tracking-widest text-primary/20 select-none">
                    {t(item.railKey)} 0{index + 1}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/upload-styles"
            className="inline-block rounded-full bg-primary px-10 py-5 text-xl font-bold text-primary-foreground shadow-[0_0_20px_rgba(11,157,181,0.4)] transition-all hover:bg-white hover:text-black"
          >
            <span>{t('cta')}</span>
          </Link>
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
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.8);
        }
      `}</style>
    </section>
  );
}
