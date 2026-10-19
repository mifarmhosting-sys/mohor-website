import { getDb } from '@/lib/db';
import { updatePledge, deletePledge } from '@/lib/actions';

export const dynamic = 'force-dynamic';

const inr = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

export default function PledgesPage() {
  const rows = getDb().prepare('SELECT * FROM pledges ORDER BY id DESC').all();

  return (
    <>
      <h1>Donation pledges</h1>
      <p className="sub">Amounts and frequencies chosen in the home page donation popup. No payment is taken on the site, so follow up with donors from here.</p>

      <div className="adm-card">
        {rows.length === 0 ? (
          <p className="adm-empty">No pledges yet.</p>
        ) : (
          <table className="adm-table">
            <thead><tr><th>#</th><th>When (UTC)</th><th>Amount</th><th>Frequency</th><th>Source</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.created_at}</td>
                  <td><b>{inr(p.amount)}</b></td>
                  <td>{p.cycle}</td>
                  <td>{p.source}</td>
                  <td>
                    <form action={updatePledge} className="adm-actions" style={{ justifyContent: 'flex-start' }}>
                      <input type="hidden" name="id" value={p.id} />
                      <select name="status" defaultValue={p.status} style={{ padding: '.3rem', borderRadius: 6, border: '1px solid var(--line)' }}>
                        <option value="new">new</option>
                        <option value="contacted">contacted</option>
                        <option value="completed">completed</option>
                      </select>
                      <button className="adm-btn sm" type="submit">Update</button>
                    </form>
                  </td>
                  <td>
                    <form action={deletePledge} className="adm-actions">
                      <input type="hidden" name="id" value={p.id} />
                      <button className="adm-btn sm danger" type="submit">Delete</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
