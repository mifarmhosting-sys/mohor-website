'use server';

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getDb, setSettings } from './db';
import { ENTITIES, CONTENT_GROUPS } from './entities';
import { checkCredentials, createSession, destroySession, requireAdmin } from './auth';

const UPLOAD_DIR = path.join(process.cwd(), 'data', 'uploads');
const ALLOWED_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);
const MAX_UPLOAD = 8 * 1024 * 1024;

async function saveUpload(file) {
  if (!file || typeof file === 'string' || !file.size) return null;
  const ext = path.extname(file.name || '').toLowerCase();
  if (!ALLOWED_EXT.has(ext)) throw new Error('Only JPG, PNG, WEBP or GIF images are allowed.');
  if (file.size > MAX_UPLOAD) throw new Error('Image must be smaller than 8 MB.');
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  const name = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}${ext}`;
  fs.writeFileSync(path.join(UPLOAD_DIR, name), Buffer.from(await file.arrayBuffer()));
  return `/uploads/${name}`;
}

function refresh() {
  revalidatePath('/');
  revalidatePath('/admin', 'layout');
}

// ---------- auth ----------
export async function login(formData) {
  const ok = checkCredentials(String(formData.get('username') || ''), String(formData.get('password') || ''));
  if (!ok) redirect('/admin/login?error=1');
  await createSession();
  redirect('/admin');
}

export async function logout() {
  await destroySession();
  redirect('/admin/login');
}

// ---------- generic CRUD ----------
async function readFields(fields, formData) {
  const values = {};
  for (const f of fields) {
    if (f.type === 'checkbox') {
      values[f.name] = formData.get(f.name) ? 1 : 0;
    } else if (f.type === 'image') {
      const uploaded = await saveUpload(formData.get(`${f.name}__file`));
      values[f.name] = uploaded || String(formData.get(f.name) || '').trim();
    } else if (f.type === 'number') {
      const n = Number(formData.get(f.name));
      values[f.name] = Number.isFinite(n) ? n : (f.default ?? 0);
    } else {
      values[f.name] = String(formData.get(f.name) ?? f.default ?? '').trim();
    }
    if (f.required && (values[f.name] === '' || values[f.name] === undefined)) {
      throw new Error(`${f.label} is required.`);
    }
  }
  return values;
}

export async function saveRecord(entityKey, formData) {
  await requireAdmin();
  const entity = ENTITIES[entityKey];
  if (!entity) throw new Error('Unknown collection');

  const values = await readFields(entity.fields, formData);
  const cols = Object.keys(values);
  const db = getDb();
  const id = Number(formData.get('id'));

  if (id) {
    db.prepare(`UPDATE ${entity.table} SET ${cols.map((c) => `${c} = @${c}`).join(', ')} WHERE id = @id`).run({ ...values, id });
  } else {
    db.prepare(`INSERT INTO ${entity.table} (${cols.join(', ')}) VALUES (${cols.map((c) => `@${c}`).join(', ')})`).run(values);
  }
  refresh();
  redirect(`/admin/${entityKey}?saved=1`);
}

export async function deleteRecord(entityKey, formData) {
  await requireAdmin();
  const entity = ENTITIES[entityKey];
  if (!entity) throw new Error('Unknown collection');
  getDb().prepare(`DELETE FROM ${entity.table} WHERE id = ?`).run(Number(formData.get('id')));
  refresh();
  redirect(`/admin/${entityKey}?deleted=1`);
}

// ---------- page content ----------
export async function saveContent(formData) {
  await requireAdmin();
  const values = {};
  for (const group of CONTENT_GROUPS) {
    for (const f of group.fields) {
      if (f.type === 'checkbox') values[f.name] = formData.get(f.name) ? '1' : '0';
      else if (f.type === 'image') {
        values[f.name] = (await saveUpload(formData.get(`${f.name}__file`))) || String(formData.get(f.name) || '').trim();
      } else values[f.name] = String(formData.get(f.name) ?? '').trim();
    }
  }
  setSettings(values);
  refresh();
  redirect('/admin/content?saved=1');
}

// ---------- pledges ----------
export async function updatePledge(formData) {
  await requireAdmin();
  const status = String(formData.get('status'));
  if (!['new', 'contacted', 'completed'].includes(status)) return;
  getDb().prepare('UPDATE pledges SET status = ? WHERE id = ?').run(status, Number(formData.get('id')));
  revalidatePath('/admin', 'layout');
}

export async function deletePledge(formData) {
  await requireAdmin();
  getDb().prepare('DELETE FROM pledges WHERE id = ?').run(Number(formData.get('id')));
  revalidatePath('/admin', 'layout');
}
