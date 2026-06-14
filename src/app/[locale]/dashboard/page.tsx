'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import { supabase } from '@/lib/supabase';
import { LogOut, User, Video, Trophy, Save, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default function DashboardPage() {
  const t = useTranslations('Dashboard');
  const router = useRouter();
  
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [selectedMatch, setSelectedMatch] = useState('');
  const [homeScore, setHomeScore] = useState('');
  const [awayScore, setAwayScore] = useState('');
  
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/sign-in');
      } else {
        setUser(session.user);
        setFullName(session.user.user_metadata?.full_name || '');
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName }
    });

    if (!error) {
      setSuccessMsg(t('successMessage'));
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const handleSubmitVideo = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just show success. Later, save to a 'videos' table in Supabase.
    setSuccessMsg(t('successMessage'));
    setVideoLink('');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just show success. Later, save to a 'predictions' table in Supabase.
    setSuccessMsg(t('successMessage'));
    setSelectedMatch('');
    setHomeScore('');
    setAwayScore('');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-giddam-secondary flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-giddam-secondary py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(11,157,181,0.1),transparent_50%)] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-primary transition-colors">
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Home</span>
          </Link>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors font-medium"
          >
            <LogOut size={18} />
            {t('logout')}
          </button>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white uppercase tracking-wider mb-2">
            {t('title')}, <span className="text-primary">{fullName.split(' ')[0] || 'Fan'}</span>
          </h1>
          <p className="text-white/60 text-lg">{t('subtitle')}</p>
        </div>

        {successMsg && (
          <div className="bg-green-500/10 border border-green-500/50 text-green-200 p-4 rounded-xl mb-8 flex items-center justify-center font-bold">
            {successMsg}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Profile Section */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
            <div className="w-14 h-14 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6">
              <User size={28} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-6 tracking-wide uppercase">{t('editProfile')}</h2>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-primary mb-2 uppercase">{t('fullName')}</label>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                />
              </div>
              <button type="submit" className="w-full bg-white/10 hover:bg-primary text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 mt-2">
                <Save size={18} /> {t('saveChanges')}
              </button>
            </form>
          </div>

          {/* Upload Video Section */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
            <div className="w-14 h-14 bg-giddam-gold/20 text-giddam-gold rounded-full flex items-center justify-center mb-6">
              <Video size={28} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 tracking-wide uppercase">{t('uploadVideo')}</h2>
            <p className="text-white/50 text-sm mb-6">{t('videoDesc')}</p>
            <form onSubmit={handleSubmitVideo} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-giddam-gold mb-2 uppercase">{t('videoLink')}</label>
                <input 
                  type="url" 
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                  placeholder="https://"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-giddam-gold focus:ring-1 focus:ring-giddam-gold transition-all outline-none"
                />
              </div>
              <button type="submit" className="w-full bg-white/10 hover:bg-giddam-gold hover:text-black text-white font-bold py-3 rounded-xl transition-all mt-2">
                {t('submitVideo')}
              </button>
            </form>
          </div>

          {/* Predict Match Section */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
            <div className="w-14 h-14 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6">
              <Trophy size={28} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 tracking-wide uppercase">{t('predictMatch')}</h2>
            <p className="text-white/50 text-sm mb-6">{t('predictDesc')}</p>
            <form onSubmit={handlePredict} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-green-400 mb-2 uppercase">{t('selectMatch')}</label>
                <select 
                  value={selectedMatch}
                  onChange={(e) => setSelectedMatch(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-green-400 outline-none appearance-none"
                >
                  <option value="" className="text-black">-- Select Match --</option>
                  <option value="ksa-uru" className="text-black">KSA vs Uruguay</option>
                  <option value="ksa-esp" className="text-black">KSA vs Spain</option>
                  <option value="egy-bra" className="text-black">Egypt vs Brazil</option>
                </select>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-green-400 mb-2 uppercase">{t('homeScore')}</label>
                  <input type="number" min="0" value={homeScore} onChange={(e)=>setHomeScore(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center text-white focus:border-green-400 outline-none" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold text-green-400 mb-2 uppercase">{t('awayScore')}</label>
                  <input type="number" min="0" value={awayScore} onChange={(e)=>setAwayScore(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center text-white focus:border-green-400 outline-none" />
                </div>
              </div>
              <button type="submit" className="w-full bg-white/10 hover:bg-green-500 hover:text-white text-white font-bold py-3 rounded-xl transition-all mt-2">
                {t('submitPrediction')}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
