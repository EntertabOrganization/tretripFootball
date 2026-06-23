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
    <div className="public-section">
      <div className="public-container">
        <div className="public-card rounded-[32px] p-8 sm:p-10">
          <p className="public-kicker">{copy.nav.competitions}</p>
          <h1 className="public-heading mt-3 text-5xl font-bold text-[var(--color-text)]">{copy.competitions.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--color-text-muted)]">{copy.competitions.subtitle}</p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {competitions.items.map((competition) => (
            <CompetitionCard key={competition.id} competition={competition} locale={locale} />
          ))}
        </div>

        <div className="public-card mt-8 flex flex-wrap items-center justify-between gap-4 rounded-[24px] p-5 text-sm text-[var(--color-text-muted)]">
          <span>
            {copy.common.page} {competitions.page} / {competitions.totalPages}
          </span>
          <div className="flex gap-3">
            {competitions.page > 1 ? (
              <a className="rounded-xl border border-[var(--color-outline)] px-4 py-2 font-semibold text-[var(--color-text)]" href={`/competitions?page=${competitions.page - 1}`}>
                Prev
              </a>
            ) : null}
            {competitions.page < competitions.totalPages ? (
              <a className="rounded-xl border border-[var(--color-outline)] px-4 py-2 font-semibold text-[var(--color-text)]" href={`/competitions?page=${competitions.page + 1}`}>
                Next
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
