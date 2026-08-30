export default function Hero() {
  return (
    <section className="hero" id="beranda">
      <div className="wrap hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">Penerbit Independen Indonesia</span>
          <h1>
            Setiap cerita memiliki <em>jalan untuk pulang.</em>
          </h1>
          <p className="hero-lead">
            Langkah Pulang Publishing menemani penulis dari halaman pertama sampai
            buku berada di tangan pembaca. Kami hadir untuk membantu setiap
            cerita menemukan pembacanya.
          </p>
          <div className="hero-actions">
            <a href="#katalog" className="btn btn-primary">Lihat Katalog Buku</a>
            <a href="#tentang" className="btn btn-ghost">Kenali Kami</a>
          </div>
          <div className="hero-meta">
            <div>
              <div className="num">120+</div>
              <div className="lbl">Judul diterbitkan</div>
            </div>
            <div>
              <div className="num">80+</div>
              <div className="lbl">Penulis dinaungi</div>
            </div>
            <div>
              <div className="num">2016</div>
              <div className="lbl">Berkarya sejak</div>
            </div>
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
