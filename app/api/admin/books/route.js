import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getBooks, saveBooks } from '@/lib/store';

function genId() {
  return 'b' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json({ books: getBooks() });
}

export async function POST(req) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const { title, author, genre, tag, sub, description, coverPreset, coverType, coverImage, fileUrl, fileName } = body;
  if (!title || !author) {
    return NextResponse.json({ error: 'Judul dan penulis wajib diisi.' }, { status: 400 });
  }

  const books = getBooks();
  const newBook = {
    id: genId(),
    title,
    author,
    genre: genre || '',
    tag: tag || '',
    sub: sub || '',
    description: description || '',
    coverPreset: coverPreset || 'copper',
    coverType: coverType === 'image' && coverImage ? 'image' : 'preset',
    coverImage: coverType === 'image' ? (coverImage || '') : '',
    fileUrl: fileUrl || '',
    fileName: fileUrl ? (fileName || '') : '',
    sample: false,
  };
  books.push(newBook);
  saveBooks(books);
  return NextResponse.json({ book: newBook }, { status: 201 });
}
