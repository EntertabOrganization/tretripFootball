import { CompetitionCard } from "@/components/cards/competition-card";
import { getCompetitionsList } from "@/lib/data";
import { getLocale, t } from "@/lib/i18n";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CompetitionsPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = typeof params.page === "string" ? params.page : undefined;
  const pageSize = typeof params.pageSize === "string" ? params.pageSize : undefined;
  const locale = await getLocale();
  const copy = t(locale);
  const competitions = await getCompetitionsList({ page, pageSize });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm uppercase tracking-[0.25em] text-[var(--color-primary)]">{copy.nav.competitions}</p>
        <h1 className="mt-3 font-display text-5xl text-slate-950">{copy.competitions.title}</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-600">{copy.competitions.subtitle}</p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {competitions.items.map((competition) => (
          <CompetitionCard key={competition.id} competition={competition} locale={locale} />
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between rounded-[28px] border border-slate-200 bg-white p-5 text-sm text-slate-600">
        <span>
          {copy.common.page} {competitions.page} / {competitions.totalPages}
        </span>
        <div className="flex gap-3">
          {competitions.page > 1 ? (
            <a className="rounded-full border border-slate-200 px-4 py-2" href={`/competitions?page=${competitions.page - 1}`}>
              Prev
            </a>
          ) : null}
          {competitions.page < competitions.totalPages ? (
            <a className="rounded-full border border-slate-200 px-4 py-2" href={`/competitions?page=${competitions.page + 1}`}>
              Next
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
