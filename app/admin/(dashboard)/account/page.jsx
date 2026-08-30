'use client';

import { useState } from 'react';

export default function AccountAdminPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(''); setOk('');
    if (newPassword !== confirmPassword) {
      setError('Konfirmasi password baru tidak cocok.');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/account', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Gagal mengubah password.');
      } else {
        setOk('Password berhasil diubah. Gunakan password baru saat login berikutnya.');
        setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
      }
    } catch {
      setError('Terjadi kesalahan jaringan.');
    }
    setSaving(false);
  }

  return (
    <div>
      <h1>Akun</h1>
      <p className="desc">Ubah password login panel admin.</p>

      {error && <div className="a-msg a-msg-error">{error}</div>}
      {ok && <div className="a-msg a-msg-ok">{ok}</div>}

      <div className="a-card" style={{ maxWidth: 420 }}>
        <h3>Ganti Password</h3>
        <form onSubmit={handleSubmit}>
          <div className="a-field">
            <label>Password Saat Ini</label>
            <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
          </div>
          <div className="a-field">
            <label>Password Baru (min. 8 karakter)</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} minLength={8} required />
          </div>
          <div className="a-field">
            <label>Konfirmasi Password Baru</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} minLength={8} required />
          </div>
          <button type="submit" className="a-btn a-btn-primary" disabled={saving}>
            {saving ? 'Menyimpan…' : 'Ubah Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
