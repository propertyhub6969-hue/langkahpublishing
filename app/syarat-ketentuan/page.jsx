import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getSite } from '@/lib/store';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Syarat & Ketentuan — Langkah Pulang Publishing',
  description: 'Syarat dan ketentuan penggunaan situs, pengajuan naskah, pemesanan buku, dan unduhan PDF di Langkah Pulang Publishing.',
};

export default function SyaratKetentuanPage() {
  const { contact } = getSite();

  return (
    <>
      <Navbar />
      <main>
        <section className="legal">
          <div className="wrap">
            <div className="legal-header">
              <span className="eyebrow">Legal</span>
              <h1>Syarat &amp; Ketentuan</h1>
            </div>
            <p className="legal-updated">Terakhir diperbarui: 2 September 2026</p>

            <div className="legal-toc">
              <a href="#penerimaan">1. Penerimaan Syarat</a>
              <a href="#layanan">2. Tentang Layanan Kami</a>
              <a href="#kekayaan">3. Hak Kekayaan Intelektual</a>
              <a href="#naskah">4. Pengajuan Naskah</a>
              <a href="#pemesanan">5. Pemesanan &amp; Pembelian Buku</a>
              <a href="#unduhan">6. Unduhan Elektronik (PDF)</a>
              <a href="#tautan">7. Tautan ke Situs Lain</a>
              <a href="#tanggung-jawab">8. Batasan Tanggung Jawab</a>
              <a href="#perubahan">9. Perubahan Layanan &amp; Syarat</a>
              <a href="#hukum">10. Hukum yang Berlaku</a>
              <a href="#kontak">11. Kontak</a>
            </div>

            <div className="legal-body">
              <p>
                Dengan mengakses dan menggunakan situs langkahpublishing.my.id (&ldquo;Situs&rdquo;), Anda
                menyetujui syarat &amp; ketentuan berikut. Situs ini dikelola oleh Langkah Pulang Publishing,
                penerbit independen yang berdomisili di {contact.address || 'Indonesia'}.
              </p>

              <h2 id="penerimaan">1. Penerimaan Syarat</h2>
              <p>
                Dengan mengunjungi, mengirimkan naskah, memesan buku, atau mengunduh materi dari Situs ini,
                Anda dianggap telah membaca, memahami, dan menyetujui seluruh syarat &amp; ketentuan ini beserta{' '}
                <a href="/privasi">Kebijakan Privasi</a> kami. Jika Anda tidak menyetujuinya, mohon untuk tidak
                menggunakan Situs ini.
              </p>

              <h2 id="layanan">2. Tentang Layanan Kami</h2>
              <p>
                Situs ini menyediakan informasi tentang Langkah Pulang Publishing, katalog buku terbitan kami,
                sarana kontak untuk pengajuan naskah dan pemesanan buku, serta (untuk sebagian judul) unduhan
                berkas elektronik. Situs ini bersifat informasional — pemesanan dan transaksi pembelian
                diselesaikan melalui komunikasi langsung (email/WhatsApp), bukan sistem checkout otomatis.
              </p>

              <h2 id="kekayaan">3. Hak Kekayaan Intelektual</h2>
              <p>
                Seluruh konten di Situs ini — termasuk namun tidak terbatas pada teks, logo, desain sampul,
                tata letak, dan berkas elektronik buku — dilindungi hak cipta dan merupakan milik Langkah Pulang
                Publishing dan/atau penulis terkait. Anda tidak diperkenankan menyalin, memperbanyak,
                mendistribusikan ulang, atau menggunakan konten tersebut secara komersial tanpa izin tertulis
                dari kami.
              </p>

              <h2 id="naskah">4. Pengajuan Naskah oleh Penulis</h2>
              <ul>
                <li>Pengiriman naskah kepada kami <strong>tidak menjamin</strong> naskah tersebut akan diterbitkan.</li>
                <li>Hak cipta naskah tetap sepenuhnya milik penulis selama proses evaluasi berlangsung.</li>
                <li>Hubungan penerbitan (termasuk royalti, hak cetak, dan durasi kontrak) baru berlaku setelah kedua belah pihak menandatangani perjanjian penerbitan tertulis secara terpisah.</li>
                <li>Kami memperlakukan naskah yang belum diterbitkan secara rahasia, sebagaimana dijelaskan dalam <a href="/privasi">Kebijakan Privasi</a>.</li>
              </ul>

              <h2 id="pemesanan">5. Pemesanan &amp; Pembelian Buku</h2>
              <ul>
                <li>Pemesanan buku dilakukan melalui formulir kontak, email, atau WhatsApp — bukan transaksi otomatis di Situs.</li>
                <li>Harga, ketersediaan stok, dan estimasi pengiriman dapat berubah sewaktu-waktu dan akan dikonfirmasi langsung oleh tim kami sebelum transaksi disepakati.</li>
                <li>Pembayaran, pengiriman, dan kebijakan pengembalian diatur secara terpisah pada saat kesepakatan pemesanan, dan dapat berbeda untuk tiap transaksi.</li>
              </ul>

              <h2 id="unduhan">6. Unduhan Elektronik (PDF)</h2>
              <p>
                Sebagian judul pada Situs ini tersedia sebagai berkas elektronik (PDF) yang dapat dibaca atau
                diunduh. Berkas tersebut disediakan untuk <strong>keperluan baca pribadi</strong> dan tetap
                tunduk pada hak cipta sebagaimana dijelaskan pada bagian 3. Anda dilarang menjual kembali,
                mendistribusikan ulang, mengunggah ke platform lain, atau memperbanyak berkas tersebut tanpa
                izin tertulis dari kami atau penulis terkait.
              </p>

              <h2 id="tautan">7. Tautan ke Situs Lain</h2>
              <p>
                Situs kami dapat memuat tautan ke situs pihak ketiga (mis. media sosial). Kami tidak
                bertanggung jawab atas konten, kebijakan privasi, atau praktik dari situs pihak ketiga tersebut.
              </p>

              <h2 id="tanggung-jawab">8. Batasan Tanggung Jawab</h2>
              <p>
                Kami berupaya menjaga informasi di Situs ini tetap akurat dan terkini, namun tidak menjamin
                bahwa seluruh informasi (termasuk ketersediaan judul dan harga) selalu bebas dari kekeliruan.
                Langkah Pulang Publishing tidak bertanggung jawab atas kerugian yang timbul dari penggunaan
                Situs ini di luar kendali wajar kami.
              </p>

              <h2 id="perubahan">9. Perubahan Layanan &amp; Syarat</h2>
              <p>
                Kami berhak mengubah, menambah, atau menghentikan sebagian maupun seluruh layanan di Situs ini,
                serta memperbarui syarat &amp; ketentuan ini kapan saja. Perubahan berlaku sejak dipublikasikan
                di halaman ini.
              </p>

              <h2 id="hukum">10. Hukum yang Berlaku</h2>
              <p>
                Syarat &amp; ketentuan ini diatur dan ditafsirkan berdasarkan hukum yang berlaku di Republik
                Indonesia.
              </p>

              <h2 id="kontak">11. Kontak</h2>
              <p>
                Pertanyaan seputar syarat &amp; ketentuan ini dapat disampaikan ke{' '}
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
                {contact.address ? <> atau alamat kami di {contact.address}.</> : '.'}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
