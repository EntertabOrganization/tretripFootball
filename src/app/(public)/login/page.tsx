import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { loginAction } from "@/lib/actions";
import { getLocale, t } from "@/lib/i18n";

export default async function LoginPage() {
  const locale = await getLocale();
  const copy = t(locale);

  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:px-6">
      <div className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="font-display text-4xl text-slate-950">{copy.auth.title}</h1>
        <p className="mt-3 text-slate-600">{copy.auth.subtitle}</p>
        <form action={loginAction} className="mt-8 grid gap-4">
          <input name="email" type="email" placeholder={copy.auth.email} className="rounded-2xl border border-slate-200 px-4 py-3" required />
          <input name="password" type="password" placeholder={copy.auth.password} className="rounded-2xl border border-slate-200 px-4 py-3" required />
          <button type="submit" className="rounded-full bg-[var(--color-primary)] px-5 py-3 font-semibold text-white">
            {copy.auth.signIn}
          </button>
        </form>
        <div className="mt-4">
          <GoogleSignInButton label={copy.auth.google} />
        </div>
      </div>
    </div>
  );
}
