import "server-only";

import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cache } from "react";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import type { SessionUser } from "@/types";

const COOKIE_NAME = "tretrip_session";
const SESSION_DURATION = 60 * 60 * 24 * 7;

type SessionToken = {
  sub: string;
  email: string;
  role: SessionUser["role"];
  userType: SessionUser["userType"];
  fullName: string;
};

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;

  if (!secret) {
    throw new Error("SESSION_SECRET is not configured.");
  }

  return new TextEncoder().encode(secret);
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}

async function signSession(payload: SessionToken) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(getSecretKey());
}

async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      algorithms: ["HS256"],
    });

    return payload as SessionToken;
  } catch {
    return null;
  }
}

export async function createSession(user: SessionUser) {
  const token = await signSession({
    sub: user.id,
    email: user.email,
    role: user.role,
    userType: user.userType,
    fullName: user.fullName,
  });

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DURATION,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export const getSession = cache(async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return verifySessionToken(token);
});

export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  const session = await getSession();

  if (!session?.sub) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.sub },
    select: {
      id: true,
      email: true,
      fullName: true,
      role: true,
      userType: true,
    },
  });

  return user;
});

export function getInternalEmailDomains() {
  return (process.env.INTERNAL_EMAIL_DOMAINS ?? "tretrip.com")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

export function isInternalEmail(email: string) {
  return getInternalEmailDomains().some((domain) => email.endsWith(`@${domain}`));
}
