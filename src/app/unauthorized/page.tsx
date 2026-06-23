import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
      <div className="rounded-[36px] border border-slate-200 bg-white p-10 shadow-sm">
        <p className="text-sm uppercase tracking-[0.25em] text-[var(--color-primary)]">403</p>
        <h1 className="mt-4 font-display text-5xl text-slate-950">Unauthorized Access</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          This area is protected by role-based access. Sign in with an account that has permission to continue.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-[var(--color-primary)] px-5 py-3 font-semibold text-white"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
