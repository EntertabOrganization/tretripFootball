import { useTranslations } from 'next-intl';
import { MapPin } from 'lucide-react';

export function CitiesStrategySection() {
  const t = useTranslations('Partnership');

  const cities = [
    {
      id: 'miami',
      name: t('miami'),
      desc: t('miamiDesc'),
      color: 'text-primary',
      borderColor: 'border-primary',
      bgClass: 'from-primary/10 to-transparent'
    },
    {
      id: 'atlanta',
      name: t('atlanta'),
      desc: t('atlantaDesc'),
      color: 'text-giddam-gold',
      borderColor: 'border-giddam-gold',
      bgClass: 'from-giddam-gold/10 to-transparent'
    },
    {
      id: 'houston',
      name: t('houston'),
      desc: t('houstonDesc'),
      color: 'text-blue-400',
      borderColor: 'border-blue-400',
      bgClass: 'from-blue-400/10 to-transparent'
    }
  ];

  return (
    <section className="relative overflow-hidden border-t border-border bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 relative z-10">
        
        <div className="mb-16 text-center">
          <div className="mb-4 text-sm font-bold tracking-widest text-[#FF6B6B] uppercase">
            {t('citiesTitle')}
          </div>
          <div className="mx-auto mb-8 h-1 w-24 bg-[#FF6B6B]" />
          <h2 className="mb-6 font-heading text-4xl font-bold uppercase leading-tight text-foreground md:text-5xl">
            {t('citiesHeadline')}
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-foreground/80">
            {t('citiesDesc')}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {cities.map((city) => (
            <div 
              key={city.id}
              className={`relative overflow-hidden rounded-3xl border-2 ${city.borderColor} bg-white p-8 shadow-xl transition-transform hover:-translate-y-2`}
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${city.bgClass} opacity-50`} />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <MapPin className={`mb-6 h-12 w-12 ${city.color}`} />
                <h3 className="mb-4 font-heading text-3xl font-bold uppercase text-foreground">
                  {city.name}
                </h3>
                <p className="font-medium leading-relaxed text-foreground/80">
                  {city.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
