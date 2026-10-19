import crypto from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const COOKIE = 'mohor_admin';
const MAX_AGE = 60 * 60 * 8; // 8 hours

function secret() {
  return process.env.AUTH_SECRET || 'dev-only-secret-change-me';
}

function sign(payload) {
  return crypto.createHmac('sha256', secret()).update(payload).digest('hex');
}

function safeEqual(a, b) {
  const ab = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb);
}

export function checkCredentials(username, password) {
  const u = process.env.ADMIN_USER || 'admin';
  const p = process.env.ADMIN_PASSWORD || 'admin123';
  return safeEqual(username, u) && safeEqual(password, p);
}

export async function createSession() {
  const expires = Date.now() + MAX_AGE * 1000;
  const payload = `admin.${expires}`;
  const jar = await cookies();
  jar.set(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function isAuthenticated() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return false;
  const [role, expires, sig] = token.split('.');
  if (role !== 'admin' || !expires || !sig) return false;
  if (!safeEqual(sig, sign(`${role}.${expires}`))) return false;
  return Number(expires) > Date.now();
}

/** Call at the top of every admin page and server action. */
export async function requireAdmin() {
  if (!(await isAuthenticated())) redirect('/admin/login');
}
