import { getSettings } from '@/lib/db';
import { CONTENT_GROUPS } from '@/lib/entities';
import { saveContent } from '@/lib/actions';
import Field from '@/components/admin/Field';

export const dynamic = 'force-dynamic';

export default async function ContentPage({ searchParams }) {
  const sp = await searchParams;
  const settings = getSettings();

  return (
    <>
      <h1>Page content</h1>
      <p className="sub">Edit the text and images of the home page sections.</p>
      {sp.saved && <div className="adm-flash">Saved. The home page is updated.</div>}

      <form action={saveContent}>
        {CONTENT_GROUPS.map((group) => (
          <div className="adm-card" key={group.title}>
            <h2>{group.title}</h2>
            <div className="adm-form cols">
              {group.fields.map((f) => (
                <Field key={f.name} field={f} value={settings[f.name]} />
              ))}
            </div>
          </div>
        ))}
        <div className="adm-sticky">
          <button className="adm-btn primary" type="submit">Save all changes</button>
        </div>
      </form>
    </>
  );
}
