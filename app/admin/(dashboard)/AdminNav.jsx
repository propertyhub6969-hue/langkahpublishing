'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const ITEMS = [
  { href: '/admin/books', label: 'Katalog Buku' },
  { href: '/admin/content', label: 'Beranda & Tentang' },
  { href: '/admin/kontak', label: 'Kontak' },
  { href: '/admin/account', label: 'Akun' },
];

export default function AdminNav({ username }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <nav className="admin-nav">
      <div className="brand">
        Langkah Pulang
        <span>Panel Admin</span>
      </div>
      {ITEMS.map((item) => (
        <Link key={item.href} href={item.href} className={pathname === item.href ? 'active' : ''}>
          {item.label}
        </Link>
      ))}
      <div className="spacer" />
      <a href="/" target="_blank" rel="noreferrer" className="view-site">↗ Lihat website</a>
      <button className="logout" onClick={handleLogout}>
        Keluar {username ? `(${username})` : ''}
      </button>
    </nav>
  );
}
