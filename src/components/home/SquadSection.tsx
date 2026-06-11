'use client';
import { useState } from 'react';

const SQUAD_DATA = [
  { id: 1, name: 'Mohammed Al-Owais', position: 'Goalkeeper', number: 21 },
  { id: 2, name: 'Saud Abdulhamid', position: 'Defence Line', number: 12 },
  { id: 3, name: 'Ali Al-Bulaihi', position: 'Defence Line', number: 5 },
  { id: 4, name: 'Hassan Tambakti', position: 'Defence Line', number: 17 },
  { id: 5, name: 'Mohamed Kanno', position: 'Midfield Line', number: 23 },
  { id: 6, name: 'Salman Al-Faraj', position: 'Midfield Line', number: 7 },
  { id: 7, name: 'Salem Al-Dawsari', position: 'Attack Line', number: 10 },
  { id: 8, name: 'Firas Al-Buraikan', position: 'Attack Line', number: 9 },
];

const FILTERS = ['All', 'Goalkeepers', 'Defence Line', 'Midfield Line', 'Attack Line'];

export function SquadSection() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredSquad = SQUAD_DATA.filter((player) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Goalkeepers') return player.position === 'Goalkeeper';
    return player.position === activeFilter;
  });

  return (
    <section className="w-full py-24 bg-background relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary uppercase tracking-wide transform -skew-x-12">
              National Team Squad
            </h2>
            <h3 className="text-2xl text-white/60 mt-2 font-heading transform -skew-x-12">At the World Cup</h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 transform -skew-x-12 border transition-all font-bold tracking-widest text-sm ${
                  activeFilter === filter
                    ? 'bg-primary border-primary text-primary-foreground'
                    : 'bg-white/5 border-white/20 text-white hover:bg-white/10'
                }`}
              >
                <span className="block transform skew-x-12">{filter}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSquad.map((player) => (
            <div key={player.id} className="group relative bg-giddam-secondary border border-white/10 overflow-hidden hover:border-primary/50 transition-colors">
              {/* Image Placeholder */}
              <div className="aspect-[3/4] w-full bg-black/40 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-giddam-secondary to-transparent z-10 opacity-80"></div>
                {/* Decorative background shape */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/40 transition-colors"></div>
                <span className="text-white/20 font-heading text-9xl absolute z-0 transform -skew-x-12 font-bold">{player.number}</span>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-primary text-sm font-bold tracking-widest uppercase mb-1">{player.position}</p>
                    <h4 className="text-xl font-bold text-white uppercase">{player.name}</h4>
                  </div>
                  <span className="text-3xl font-heading font-bold text-white/40">{player.number}</span>
                </div>
              </div>
              
              {/* Hover styling edge */}
              <div className="absolute top-0 left-0 w-1 h-full bg-primary transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
