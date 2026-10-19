import Link from 'next/link';
import { getDb } from '@/lib/db';

const inr = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

export default function Overview() {
  const db = getDb();
  const count = (t) => db.prepare(`SELECT COUNT(*) AS c FROM ${t}`).get().c;
  const totals = db.prepare('SELECT COUNT(*) AS c, COALESCE(SUM(amount),0) AS total FROM pledges').get();
  const recent = db.prepare('SELECT * FROM pledges ORDER BY id DESC LIMIT 6').all();

  return (
    <>
      <h1>Overview</h1>
      <p className="sub">Manage what appears on the MOHOR home page and review donation interest.</p>

      <div className="adm-grid">
        <div className="adm-stat"><b>{totals.c}</b><span>Donation pledges</span></div>
        <div className="adm-stat"><b>{inr(totals.total)}</b><span>Total pledged</span></div>
        <div className="adm-stat"><b>{count('updates')}</b><span>Updates</span></div>
        <div className="adm-stat"><b>{count('events')}</b><span>Events</span></div>
        <div className="adm-stat"><b>{count('stories')}</b><span>Impact stories</span></div>
      </div>

      <div className="adm-card">
        <div className="adm-head">
          <h2>Recent pledges</h2>
          <Link href="/admin/pledges" className="adm-btn sm">View all</Link>
        </div>
        {recent.length === 0 ? (
          <p className="adm-empty">No pledges yet. They appear here when visitors use the donation popup on the home page.</p>
        ) : (
          <table className="adm-table">
            <thead><tr><th>When</th><th>Amount</th><th>Frequency</th><th>Status</th></tr></thead>
            <tbody>
              {recent.map((p) => (
                <tr key={p.id}>
                  <td>{p.created_at} UTC</td>
                  <td>{inr(p.amount)}</td>
                  <td>{p.cycle}</td>
                  <td><span className={`adm-pill ${p.status}`}>{p.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
