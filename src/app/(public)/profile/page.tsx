import { redirect } from "next/navigation";

import { getCurrentProfile } from "@/lib/auth";
import { getLocale, t } from "@/lib/i18n";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { firstRelation } from "@/lib/utils";

export default async function ProfilePage() {
  const locale = await getLocale();
  const copy = t(locale);
  const profile = await getCurrentProfile();

  if (!profile) redirect("/login");

  const admin = createSupabaseAdminClient();
  const [registrationsResult, commentsResult] = admin
    ? await Promise.all([
        admin
          .from("competition_registrations")
          .select("*, competition:competitions(title_en,title_ar)")
          .eq("user_id", profile.id)
          .order("created_at", { ascending: false }),
        admin.from("comments").select("*, news:news(title_en,title_ar)").eq("user_id", profile.id).order("created_at", { ascending: false }),
      ])
    : [{ data: [], error: null }, { data: [], error: null }];

  return (
    <div className="public-section">
      <div className="public-container max-w-6xl">
        <div className="public-card rounded-[36px] p-8 sm:p-10">
          <p className="public-kicker">{copy.nav.profile}</p>
          <h1 className="public-heading mt-3 text-5xl font-bold text-[var(--color-text)]">{copy.profile.title}</h1>
          <p className="mt-3 text-lg text-[var(--color-text-muted)]">{copy.profile.subtitle}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-[24px] bg-[var(--color-surface-muted)] p-4">
              <p className="text-sm text-[var(--color-text-muted)]">{copy.auth.firstName}</p>
              <p className="mt-2 font-semibold text-[var(--color-text)]">{profile.first_name}</p>
            </div>
            <div className="rounded-[24px] bg-[var(--color-surface-muted)] p-4">
              <p className="text-sm text-[var(--color-text-muted)]">{copy.auth.lastName}</p>
              <p className="mt-2 font-semibold text-[var(--color-text)]">{profile.last_name}</p>
            </div>
            <div className="rounded-[24px] bg-[var(--color-surface-muted)] p-4">
              <p className="text-sm text-[var(--color-text-muted)]">{copy.auth.email}</p>
              <p className="mt-2 font-semibold text-[var(--color-text)]">{profile.email}</p>
            </div>
            <div className="rounded-[24px] bg-[var(--color-surface-muted)] p-4">
              <p className="text-sm text-[var(--color-text-muted)]">Role</p>
              <p className="mt-2 font-semibold text-[var(--color-text)]">{profile.role}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="public-card rounded-[32px] p-8">
            <h2 className="public-heading text-3xl font-bold text-[var(--color-text)]">{copy.profile.registrations}</h2>
            <div className="mt-6 space-y-3">
              {(registrationsResult.data ?? []).map((registration) => (
                <div key={registration.id} className="rounded-[22px] border border-[var(--color-outline)] p-4">
                  <p className="font-semibold text-[var(--color-text)]">
                    {locale === "ar" ? firstRelation(registration.competition)?.title_ar : firstRelation(registration.competition)?.title_en}
                  </p>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">{registration.is_winner ? "Winner" : "Participant"}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="public-card rounded-[32px] p-8">
            <h2 className="public-heading text-3xl font-bold text-[var(--color-text)]">{copy.profile.recentComments}</h2>
            <div className="mt-6 space-y-3">
              {(commentsResult.data ?? []).map((comment) => (
                <div key={comment.id} className="rounded-[22px] border border-[var(--color-outline)] p-4">
                  <p className="font-semibold text-[var(--color-text)]">
                    {locale === "ar" ? firstRelation(comment.news)?.title_ar : firstRelation(comment.news)?.title_en}
                  </p>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">{comment.comment_text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
