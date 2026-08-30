const CONTACTS = [
  { ic: '✉️', lbl: 'Email', val: 'langkahpublishing@gmail.com', href: 'mailto:langkahpublishing@gmail.com' },
  { ic: '📍', lbl: 'Alamat', val: 'Banjarbaru, Kalimantan Selatan', href: null },
];

export default function Contact() {
  return (
    <section className="section contact" id="kontak">
      <div className="wrap contact-grid">
        <div className="contact-copy">
          <span className="eyebrow">Kontak</span>
          <h2 style={{ fontSize: 'clamp(28px,4vw,42px)', margin: '16px 0 0' }}>
            Mari bicarakan buku Anda
          </h2>
          <p>
            Punya naskah yang ingin diterbitkan, ingin memesan buku, atau
            menjajaki kerja sama? Kirim pesan lewat formulir ini atau hubungi kami
            langsung — tim kami membalas dalam 1–3 hari kerja.
          </p>

          <div className="contact-list">
            {CONTACTS.map((c) => (
              <div className="contact-item" key={c.lbl}>
                <div className="ic">{c.ic}</div>
                <div>
                  <div className="lbl">{c.lbl}</div>
                  <div className="val">
                    {c.href ? <a href={c.href}>{c.val}</a> : c.val}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form
          className="form"
          action="mailto:langkahpublishing@gmail.com"
          method="post"
          encType="text/plain"
        >
          <div className="row">
            <div className="field">
              <label htmlFor="nama">Nama</label>
              <input id="nama" name="nama" type="text" placeholder="Nama lengkap" required />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="email@anda.com" required />
            </div>
          </div>
          <div className="field">
            <label htmlFor="tujuan">Keperluan</label>
            <select id="tujuan" name="tujuan" defaultValue="">
              <option value="" disabled>Pilih keperluan…</option>
              <option>Menerbitkan naskah</option>
              <option>Pemesanan buku</option>
              <option>Kerja sama / distribusi</option>
              <option>Pertanyaan umum</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="pesan">Pesan</label>
            <textarea id="pesan" name="pesan" placeholder="Ceritakan tentang naskah atau keperluan Anda…" required />
          </div>
          <button type="submit" className="btn btn-primary">Kirim Pesan</button>
          <p className="form-note">Kami menghormati privasi Anda. Data hanya dipakai untuk membalas pesan ini.</p>
        </form>
      </div>
    </section>
  );
}
