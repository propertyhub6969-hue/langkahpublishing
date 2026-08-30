import { getSite } from '@/lib/store';

const VALUES = [
  {
    ic: '🌱',
    bg: 'var(--forest-soft)',
    title: 'Menaungi Penulis Baru',
    body: 'Kami percaya setiap suara layak didengar. Naskah pertama diperlakukan sama seriusnya dengan karya penulis mapan.',
  },
  {
    ic: '📖',
    bg: 'var(--terra-soft)',
    title: 'Penyuntingan yang Berhati',
    body: 'Editor kami mendampingi, bukan menyeragamkan. Kami menjaga suara asli penulis tetap utuh dari awal hingga cetak.',
  },
  {
    ic: '🤝',
    bg: 'var(--forest-soft)',
    title: 'Kemitraan yang Adil',
    body: 'Royalti transparan, kontrak jelas, dan komunikasi terbuka. Kami tumbuh bersama para penulis, bukan di atas mereka.',
  },
];

export default function About() {
  const { about } = getSite();
  return (
    <section className="section about" id="tentang">
      <div className="wrap about-grid">
        <div className="about-copy">
          <span className="eyebrow">Tentang Kami</span>
          <h2 style={{ fontSize: 'clamp(28px,4vw,42px)', margin: '16px 0 22px' }}>
            Tentang Langkah Pulang Publishing
          </h2>
          <p className="lead">“{about.lead}”</p>
          <p>{about.paragraph1}</p>
          <p>{about.paragraph2}</p>
        </div>

        <div className="values">
          {VALUES.map((v) => (
            <div className="value" key={v.title}>
              <div className="ic" style={{ background: v.bg }}>{v.ic}</div>
              <h4>{v.title}</h4>
              <p>{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
