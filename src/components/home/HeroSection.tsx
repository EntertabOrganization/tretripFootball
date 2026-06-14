import { useTranslations } from 'next-intl';

export function HeroSection() {
  const t = useTranslations('HomePage');

  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#0b2f34] px-4 pt-56 md:px-10 lg:px-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_28%,rgba(255,255,255,0.18),transparent_28%),linear-gradient(135deg,rgba(11,157,181,0.28),rgba(4,44,48,0.82)_45%,rgba(3,71,67,0.94))]" />
      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(255,255,255,0.08)_0_18%,transparent_18%_40%,rgba(255,255,255,0.06)_40%_54%,transparent_54%)] opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-giddam-secondary/30 to-background/70" />
      <div className="absolute bottom-0 right-0 h-2/3 w-1/2 -skew-x-12 bg-primary/15 blur-3xl" />

      <div className="relative z-10 mx-auto flex w-full max-w-[112rem] flex-col items-start">
        <h1 className="max-w-[96rem] font-heading text-5xl font-bold uppercase leading-[0.9] tracking-normal text-white drop-shadow-2xl sm:text-7xl md:text-8xl lg:text-[7.2rem] xl:text-[8.6rem]">
          <span className="text-white">GIDDAM </span>
          <span className="text-primary">WITH THE SAME SPIRIT</span>
        </h1>

        <p className="mt-10 max-w-5xl text-2xl font-medium leading-relaxed text-white/95 md:text-3xl">
          The official national team campaign for the 2026 FIFA World Cup, and be part of the event.
        </p>

        <div className="mt-10 flex w-full flex-col gap-5 sm:w-auto sm:flex-row">
          <a
            href="https://fifa.com/tickets"
            className="inline-flex min-w-72 -skew-x-12 items-center justify-center rounded-md bg-primary px-12 py-5 text-xl font-bold italic text-[#07333a] shadow-[0_18px_35px_rgba(11,157,181,0.26)] transition-colors hover:bg-accent"
          >
            <span className="skew-x-12">{t('bookTicket')}</span>
          </a>
          <a
            href="#matches"
            className="inline-flex min-w-72 -skew-x-12 items-center justify-center rounded-md border border-white/35 bg-white/5 px-12 py-5 text-xl font-bold italic text-white backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            <span className="skew-x-12">{t('matchSchedule')}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
