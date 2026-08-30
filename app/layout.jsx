import './globals.css';

export const metadata = {
  title: 'Langkah Pulang Publishing — Setiap Cerita Memiliki Jalan untuk Pulang',
  description:
    'Langkah Pulang Publishing adalah penerbit independen Indonesia yang menerbitkan fiksi, non-fiksi, dan puisi dengan hati. Kami menemani penulis dari naskah hingga menjadi buku.',
  metadataBase: new URL('https://langkahpublishing.my.id'),
  keywords: [
    'penerbit buku',
    'penerbit independen',
    'Langkah Pulang Publishing',
    'katalog buku',
    'terbitkan buku',
    'penerbit Indonesia',
  ],
  openGraph: {
    title: 'Langkah Pulang Publishing',
    description:
      'Penerbit independen Indonesia. Setiap cerita memiliki jalan untuk pulang — fiksi, non-fiksi, dan puisi.',
    url: 'https://langkahpublishing.my.id',
    siteName: 'Langkah Pulang Publishing',
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>{children}</body>
    </html>
  );
}
