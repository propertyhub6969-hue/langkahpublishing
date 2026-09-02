import { notFound } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { getBooks } from '@/lib/store';
import { coverCss } from '@/lib/covers';

export const dynamic = 'force-dynamic';

function findBook(id) {
  return getBooks().find((b) => b.id === id);
}

export async function generateMetadata({ params }) {
  const book = findBook(params.id);
  if (!book) return { title: 'Buku tidak ditemukan — Langkah Pulang Publishing' };
  return {
    title: `${book.title} — Langkah Pulang Publishing`,
    description: book.description || book.sub || `${book.title} oleh ${book.author}, terbitan Langkah Pulang Publishing.`,
  };
}

export default function BookDetailPage({ params }) {
  const book = findBook(params.id);
  if (!book) notFound();

  const hasPhoto = book.coverType === 'image' && book.coverImage;

  return (
    <>
      <Navbar />
      <main>
        <section className="book-detail">
          <div className="wrap">
            <a href="/#katalog" className="bd-back">← Kembali ke Katalog Buku</a>

            <div className="bd-grid">
              <div
                className={`bd-cover${hasPhoto ? ' has-photo' : ''}`}
                style={hasPhoto ? undefined : { background: coverCss(book.coverPreset) }}
              >
                {hasPhoto ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={book.coverImage} alt={`Sampul buku ${book.title}`} />
                ) : (
                  <>
                    <small>{book.genre}</small>
                    <div>
                      <b>{book.title}</b>
                      <i>{book.sub}</i>
                    </div>
                  </>
                )}
              </div>

              <div className="bd-info">
                {book.tag && <span className="bd-tag">{book.tag}</span>}
                <h1>{book.title}</h1>
                <p className="bd-author">oleh <b>{book.author}</b>{book.genre ? ` · ${book.genre}` : ''}</p>

                <p className="bd-desc">
                  {book.description || book.sub || 'Deskripsi lengkap untuk buku ini belum ditambahkan.'}
                </p>

                {book.fileUrl ? (
                  <div className="bd-actions">
                    <a href={book.fileUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                      Baca Buku (PDF)
                    </a>
                    <a href={book.fileUrl} download={book.fileName || `${book.title}.pdf`} className="btn btn-ghost">
                      Unduh PDF
                    </a>
                  </div>
                ) : (
                  <div className="bd-unavailable">
                    Buku ini belum tersedia untuk dibaca/diunduh secara daring.{' '}
                    <a href="/#kontak">Hubungi kami</a> untuk info ketersediaan &amp; pemesanan.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
