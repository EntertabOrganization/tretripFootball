import { UserPlus, CalendarDays, CheckCircle2 } from 'lucide-react';

export function TicketGuideSection() {
  const steps = [
    {
      icon: UserPlus,
      title: '1. Create A FIFA Account',
      description: 'Register or log in to your FIFA ticketing account to begin the process.',
    },
    {
      icon: CalendarDays,
      title: '2. Choose Your Match',
      description: 'Browse the match schedule and select the Green Falcons games you want to attend.',
    },
    {
      icon: CheckCircle2,
      title: '3. Submit Your Application',
      description: 'Complete your application and await the ticket allocation draw results.',
    }
  ];

  return (
    <section className="w-full py-24 bg-giddam-secondary relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white uppercase tracking-widest transform -skew-x-12">
            Ticket Purchase Guide
          </h2>
          <p className="text-primary mt-4 uppercase tracking-widest font-bold">Your road to the stands</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-white/20 z-0"></div>
          
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-background border-2 border-primary rounded-full flex items-center justify-center mb-6 relative overflow-hidden shadow-[0_0_15px_rgba(11,157,181,0.2)] group-hover:shadow-[0_0_25px_rgba(11,157,181,0.6)] transition-all">
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Icon size={32} className="text-primary group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">{step.title}</h3>
                <p className="text-white/60 font-sans max-w-xs">{step.description}</p>
              </div>
            );
          })}
        </div>
        
        <div className="mt-16 text-center">
          <a href="https://fifa.com/tickets" target="_blank" rel="noreferrer" className="inline-block px-10 py-5 bg-primary text-primary-foreground font-bold text-xl transform -skew-x-12 hover:bg-giddam-light transition-all shadow-[0_0_20px_rgba(11,157,181,0.4)]">
            <span className="block transform skew-x-12 tracking-wider">Start Application</span>
          </a>
        </div>
      </div>
    </section>
  );
}
