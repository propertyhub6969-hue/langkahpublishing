const BOOKS = [
  {
    title: 'Rumah di Ujung Musim',
    author: 'Alanda Prawira',
    genre: 'Novel',
    tag: 'Fiksi',
    sub: 'sebuah novel',
    cover: 'linear-gradient(160deg, #c8925e, #a8734a)',
  },
  {
    title: 'Jalan Pulang',
    author: 'Rendra Ismail',
    genre: 'Puisi',
    tag: 'Puisi',
    sub: 'kumpulan sajak',
    cover: 'linear-gradient(160deg, #16283a, #0f1d2d)',
  },
  {
    title: 'Menulis dengan Hati',
    author: 'Sekar Ayuningtyas',
    genre: 'Esai',
    tag: 'Non-Fiksi',
    sub: 'catatan proses kreatif',
    cover: 'linear-gradient(160deg, #51606f, #384752)',
  },
  {
    title: 'Surat untuk Ibu',
    author: 'Damar Wicaksono',
    genre: 'Memoar',
    tag: 'Memoar',
    sub: 'kisah nyata',
    cover: 'linear-gradient(160deg, #a99a8a, #857a63)',
  },
  {
    title: 'Kota yang Tidur',
    author: 'Nadia Kusuma',
    genre: 'Novel',
    tag: 'Fiksi',
    sub: 'novel distopia',
    cover: 'linear-gradient(160deg, #2c4459, #1a2e3f)',
  },
  {
    title: 'Anak-Anak Cahaya',
    author: 'Bimo Prasetyo',
    genre: 'Sastra Anak',
    tag: 'Anak',
    sub: 'dongeng bergambar',
    cover: 'linear-gradient(160deg, #d4a575, #b8845a)',
  },
  {
    title: 'Sebelum Senja Tiba',
    author: 'Laras Widati',
    genre: 'Cerpen',
    tag: 'Antologi',
    sub: 'antologi cerita pendek',
    cover: 'linear-gradient(160deg, #3d5568, #2a3d4c)',
  },
  {
    title: 'Musim yang Hilang',
    author: 'Arya Nugraha',
    genre: 'Puisi',
    tag: 'Puisi',
    sub: 'sajak-sajak perjalanan',
    cover: 'linear-gradient(160deg, #8f7256, #6b5540)',
  },
];

export default function Catalog() {
  return (
    <section className="section catalog" id="katalog">
      <div className="wrap">
        <div className="cat-head">
          <div className="section-head" style={{ marginBottom: 0 }}>
            <span className="eyebrow">Katalog Buku</span>
            <h2>Cerita-cerita pilihan kami</h2>
            <p>
              Judul-judul yang lahir dari kerja penuh hati bersama para penulis.
              Sebagian tersedia di toko buku daring maupun mitra ritel kami.
            </p>
            <p className="cat-note">
              Katalog di bawah ini masih menampilkan <strong>data contoh</strong> dan
              akan diperbarui dengan judul-judul terbitan Langkah Pulang Publishing.
            </p>
          </div>
          <a href="#kontak" className="btn btn-ghost">Pesan &amp; Distribusi</a>
        </div>

        <div className="cat-grid">
          {BOOKS.map((b) => (
            <article className="bookcard" key={b.title}>
              <div className="cover" style={{ background: b.cover }}>
                <span className="cover-sample">Contoh</span>
                <small>{b.genre}</small>
                <div>
                  <b>{b.title}</b>
                  <i>{b.sub}</i>
                </div>
              </div>
              <div className="bookmeta">
                <h4>{b.title}</h4>
                <div className="author">{b.author}</div>
                <span className="tag">{b.tag}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="cat-foot">
          <a href="#kontak" className="btn btn-dark">Minta Katalog Lengkap</a>
        </div>
      </div>
    </section>
  );
}
