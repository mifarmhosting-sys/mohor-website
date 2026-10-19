import { requireAdmin } from '@/lib/auth';
import { getDb } from '@/lib/db';
import { logout } from '@/lib/actions';
import AdminNav from '@/components/admin/AdminNav';

export const dynamic = 'force-dynamic';

export default async function PanelLayout({ children }) {
  await requireAdmin();
  const newPledges = getDb().prepare("SELECT COUNT(*) AS c FROM pledges WHERE status = 'new'").get().c;

  const items = [
    { href: '/admin', label: 'Overview' },
    { href: '/admin/pledges', label: 'Donation pledges', badge: newPledges || null },
    { href: '/admin/content', label: 'Page content' },
    { href: '/admin/updates', label: 'Latest updates' },
    { href: '/admin/events', label: 'Events' },
    { href: '/admin/stories', label: 'Impact stories' },
    { href: '/admin/allocations', label: 'Fund allocation' },
  ];

  return (
    <div className="adm-shell">
      <aside className="adm-side">
        <div className="adm-brand">
          MOHOR<span>.</span>
          <small>Dashboard</small>
        </div>
        <AdminNav items={items} />
        <div className="spacer" />
        <a href="/" target="_blank" rel="noopener" className="adm-nav-link" style={{ padding: '.65rem .75rem' }}>View website ↗</a>
        <form action={logout}>
          <button className="linklike" type="submit">Sign out</button>
        </form>
      </aside>
      <main className="adm-main">{children}</main>
    </div>
  );
}
