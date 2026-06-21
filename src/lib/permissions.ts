import "server-only";

import { Role, UserType } from "@prisma/client";
import { unauthorized } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    unauthorized();
  }

  return user;
}

export async function requireRole(roles: Role[]) {
  const user = await requireAuth();

  if (!roles.includes(user.role)) {
    unauthorized();
  }

  return user;
}

export async function requireInternalUser() {
  const user = await requireAuth();

  if (user.userType !== UserType.INTERNAL) {
    unauthorized();
  }

  return user;
}

export function canManageUsers(role: Role) {
  return role === Role.ADMIN;
}

export function canManageEditorial(role: Role) {
  return role === Role.ADMIN || role === Role.EDITOR;
}

export function canManageCompetitions(role: Role) {
  return role === Role.ADMIN;
}
