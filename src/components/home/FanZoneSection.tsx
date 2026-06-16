import { useLocale, useTranslations } from 'next-intl';
import { getFanZoneText, getTeamByCode } from '@/data/arabTeams';

interface FanZoneSectionProps {
  selectedTeamCode?: string;
}

export function FanZoneSection({ selectedTeamCode = 'KSA' }: FanZoneSectionProps) {
  const t = useTranslations('FanZone');
  const locale = useLocale();
  const team = getTeamByCode(selectedTeamCode);

  return (
    <section id="fan-zone" className="tretrip-section-light border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.32em] text-primary">{t('eyebrow')}</p>
            <h2 className="mt-4 text-4xl font-heading font-bold text-accent md:text-5xl">{t('title')}</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/75">
              {getFanZoneText(team.code, locale as 'en' | 'ar')}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="tretrip-soft-card rounded-[1.6rem] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">{t('content')}</p>
              <h3 className="mt-3 text-2xl font-semibold text-foreground">{locale === 'ar' ? team.countryNameAr : team.countryName}</h3>
              <p className="mt-3 text-sm leading-7 text-foreground/68">{locale === 'ar' ? team.fanContent.ar : team.fanContent.en}</p>
            </div>
            <div className="tretrip-soft-card rounded-[1.6rem] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">{t('competition')}</p>
              <h3 className="mt-3 text-2xl font-semibold text-foreground">{locale === 'ar' ? team.nicknameAr : team.nickname}</h3>
              <p className="mt-3 text-sm leading-7 text-foreground/68">
                {locale === 'ar' ? team.competitionBlurb.ar : team.competitionBlurb.en}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
