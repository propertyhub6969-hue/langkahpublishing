import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getSite } from '@/lib/store';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Kebijakan Privasi — Langkah Pulang Publishing',
  description: 'Kebijakan privasi Langkah Pulang Publishing: informasi yang kami kumpulkan, cara kami menggunakannya, dan hak Anda.',
};

export default function PrivasiPage() {
  const { contact } = getSite();

  return (
    <>
      <Navbar />
      <main>
        <section className="legal">
          <div className="wrap">
            <div className="legal-header">
              <span className="eyebrow">Legal</span>
              <h1>Kebijakan Privasi</h1>
            </div>
            <p className="legal-updated">Terakhir diperbarui: 2 September 2026</p>

            <div className="legal-toc">
              <a href="#informasi">1. Informasi yang Kami Kumpulkan</a>
              <a href="#penggunaan">2. Penggunaan Informasi</a>
              <a href="#naskah">3. Naskah dari Penulis</a>
              <a href="#penyimpanan">4. Penyimpanan &amp; Keamanan</a>
              <a href="#berbagi">5. Berbagi Data ke Pihak Ketiga</a>
              <a href="#cookie">6. Cookie</a>
              <a href="#anak">7. Anak di Bawah Umur</a>
              <a href="#hak">8. Hak Anda</a>
              <a href="#perubahan">9. Perubahan Kebijakan</a>
              <a href="#kontak">10. Kontak</a>
            </div>

            <div className="legal-body">
              <p>
                Langkah Pulang Publishing (&ldquo;kami&rdquo;) menghargai privasi setiap pengunjung situs
                langkahpublishing.my.id, penulis yang mengirimkan naskah, dan pembaca yang menghubungi kami.
                Kebijakan ini menjelaskan informasi apa saja yang kami kumpulkan, bagaimana kami menggunakannya,
                dan hak Anda atas data tersebut.
              </p>

              <h2 id="informasi">1. Informasi yang Kami Kumpulkan</h2>
              <p>Kami hanya mengumpulkan informasi yang Anda berikan secara langsung, yaitu:</p>
              <ul>
                <li><strong>Formulir Kontak</strong> — nama, alamat email, keperluan (mis. menerbitkan naskah, pemesanan buku), dan isi pesan yang Anda tulis.</li>
                <li><strong>Naskah &amp; lampiran</strong> yang Anda kirimkan kepada kami melalui email atau kanal komunikasi lain.</li>
              </ul>
              <p>
                Kami tidak menggunakan alat pelacak iklan pihak ketiga dan tidak meminta data seperti nomor
                kartu pembayaran melalui situs ini — pemesanan buku dan transaksi dilakukan langsung melalui
                komunikasi pribadi (email/WhatsApp), bukan lewat sistem checkout otomatis di situs.
              </p>

              <h2 id="penggunaan">2. Penggunaan Informasi</h2>
              <p>Informasi yang Anda berikan kami gunakan untuk:</p>
              <ul>
                <li>Membalas pertanyaan, permintaan katalog, atau pemesanan buku Anda;</li>
                <li>Mengevaluasi naskah yang Anda ajukan untuk diterbitkan;</li>
                <li>Berkomunikasi terkait kerja sama penerbitan atau distribusi;</li>
                <li>Keperluan administratif internal (mis. pencatatan komunikasi dengan penulis dan mitra).</li>
              </ul>
              <p>Kami tidak menggunakan data Anda untuk mengirim pemasaran tanpa persetujuan Anda.</p>

              <h2 id="naskah">3. Naskah yang Dikirim Penulis</h2>
              <p>
                Naskah dan materi lain yang Anda kirimkan untuk dipertimbangkan penerbitannya bersifat rahasia
                dan hanya digunakan untuk proses evaluasi internal oleh tim editorial kami. Hak cipta naskah
                tetap sepenuhnya milik penulis sampai ada perjanjian penerbitan tertulis yang disepakati bersama
                (lihat juga <a href="/syarat-ketentuan">Syarat &amp; Ketentuan</a>).
              </p>

              <h2 id="penyimpanan">4. Penyimpanan &amp; Keamanan</h2>
              <p>
                Pesan yang Anda kirim lewat formulir kontak diteruskan langsung ke alamat email kami dan tidak
                disimpan dalam basis data publik situs. Kami berupaya menjaga keamanan komunikasi dan data yang
                Anda percayakan kepada kami, namun tidak ada metode transmisi melalui internet yang 100% aman.
              </p>

              <h2 id="berbagi">5. Berbagi Data ke Pihak Ketiga</h2>
              <p>
                Kami tidak menjual, menyewakan, atau membagikan data pribadi Anda kepada pihak ketiga untuk
                kepentingan pemasaran. Data hanya dapat dibagikan bila diwajibkan oleh hukum yang berlaku, atau
                kepada mitra percetakan/distribusi yang relevan dengan proses penerbitan buku Anda, dengan
                sepengetahuan Anda.
              </p>

              <h2 id="cookie">6. Cookie</h2>
              <p>
                Situs publik ini tidak menggunakan cookie pelacakan pihak ketiga. Cookie sesi hanya digunakan
                pada halaman admin internal kami untuk keperluan autentikasi, dan tidak berlaku bagi pengunjung
                umum.
              </p>

              <h2 id="anak">7. Anak di Bawah Umur</h2>
              <p>
                Situs ini tidak ditujukan untuk anak-anak di bawah 13 tahun. Kami tidak dengan sengaja
                mengumpulkan data pribadi dari anak-anak tanpa persetujuan orang tua/wali.
              </p>

              <h2 id="hak">8. Hak Anda</h2>
              <p>Anda berhak untuk:</p>
              <ul>
                <li>Meminta salinan data pribadi yang kami simpan tentang Anda;</li>
                <li>Meminta koreksi atas data yang tidak akurat;</li>
                <li>Meminta penghapusan data pribadi Anda dari komunikasi kami;</li>
                <li>Menarik persetujuan atas penggunaan data Anda kapan saja.</li>
              </ul>
              <p>Untuk menggunakan hak-hak ini, silakan hubungi kami melalui kontak di bawah.</p>

              <h2 id="perubahan">9. Perubahan Kebijakan</h2>
              <p>
                Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan akan ditampilkan di
                halaman ini beserta tanggal pembaruannya. Kami menganjurkan Anda meninjau halaman ini secara
                berkala.
              </p>

              <h2 id="kontak">10. Kontak</h2>
              <p>
                Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami di{' '}
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
                {contact.address ? <> atau melalui alamat kami di {contact.address}.</> : '.'}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
