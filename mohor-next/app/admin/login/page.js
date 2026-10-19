import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { login } from '@/lib/actions';

export const metadata = { title: 'Sign in · MOHOR Dashboard' };

export default async function LoginPage({ searchParams }) {
  if (await isAuthenticated()) redirect('/admin');
  const { error } = await searchParams;

  return (
    <main className="adm-login">
      <div className="adm-card">
        <div className="adm-brand" style={{ color: 'var(--ink)', padding: '0 0 1rem' }}>
          MOHOR<span>.</span>
          <small>Dashboard</small>
        </div>
        {error && <div className="adm-error">Incorrect username or password.</div>}
        <form action={login} className="adm-form">
          <div className="adm-field">
            <label htmlFor="username">Username</label>
            <input id="username" name="username" type="text" autoComplete="username" required autoFocus />
          </div>
          <div className="adm-field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" autoComplete="current-password" required />
          </div>
          <button className="adm-btn primary" type="submit">Sign in</button>
        </form>
      </div>
    </main>
  );
}
