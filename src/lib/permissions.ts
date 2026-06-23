import { redirect } from "next/navigation";

import type { Role } from "@/lib/types";

const roleRank: Record<Role, number> = {
  USER: 1,
  EDITOR: 2,
  ADMIN: 3,
};

export function hasMinimumRole(role: Role | null | undefined, minimum: Role) {
  if (!role) {
    return false;
  }

  return roleRank[role] >= roleRank[minimum];
}

export function assertRole(role: Role | null | undefined, minimum: Role) {
  if (!hasMinimumRole(role, minimum)) {
    redirect("/unauthorized");
  }
}
