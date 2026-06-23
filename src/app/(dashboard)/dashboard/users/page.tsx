import { redirect } from "next/navigation";

import { updateUserRoleAction } from "@/lib/actions";
import { getCurrentProfile } from "@/lib/auth";
import { getProfiles } from "@/lib/data";
import { hasMinimumRole } from "@/lib/permissions";

export default async function DashboardUsersPage() {
  const profile = await getCurrentProfile();

  if (!profile || !hasMinimumRole(profile.role, "ADMIN")) {
    redirect("/unauthorized");
  }

  const users = await getProfiles();

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="font-display text-3xl text-slate-950">Users</h2>
      <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Update</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-3">{user.first_name} {user.last_name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.role}</td>
                <td className="px-4 py-3">
                  <form action={updateUserRoleAction} className="flex gap-2">
                    <input type="hidden" name="userId" value={user.id} />
                    <select name="role" defaultValue={user.role} className="rounded-full border border-slate-200 px-3 py-2">
                      <option value="USER">USER</option>
                      <option value="EDITOR">EDITOR</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                    <button type="submit" className="rounded-full bg-[var(--color-primary)] px-4 py-2 font-semibold text-white">
                      Save
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
