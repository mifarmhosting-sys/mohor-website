import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDb } from '@/lib/db';
import { ENTITIES } from '@/lib/entities';
import { saveRecord, deleteRecord } from '@/lib/actions';
import Field from '@/components/admin/Field';

export const dynamic = 'force-dynamic';

function Cell({ value, column }) {
  if (column === 'published') {
    return <span className={`adm-pill ${value ? 'yes' : 'no'}`}>{value ? 'Published' : 'Hidden'}</span>;
  }
  if (column === 'percent') return `${value}%`;
  return String(value ?? '');
}

export default async function EntityPage({ params, searchParams }) {
  const { entity: key } = await params;
  const entity = ENTITIES[key];
  if (!entity) notFound();

  const sp = await searchParams;
  const db = getDb();
  const rows = db.prepare(`SELECT * FROM ${entity.table} ORDER BY ${entity.orderBy}`).all();

  const editId = Number(sp.edit);
  const editing = editId ? rows.find((r) => r.id === editId) : null;
  const showForm = Boolean(editing) || sp.new === '1';

  return (
    <>
      <div className="adm-head">
        <div>
          <h1>{entity.title}</h1>
          <p className="sub">{entity.description}</p>
        </div>
        {!showForm && <Link className="adm-btn primary" href={`/admin/${key}?new=1`}>+ Add {entity.singular}</Link>}
      </div>

      {sp.saved && <div className="adm-flash">Saved. The home page is updated.</div>}
      {sp.deleted && <div className="adm-flash">Deleted.</div>}

      {showForm && (
        <div className="adm-card">
          <h2>{editing ? `Edit ${entity.singular}` : `New ${entity.singular}`}</h2>
          <form action={saveRecord.bind(null, key)} className="adm-form cols">
            {editing && <input type="hidden" name="id" value={editing.id} />}
            {entity.fields.map((f) => (
              <Field key={f.name} field={f} value={editing?.[f.name]} />
            ))}
            <div className="adm-field wide" style={{ flexDirection: 'row', gap: '.5rem' }}>
              <button className="adm-btn primary" type="submit">Save</button>
              <Link className="adm-btn" href={`/admin/${key}`}>Cancel</Link>
            </div>
          </form>
        </div>
      )}

      <div className="adm-card">
        {rows.length === 0 ? (
          <p className="adm-empty">Nothing here yet.</p>
        ) : (
          <table className="adm-table">
            <thead>
              <tr>
                {entity.listColumns.map((c) => <th key={c}>{c.replace(/_/g, ' ')}</th>)}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  {entity.listColumns.map((c) => <td key={c}><Cell value={r[c]} column={c} /></td>)}
                  <td>
                    <div className="adm-actions">
                      <Link className="adm-btn sm" href={`/admin/${key}?edit=${r.id}`}>Edit</Link>
                      <form action={deleteRecord.bind(null, key)}>
                        <input type="hidden" name="id" value={r.id} />
                        <button className="adm-btn sm danger" type="submit">Delete</button>
                      </form>
                    </div>
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
