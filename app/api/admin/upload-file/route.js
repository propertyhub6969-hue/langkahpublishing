import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { getSession } from '@/lib/auth';

const FILE_DIR = path.join(process.cwd(), 'data', 'files');
const ALLOWED_TYPES = { 'application/pdf': 'pdf' };
const MAX_BYTES = 25 * 1024 * 1024; // 25MB

export async function POST(req) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const form = await req.formData().catch(() => null);
  const file = form?.get('file');
  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'File tidak ditemukan.' }, { status: 400 });
  }

  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    return NextResponse.json({ error: 'File harus berformat PDF.' }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'Ukuran file maksimal 25MB.' }, { status: 400 });
  }

  fs.mkdirSync(FILE_DIR, { recursive: true });
  const filename = `${Date.now().toString(36)}-${crypto.randomBytes(6).toString('hex')}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(FILE_DIR, filename), buffer);

  return NextResponse.json({ url: `/files/${filename}`, name: file.name || 'buku.pdf' });
}
