import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getBooks, saveBooks } from '@/lib/store';

export async function PUT(req, { params }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = params;
  const body = await req.json().catch(() => ({}));
  const books = getBooks();
  const idx = books.findIndex((b) => b.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Buku tidak ditemukan.' }, { status: 404 });

  const coverType = body.coverType === 'image' && body.coverImage ? 'image' : 'preset';
  books[idx] = {
    ...books[idx],
    title: body.title ?? books[idx].title,
    author: body.author ?? books[idx].author,
    genre: body.genre ?? books[idx].genre,
    tag: body.tag ?? books[idx].tag,
    sub: body.sub ?? books[idx].sub,
    coverPreset: body.coverPreset ?? books[idx].coverPreset,
    coverType,
    coverImage: coverType === 'image' ? body.coverImage : '',
    sample: false,
  };
  saveBooks(books);
  return NextResponse.json({ book: books[idx] });
}

export async function DELETE(req, { params }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = params;
  const books = getBooks();
  const next = books.filter((b) => b.id !== id);
  if (next.length === books.length) {
    return NextResponse.json({ error: 'Buku tidak ditemukan.' }, { status: 404 });
  }
  saveBooks(next);
  return NextResponse.json({ ok: true });
}
