import fs from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'data', 'uploads');
const CONTENT_TYPES = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };

export async function GET(req, { params }) {
  const filename = (params.path || []).join('/');

  // Hanya izinkan nama file datar (tanpa subfolder / path traversal).
  if (!/^[a-zA-Z0-9_.-]+$/.test(filename)) {
    return new Response('Not found', { status: 404 });
  }

  const filePath = path.join(UPLOAD_DIR, filename);
  if (!fs.existsSync(filePath)) {
    return new Response('Not found', { status: 404 });
  }

  const ext = filename.split('.').pop().toLowerCase();
  const contentType = CONTENT_TYPES[ext] || 'application/octet-stream';
  const buffer = fs.readFileSync(filePath);

  return new Response(buffer, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
