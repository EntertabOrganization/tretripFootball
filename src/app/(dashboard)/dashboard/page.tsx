import Link from "next/link";

import { AdminDataTable } from "@/components/dashboard/admin-data-table";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { getCurrentProfile } from "@/lib/auth";
import { getAllCompetitions, getAllNews, getDashboardStats } from "@/lib/data";

export default async function DashboardPage() {
  const profile = await getCurrentProfile();
  const [stats, news, competitions] = await Promise.all([getDashboardStats(), getAllNews(true), getAllCompetitions()]);

  const cards = [
    { label: "Total Users", value: stats.profiles, trend: "+18%" },
    { label: "Articles Published", value: stats.articles, trend: "+24%" },
    { label: "Competitions", value: stats.competitions, trend: "+9%" },
    { label: "Comments", value: stats.comments, trend: "+3.2pp" },
  ];

  return (
    <>
      <DashboardPageHeader
        title={`Good morning, ${profile?.first_name ?? "Admin"} 👋`}
        subtitle="Here’s what’s happening with TreTrip today."
      />

      <section className="grid gap-5 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{card.label}</p>
            <p className="mt-5 font-display text-5xl text-slate-950">{card.value}</p>
            <div className="mt-4 flex items-center gap-3">
              <span className="rounded-xl bg-emerald-50 px-2 py-1 text-sm font-semibold text-emerald-600">{card.trend}</span>
              <span className="text-sm text-slate-400">vs last month</span>
            </div>
            <div className="mt-6 grid grid-cols-8 gap-2">
              {[12, 16, 13, 18, 28, 20, 22, 36].map((height, index) => (
                <div key={index} className="rounded-t bg-slate-200" style={{ height }} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-4">
        <QuickLinkCard title="New Article" description="Create a polished bilingual article." href="/dashboard/news/new" />
        <QuickLinkCard title="Manage Users" description="Update roles and track account access." href="/dashboard/users" />
        <QuickLinkCard title="Today’s Competitions" description="Review active competitions and winners." href="/dashboard/competitions" />
        <QuickLinkCard title="Review Comments" description="Moderate conversations from the dashboard." href="/dashboard/comments" />
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-3xl text-slate-950">Recent Articles</h2>
            <Link href="/dashboard/news" className="text-sm font-semibold text-[#1f7a68]">View all →</Link>
          </div>
          <AdminDataTable
            columns={["Title", "Category", "Status"]}
            rows={news.slice(0, 6).map((article) => [
              article.title_en,
              article.category?.title_en ?? "Unassigned",
              <span key={article.id} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{article.status}</span>,
            ])}
          />
        </div>
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-3xl text-slate-950">Competition Feed</h2>
            <Link href="/dashboard/competitions" className="text-sm font-semibold text-[#1f7a68]">View all →</Link>
          </div>
          <AdminDataTable
            columns={["Title", "Start", "End"]}
            rows={competitions.slice(0, 6).map((competition) => [
              competition.title_en,
              new Date(competition.start_date).toLocaleDateString(),
              new Date(competition.end_date).toLocaleDateString(),
            ])}
          />
        </div>
      </section>
    </>
  );
}

function QuickLinkCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Link href={href} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-[#eef5f3] text-2xl text-[#1f7a68]">+</div>
      <p className="font-display text-3xl text-slate-950">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </Link>
  );
}
