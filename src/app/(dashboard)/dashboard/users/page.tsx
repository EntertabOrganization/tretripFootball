import { deleteUserAction } from "@/lib/actions";
import { getCurrentProfile } from "@/lib/auth";
import { getProfiles } from "@/lib/data";
import { hasMinimumRole } from "@/lib/permissions";
import { redirect } from "next/navigation";
import { AdminDataTable } from "@/components/dashboard/admin-data-table";
import { DashboardModal } from "@/components/dashboard/dashboard-modal";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { UserForm } from "@/components/dashboard/forms";

export default async function DashboardUsersPage() {
  const profile = await getCurrentProfile();
  if (!profile || !hasMinimumRole(profile.role, "ADMIN")) redirect("/unauthorized");

  const users = await getProfiles();

  return (
    <>
      <DashboardPageHeader
        title="Users"
        subtitle="Create users, assign roles, and manage account access."
        action={
          <DashboardModal title="Create User" triggerLabel="Create User">
            <UserForm />
          </DashboardModal>
        }
      />
      <AdminDataTable
        columns={["Name", "Email", "Role", "Action"]}
        rows={users.map((user) => [
          `${user.first_name} ${user.last_name}`,
          user.email,
          user.role,
          <div key={user.id} className="flex items-center gap-2">
            <DashboardModal title="User Details" triggerLabel="View" triggerVariant="ghost">
              <div className="space-y-2 text-sm text-slate-600">
                <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone_number ?? "—"}</p>
                <p><strong>Role:</strong> {user.role}</p>
              </div>
            </DashboardModal>
            <DashboardModal title="Edit User Role" triggerLabel="Edit" triggerVariant="secondary">
              <UserForm initialData={user} />
            </DashboardModal>
            <form action={deleteUserAction}>
              <input type="hidden" name="id" value={user.id} />
              <button type="submit" className="rounded-2xl border border-rose-200 px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50">
                Delete
              </button>
            </form>
          </div>,
        ])}
      />
    </>
  );
}
