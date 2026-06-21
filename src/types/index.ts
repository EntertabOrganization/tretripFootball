import type { Role, UserType } from "@prisma/client";

export type SessionUser = {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  userType: UserType;
};

export type ActionState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[] | undefined>;
};
