'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ARAB_TEAMS_DATA } from '@/data/arabTeams';
import { COMPETITIONS } from '@/data/competitions';

type CompetitionRegistrationFormProps = {
  defaultCompetitionSlug?: string;
};

type FormState = {
  competitionSlug: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  favoriteNationalTeam: string;
  entryAnswer: string;
};

const initialFormState = (defaultCompetitionSlug?: string): FormState => ({
  competitionSlug: defaultCompetitionSlug || COMPETITIONS[0]?.slug || '',
  fullName: '',
  email: '',
  phone: '',
  country: '',
  favoriteNationalTeam: ARAB_TEAMS_DATA[0]?.code || 'KSA',
  entryAnswer: '',
});

export function CompetitionRegistrationForm({ defaultCompetitionSlug }: CompetitionRegistrationFormProps) {
  const t = useTranslations('CompetitionForm');
  const locale = useLocale();
  const [form, setForm] = useState<FormState>(() => initialFormState(defaultCompetitionSlug));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const selectedCompetition = useMemo(
    () => COMPETITIONS.find((competition) => competition.slug === form.competitionSlug) ?? COMPETITIONS[0],
    [form.competitionSlug]
  );

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/competitions/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const result = (await response.json()) as { error?: string; message?: string };

      if (!response.ok) {
        throw new Error(result.error || t('error'));
      }

      setSuccess(result.message || t('success'));
      setForm(initialFormState(defaultCompetitionSlug));
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : t('error'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="tretrip-soft-card rounded-[2rem] p-7 md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-bold text-accent">{t('competition')}</label>
          <select
            value={form.competitionSlug}
            onChange={(event) => updateField('competitionSlug', event.target.value)}
            className="w-full rounded-[1.2rem] border border-white/75 bg-white/85 px-4 py-3 text-foreground outline-none focus:border-primary"
          >
            {COMPETITIONS.map((competition) => (
              <option key={competition.slug} value={competition.slug}>
                {locale === 'ar' ? competition.title.ar : competition.title.en}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-accent">{t('fullName')}</label>
          <input
            required
            value={form.fullName}
            onChange={(event) => updateField('fullName', event.target.value)}
            className="w-full rounded-[1.2rem] border border-white/75 bg-white/85 px-4 py-3 text-foreground outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-accent">{t('email')}</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
            className="w-full rounded-[1.2rem] border border-white/75 bg-white/85 px-4 py-3 text-foreground outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-accent">{t('phone')}</label>
          <input
            required
            value={form.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            className="w-full rounded-[1.2rem] border border-white/75 bg-white/85 px-4 py-3 text-foreground outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-accent">{t('country')}</label>
          <input
            required
            value={form.country}
            onChange={(event) => updateField('country', event.target.value)}
            className="w-full rounded-[1.2rem] border border-white/75 bg-white/85 px-4 py-3 text-foreground outline-none focus:border-primary"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-bold text-accent">{t('favoriteTeam')}</label>
          <select
            value={form.favoriteNationalTeam}
            onChange={(event) => updateField('favoriteNationalTeam', event.target.value)}
            className="w-full rounded-[1.2rem] border border-white/75 bg-white/85 px-4 py-3 text-foreground outline-none focus:border-primary"
          >
            {ARAB_TEAMS_DATA.map((team) => (
              <option key={team.code} value={team.code}>
                {locale === 'ar' ? `${team.countryNameAr} - ${team.nicknameAr}` : `${team.countryName} - ${team.nickname}`}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-bold text-accent">{t('entry')}</label>
          <textarea
            required
            rows={5}
            value={form.entryAnswer}
            onChange={(event) => updateField('entryAnswer', event.target.value)}
            placeholder={locale === 'ar' ? selectedCompetition.summary.ar : selectedCompetition.summary.en}
            className="w-full rounded-[1.2rem] border border-white/75 bg-white/85 px-4 py-3 text-foreground outline-none focus:border-primary"
          />
        </div>
      </div>

      {error ? (
        <div className="mt-5 rounded-[1.1rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {success ? (
        <div className="mt-5 rounded-[1.1rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {success}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? t('submitting') : t('submit')}
      </button>
    </form>
  );
}
