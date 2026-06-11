export function CampaignAssetsSection() {
  const assets = [1, 2, 3, 4, 5, 6]; // Dummy placeholders

  return (
    <section className="w-full py-24 bg-background overflow-hidden relative">
      <div className="absolute -left-32 top-0 w-64 h-full bg-primary/5 blur-3xl transform skew-x-12 z-0"></div>

      <div className="max-w-7xl mx-auto px-4 mb-12 relative z-10">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary uppercase tracking-wide transform -skew-x-12">
          Campaign Assets
        </h2>
        <div className="w-24 h-1 bg-giddam-gold mt-4 transform -skew-x-12"></div>
      </div>
      
      {/* Horizontal scroll container */}
      <div className="flex gap-6 overflow-x-auto pb-8 px-4 md:px-12 snap-x scrollbar-hide relative z-10">
        {assets.map((item) => (
          <div key={item} className="snap-center shrink-0 w-80 md:w-[26rem] aspect-[4/5] bg-giddam-secondary border border-white/10 flex items-center justify-center relative group cursor-pointer hover:border-primary/50 transition-colors">
             <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
             <span className="text-white/30 font-bold tracking-widest uppercase relative z-0">Asset {item} Placeholder</span>
          </div>
        ))}
      </div>
    </section>
  );
}
