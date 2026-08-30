import { getBooks, getSite } from '@/lib/store';
import { coverCss } from '@/lib/covers';

export default function Catalog() {
  const books = getBooks();
  const { catalogSampleNotice } = getSite();
  const hasSample = catalogSampleNotice && books.some((b) => b.sample);

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
            {hasSample && (
              <p className="cat-note">
                Katalog di bawah ini masih menampilkan <strong>data contoh</strong> dan
                akan diperbarui dengan judul-judul terbitan Langkah Pulang Publishing.
              </p>
            )}
          </div>
          <a href="#kontak" className="btn btn-ghost">Pesan &amp; Distribusi</a>
        </div>

        {books.length === 0 ? (
          <p style={{ color: 'var(--muted)' }}>Katalog belum berisi judul apa pun.</p>
        ) : (
          <div className="cat-grid">
            {books.map((b) => (
              <article className="bookcard" key={b.id}>
                <div className="cover" style={{ background: coverCss(b.coverPreset) }}>
                  {b.sample && <span className="cover-sample">Contoh</span>}
                  <small>{b.genre}</small>
                  <div>
                    <b>{b.title}</b>
                    <i>{b.sub}</i>
                  </div>
                </div>
                <div className="bookmeta">
                  <h4>{b.title}</h4>
                  <div className="author">{b.author}</div>
                  {b.tag && <span className="tag">{b.tag}</span>}
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="cat-foot">
          <a href="#kontak" className="btn btn-dark">Minta Katalog Lengkap</a>
        </div>
      </div>
    </section>
  );
}
