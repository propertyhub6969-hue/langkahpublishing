import './admin.css';

export const metadata = {
  title: 'Admin — Langkah Pulang Publishing',
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }) {
  return <div className="admin-root">{children}</div>;
}
