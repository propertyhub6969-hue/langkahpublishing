import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Strip from './components/Strip';
import About from './components/About';
import Catalog from './components/Catalog';
import Quote from './components/Quote';
import Contact from './components/Contact';
import Footer from './components/Footer';

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
