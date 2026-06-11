import { Play } from 'lucide-react';

export function CampaignVideoSection() {
  return (
    <section className="w-full py-24 bg-black relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-background to-black z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white uppercase tracking-widest transform -skew-x-12 mb-4">
            GIDDAM - <span className="text-primary">Saudi Mindset</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl font-sans">
            Witness the passion, the drive, and the unbreakable spirit of the Saudi National Team. We stand united, moving forward with the same goal.
          </p>
        </div>
        
        {/* Video Player Placeholder */}
        <div className="relative w-full aspect-video bg-giddam-secondary border-2 border-white/10 overflow-hidden group cursor-pointer shadow-2xl shadow-primary/10">
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="w-24 h-24 bg-primary/90 text-primary-foreground rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg shadow-black/50 backdrop-blur-sm">
              <Play size={40} className="fill-current ml-2" />
            </div>
          </div>
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10"></div>
          {/* Placeholder visual */}
          <div className="w-full h-full bg-[linear-gradient(45deg,var(--color-giddam-secondary),#002020)] flex items-center justify-center">
             <span className="text-white/20 font-bold tracking-widest uppercase">Video Placeholder</span>
          </div>
        </div>
      </div>
    </section>
  );
}
