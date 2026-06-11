import { Smartphone } from 'lucide-react';

export function AppDownloadSection() {
  return (
    <section className="w-full py-24 bg-background relative border-t border-b border-white/5">
      <div className="absolute left-0 top-0 w-1/2 h-full bg-giddam-secondary/30 transform skew-x-12 -translate-x-32 z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">
        <div className="flex-1 space-y-8">
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white uppercase tracking-widest leading-tight">
            Get Closer with <br/>
            <span className="text-primary transform inline-block -skew-x-12 mt-2">SAFF FANS APP</span>
          </h2>
          
          <p className="text-xl text-white/80 max-w-xl">
            The official app for Saudi Arabian national team fans. Get exclusive content, live updates, digital tickets, and join the ultimate fan community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a href="#" className="flex items-center justify-center gap-3 bg-white text-black px-6 py-4 rounded hover:bg-giddam-light transition-colors">
              <Smartphone size={24} />
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold opacity-70">Download on the</span>
                <span className="text-lg font-bold leading-none">App Store</span>
              </div>
            </a>
            <a href="#" className="flex items-center justify-center gap-3 bg-white text-black px-6 py-4 rounded hover:bg-giddam-light transition-colors">
              <Smartphone size={24} />
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold opacity-70">GET IT ON</span>
                <span className="text-lg font-bold leading-none">Google Play</span>
              </div>
            </a>
          </div>
        </div>
        
        <div className="w-full md:w-5/12 flex justify-center relative">
          {/* Abstract Phone Mockup Placeholder */}
          <div className="w-64 h-[500px] border-4 border-white/20 rounded-[3rem] bg-giddam-secondary relative overflow-hidden shadow-2xl shadow-primary/20 flex flex-col items-center justify-center p-6 text-center">
             <div className="absolute top-0 w-32 h-6 bg-background rounded-b-xl"></div>
             <div className="text-primary font-heading text-3xl font-bold mb-4 transform -skew-x-12">SAFF FANS</div>
             <div className="w-full h-48 bg-primary/20 rounded-lg border border-primary/30 mb-4"></div>
             <div className="w-full h-24 bg-white/5 rounded-lg mb-2"></div>
             <div className="w-full h-24 bg-white/5 rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
