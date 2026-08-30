import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readJSON(file, fallback) {
  ensureDir();
  const p = path.join(DATA_DIR, file);
  if (!fs.existsSync(p)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(p, 'utf-8'));
  } catch {
    return fallback;
  }
}

function writeJSON(file, data) {
  ensureDir();
  const p = path.join(DATA_DIR, file);
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf-8');
}

const DEFAULT_BOOKS = [
  { id: 'b1', title: 'Rumah di Ujung Musim', author: 'Alanda Prawira', genre: 'Novel', tag: 'Fiksi', sub: 'sebuah novel', coverPreset: 'copper', sample: true },
  { id: 'b2', title: 'Jalan Pulang', author: 'Rendra Ismail', genre: 'Puisi', tag: 'Puisi', sub: 'kumpulan sajak', coverPreset: 'navy', sample: true },
  { id: 'b3', title: 'Menulis dengan Hati', author: 'Sekar Ayuningtyas', genre: 'Esai', tag: 'Non-Fiksi', sub: 'catatan proses kreatif', coverPreset: 'slate', sample: true },
  { id: 'b4', title: 'Surat untuk Ibu', author: 'Damar Wicaksono', genre: 'Memoar', tag: 'Memoar', sub: 'kisah nyata', coverPreset: 'taupe', sample: true },
  { id: 'b5', title: 'Kota yang Tidur', author: 'Nadia Kusuma', genre: 'Novel', tag: 'Fiksi', sub: 'novel distopia', coverPreset: 'steel', sample: true },
  { id: 'b6', title: 'Anak-Anak Cahaya', author: 'Bimo Prasetyo', genre: 'Sastra Anak', tag: 'Anak', sub: 'dongeng bergambar', coverPreset: 'sand', sample: true },
  { id: 'b7', title: 'Sebelum Senja Tiba', author: 'Laras Widati', genre: 'Cerpen', tag: 'Antologi', sub: 'antologi cerita pendek', coverPreset: 'ocean', sample: true },
  { id: 'b8', title: 'Musim yang Hilang', author: 'Arya Nugraha', genre: 'Puisi', tag: 'Puisi', sub: 'sajak-sajak perjalanan', coverPreset: 'bronze', sample: true },
];

const DEFAULT_SITE = {
  hero: {
    eyebrow: 'Penerbit Independen Indonesia',
    titlePlain: 'Setiap cerita memiliki',
    titleEm: 'jalan untuk pulang.',
    lead: 'Langkah Pulang Publishing menemani penulis dari halaman pertama sampai buku berada di tangan pembaca. Kami hadir untuk membantu setiap cerita menemukan pembacanya.',
    stats: [
      { num: '120+', label: 'Judul diterbitkan' },
      { num: '80+', label: 'Penulis dinaungi' },
      { num: '2016', label: 'Berkarya sejak' },
    ],
  },
  about: {
    lead: 'Setiap cerita memiliki jalan untuk pulang.',
    paragraph1: 'Berdiri sejak 2016, Langkah Pulang Publishing percaya bahwa setiap cerita memiliki perjalanannya sendiri. Kami hadir untuk membantu penulis menghadirkan karya terbaiknya, dan membantu pembaca menemukan cerita yang menjadi bagian dari perjalanan hidupnya.',
    paragraph2: 'Dari sebuah ruang kerja kecil, kami kini telah menerbitkan lebih dari 120 judul lintas genre — fiksi, puisi, memoar, hingga buku anak — dan menaungi puluhan penulis dari berbagai penjuru Indonesia. Kami mengurus setiap tahap dengan cermat: kurasi naskah, penyuntingan, desain, produksi, hingga distribusi.',
  },
  contact: {
    email: 'langkahpublishing@gmail.com',
    address: 'Banjarbaru, Kalimantan Selatan',
    phone: '',
    instagram: '',
  },
  footer: {
    blurb: 'Penerbit independen Indonesia. Setiap cerita memiliki jalan untuk pulang — fiksi, non-fiksi, dan puisi yang ditulis dengan hati.',
    sinceYear: '2016',
  },
  catalogSampleNotice: true, // tampilkan badge "Contoh" & catatan data contoh di katalog
};

export function getBooks() {
  return readJSON('books.json', DEFAULT_BOOKS);
}
export function saveBooks(books) {
  writeJSON('books.json', books);
}

export function getSite() {
  const saved = readJSON('site.json', {});
  return {
    ...DEFAULT_SITE,
    ...saved,
    hero: { ...DEFAULT_SITE.hero, ...(saved.hero || {}) },
    about: { ...DEFAULT_SITE.about, ...(saved.about || {}) },
    contact: { ...DEFAULT_SITE.contact, ...(saved.contact || {}) },
    footer: { ...DEFAULT_SITE.footer, ...(saved.footer || {}) },
  };
}
export function saveSite(site) {
  writeJSON('site.json', site);
}

export function getAdmin() {
  return readJSON('admin.json', null);
}
export function saveAdmin(admin) {
  writeJSON('admin.json', admin);
}
