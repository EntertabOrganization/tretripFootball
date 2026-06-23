import { Eye, PencilLine, Trash2 } from "lucide-react";
import { redirect } from "next/navigation";

import { DashboardActionButton } from "@/components/dashboard/dashboard-action-icon";
import { AdminDataTable } from "@/components/dashboard/admin-data-table";
import { UserForm } from "@/components/dashboard/forms";
import { DashboardModal } from "@/components/dashboard/dashboard-modal";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { deleteUserAction } from "@/lib/actions";
import { getCurrentProfile } from "@/lib/auth";
import { getProfiles } from "@/lib/data";
import { hasMinimumRole } from "@/lib/permissions";

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
            <DashboardModal
              title="User Details"
              triggerLabel="View User"
              triggerVariant="ghost"
              triggerClassName="h-10 w-10 border border-slate-200 bg-white p-0 hover:bg-slate-50"
              triggerContent={<Eye size={18} />}
            >
              <div className="space-y-2 text-sm text-slate-600">
                <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone_number ?? "-"}</p>
                <p><strong>Role:</strong> {user.role}</p>
              </div>
            </DashboardModal>
            <DashboardModal
              title="Edit User Role"
              triggerLabel="Edit User"
              triggerVariant="secondary"
              triggerClassName="h-10 w-10 p-0"
              triggerContent={<PencilLine size={18} />}
            >
              <UserForm initialData={user} />
            </DashboardModal>
            <form action={deleteUserAction}>
              <input type="hidden" name="id" value={user.id} />
              <DashboardActionButton label="Delete User" tone="danger" type="submit">
                <Trash2 size={18} />
              </DashboardActionButton>
            </form>
          </div>,
        ])}
      />
    </>
  );
}
