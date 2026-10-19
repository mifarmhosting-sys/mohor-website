import fs from 'node:fs';
import path from 'node:path';

export const dynamic = 'force-dynamic';

const TYPES = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif' };

// Serves dashboard uploads from data/uploads (public/ is not reliable for files added at runtime).
export async function GET(_request, { params }) {
  const { name } = await params;
  const safe = path.basename(name);
  const file = path.join(process.cwd(), 'data', 'uploads', safe);
  const type = TYPES[path.extname(safe).toLowerCase()];
  if (!type || !fs.existsSync(file)) return new Response('Not found', { status: 404 });
  return new Response(fs.readFileSync(file), {
    headers: { 'Content-Type': type, 'Cache-Control': 'public, max-age=31536000, immutable' },
  });
}
