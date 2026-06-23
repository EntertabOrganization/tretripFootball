import { redirect } from "next/navigation";

import { getCurrentProfile } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { getLocale, t } from "@/lib/i18n";
import { firstRelation } from "@/lib/utils";

export default async function ProfilePage() {
  const locale = await getLocale();
  const copy = t(locale);
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/login");
  }

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
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="font-display text-5xl text-slate-950">{copy.profile.title}</h1>
        <p className="mt-3 text-lg text-slate-600">{copy.profile.subtitle}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">{copy.auth.firstName}</p>
            <p className="mt-2 font-semibold text-slate-900">{profile.first_name}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">{copy.auth.lastName}</p>
            <p className="mt-2 font-semibold text-slate-900">{profile.last_name}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">{copy.auth.email}</p>
            <p className="mt-2 font-semibold text-slate-900">{profile.email}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Role</p>
            <p className="mt-2 font-semibold text-slate-900">{profile.role}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="font-display text-3xl text-slate-950">{copy.profile.registrations}</h2>
          <div className="mt-6 space-y-3">
            {(registrationsResult.data ?? []).map((registration) => (
              <div key={registration.id} className="rounded-3xl border border-slate-200 p-4">
                <p className="font-semibold text-slate-900">
                  {locale === "ar"
                    ? firstRelation(registration.competition)?.title_ar
                    : firstRelation(registration.competition)?.title_en}
                </p>
                <p className="mt-2 text-sm text-slate-500">{registration.is_winner ? "Winner" : "Participant"}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="font-display text-3xl text-slate-950">{copy.profile.recentComments}</h2>
          <div className="mt-6 space-y-3">
            {(commentsResult.data ?? []).map((comment) => (
              <div key={comment.id} className="rounded-3xl border border-slate-200 p-4">
                <p className="font-semibold text-slate-900">
                  {locale === "ar" ? firstRelation(comment.news)?.title_ar : firstRelation(comment.news)?.title_en}
                </p>
                <p className="mt-2 text-sm text-slate-600">{comment.comment_text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
