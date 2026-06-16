'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, CalendarDays, Film, LogOut, Save, Trophy, Upload, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { ALL_ARAB_MATCHES } from '@/data/arabMatches';
import { getAdminMatches, getStoredPredictions, savePrediction } from '@/lib/admin-client';
import { supabase } from '@/lib/supabase';

type SessionUser = {
  email?: string;
  user_metadata?: {
    full_name?: string;
  };
};

export default function DashboardPage() {
  const t = useTranslations('Dashboard');
  const router = useRouter();

  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState('');
  const [selectedMatchId, setSelectedMatchId] = useState<number>(ALL_ARAB_MATCHES[0]?.id ?? 0);
  const [homeScore, setHomeScore] = useState('1');
  const [awayScore, setAwayScore] = useState('0');
  const [successMsg, setSuccessMsg] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState('');
  const [dashboardMatches, setDashboardMatches] = useState(() => ALL_ARAB_MATCHES.slice(0, 8));
  const previewUrlRef = useRef('');
  const selectedMatch = dashboardMatches.find((match) => match.id === selectedMatchId) ?? dashboardMatches[0];

  useEffect(() => {
    const loadSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace('/sign-in');
        return;
      }

      setUser(session.user as SessionUser);
      setFullName(session.user.user_metadata?.full_name || '');
      const managedMatches = getAdminMatches();
      const nextMatches = managedMatches.length > 0 ? managedMatches : ALL_ARAB_MATCHES.slice(0, 8);
      setDashboardMatches(nextMatches);
      setSelectedMatchId(nextMatches[0]?.id ?? 0);

      const latestPrediction = getStoredPredictions()[0];
      if (latestPrediction) {
        setSelectedMatchId(latestPrediction.matchId);
        setHomeScore(String(latestPrediction.homeScore));
        setAwayScore(String(latestPrediction.awayScore));
      }
      setLoading(false);
    };

    void loadSession();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace('/sign-in');
        return;
      }

      setUser(session.user as SessionUser);
      setFullName(session.user.user_metadata?.full_name || '');
      setLoading(false);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, [router]);

  useEffect(() => {
    const syncManagedMatches = () => {
      const managedMatches = getAdminMatches();
      const nextMatches = managedMatches.length > 0 ? managedMatches : ALL_ARAB_MATCHES.slice(0, 8);
      setDashboardMatches(nextMatches);

      if (!nextMatches.some((match) => match.id === selectedMatchId)) {
        setSelectedMatchId(nextMatches[0]?.id ?? 0);
      }
    };

    window.addEventListener('storage', syncManagedMatches);
    return () => window.removeEventListener('storage', syncManagedMatches);
  }, [selectedMatchId]);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  const showSuccess = (message: string) => {
    setSuccessMsg(message);
    window.setTimeout(() => setSuccessMsg(''), 3200);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName },
    });

    if (!error) {
      showSuccess(t('profileUpdated'));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/');
  };

  const handleVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile) return;
    showSuccess(t('videoUploaded'));
  };

  const handlePredictionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMatch) return;

    savePrediction({
      matchId: selectedMatch.id,
      homeScore: Number(homeScore),
      awayScore: Number(awayScore),
      submittedAt: new Date().toISOString(),
    });
    showSuccess(t('predictionSubmitted'));
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
      </div>
    );
  }

  const firstName = fullName.split(' ')[0] || 'Fan';

  const handleVideoFileChange = (file: File | null) => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = '';
    }

    setVideoFile(file);

    if (!file) {
      setVideoPreviewUrl('');
      return;
    }

    const nextPreviewUrl = URL.createObjectURL(file);
    previewUrlRef.current = nextPreviewUrl;
    setVideoPreviewUrl(nextPreviewUrl);
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f6fbfb_0%,#eef6f6_100%)] px-4 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/65 transition-colors hover:text-foreground">
              <ArrowLeft size={18} />
              <span>Back to Home</span>
            </Link>
            <Image src="/TreTrip.png" alt="TreTrip" width={558} height={539} className="hidden h-8 w-auto md:block" />
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 self-start rounded-full border border-primary/18 bg-white/70 px-5 py-3 text-sm font-semibold text-foreground shadow-[0_14px_34px_rgba(18,53,58,0.08)] backdrop-blur-sm transition-colors hover:bg-white"
          >
            <LogOut size={16} />
            {t('logout')}
          </button>
        </div>

        <section className="tretrip-soft-card mb-8 overflow-hidden rounded-[2rem] p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent/70">TreTrip Dashboard</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
                {t('title')}, <span className="text-primary">{firstName}</span>
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-foreground/68 md:text-lg">{t('subtitle')}</p>
              {user?.email ? <p className="mt-6 text-sm text-foreground/48">{user.email}</p> : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-[1.5rem] border border-white/60 bg-white/75 p-5 shadow-[0_14px_34px_rgba(18,53,58,0.06)]">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <CalendarDays size={20} />
                </div>
                <p className="text-sm text-foreground/55">{t('upcomingMatches')}</p>
                <p className="mt-2 text-3xl font-semibold text-foreground">{dashboardMatches.length}</p>
              </div>

              <div className="rounded-[1.5rem] border border-white/60 bg-white/75 p-5 shadow-[0_14px_34px_rgba(18,53,58,0.06)]">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#d9b037]/15 text-[#b9901f]">
                  <Film size={20} />
                </div>
                <p className="text-sm text-foreground/55">{t('mediaVault')}</p>
                <p className="mt-2 text-3xl font-semibold text-foreground">{videoFile ? '01' : '00'}</p>
              </div>

              <div className="rounded-[1.5rem] border border-white/60 bg-white/75 p-5 shadow-[0_14px_34px_rgba(18,53,58,0.06)]">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                  <Trophy size={20} />
                </div>
                <p className="text-sm text-foreground/55">{t('activePrediction')}</p>
                <p className="mt-2 text-3xl font-semibold text-foreground">{selectedMatch ? '01' : '00'}</p>
              </div>
            </div>
          </div>
        </section>

        {successMsg ? (
          <div className="mb-8 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-700 shadow-[0_10px_24px_rgba(16,185,129,0.08)]">
            {successMsg}
          </div>
        ) : null}

        <div className="grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-8">
            <section className="tretrip-soft-card rounded-[2rem] p-7">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <User size={22} />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">{t('editProfile')}</h2>
                  <p className="text-sm text-foreground/55">{t('profileCaption')}</p>
                </div>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-accent/70">{t('fullName')}</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-[1.25rem] border border-white/75 bg-white/80 px-4 py-3 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] outline-none transition-colors focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent"
                >
                  <Save size={16} />
                  {t('saveChanges')}
                </button>
              </form>
            </section>

            <section className="tretrip-soft-card rounded-[2rem] p-7">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d9b037]/15 text-[#b9901f]">
                  <Upload size={22} />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">{t('uploadVideo')}</h2>
                  <p className="text-sm text-foreground/55">{t('videoDesc')}</p>
                </div>
              </div>

              <form onSubmit={handleVideoSubmit} className="space-y-5">
                <label className="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-primary/30 bg-white/70 px-6 py-8 text-center transition-colors hover:border-primary hover:bg-white">
                  <Upload className="mb-4 h-8 w-8 text-primary" />
                  <span className="font-semibold text-foreground">{t('selectVideo')}</span>
                  <span className="mt-2 text-sm text-foreground/55">{videoFile ? videoFile.name : t('videoFormats')}</span>
                  <input
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime"
                    className="hidden"
                    onChange={(e) => handleVideoFileChange(e.target.files?.[0] ?? null)}
                  />
                </label>

                {videoPreviewUrl ? (
                  <div className="overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/80">
                    <video src={videoPreviewUrl} controls className="h-64 w-full bg-[#10282c] object-cover" />
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={!videoFile}
                  className="inline-flex items-center gap-2 rounded-full bg-[#c79b20] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#b28719] disabled:cursor-not-allowed disabled:opacity-55"
                >
                  <Film size={16} />
                  {t('submitVideo')}
                </button>
              </form>
            </section>
          </div>

          <section className="tretrip-soft-card rounded-[2rem] p-7">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <Trophy size={22} />
              </div>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">{t('predictMatch')}</h2>
                <p className="text-sm text-foreground/55">{t('predictDesc')}</p>
              </div>
            </div>

            <form onSubmit={handlePredictionSubmit} className="space-y-6">
              <div className="grid gap-3 md:grid-cols-2">
                {dashboardMatches.map((match) => (
                  <button
                    key={match.id}
                    type="button"
                    onClick={() => setSelectedMatchId(match.id)}
                    className={`rounded-[1.4rem] border p-4 text-left transition-all ${
                      selectedMatchId === match.id
                        ? 'border-primary bg-white shadow-[0_18px_40px_rgba(57,158,182,0.16)]'
                        : 'border-white/75 bg-white/70 hover:border-primary/35 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-semibold text-foreground/70">Group {match.group}</span>
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{match.date}</span>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{match.homeFlag}</span>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.18em] text-foreground/45">{t('homeLabel')}</p>
                          <p className="font-semibold text-foreground">{match.homeTeam}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{match.awayFlag}</span>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.18em] text-foreground/45">{t('awayLabel')}</p>
                          <p className="font-semibold text-foreground">{match.awayTeam}</p>
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-foreground/55">{match.stadium}, {match.city}</p>
                  </button>
                ))}
              </div>

              {selectedMatch ? (
                <div className="rounded-[1.7rem] border border-white/80 bg-white/82 p-6 shadow-[0_18px_44px_rgba(18,53,58,0.06)]">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent/65">{t('selectedMatch')}</p>
                      <h3 className="mt-2 text-2xl font-semibold text-foreground">{selectedMatch.homeTeam} vs {selectedMatch.awayTeam}</h3>
                    </div>
                    <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">{selectedMatch.time}</span>
                  </div>

                  <div className="grid gap-5 md:grid-cols-[1fr_auto_1fr] md:items-center">
                    <div className="rounded-[1.4rem] bg-[color-mix(in_oklab,white_88%,var(--primary)_12%)] p-5 text-center">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-foreground/45">{t('homeLabel')}</p>
                      <div className="mt-3 text-5xl">{selectedMatch.homeFlag}</div>
                      <p className="mt-3 text-lg font-semibold text-foreground">{selectedMatch.homeTeam}</p>
                      <input
                        type="number"
                        min="0"
                        value={homeScore}
                        onChange={(e) => setHomeScore(e.target.value)}
                        className="mt-5 w-full rounded-[1rem] border border-primary/18 bg-white/90 px-4 py-3 text-center text-2xl font-semibold text-foreground outline-none focus:border-primary"
                      />
                    </div>

                    <div className="text-center text-sm font-bold uppercase tracking-[0.3em] text-foreground/35">vs</div>

                    <div className="rounded-[1.4rem] bg-[color-mix(in_oklab,white_92%,var(--accent)_8%)] p-5 text-center">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-foreground/45">{t('awayLabel')}</p>
                      <div className="mt-3 text-5xl">{selectedMatch.awayFlag}</div>
                      <p className="mt-3 text-lg font-semibold text-foreground">{selectedMatch.awayTeam}</p>
                      <input
                        type="number"
                        min="0"
                        value={awayScore}
                        onChange={(e) => setAwayScore(e.target.value)}
                        className="mt-5 w-full rounded-[1rem] border border-primary/18 bg-white/90 px-4 py-3 text-center text-2xl font-semibold text-foreground outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 border-t border-border/70 pt-5 text-sm text-foreground/56 md:flex-row md:items-center md:justify-between">
                    <span>{selectedMatch.stadium}, {selectedMatch.city}</span>
                    <span>{selectedMatch.date} • {selectedMatch.time}</span>
                  </div>
                </div>
              ) : null}

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
              >
                <Trophy size={16} />
                {t('submitPrediction')}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
