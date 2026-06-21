import { getTranslations } from "next-intl/server";
import { logoutAction, updateProfileFormAction } from "@/app/[locale]/actions";
import { requireAuth } from "@/lib/permissions";
import { getProfileData } from "@/lib/queries";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Profile");
  const user = await requireAuth();
  const profile = await getProfileData(user.id);

  if (!profile) {
    return null;
  }

  return (
    <div className="shell space-y-8">
      <section className="glass-card p-8 sm:p-10">
        <div className="section-kicker">{t("title")}</div>
        <h1 className="mt-3 text-4xl font-semibold">{t("title")}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{t("subtitle")}</p>
      </section>

      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="glass-card p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold">{t("details")}</h2>
            <form action={logoutAction}>
              <input type="hidden" name="locale" value={locale} />
              <button className="rounded-full border border-border px-4 py-2 text-sm font-medium transition hover:border-primary hover:text-primary">
                {t("logout")}
              </button>
            </form>
          </div>

          <form action={updateProfileFormAction} className="space-y-4">
            <input type="hidden" name="locale" value={locale} />
            <div className="field-grid">
              <div>
                <label className="mb-2 block text-sm font-medium">Full name</label>
                <input name="fullName" defaultValue={profile.fullName} />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>
                <input defaultValue={profile.email} disabled />
              </div>
            </div>
            <div className="field-grid">
              <div>
                <label className="mb-2 block text-sm font-medium">Phone number</label>
                <input name="phoneNumber" defaultValue={profile.phoneNumber ?? ""} />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Access</label>
                <input defaultValue={`${profile.role} / ${profile.userType}`} disabled />
              </div>
            </div>
            <button className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
              {t("save")}
            </button>
          </form>
        </section>

        <div className="space-y-8">
          <section className="glass-card p-8">
            <h2 className="text-2xl font-semibold">{t("joinedCompetitions")}</h2>
            <div className="mt-5 space-y-4">
              {profile.competitionRegistrations.length ? (
                profile.competitionRegistrations.map((item) => (
                  <div key={item.competitionId} className="rounded-3xl border border-border bg-background p-4">
                    <div className="font-semibold">{item.competition.title}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{item.competition.description}</div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">{t("emptyCompetitions")}</p>
              )}
            </div>
          </section>

          <section className="glass-card p-8">
            <h2 className="text-2xl font-semibold">{t("recentComments")}</h2>
            <div className="mt-5 space-y-4">
              {profile.comments.length ? (
                profile.comments.map((comment) => (
                  <div key={comment.id} className="rounded-3xl border border-border bg-background p-4">
                    <div className="text-sm font-semibold">{comment.blog.title}</div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{comment.commentText}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">{t("emptyComments")}</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
