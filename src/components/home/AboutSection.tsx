import { useTranslations, useLocale } from 'next-intl';
import { ARAB_TEAMS } from '@/data/arabMatches';

interface AboutSectionProps {
  selectedTeamCode?: string;
}

const NICKNAMES: Record<string, { en: string; ar: string }> = {
  KSA: { en: 'Green Falcons', ar: 'الصقور الخضر' },
  MAR: { en: 'Atlas Lions', ar: 'أسود الأطلس' },
  EGY: { en: 'Pharaohs', ar: 'الفراعنة' },
  JOR: { en: 'The Chivalrous (Al-Nashama)', ar: 'النشامى' },
  IRQ: { en: 'Lions of Mesopotamia', ar: 'أسود الرافدين' },
  ALG: { en: 'Desert Warriors', ar: 'محاربو الصحراء' },
  QAT: { en: 'The Maroon', ar: 'العنابي' },
  TUN: { en: 'Eagles of Carthage', ar: 'نسور قرطاج' },
};

export function AboutSection({ selectedTeamCode = 'KSA' }: AboutSectionProps) {
  const t = useTranslations('AboutSection');
  const locale = useLocale();

  const currentTeam = ARAB_TEAMS.find((team) => team.code === selectedTeamCode) || ARAB_TEAMS[0];
  const nickname = NICKNAMES[currentTeam.code]?.[locale as 'en' | 'ar'] || currentTeam.name;

  const journeyTitle = selectedTeamCode === 'KSA' 
    ? t('journeyTitle') 
    : locale === 'en' 
      ? `${currentTeam.name} World Cup Journey` 
      : `رحلة ${currentTeam.nameAr} في كأس العالم`;
      
  const journeyText = selectedTeamCode === 'KSA' 
    ? t('journeyText') 
    : locale === 'en'
      ? `The ${currentTeam.name} national team has a proud footballing heritage. With their passionate fans and memorable performances on the global stage, they continue to inspire the next generation of football players in the region.`
      : `يتمتع منتخب ${currentTeam.nameAr} بتاريخ رياضي عريق ومشرف. وبفضل جماهيره الشغوفة وأدائه المتميز على الساحة الدولية، يواصل الفريق إلهام الأجيال القادمة من لاعبي كرة القدم في المنطقة.`;

  const roadTitle = selectedTeamCode === 'KSA' 
    ? t('roadTitle') 
    : locale === 'en'
      ? `The Road to World Cup 2026`
      : `الطريق إلى كأس العالم ٢٠٢٦`;

  const roadText = selectedTeamCode === 'KSA' 
    ? t('roadText') 
    : locale === 'en'
      ? `Preparing for the historic 2026 FIFA World Cup, the squad is fueled by ambition and the dreams of their nation. The road ahead is challenging, but with unity and focus, they are ready to write a new chapter of glory.`
      : `استعداداً لبطولة كأس العالم FIFA ٢٠٢٦ التاريخية، يتسلح الفريق بالطموح وأحلام وطنه. الطريق أمامنا مليء بالتحديات، ولكن بالوحدة والتركيز، هم مستعدون لكتابة فصل جديد من الأمجاد.`;

  return (
    <section id="about" className="w-full py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main content */}
          <div className="flex-1 space-y-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#0B9DB5] uppercase tracking-wide transform -skew-x-12 mb-6">
                {journeyTitle}
              </h2>
              <p className="text-lg text-[#071C25]/80 leading-relaxed font-sans">
                {journeyText}
              </p>
            </div>
            
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#0B9DB5] uppercase tracking-wide transform -skew-x-12 mb-6">
                {roadTitle}
              </h2>
              <p className="text-lg text-[#071C25]/80 leading-relaxed font-sans">
                {roadText}
              </p>
            </div>
          </div>
          
          {/* Basic Information Panel */}
          <div className="w-full lg:w-1/3">
            <div className="bg-[#f0fbfd] border border-[#0B9DB5]/20 p-8 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-2 h-full bg-[#0B9DB5] transform skew-x-12 translate-x-1"></div>
              
              <h3 className="text-2xl font-heading font-bold text-[#071C25] uppercase mb-8 border-b border-[#0B9DB5]/20 pb-4">
                {t('basicInfoTitle')}
              </h3>
              
              <div className="space-y-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[#0B9DB5] text-sm uppercase font-bold tracking-widest">{t('nickname')}</span>
                  <span className="text-xl text-[#071C25] font-medium">{nickname}</span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="text-[#0B9DB5] text-sm uppercase font-bold tracking-widest">{t('manager')}</span>
                  <span className="text-xl text-[#071C25] font-medium">{currentTeam.manager}</span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="text-[#0B9DB5] text-sm uppercase font-bold tracking-widest">{t('worldCupAppearances')}</span>
                  <span className="text-xl text-[#071C25] font-medium">{currentTeam.worldCupAppearances}</span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="text-[#0B9DB5] text-sm uppercase font-bold tracking-widest">{t('confederation')}</span>
                  <span className="text-xl text-[#071C25] font-medium">{currentTeam.confederation}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[#0B9DB5] text-sm uppercase font-bold tracking-widest">{locale === 'en' ? 'Group' : 'المجموعة'}</span>
                  <span className="text-xl text-[#071C25] font-medium">{currentTeam.group}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[#0B9DB5] text-sm uppercase font-bold tracking-widest">{locale === 'en' ? 'Best Result' : 'أفضل نتيجة'}</span>
                  <span className="text-xl text-[#071C25] font-medium">{currentTeam.bestResult}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
