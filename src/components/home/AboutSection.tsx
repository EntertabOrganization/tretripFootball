export function AboutSection() {
  return (
    <section className="w-full py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main content */}
          <div className="flex-1 space-y-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary uppercase tracking-wide transform -skew-x-12 mb-6">
                Our World Cup Journey
              </h2>
              <p className="text-lg text-white/80 leading-relaxed font-sans">
                The Saudi Arabian national team has a rich history in the FIFA World Cup, showcasing the kingdom&apos;s passion for football on the global stage. From our unforgettable debut in 1994 to our historic victory against Argentina in 2022, the Green Falcons continue to soar.
              </p>
            </div>
            
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary uppercase tracking-wide transform -skew-x-12 mb-6">
                Our Road to World Cup 2026
              </h2>
              <p className="text-lg text-white/80 leading-relaxed font-sans">
                With a renewed spirit and relentless determination, our squad is preparing for the ultimate challenge. The road to 2026 is paved with hard work, and we invite every fan to stand behind the team as we aim to make history once again.
              </p>
            </div>
          </div>
          
          {/* Basic Information Panel */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white/5 border border-white/10 p-8 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-2 h-full bg-primary transform skew-x-12 translate-x-1"></div>
              
              <h3 className="text-2xl font-heading font-bold text-white uppercase mb-8 border-b border-white/10 pb-4">
                Basic Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex flex-col gap-1">
                  <span className="text-primary text-sm uppercase font-bold tracking-widest">Nickname</span>
                  <span className="text-xl text-white font-medium">Green Falcons</span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="text-primary text-sm uppercase font-bold tracking-widest">Manager</span>
                  <span className="text-xl text-white font-medium">Georgios Donis</span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="text-primary text-sm uppercase font-bold tracking-widest">World Cup Appearances</span>
                  <span className="text-xl text-white font-medium">7</span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="text-primary text-sm uppercase font-bold tracking-widest">Confederation</span>
                  <span className="text-xl text-white font-medium">AFC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
