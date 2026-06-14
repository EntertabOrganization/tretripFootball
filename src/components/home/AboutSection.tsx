import { useTranslations, useLocale } from 'next-intl';
import { ARAB_TEAMS } from '@/data/arabMatches';

interface AboutSectionProps {
  selectedTeamCode?: string;
}

const NICKNAMES: Record<string, { en: string; ar: string }> = {
  KSA: { en: 'Green Falcons', ar: 'Ø§Ù„ØµÙ‚ÙˆØ± Ø§Ù„Ø®Ø¶Ø±' },
  MAR: { en: 'Atlas Lions', ar: 'Ø£Ø³ÙˆØ¯ Ø§Ù„Ø£Ø·Ù„Ø³' },
  EGY: { en: 'Pharaohs', ar: 'Ø§Ù„ÙØ±Ø§Ø¹Ù†Ø©' },
  JOR: { en: 'The Chivalrous (Al-Nashama)', ar: 'Ø§Ù„Ù†Ø´Ø§Ù…Ù‰' },
  IRQ: { en: 'Lions of Mesopotamia', ar: 'Ø£Ø³ÙˆØ¯ Ø§Ù„Ø±Ø§ÙØ¯ÙŠÙ†' },
  ALG: { en: 'Desert Warriors', ar: 'Ù…Ø­Ø§Ø±Ø¨Ùˆ Ø§Ù„ØµØ­Ø±Ø§Ø¡' },
  QAT: { en: 'The Maroon', ar: 'Ø§Ù„Ø¹Ù†Ø§Ø¨ÙŠ' },
  TUN: { en: 'Eagles of Carthage', ar: 'Ù†Ø³ÙˆØ± Ù‚Ø±Ø·Ø§Ø¬' },
};

export function AboutSection({ selectedTeamCode = 'KSA' }: AboutSectionProps) {
  const t = useTranslations('AboutSection');
  const locale = useLocale();

  const currentTeam = ARAB_TEAMS.find((team) => team.code === selectedTeamCode) || ARAB_TEAMS[0];
  const nickname = NICKNAMES[currentTeam.code]?.[locale as 'en' | 'ar'] || currentTeam.name;

  const journeyTitle =
    selectedTeamCode === 'KSA'
      ? t('journeyTitle')
      : locale === 'en'
        ? `${currentTeam.name} World Cup Journey`
        : `Ø±Ø­Ù„Ø© ${currentTeam.nameAr} ÙÙŠ ÙƒØ£Ø³ Ø§Ù„Ø¹Ø§Ù„Ù…`;

  const journeyText =
    selectedTeamCode === 'KSA'
      ? t('journeyText')
      : locale === 'en'
        ? `The ${currentTeam.name} national team has a proud footballing heritage. With their passionate fans and memorable performances on the global stage, they continue to inspire the next generation of football players in the region.`
        : `ÙŠØªÙ…ØªØ¹ Ù…Ù†ØªØ®Ø¨ ${currentTeam.nameAr} Ø¨ØªØ§Ø±ÙŠØ® Ø±ÙŠØ§Ø¶ÙŠ Ø¹Ø±ÙŠÙ‚ ÙˆÙ…Ø´Ø±Ù. ÙˆØ¨ÙØ¶Ù„ Ø¬Ù…Ø§Ù‡ÙŠØ±Ù‡ Ø§Ù„Ø´ØºÙˆÙØ© ÙˆØ£Ø¯Ø§Ø¦Ù‡ Ø§Ù„Ù…ØªÙ…ÙŠØ² Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø­Ø© Ø§Ù„Ø¯ÙˆÙ„ÙŠØ©ØŒ ÙŠÙˆØ§ØµÙ„ Ø§Ù„ÙØ±ÙŠÙ‚ Ø¥Ù„Ù‡Ø§Ù… Ø§Ù„Ø£Ø¬ÙŠØ§Ù„ Ø§Ù„Ù‚Ø§Ø¯Ù…Ø© Ù…Ù† Ù„Ø§Ø¹Ø¨ÙŠ ÙƒØ±Ø© Ø§Ù„Ù‚Ø¯Ù… ÙÙŠ Ø§Ù„Ù…Ù†Ø·Ù‚Ø©.`;

  const roadTitle =
    selectedTeamCode === 'KSA'
      ? t('roadTitle')
      : locale === 'en'
        ? 'The Road to World Cup 2026'
        : `Ø§Ù„Ø·Ø±ÙŠÙ‚ Ø¥Ù„Ù‰ ÙƒØ£Ø³ Ø§Ù„Ø¹Ø§Ù„Ù… Ù¢Ù Ù¢Ù¦`;

  const roadText =
    selectedTeamCode === 'KSA'
      ? t('roadText')
      : locale === 'en'
        ? `Preparing for the historic 2026 FIFA World Cup, the squad is fueled by ambition and the dreams of their nation. The road ahead is challenging, but with unity and focus, they are ready to write a new chapter of glory.`
        : `Ø§Ø³ØªØ¹Ø¯Ø§Ø¯Ø§Ù‹ Ù„Ø¨Ø·ÙˆÙ„Ø© ÙƒØ£Ø³ Ø§Ù„Ø¹Ø§Ù„Ù… FIFA Ù¢Ù Ù¢Ù¦ Ø§Ù„ØªØ§Ø±ÙŠØ®ÙŠØ©ØŒ ÙŠØªØ³Ù„Ø­ Ø§Ù„ÙØ±ÙŠÙ‚ Ø¨Ø§Ù„Ø·Ù…ÙˆØ­ ÙˆØ£Ø­Ù„Ø§Ù… ÙˆØ·Ù†Ù‡. Ø§Ù„Ø·Ø±ÙŠÙ‚ Ø£Ù…Ø§Ù…Ù†Ø§ Ù…Ù„ÙŠØ¡ Ø¨Ø§Ù„ØªØ­Ø¯ÙŠØ§ØªØŒ ÙˆÙ„ÙƒÙ† Ø¨Ø§Ù„ÙˆØ­Ø¯Ø© ÙˆØ§Ù„ØªØ±ÙƒÙŠØ²ØŒ Ù‡Ù… Ù…Ø³ØªØ¹Ø¯ÙˆÙ† Ù„ÙƒØªØ§Ø¨Ø© ÙØµÙ„ Ø¬Ø¯ÙŠØ¯ Ù…Ù† Ø§Ù„Ø£Ù…Ø¬Ø§Ø¯.`;

  return (
    <section id="about" className="w-full border-t border-border bg-white py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-12 lg:flex-row">
          <div className="flex-1 space-y-12">
            <div>
              <h2 className="mb-6 transform -skew-x-12 text-4xl font-heading font-bold uppercase tracking-wide text-accent md:text-5xl">
                {journeyTitle}
              </h2>
              <p className="font-sans text-lg leading-relaxed text-foreground/80">{journeyText}</p>
            </div>

            <div>
              <h2 className="mb-6 transform -skew-x-12 text-4xl font-heading font-bold uppercase tracking-wide text-accent md:text-5xl">
                {roadTitle}
              </h2>
              <p className="font-sans text-lg leading-relaxed text-foreground/80">{roadText}</p>
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-primary/20 bg-white p-8 shadow-[0_24px_50px_rgba(18,53,58,0.08)]">
              <div className="absolute right-0 top-0 h-full w-2 translate-x-1 transform bg-primary skew-x-12" />

              <h3 className="mb-8 border-b border-primary/20 pb-4 text-2xl font-heading font-bold uppercase text-foreground">
                {t('basicInfoTitle')}
              </h3>

              <div className="space-y-6">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold uppercase tracking-widest text-primary">{t('nickname')}</span>
                  <span className="text-xl font-medium text-foreground">{nickname}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold uppercase tracking-widest text-primary">{t('manager')}</span>
                  <span className="text-xl font-medium text-foreground">{currentTeam.manager}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold uppercase tracking-widest text-primary">{t('worldCupAppearances')}</span>
                  <span className="text-xl font-medium text-foreground">{currentTeam.worldCupAppearances}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold uppercase tracking-widest text-primary">{t('confederation')}</span>
                  <span className="text-xl font-medium text-foreground">{currentTeam.confederation}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold uppercase tracking-widest text-primary">
                    {locale === 'en' ? 'Group' : 'Ø§Ù„Ù…Ø¬Ù…ÙˆØ¹Ø©'}
                  </span>
                  <span className="text-xl font-medium text-foreground">{currentTeam.group}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold uppercase tracking-widest text-primary">
                    {locale === 'en' ? 'Best Result' : 'Ø£ÙØ¶Ù„ Ù†ØªÙŠØ¬Ø©'}
                  </span>
                  <span className="text-xl font-medium text-foreground">{currentTeam.bestResult}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
