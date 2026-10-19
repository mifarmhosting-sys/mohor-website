import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const amount = Math.round(Number(body.amount));
  const cycle = ['One-time', 'Monthly'].includes(body.cycle) ? body.cycle : null;
  if (!Number.isFinite(amount) || amount < 100 || amount > 10_000_000 || !cycle) {
    return NextResponse.json({ error: 'Invalid amount or frequency' }, { status: 400 });
  }

  const info = getDb()
    .prepare('INSERT INTO pledges (amount, cycle, source) VALUES (?, ?, ?)')
    .run(amount, cycle, 'home-popup');
  return NextResponse.json({ ok: true, id: info.lastInsertRowid });
}
