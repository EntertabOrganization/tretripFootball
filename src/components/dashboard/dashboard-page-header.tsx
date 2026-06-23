import type { ReactNode } from "react";

type Props = {
  title: string;
  subtitle: string;
  action?: ReactNode;
};

export function DashboardPageHeader({ title, subtitle, action }: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white px-6 py-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="font-display text-4xl text-slate-950">{title}</h1>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>
      {action ? <div className="flex items-center gap-3">{action}</div> : null}
    </div>
  );
}
