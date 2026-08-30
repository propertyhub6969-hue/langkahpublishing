import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Strip from './components/Strip';
import About from './components/About';
import Catalog from './components/Catalog';
import Quote from './components/Quote';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Konten (buku, kontak, teks beranda/tentang) bisa diubah lewat /admin tanpa
// rebuild, jadi halaman ini harus selalu dirender ulang per-request.
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Strip />
        <About />
        <Catalog />
        <Quote />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
