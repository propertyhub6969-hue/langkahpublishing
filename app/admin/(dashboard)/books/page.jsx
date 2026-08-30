'use client';

import { useEffect, useState } from 'react';
import { COVER_PRESETS, coverCss } from '@/lib/covers';

const EMPTY_FORM = { title: '', author: '', genre: '', tag: '', sub: '', coverPreset: 'copper' };

export default function BooksAdminPage() {
  const [books, setBooks] = useState(null);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

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
      tag: book.tag, sub: book.sub, coverPreset: book.coverPreset,
    });
    setOk(''); setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(EMPTY_FORM);
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
      <p className="desc">Tambah, ubah, atau hapus judul yang tampil di halaman Katalog Buku.</p>

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
              <label>Warna Sampul</label>
              <select value={form.coverPreset} onChange={(e) => setForm({ ...form, coverPreset: e.target.value })}>
                {Object.entries(COVER_PRESETS).map(([key, p]) => (
                  <option key={key} value={key}>{p.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="a-field">
            <label>Subjudul singkat (opsional)</label>
            <input value={form.sub} onChange={(e) => setForm({ ...form, sub: e.target.value })} placeholder="mis. sebuah novel, kumpulan sajak" />
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button type="submit" className="a-btn a-btn-primary" disabled={saving}>
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
        {books && books.map((b) => (
          <div className="a-book-row" key={b.id}>
            <div className="a-book-swatch" style={{ background: coverCss(b.coverPreset) }} />
            <div className="a-book-info">
              <div className="t">
                {b.title}
                {b.sample && <span className="a-sample-badge">Contoh</span>}
              </div>
              <div className="m">{b.author} · {b.genre}{b.tag ? ` · ${b.tag}` : ''}</div>
            </div>
            <div className="a-book-actions">
              <button className="a-btn a-btn-ghost a-btn-sm" onClick={() => startEdit(b)}>Ubah</button>
              <button className="a-btn a-btn-danger a-btn-sm" onClick={() => handleDelete(b.id)}>Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
