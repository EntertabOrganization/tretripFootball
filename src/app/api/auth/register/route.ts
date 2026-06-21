import { NextResponse } from "next/server";
import { Role, UserType } from "@prisma/client";
import { createSession, hashPassword, isInternalEmail } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid registration data.", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 },
      );
    }

    const user = await prisma.user.create({
      data: {
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        passwordHash: await hashPassword(parsed.data.password),
        phoneNumber: parsed.data.phoneNumber || null,
        role: Role.USER,
        userType: isInternalEmail(parsed.data.email)
          ? UserType.INTERNAL
          : UserType.EXTERNAL,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        userType: true,
      },
    });

    await createSession(user);

    return NextResponse.json({
      success: true,
      user,
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to create account." },
      { status: 500 },
    );
  }
}
