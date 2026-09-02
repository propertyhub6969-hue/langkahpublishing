'use client';

import { useEffect, useRef, useState } from 'react';
import { COVER_PRESETS, coverCss } from '@/lib/covers';

const EMPTY_FORM = {
  title: '', author: '', genre: '', tag: '', sub: '', description: '',
  coverPreset: 'copper', coverType: 'preset', coverImage: '',
  fileUrl: '', fileName: '',
};

export default function BooksAdminPage() {
  const [books, setBooks] = useState(null);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const coverInputRef = useRef(null);
  const fileInputRef = useRef(null);

  async function load() {
    const res = await fetch('/api/admin/books');
    const data = await res.json();
    setBooks(data.books || []);
  }

  useEffect(() => {
    load();
  }, []);

  function startEdit(book) {
    setEditingId(book.id);
    setForm({
      title: book.title, author: book.author, genre: book.genre,
      tag: book.tag, sub: book.sub, description: book.description || '',
      coverPreset: book.coverPreset,
      coverType: book.coverType === 'image' && book.coverImage ? 'image' : 'preset',
      coverImage: book.coverImage || '',
      fileUrl: book.fileUrl || '', fileName: book.fileName || '',
    });
    setOk(''); setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  async function handleCoverChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);
    setError('');
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Gagal mengunggah gambar.');
      } else {
        setForm((f) => ({ ...f, coverType: 'image', coverImage: data.url }));
      }
    } catch {
      setError('Terjadi kesalahan jaringan saat mengunggah.');
    }
    setUploadingCover(false);
    if (coverInputRef.current) coverInputRef.current.value = '';
  }

  function removeCoverImage() {
    setForm((f) => ({ ...f, coverType: 'preset', coverImage: '' }));
  }

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingFile(true);
    setError('');
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch('/api/admin/upload-file', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Gagal mengunggah file.');
      } else {
        setForm((f) => ({ ...f, fileUrl: data.url, fileName: data.name }));
      }
    } catch {
      setError('Terjadi kesalahan jaringan saat mengunggah.');
    }
    setUploadingFile(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  function removeFile() {
    setForm((f) => ({ ...f, fileUrl: '', fileName: '' }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(''); setOk('');
    try {
      const url = editingId ? `/api/admin/books/${editingId}` : '/api/admin/books';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Gagal menyimpan buku.');
        setSaving(false);
        return;
      }
      setOk(editingId ? 'Buku berhasil diperbarui.' : 'Buku baru berhasil ditambahkan.');
      cancelEdit();
      await load();
    } catch {
      setError('Terjadi kesalahan jaringan.');
    }
    setSaving(false);
  }

  async function handleDelete(id) {
    if (!confirm('Hapus buku ini dari katalog?')) return;
    setError(''); setOk('');
    const res = await fetch(`/api/admin/books/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || 'Gagal menghapus buku.');
      return;
    }
    setOk('Buku berhasil dihapus.');
    await load();
  }

  return (
    <div>
      <h1>Katalog Buku</h1>
      <p className="desc">
        Tambah, ubah, atau hapus judul. Setiap buku otomatis punya halaman detail sendiri
        (bisa diklik dari Katalog Buku) — lengkapi deskripsi &amp; unggah PDF supaya pengunjung bisa membaca detail dan mengunduhnya.
      </p>

      {error && <div className="a-msg a-msg-error">{error}</div>}
      {ok && <div className="a-msg a-msg-ok">{ok}</div>}

      <div className="a-card">
        <h3>{editingId ? 'Ubah Buku' : 'Tambah Buku Baru'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="a-row">
            <div className="a-field">
              <label>Judul Buku</label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div className="a-field">
              <label>Nama Penulis</label>
              <input
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="a-row3">
            <div className="a-field">
              <label>Genre (mis. Novel, Puisi)</label>
              <input value={form.genre} onChange={(e) => setForm({ ...form, genre: e.target.value })} />
            </div>
            <div className="a-field">
              <label>Label Kategori (badge)</label>
              <input value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} placeholder="Fiksi, Puisi, Non-Fiksi…" />
            </div>
            <div className="a-field">
              <label>Subjudul singkat (opsional)</label>
              <input value={form.sub} onChange={(e) => setForm({ ...form, sub: e.target.value })} placeholder="sebuah novel…" />
            </div>
          </div>

          <div className="a-field">
            <label>Deskripsi Lengkap (tampil di halaman detail, opsional)</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Sinopsis atau ringkasan buku yang akan dibaca pengunjung di halaman detail…"
              rows={4}
            />
          </div>

          <div className="a-field">
            <label>Sampul Buku</label>
            <div className="a-cover-tabs">
              <button
                type="button"
                className={`a-cover-tab${form.coverType === 'preset' ? ' active' : ''}`}
                onClick={() => setForm({ ...form, coverType: 'preset' })}
              >
                Warna
              </button>
              <button
                type="button"
                className={`a-cover-tab${form.coverType === 'image' ? ' active' : ''}`}
                onClick={() => setForm({ ...form, coverType: 'image' })}
              >
                Unggah Gambar
              </button>
            </div>

            {form.coverType === 'preset' ? (
              <div className="a-cover-upload-row">
                <div className="a-cover-preview" style={{ background: coverCss(form.coverPreset) }} />
                <div style={{ flex: 1 }}>
                  <select value={form.coverPreset} onChange={(e) => setForm({ ...form, coverPreset: e.target.value })}>
                    {Object.entries(COVER_PRESETS).map(([key, p]) => (
                      <option key={key} value={key}>{p.label}</option>
                    ))}
                  </select>
                  <p className="a-upload-hint">Sampul akan ditampilkan sebagai warna gradasi dengan judul di atasnya.</p>
                </div>
              </div>
            ) : (
              <div className="a-cover-upload-row">
                <div className="a-cover-preview">
                  {form.coverImage ? (
                    <img src={form.coverImage} alt="Pratinjau sampul" />
                  ) : (
                    <span className="ph">Belum ada gambar</span>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <input
                    ref={coverInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleCoverChange}
                    disabled={uploadingCover}
                  />
                  {form.coverImage && (
                    <button type="button" className="a-btn a-btn-ghost a-btn-sm" style={{ marginTop: 10 }} onClick={removeCoverImage}>
                      Hapus Gambar
                    </button>
                  )}
                  <p className="a-upload-hint">
                    {uploadingCover
                      ? 'Mengunggah…'
                      : 'JPG, PNG, atau WebP, maks. 4MB. Gambar otomatis dipotong pas ke ukuran sampul (rasio 3:4.4), tidak perlu diedit dulu.'}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="a-field">
            <label>File Buku untuk Dibaca &amp; Diunduh (PDF, opsional)</label>
            {form.fileUrl ? (
              <div className="a-file-row">
                <span className="a-file-chip">📄 {form.fileName || 'buku.pdf'}</span>
                <a href={form.fileUrl} target="_blank" rel="noreferrer" className="a-btn a-btn-ghost a-btn-sm">Lihat File</a>
                <button type="button" className="a-btn a-btn-danger a-btn-sm" onClick={removeFile}>Hapus File</button>
              </div>
            ) : (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  disabled={uploadingFile}
                />
                <p className="a-upload-hint">
                  {uploadingFile
                    ? 'Mengunggah…'
                    : 'PDF, maks. 25MB. Kalau kosong, halaman detail akan menampilkan "belum tersedia untuk diunduh".'}
                </p>
              </>
            )}
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button type="submit" className="a-btn a-btn-primary" disabled={saving || uploadingCover || uploadingFile}>
              {saving ? 'Menyimpan…' : editingId ? 'Simpan Perubahan' : 'Tambah Buku'}
            </button>
            {editingId && (
              <button type="button" className="a-btn a-btn-ghost" onClick={cancelEdit}>
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="a-book-list">
        {books === null && <div className="a-empty">Memuat…</div>}
        {books && books.length === 0 && <div className="a-empty">Belum ada buku. Tambahkan buku pertama Anda di atas.</div>}
        {books && books.map((b) => {
          const hasPhoto = b.coverType === 'image' && b.coverImage;
          return (
            <div className="a-book-row" key={b.id}>
              <div className="a-book-swatch" style={hasPhoto ? undefined : { background: coverCss(b.coverPreset) }}>
                {hasPhoto && <img src={b.coverImage} alt="" />}
              </div>
              <div className="a-book-info">
                <div className="t">
                  {b.title}
                  {b.sample && <span className="a-sample-badge">Contoh</span>}
                  {b.fileUrl && <span className="a-pdf-badge">PDF</span>}
                </div>
                <div className="m">{b.author} · {b.genre}{b.tag ? ` · ${b.tag}` : ''}</div>
              </div>
              <div className="a-book-actions">
                <a href={`/buku/${b.id}`} target="_blank" rel="noreferrer" className="a-btn a-btn-ghost a-btn-sm">Lihat</a>
                <button className="a-btn a-btn-ghost a-btn-sm" onClick={() => startEdit(b)}>Ubah</button>
                <button className="a-btn a-btn-danger a-btn-sm" onClick={() => handleDelete(b.id)}>Hapus</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
