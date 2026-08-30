'use client';

import { useEffect, useState } from 'react';

export default function KontakAdminPage() {
  const [site, setSite] = useState(null);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/content')
      .then((r) => r.json())
      .then((d) => setSite(d.site));
  }, []);

  function updateContact(field, value) {
    setSite((s) => ({ ...s, contact: { ...s.contact, [field]: value } }));
  }
  function updateFooter(field, value) {
    setSite((s) => ({ ...s, footer: { ...s.footer, [field]: value } }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(''); setOk('');
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(site),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Gagal menyimpan.');
      } else {
        setSite(data.site);
        setOk('Info kontak berhasil disimpan.');
      }
    } catch {
      setError('Terjadi kesalahan jaringan.');
    }
    setSaving(false);
  }

  if (!site) return <div className="a-empty">Memuat…</div>;

  return (
    <div>
      <h1>Kontak</h1>
      <p className="desc">Info ini tampil di seksi Kontak dan Footer website.</p>

      {error && <div className="a-msg a-msg-error">{error}</div>}
      {ok && <div className="a-msg a-msg-ok">{ok}</div>}

      <form onSubmit={handleSubmit}>
        <div className="a-card">
          <h3>Info Kontak</h3>
          <div className="a-row">
            <div className="a-field">
              <label>Email</label>
              <input type="email" value={site.contact.email} onChange={(e) => updateContact('email', e.target.value)} required />
            </div>
            <div className="a-field">
              <label>Nomor WhatsApp (opsional)</label>
              <input value={site.contact.phone} onChange={(e) => updateContact('phone', e.target.value)} placeholder="+62 8xx-xxxx-xxxx" />
            </div>
          </div>
          <div className="a-row">
            <div className="a-field">
              <label>Alamat</label>
              <input value={site.contact.address} onChange={(e) => updateContact('address', e.target.value)} />
            </div>
            <div className="a-field">
              <label>Instagram (opsional)</label>
              <input value={site.contact.instagram} onChange={(e) => updateContact('instagram', e.target.value)} placeholder="@namaakun" />
            </div>
          </div>
        </div>

        <div className="a-card">
          <h3>Footer</h3>
          <div className="a-field">
            <label>Deskripsi singkat penerbit</label>
            <textarea value={site.footer.blurb} onChange={(e) => updateFooter('blurb', e.target.value)} />
          </div>
          <div className="a-field">
            <label>Tahun berdiri</label>
            <input value={site.footer.sinceYear} onChange={(e) => updateFooter('sinceYear', e.target.value)} style={{ maxWidth: 140 }} />
          </div>
        </div>

        <button type="submit" className="a-btn a-btn-primary" disabled={saving}>
          {saving ? 'Menyimpan…' : 'Simpan Perubahan'}
        </button>
      </form>
    </div>
  );
}
