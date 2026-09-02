import fs from 'fs';
import path from 'path';
import { getBooks } from '@/lib/store';

const FILE_DIR = path.join(process.cwd(), 'data', 'files');

export async function GET(req, { params }) {
  const filename = (params.path || []).join('/');

  if (!/^[a-zA-Z0-9_.-]+$/.test(filename)) {
    return new Response('Not found', { status: 404 });
  }

  const filePath = path.join(FILE_DIR, filename);
  if (!fs.existsSync(filePath)) {
    return new Response('Not found', { status: 404 });
  }

  // Cari nama file asli (untuk nama unduhan yang rapi) dari data buku.
  const url = `/files/${filename}`;
  const book = getBooks().find((b) => b.fileUrl === url);
  const downloadName = book?.fileName || filename;

  const buffer = fs.readFileSync(filePath);
  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${downloadName.replace(/"/g, '')}"`,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
