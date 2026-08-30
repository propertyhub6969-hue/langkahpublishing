import { NextResponse } from 'next/server';
import { ensureAdminBootstrap, verifyPassword, createSessionToken, setSessionCookie } from '@/lib/auth';
import { getAdmin } from '@/lib/store';

export async function POST(req) {
  const { username, password } = await req.json().catch(() => ({}));
  if (!username || !password) {
    return NextResponse.json({ error: 'Username dan password wajib diisi.' }, { status: 400 });
  }

  const admin = getAdmin() || ensureAdminBootstrap();
  if (!admin) {
    return NextResponse.json(
      { error: 'Akun admin belum di-bootstrap di server (ADMIN_BOOTSTRAP_PASSWORD belum diset).' },
      { status: 500 }
    );
  }

  if (username !== admin.username || !verifyPassword(password, admin.passwordHash)) {
    return NextResponse.json({ error: 'Username atau password salah.' }, { status: 401 });
  }

  const token = createSessionToken(admin.username);
  await setSessionCookie(token);
  return NextResponse.json({ ok: true });
}
