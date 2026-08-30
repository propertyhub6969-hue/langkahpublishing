import { getSite } from '@/lib/store';

export default function Hero() {
  const { hero } = getSite();
  return (
    <section className="hero" id="beranda">
      <div className="wrap hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">{hero.eyebrow}</span>
          <h1>
            {hero.titlePlain} <em>{hero.titleEm}</em>
          </h1>
          <p className="hero-lead">{hero.lead}</p>
          <div className="hero-actions">
            <a href="#katalog" className="btn btn-primary">Lihat Katalog Buku</a>
            <a href="#tentang" className="btn btn-ghost">Kenali Kami</a>
          </div>
          <div className="hero-meta">
            {hero.stats.map((s, i) => (
              <div key={i}>
                <div className="num">{s.num}</div>
                <div className="lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="book-stack">
            <div className="book book-1">
              <small>Puisi</small>
              <div>
                <b>Jalan Pulang</b>
                <span>kumpulan sajak</span>
              </div>
            </div>
            <div className="book book-2">
              <small>Fiksi</small>
              <div>
                <b>Rumah di Ujung Musim</b>
                <span>sebuah novel</span>
              </div>
            </div>
            <div className="book book-3">
              <small>Esai</small>
              <div>
                <b>Menulis dengan Hati</b>
                <span>catatan proses</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
