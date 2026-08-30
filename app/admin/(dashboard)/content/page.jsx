'use client';

import { useEffect, useState } from 'react';

export default function ContentAdminPage() {
  const [site, setSite] = useState(null);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/content')
      .then((r) => r.json())
      .then((d) => setSite(d.site));
  }, []);

  function updateHero(field, value) {
    setSite((s) => ({ ...s, hero: { ...s.hero, [field]: value } }));
  }
  function updateStat(idx, field, value) {
    setSite((s) => {
      const stats = [...s.hero.stats];
      stats[idx] = { ...stats[idx], [field]: value };
      return { ...s, hero: { ...s.hero, stats } };
    });
  }
  function updateAbout(field, value) {
    setSite((s) => ({ ...s, about: { ...s.about, [field]: value } }));
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
        setOk('Konten berhasil disimpan.');
      }
    } catch {
      setError('Terjadi kesalahan jaringan.');
    }
    setSaving(false);
  }

  if (!site) return <div className="a-empty">Memuat…</div>;

  return (
    <div>
      <h1>Beranda &amp; Tentang</h1>
      <p className="desc">Ubah teks utama, statistik, dan narasi profil penerbit.</p>

      {error && <div className="a-msg a-msg-error">{error}</div>}
      {ok && <div className="a-msg a-msg-ok">{ok}</div>}

      <form onSubmit={handleSubmit}>
        <div className="a-card">
          <h3>Hero (Beranda)</h3>
          <div className="a-field">
            <label>Label kecil di atas judul</label>
            <input value={site.hero.eyebrow} onChange={(e) => updateHero('eyebrow', e.target.value)} />
          </div>
          <div className="a-row">
            <div className="a-field">
              <label>Judul — bagian normal</label>
              <input value={site.hero.titlePlain} onChange={(e) => updateHero('titlePlain', e.target.value)} />
            </div>
            <div className="a-field">
              <label>Judul — bagian ditekankan (miring)</label>
              <input value={site.hero.titleEm} onChange={(e) => updateHero('titleEm', e.target.value)} />
            </div>
          </div>
          <div className="a-field">
            <label>Kalimat pengantar</label>
            <textarea value={site.hero.lead} onChange={(e) => updateHero('lead', e.target.value)} />
          </div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, margin: '18px 0 8px' }}>Statistik</label>
          <div className="a-row3">
            {site.hero.stats.map((s, i) => (
              <div key={i} className="a-field">
                <label>{`Angka ${i + 1}`}</label>
                <input value={s.num} onChange={(e) => updateStat(i, 'num', e.target.value)} placeholder="120+" />
                <input
                  style={{ marginTop: 8 }}
                  value={s.label}
                  onChange={(e) => updateStat(i, 'label', e.target.value)}
                  placeholder="Judul diterbitkan"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="a-card">
          <h3>Tentang Kami</h3>
          <div className="a-field">
            <label>Kutipan pembuka (dicetak miring besar)</label>
            <input value={site.about.lead} onChange={(e) => updateAbout('lead', e.target.value)} />
          </div>
          <div className="a-field">
            <label>Paragraf 1</label>
            <textarea value={site.about.paragraph1} onChange={(e) => updateAbout('paragraph1', e.target.value)} />
          </div>
          <div className="a-field">
            <label>Paragraf 2</label>
            <textarea value={site.about.paragraph2} onChange={(e) => updateAbout('paragraph2', e.target.value)} />
          </div>
        </div>

        <button type="submit" className="a-btn a-btn-primary" disabled={saving}>
          {saving ? 'Menyimpan…' : 'Simpan Perubahan'}
        </button>
      </form>
    </div>
  );
}
