'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, LogIn } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { getFriendlyAuthError } from '@/lib/auth-errors';
import { isSuperAdminCredentials, setAdminSession } from '@/lib/admin-client';
import { supabase } from '@/lib/supabase';

export default function SignInPage() {
  const t = useTranslations('Auth');
  const locale = useLocale();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSuperAdminCredentials(email, password)) {
        setAdminSession();
        setSuccess(true);
        router.replace('/admin');
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        setSuccess(true);
        router.replace('/dashboard');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? getFriendlyAuthError(err.message) : t('errorGeneric');
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/${locale}/dashboard`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? getFriendlyAuthError(err.message) : t('errorGeneric');
      setError(message);
      setLoading(false);
    }
  };

  return (
    <div className="tretrip-pattern-bg relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(54,197,180,0.16),transparent_24%)]" />

      <div className="relative z-10 w-full max-w-md">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 font-medium text-white/72 transition-colors hover:text-white">
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>

        <div className="overflow-hidden rounded-[2rem] border border-white/20 bg-white shadow-[0_32px_80px_rgba(9,33,37,0.22)]">
          <div className="h-2 bg-[linear-gradient(90deg,#2f7374,#399eb6,#d9b037)]" />

          <div className="p-8 md:p-9">
            <div className="mb-8 text-center">
              <Link href="/" className="mb-6 inline-block">
                <Image src="/TreTrip.svg" alt="TreTrip" width={160} height={48} className="mx-auto h-9 w-auto" />
              </Link>
              <h1 className="mb-2 text-3xl font-heading font-bold uppercase tracking-wide text-foreground">{t('signInTitle')}</h1>
              <p className="text-sm text-foreground/60">{t('signInSubtitle')}</p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-5">
              {error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700">
                  {error}
                </div>
              ) : null}

              {success ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center text-sm text-emerald-700">
                  {t('signInSuccess')}
                </div>
              ) : null}

              <div>
                <label className="mb-2 block text-sm font-bold uppercase tracking-wider text-accent">{t('email')}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-border bg-muted/45 px-4 py-3 text-foreground placeholder:text-foreground/30 focus:border-primary focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold uppercase tracking-wider text-accent">{t('password')}</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-border bg-muted/45 px-4 py-3 text-foreground placeholder:text-foreground/30 focus:border-primary focus:outline-none"
                  placeholder="********"
                />
              </div>

              <button
                type="submit"
                disabled={loading || success}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-secondary px-4 py-4 text-lg font-bold text-white transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <>
                    <LogIn size={20} />
                    {t('signInButton')}
                  </>
                )}
              </button>
            </form>

            <div className="relative mt-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-3 text-foreground/45">{t('orContinueWith')}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading || success}
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl border border-border bg-white px-4 py-4 font-bold text-foreground transition-colors hover:bg-muted/50 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              {t('signInWithGoogle')}
            </button>

            <div className="mt-8 text-center text-sm text-foreground/55">
              {t('noAccount')}{' '}
              <Link href="/sign-up" className="font-bold text-secondary transition-colors hover:text-primary">
                {t('signUpButton')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
