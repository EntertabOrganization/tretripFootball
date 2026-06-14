import { useTranslations } from 'next-intl';
import { Camera, Video, MessageSquare, Users } from 'lucide-react';

export function ContentPreviewSection() {
  const t = useTranslations('Partnership');

  const contentTypes = [
    { icon: Camera, title: t('contentStory'), color: 'text-primary', bg: 'bg-primary/10' },
    { icon: Video, title: t('contentVideo'), color: 'text-giddam-gold', bg: 'bg-giddam-gold/10' },
    { icon: MessageSquare, title: t('contentTweet'), color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { icon: Users, title: t('contentGroup'), color: 'text-green-400', bg: 'bg-green-400/10' },
  ];

  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-brand-light py-24">
      <div className="mx-auto max-w-7xl px-4 relative z-10">
        
        <div className="mb-16 text-center">
          <div className="mb-4 text-sm font-bold tracking-widest text-primary uppercase">
            {t('contentTitle')}
          </div>
          <div className="mx-auto mb-8 h-1 w-24 bg-primary" />
          <h2 className="font-heading text-4xl font-bold uppercase leading-tight text-white md:text-5xl">
            {t('contentHeadline')}
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contentTypes.map((type, idx) => {
            const Icon = type.icon;
            return (
              <div 
                key={idx} 
                className="tretrip-soft-card-dark group relative flex flex-col items-center justify-center overflow-hidden rounded-3xl p-10 text-center text-white transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                
                <div className={`mb-6 flex h-20 w-20 items-center justify-center rounded-full ${type.bg} transition-transform group-hover:scale-110`}>
                  <Icon className={`h-10 w-10 ${type.color}`} />
                </div>
                
                <h3 className="relative z-10 text-xl font-bold text-white tracking-wide">{type.title}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
