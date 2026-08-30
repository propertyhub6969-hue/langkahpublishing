// Emblem Langkah Pulang Publishing — gapura + buku terbuka + jalan berkelok +
// figur melangkah + cahaya, dengan daun & burung. Dibuat ulang sebagai SVG
// mengikuti brand kit (ganti dengan file logo asli bila tersedia).
export function Emblem({ size = 40, copper = '#C8925E', line = '#C8925E' }) {
  return (
    <svg width={size} height={(size * 104) / 96} viewBox="0 0 96 104" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g stroke={line} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
        {/* gapura / pintu */}
        <path d="M30 82 V44 a18 18 0 0 1 36 0 V82" />
        <path d="M36 82 V47 a12 12 0 0 1 24 0 V82" opacity=".55" />
        {/* jalan berkelok menuju gapura */}
        <path d="M44 82 C40 72 56 68 50 60" fill="none" />
        <path d="M52 82 C56 74 44 70 49 60" fill="none" />
        {/* figur melangkah */}
        <circle cx="49" cy="55" r="2.2" fill={copper} stroke="none" />
        <path d="M46 62 L49 57 L52 62" />
        {/* cahaya / bintang */}
        <path d="M48 30 L49.4 34.4 L54 36 L49.4 37.6 L48 42 L46.6 37.6 L42 36 L46.6 34.4 Z"
          fill={copper} stroke="none" />
        {/* buku terbuka */}
        <path d="M14 84 Q31 77 48 83 Q65 77 82 84" />
        <path d="M14 84 V92 Q31 86 48 91 Q65 86 82 92 V84" />
        <path d="M48 83 V91" />
        {/* sprig daun kiri-bawah */}
        <path d="M20 82 Q16 74 19 66" />
        <path d="M19 70 q-4 -1 -6 -4 M20 74 q4 -1 6 -4 M18 66 q-3 -1 -5 -3" opacity=".8" />
        {/* burung kanan-atas */}
        <path d="M64 28 q3 -3 6 0 M71 24 q3 -3 6 0 M67 20 q2.5 -2.5 5 0" opacity=".85" />
      </g>
    </svg>
  );
}

export default function Logo({ variant = 'light' }) {
  // light = dipakai di atas latar gelap (teks ivory); dark = di atas latar terang
  const textColor = variant === 'light' ? '#F7F3EA' : '#0F1D2D';
  return (
    <a href="#beranda" className="brand" aria-label="Langkah Pulang Publishing">
      <Emblem size={42} />
      <span className="brand-text">
        <b style={{ color: textColor }}>Langkah Pulang</b>
        <span>Publishing</span>
      </span>
    </a>
  );
}
