import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

type RegisterBody = {
  fullName?: string;
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  try {
    const { fullName, email, password } = (await request.json()) as RegisterBody;

    if (!fullName?.trim() || !email?.trim() || !password?.trim()) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: email.trim().toLowerCase(),
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName.trim(),
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      userId: data.user.id,
    });
  } catch {
    return NextResponse.json({ error: 'Unable to create account.' }, { status: 500 });
  }
}
