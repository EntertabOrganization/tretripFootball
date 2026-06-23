"use client";

import { useState, type ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  triggerLabel: string;
  triggerVariant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
};

export function DashboardModal({ title, description, triggerLabel, triggerVariant = "primary", children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          triggerVariant === "primary"
            ? "rounded-2xl bg-[#1f7a68] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#176454]"
            : triggerVariant === "secondary"
              ? "rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              : "rounded-2xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
        }
      >
        {triggerLabel}
      </button>

      {open ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/45 p-4">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[32px] bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
              <div>
                <h3 className="font-display text-3xl text-slate-950">{title}</h3>
                {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-5">{children}</div>
          </div>
        </div>
      ) : null}
    </>
  );
}
