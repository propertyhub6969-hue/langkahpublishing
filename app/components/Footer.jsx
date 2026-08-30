import { Emblem } from './Logo';

export default function Footer() {
  const year = 2016; // tahun berdiri
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          <div>
            <div className="brand">
              <Emblem size={38} copper="#c8925e" line="#c8925e" />
              <span className="brand-text">
                <b>Langkah Pulang</b>
                <span>Publishing</span>
              </span>
            </div>
            <p className="foot-blurb">
              Penerbit independen Indonesia. Setiap cerita memiliki jalan
              untuk pulang — fiksi, non-fiksi, dan puisi yang ditulis dengan hati.
            </p>
          </div>

          <div>
            <h5>Menu</h5>
            <ul>
              <li><a href="#beranda">Beranda</a></li>
              <li><a href="#tentang">Tentang</a></li>
              <li><a href="#katalog">Katalog Buku</a></li>
              <li><a href="#kontak">Kontak</a></li>
            </ul>
          </div>

          <div>
            <h5>Untuk Penulis</h5>
            <ul>
              <li><a href="#kontak">Kirim Naskah</a></li>
              <li><a href="#kontak">Panduan Terbit</a></li>
              <li><a href="#tentang">Royalti &amp; Kontrak</a></li>
            </ul>
          </div>

          <div>
            <h5>Ikuti Kami</h5>
            <ul>
              <li><a href="mailto:langkahpublishing@gmail.com">Email</a></li>
              <li><a href="#kontak">Kirim Pesan</a></li>
            </ul>
          </div>
        </div>

        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} Langkah Pulang Publishing. Seluruh hak cipta dilindungi.</span>
          <span>Berkarya sejak {year} · Banjarbaru, Kalimantan Selatan</span>
        </div>
      </div>
    </footer>
  );
}
