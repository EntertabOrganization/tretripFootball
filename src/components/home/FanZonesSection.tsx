'use client';
import { useState } from 'react';
import { MapPin, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';

const FAN_ZONES = [
  { id: 1, city: 'New York', address: 'MetLife Stadium Fan Village', time: '4:00 PM - 12:00 AM', mapLink: '#' },
  { id: 2, city: 'Los Angeles', address: 'SoFi Stadium Fan Plaza', time: '4:00 PM - 12:00 AM', mapLink: '#' },
  { id: 3, city: 'Dallas', address: 'AT&T Stadium Fan Zone', time: '4:00 PM - 12:00 AM', mapLink: '#' },
];

const MATCH_ZONES = [
  { id: 4, city: 'Miami', address: 'Hard Rock Stadium Fan Fest', time: '12:00 PM - 8:00 PM', mapLink: '#' },
  { id: 5, city: 'Vancouver', address: 'BC Place Fan Village', time: '12:00 PM - 8:00 PM', mapLink: '#' },
];

export function FanZonesSection() {
  const t = useTranslations('FanZonesSection');
  const [activeTab, setActiveTab] = useState<'fan' | 'match'>('fan');

  const zones = activeTab === 'fan' ? FAN_ZONES : MATCH_ZONES;

  return (
    <section className="w-full py-24 bg-background relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white uppercase tracking-widest transform -skew-x-12">
            {t('sectionTitle')} <span className="text-primary block mt-2 md:inline md:mt-0">{t('sectionTitleHighlight')}</span>
          </h2>
          <p className="mt-4 text-white/60 text-lg">{t('subtitle')}</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <button
            onClick={() => setActiveTab('fan')}
            className={`px-8 py-4 font-bold text-lg transform -skew-x-12 transition-colors border ${
              activeTab === 'fan' ? 'bg-primary border-primary text-primary-foreground' : 'bg-transparent border-white/20 text-white hover:border-primary/50'
            }`}
          >
            <span className="block transform skew-x-12 tracking-wider">{t('fanZonesTab')}</span>
          </button>
          <button
            onClick={() => setActiveTab('match')}
            className={`px-8 py-4 font-bold text-lg transform -skew-x-12 transition-colors border ${
              activeTab === 'match' ? 'bg-primary border-primary text-primary-foreground' : 'bg-transparent border-white/20 text-white hover:border-primary/50'
            }`}
          >
            <span className="block transform skew-x-12 tracking-wider">{t('matchFanZonesTab')}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {zones.map((zone) => (
            <div key={zone.id} className="bg-giddam-secondary border border-white/10 p-8 hover:border-primary transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full group-hover:bg-primary/20 transition-colors"></div>
              
              <h3 className="text-2xl font-bold text-primary uppercase mb-6 tracking-widest">{zone.city}</h3>
              
              <div className="space-y-4 mb-8 relative z-10">
                <div className="flex items-start gap-3 text-white/80">
                  <MapPin className="text-giddam-gold shrink-0 mt-1" size={20} />
                  <span>{zone.address}</span>
                </div>
                <div className="flex items-start gap-3 text-white/80">
                  <Clock className="text-giddam-gold shrink-0 mt-1" size={20} />
                  <span>{zone.time}</span>
                </div>
              </div>
              
              <a href={zone.mapLink} className="inline-block border-b border-primary text-primary font-bold uppercase tracking-widest pb-1 hover:text-white transition-colors group-hover:border-white relative z-10">
                {t('viewOnMap')}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
