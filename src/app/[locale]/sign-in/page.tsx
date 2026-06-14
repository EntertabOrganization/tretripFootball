'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import { supabase } from '@/lib/supabase';
import { LogIn, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default function SignInPage() {
  const t = useTranslations('Auth');
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        setSuccess(true);
        // Redirect to dashboard after brief delay
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      }
    } catch (err: any) {
      setError(err.message || t('errorGeneric'));
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
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || t('errorGeneric'));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-giddam-secondary flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(11,157,181,0.1),transparent_40%)]" />
      <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/10 blur-[100px] rounded-full" />
      
      <div className="w-full max-w-md relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-primary transition-colors mb-8">
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Home</span>
        </Link>
        
        <div className="bg-[#0A2430]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-giddam-gold to-primary" />
          
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6">
              <Image src="/TreTrip.svg" alt="TreTrip" width={140} height={40} className="h-8 w-auto mx-auto" />
            </Link>
            <h1 className="text-3xl font-heading font-bold text-white uppercase tracking-wider mb-2">{t('signInTitle')}</h1>
            <p className="text-white/60 text-sm">{t('signInSubtitle')}</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}
            
            {success && (
              <div className="bg-green-500/10 border border-green-500/50 text-green-200 p-3 rounded-lg text-sm text-center">
                {t('signInSuccess')}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-primary mb-1.5 uppercase tracking-wider">{t('email')}</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-primary mb-1.5 uppercase tracking-wider">{t('password')}</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading || success}
              className="w-full bg-primary hover:bg-accent text-white font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 transform -skew-x-12 transition-all shadow-[0_0_20px_rgba(11,157,181,0.3)] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              <span className="block transform skew-x-12 tracking-widest uppercase flex items-center gap-2">
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    <LogIn size={20} />
                    {t('signInButton')}
                  </>
                )}
              </span>
            </button>
          </form>

          <div className="relative mt-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-[#0A2430] px-2 text-white/50">{t('orContinueWith')}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading || success}
            className="mt-6 w-full flex items-center justify-center gap-3 rounded-xl border border-white/20 bg-white/5 py-4 font-bold text-white transition-all hover:bg-white/10 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {t('signInWithGoogle')}
          </button>

          <div className="mt-8 text-center text-sm text-white/50">
            {t('noAccount')}{' '}
            <Link href="/sign-up" className="text-primary font-bold hover:text-white transition-colors">
              {t('signUpButton')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
