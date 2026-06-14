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
              <Image src="/TreTrip.svg" alt="TreTrip" width={140} height={40} className="h-8 w-auto mx-auto brightness-0 invert" />
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
