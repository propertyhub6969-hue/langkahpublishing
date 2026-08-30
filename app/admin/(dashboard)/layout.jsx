import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import AdminNav from './AdminNav';

export default async function DashboardLayout({ children }) {
  const session = await getSession();
  if (!session) redirect('/admin/login');

  return (
    <div className="admin-shell">
      <AdminNav username={session.u} />
      <main className="admin-main">{children}</main>
    </div>
  );
}
