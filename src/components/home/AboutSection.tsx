import { useLocale, useTranslations } from 'next-intl';
import { getTeamByCode } from '@/data/arabTeams';

interface AboutSectionProps {
  selectedTeamCode?: string;
}

export function AboutSection({ selectedTeamCode = 'KSA' }: AboutSectionProps) {
  const t = useTranslations('AboutSection');
  const locale = useLocale();
  const team = getTeamByCode(selectedTeamCode);

  return (
    <section id="about" className="w-full border-t border-border bg-white py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.32em] text-primary">{t('journeyEyebrow')}</p>
              <h2 className="mt-4 text-4xl font-heading font-bold text-accent md:text-5xl">
                {locale === 'ar' ? `${team.countryNameAr} في كأس العالم 2026` : `${team.countryName} at World Cup 2026`}
              </h2>
              <p className="mt-6 text-lg leading-8 text-foreground/80">
                {locale === 'ar' ? team.shortDescriptionAr : team.shortDescription}
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-border bg-[linear-gradient(180deg,#ffffff_0%,#f3fbfb_100%)] p-7 shadow-[0_24px_50px_rgba(18,53,58,0.08)]">
              <h3 className="text-2xl font-heading font-bold text-foreground">{t('roadTitle')}</h3>
              <p className="mt-4 text-lg leading-8 text-foreground/75">
                {locale === 'en'
                  ? `Group ${team.group} presents ${team.countryName} with matches against ${team.groupOpponents.join(', ')}. TreTrip now uses a centralized schedule so country-based content changes everywhere the selector is used.`
                  : `تقدم المجموعة ${team.group} لمنتخب ${team.countryNameAr} مباريات أمام ${team.groupOpponentsAr.join('، ')}. يعتمد TreTrip الآن على مصدر بيانات موحد حتى تتغير كل الأقسام المرتبطة بالمنتخب بمجرد تغيير الاختيار.`}
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-primary/20 bg-white p-8 shadow-[0_24px_50px_rgba(18,53,58,0.08)]">
            <h3 className="border-b border-primary/20 pb-4 text-2xl font-heading font-bold text-foreground">
              {t('basicInfoTitle')}
            </h3>

            <div className="mt-6 space-y-5">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-primary">{t('nickname')}</p>
                <p className="mt-2 text-xl font-medium text-foreground">{locale === 'ar' ? team.nicknameAr : team.nickname}</p>
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-primary">{t('group')}</p>
                <p className="mt-2 text-xl font-medium text-foreground">{team.group}</p>
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-primary">{t('opponents')}</p>
                <p className="mt-2 text-xl font-medium text-foreground">
                  {locale === 'ar' ? team.groupOpponentsAr.join('، ') : team.groupOpponents.join(', ')}
                </p>
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-primary">{t('keyPlayers')}</p>
                <p className="mt-2 text-xl font-medium text-foreground">
                  {locale === 'ar' ? team.keyPlayersAr.join('، ') : team.keyPlayers.join(', ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
