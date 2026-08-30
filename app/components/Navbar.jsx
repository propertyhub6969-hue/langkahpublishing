import { Emblem } from './Logo';

export default function Navbar() {
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a href="#beranda" className="brand">
          <Emblem size={38} copper="#a8734a" line="#a8734a" />
          <span className="brand-text">
            <b>Langkah Pulang</b>
            <span>Publishing</span>
          </span>
        </a>
        <nav className="nav-links">
          <a href="#beranda">Beranda</a>
          <a href="#tentang">Tentang</a>
          <a href="#katalog">Katalog Buku</a>
          <a href="#kontak">Kontak</a>
        </nav>
        <div className="nav-cta">
          <a href="#katalog" className="btn btn-ghost">Jelajahi Buku</a>
          <a href="#kontak" className="btn btn-primary">Terbitkan Naskah</a>
        </div>
      </div>
    </header>
  );
}
