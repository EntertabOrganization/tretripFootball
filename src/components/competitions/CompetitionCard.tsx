import { LockKeyhole, Trophy, Users } from "lucide-react";
import { Link } from "@/i18n/routing";

type CompetitionCardProps = {
  competition: {
    title: string;
    slug: string;
    description: string;
    startDate: Date;
    endDate: Date;
    visibility: "INTERNAL" | "PUBLIC";
  };
};

export function CompetitionCard({ competition }: CompetitionCardProps) {
  return (
    <article className="glass-card flex h-full flex-col justify-between p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <span className="gold-chip">
            {competition.visibility === "INTERNAL" ? (
              <>
                <LockKeyhole className="size-3.5" />
                Internal
              </>
            ) : (
              <>
                <Users className="size-3.5" />
                Public
              </>
            )}
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Ends {competition.endDate.toLocaleDateString()}
          </span>
        </div>

        <div className="space-y-3">
          <h3 className="text-2xl font-semibold text-balance">{competition.title}</h3>
          <p className="text-sm leading-6 text-muted-foreground">{competition.description}</p>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Trophy className="size-4" />
          {competition.startDate.toLocaleDateString()}
        </span>
        <Link href={`/competitions/${competition.slug}`} className="text-sm font-semibold text-primary transition hover:text-accent">
          View details
        </Link>
      </div>
    </article>
  );
}
