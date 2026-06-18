'use client';

import { useEffect, useState } from 'react';
import { CalendarPlus2, LogOut, ShieldCheck, Trash2 } from 'lucide-react';
import { useRouter } from '@/i18n/routing';
import { TeamFlag } from '@/components/teams/TeamFlag';
import { ARAB_TEAMS_DATA } from '@/data/arabTeams';
import { clearAdminSession, deleteAdminMatch, getAdminMatches, hasAdminSession, saveAdminMatch, type MatchDraft, SUPER_ADMIN } from '@/lib/admin-client';

const defaultHomeTeam = ARAB_TEAMS_DATA[0];
const defaultAwayTeam = ARAB_TEAMS_DATA[1] ?? ARAB_TEAMS_DATA[0];

const initialForm: MatchDraft = {
  homeTeam: defaultHomeTeam.countryName,
  awayTeam: defaultAwayTeam.countryName,
  homeCode: defaultHomeTeam.code,
  awayCode: defaultAwayTeam.code,
  homeFlag: defaultHomeTeam.flagImage,
  awayFlag: defaultAwayTeam.flagImage,
  date: '',
  time: '',
  stadium: '',
  city: '',
  group: 'A',
};

export default function AdminPage() {
  const router = useRouter();
  const [matches, setMatches] = useState(getAdminMatches);
  const [form, setForm] = useState<MatchDraft>(initialForm);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!hasAdminSession()) {
      router.replace('/sign-in');
    }
  }, [router]);

  const updateField = <K extends keyof MatchDraft>(key: K, value: MatchDraft[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const updateTeam = (side: 'home' | 'away', teamCode: string) => {
    const nextTeam = ARAB_TEAMS_DATA.find((team) => team.code === teamCode);
    if (!nextTeam) return;

    setForm((current) => ({
      ...current,
      [`${side}Team`]: nextTeam.countryName,
      [`${side}Code`]: nextTeam.code,
      [`${side}Flag`]: nextTeam.flagImage,
    }));
  };

  const handleAddMatch = (e: React.FormEvent) => {
    e.preventDefault();
    const nextMatches = saveAdminMatch(form);
    setMatches(nextMatches);
    setForm(initialForm);
    setMessage('Match added successfully. Users can now review and predict it from the dashboard.');
  };

  const handleDeleteMatch = (matchId: number) => {
    const nextMatches = deleteAdminMatch(matchId);
    setMatches(nextMatches);
    setMessage('Match removed successfully.');
  };

  const handleLogout = () => {
    clearAdminSession();
    router.replace('/');
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f6fbfb_0%,#eef6f6_100%)] px-4 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="tretrip-soft-card mb-8 rounded-[2rem] p-8 md:p-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                <ShieldCheck size={16} />
                Super Admin
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">Match Management Dashboard</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-foreground/66">
                Signed in as {SUPER_ADMIN.email}. Create upcoming fixtures here and they will appear for users in the main dashboard prediction experience.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 self-start rounded-full border border-primary/18 bg-white/75 px-5 py-3 text-sm font-semibold text-foreground shadow-[0_14px_34px_rgba(18,53,58,0.08)] transition-colors hover:bg-white"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {message ? (
          <div className="mb-6 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-700">
            {message}
          </div>
        ) : null}

        <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <section className="tretrip-soft-card rounded-[2rem] p-7">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                <CalendarPlus2 size={22} />
              </div>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">Add Match</h2>
                <p className="text-sm text-foreground/55">Create a fixture with date, time, location, and home/away teams.</p>
              </div>
            </div>

            <form onSubmit={handleAddMatch} className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-semibold text-foreground/65">Home team</span>
                <select
                  value={form.homeCode}
                  onChange={(e) => updateTeam('home', e.target.value)}
                  className="w-full rounded-[1.1rem] border border-white/75 bg-white/80 px-4 py-3 text-foreground outline-none focus:border-primary"
                >
                  {ARAB_TEAMS_DATA.map((team) => (
                    <option key={team.code} value={team.code}>
                      {team.countryName} ({team.code})
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-2">
                <span className="text-sm font-semibold text-foreground/65">Away team</span>
                <select
                  value={form.awayCode}
                  onChange={(e) => updateTeam('away', e.target.value)}
                  className="w-full rounded-[1.1rem] border border-white/75 bg-white/80 px-4 py-3 text-foreground outline-none focus:border-primary"
                >
                  {ARAB_TEAMS_DATA.map((team) => (
                    <option key={team.code} value={team.code}>
                      {team.countryName} ({team.code})
                    </option>
                  ))}
                </select>
              </label>
              <input required value={form.date} onChange={(e) => updateField('date', e.target.value)} placeholder="18 JUN 2026" className="rounded-[1.1rem] border border-white/75 bg-white/80 px-4 py-3 text-foreground outline-none focus:border-primary" />
              <input required value={form.time} onChange={(e) => updateField('time', e.target.value)} placeholder="20:00 ET" className="rounded-[1.1rem] border border-white/75 bg-white/80 px-4 py-3 text-foreground outline-none focus:border-primary" />
              <input required value={form.stadium} onChange={(e) => updateField('stadium', e.target.value)} placeholder="Stadium" className="rounded-[1.1rem] border border-white/75 bg-white/80 px-4 py-3 text-foreground outline-none focus:border-primary" />
              <input required value={form.city} onChange={(e) => updateField('city', e.target.value)} placeholder="City" className="rounded-[1.1rem] border border-white/75 bg-white/80 px-4 py-3 text-foreground outline-none focus:border-primary" />
              <input required value={form.group} onChange={(e) => updateField('group', e.target.value.toUpperCase())} placeholder="Group" className="rounded-[1.1rem] border border-white/75 bg-white/80 px-4 py-3 text-foreground outline-none focus:border-primary sm:col-span-2" />

              <button
                type="submit"
                className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent"
              >
                <CalendarPlus2 size={16} />
                Save Match
              </button>
            </form>
          </section>

          <section className="tretrip-soft-card rounded-[2rem] p-7">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">Managed Matches</h2>
              <p className="mt-2 text-sm text-foreground/55">These fixtures will be shown to users for predictions.</p>
            </div>

            <div className="space-y-4">
              {matches.length > 0 ? (
                matches.map((match) => (
                  <div key={match.id} className="rounded-[1.4rem] border border-white/70 bg-white/78 p-5 shadow-[0_14px_34px_rgba(18,53,58,0.05)]">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{match.date} • {match.time}</p>
                        <div className="mt-2 flex items-center gap-3">
                          <TeamFlag teamCode={match.homeCode} src={match.homeFlag} alt={match.homeTeam} className="h-8 w-11 rounded-md" />
                          <h3 className="text-xl font-semibold text-foreground">{match.homeTeam} vs {match.awayTeam}</h3>
                          <TeamFlag teamCode={match.awayCode} src={match.awayFlag} alt={match.awayTeam} className="h-8 w-11 rounded-md" />
                        </div>
                        <p className="mt-2 text-sm text-foreground/58">{match.stadium}, {match.city} • Group {match.group}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteMatch(match.id)}
                        className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-[1.4rem] border border-dashed border-border bg-white/65 p-8 text-center text-sm text-foreground/55">
                  No admin-created matches yet. Add the first fixture from the form.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
