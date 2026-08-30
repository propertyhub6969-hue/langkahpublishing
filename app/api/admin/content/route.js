import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getSite, saveSite } from '@/lib/store';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json({ site: getSite() });
}

export async function PUT(req) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const current = getSite();
  const next = {
    ...current,
    ...body,
    hero: { ...current.hero, ...(body.hero || {}) },
    about: { ...current.about, ...(body.about || {}) },
    contact: { ...current.contact, ...(body.contact || {}) },
    footer: { ...current.footer, ...(body.footer || {}) },
  };
  saveSite(next);
  return NextResponse.json({ site: next });
}
