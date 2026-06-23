import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { loginAction } from "@/lib/actions";
import { getLocale, t } from "@/lib/i18n";

export default async function LoginPage() {
  const locale = await getLocale();
  const copy = t(locale);

  return (
    <div className="public-section">
      <div className="public-container max-w-xl">
        <div className="public-card rounded-[32px] p-8 sm:p-10">
          <p className="public-kicker">{copy.nav.login}</p>
          <h1 className="public-heading mt-3 text-4xl font-bold text-[var(--color-text)]">{copy.auth.title}</h1>
          <p className="mt-3 text-[var(--color-text-muted)]">{copy.auth.subtitle}</p>
          <form action={loginAction} className="mt-8 grid gap-4">
            <input name="email" type="email" placeholder={copy.auth.email} className="rounded-[18px] border border-[var(--color-outline)] bg-[var(--color-surface)] px-4 py-3" required />
            <input name="password" type="password" placeholder={copy.auth.password} className="rounded-[18px] border border-[var(--color-outline)] bg-[var(--color-surface)] px-4 py-3" required />
            <button type="submit" className="rounded-xl bg-[var(--color-primary)] px-5 py-3 font-semibold text-white">
              {copy.auth.signIn}
            </button>
          </form>
          <div className="mt-4">
            <GoogleSignInButton label={copy.auth.google} />
          </div>
        </div>
      </div>
    </div>
  );
}
