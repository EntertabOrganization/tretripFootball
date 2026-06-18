import { Play } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function FanUploadedItems() {
  const t = useTranslations('FanUploads');

  const uploadItems = [
    {
      id: 'image-1',
      title: t('imageCard1Title'),
      description: t('imageCard1Desc'),
      type: 'image' as const,
    },
    {
      id: 'image-2',
      title: t('imageCard2Title'),
      description: t('imageCard2Desc'),
      type: 'image' as const,
    },
    {
      id: 'video-1',
      title: t('videoCardTitle'),
      description: t('videoCardDesc'),
      type: 'video' as const,
      videoSrc: '',
    },
  ];

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
          {uploadItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative aspect-[4/5] min-w-[85vw] snap-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] transition-colors hover:border-primary/50 sm:min-w-[300px] md:min-w-0"
            >
              <div className="absolute inset-0 z-10 bg-gradient-to-tr from-black/80 via-black/20 to-transparent" />

              <div className="pointer-events-none absolute left-4 top-1/4 z-0 origin-left -rotate-90 whitespace-nowrap text-4xl font-bold uppercase tracking-widest text-primary/20 select-none">
                {item.type === 'video' ? t('videoRail') : t('imageRail')} 0{index + 1}
              </div>

              {item.type === 'video' ? (
                <div className="absolute right-6 top-6 z-20">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform group-hover:scale-110">
                    <Play size={24} fill="currentColor" className="ml-1" />
                  </div>
                </div>
              ) : null}

              <div className="absolute bottom-8 left-6 right-6 z-20">
                <div className="mb-3 inline-block -skew-x-12 bg-white px-4 py-2 text-xl font-black uppercase tracking-widest text-black shadow-xl md:text-2xl">
                  <span className="block skew-x-12">{item.title}</span>
                </div>

                <h3 className="mb-4 bg-clip-text font-heading text-4xl font-black uppercase text-white drop-shadow-md stroke-text">
                  {item.type === 'video' ? t('videoLabel') : t('imageLabel')}
                </h3>

                <p className="max-w-[90%] text-sm font-medium leading-relaxed text-white/80 md:text-base">
                  {item.description}
                </p>
              </div>

              {item.type === 'video' && item.videoSrc ? (
                <video
                  src={item.videoSrc}
                  className="absolute inset-0 z-0 h-full w-full object-cover opacity-0 transition-opacity group-hover:opacity-30"
                  muted
                  loop
                  playsInline
                />
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="#matches"
            className="inline-block rounded-full bg-primary px-10 py-5 text-xl font-bold text-primary-foreground shadow-[0_0_20px_rgba(11,157,181,0.4)] transition-all hover:bg-white hover:text-black"
          >
            <span>{t('cta')}</span>
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
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.8);
        }
      `}</style>
    </section>
  );
}
