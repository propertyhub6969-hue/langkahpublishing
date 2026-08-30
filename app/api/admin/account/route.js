import { NextResponse } from 'next/server';
import { getSession, hashPassword, verifyPassword } from '@/lib/auth';
import { getAdmin, saveAdmin } from '@/lib/store';

export async function PUT(req) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { currentPassword, newPassword } = await req.json().catch(() => ({}));
  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: 'Password saat ini dan password baru wajib diisi.' }, { status: 400 });
  }
  if (newPassword.length < 8) {
    return NextResponse.json({ error: 'Password baru minimal 8 karakter.' }, { status: 400 });
  }

  const admin = getAdmin();
  if (!admin || !verifyPassword(currentPassword, admin.passwordHash)) {
    return NextResponse.json({ error: 'Password saat ini salah.' }, { status: 401 });
  }

  saveAdmin({ ...admin, passwordHash: hashPassword(newPassword) });
  return NextResponse.json({ ok: true });
}
