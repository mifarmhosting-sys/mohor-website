import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'mohor.db');

const globalForDb = globalThis;

function createDb() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const db = new Database(DB_FILE);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS updates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      summary TEXT NOT NULL,
      image TEXT NOT NULL,
      date_label TEXT NOT NULL,
      link TEXT NOT NULL DEFAULT '/event-detail.html',
      sort_order INTEGER NOT NULL DEFAULT 0,
      published INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      event_date TEXT NOT NULL,
      badge TEXT NOT NULL DEFAULT 'NEXT EVENTS',
      link TEXT NOT NULL DEFAULT '/event-detail.html',
      published INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS stories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      image_alt TEXT NOT NULL DEFAULT '',
      link TEXT NOT NULL DEFAULT '/project-detail.html',
      sort_order INTEGER NOT NULL DEFAULT 0,
      published INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS allocations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      label TEXT NOT NULL,
      percent REAL NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS pledges (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount INTEGER NOT NULL,
      cycle TEXT NOT NULL,
      source TEXT NOT NULL DEFAULT 'home-popup',
      status TEXT NOT NULL DEFAULT 'new',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  seed(db);
  return db;
}

const DEFAULT_SETTINGS = {
  hero_title:
    'Dedicated care and support for children living with Autism, ADHD, Cerebral Palsy, Intellectual Disability, and Hearing Impairment.',
  hero_image: '/images/saurav-ganguly/IMG_6800.JPG',
  hero_stat_1: '230 Million children in need',
  hero_stat_2: '87 donors and counting',
  announcement_text: 'See the latest updates and stories from MOHOR.',
  announcement_enabled: '1',
  about_subtitle: 'OUR STORY & HISTORY',
  about_title: 'About MOHOR',
  about_p1:
    'MOHOR is a Kolkata-based non-governmental organization and special education and rehabilitation center dedicated to supporting, rehabilitating, and empowering children with special needs. Named after the Bengali word for a precious gold coin, MOHOR represents the intrinsic worth of every child, regardless of ability or socioeconomic background.',
  about_p2:
    'The organization operates on the core belief that society’s progress is defined by how well it cares for its most vulnerable populations. MOHOR bridges the gap between potential and opportunity, guiding differently-abled children from isolation to inclusion, and from struggle to self-reliance.',
  about_image: '/images/saurav-ganguly/IMG_6776.JPG',
  secretary_lead:
    '"Disability is the cause of hindrance to normal life activities. Such curse spreads its wings among a large portion of our total population. They are people with special needs and require a little support from society for fulfillment of their dreams."',
  secretary_p1:
    'Several people like Helen Keller, Stephen Hawking, Beethoven and among Indian Rabindro Jain, Masudur Rahaman Vaidya, dancer Sudha Chandran, Kanchan Gabba, Sadhan Gupta proved that a man can rise above his/her weakness. The number of institutions working with such people specially with disabled children are very few in comparison to the growing number of disabled population.',
  secretary_p2:
    'A few from Kasba, have felt the need to establish such an Institution in the locality, and started the activities at 39/3, R.K.Chatterjee Road, Kolkata - 700042 (Recreation Club Premises).',
  secretary_p3:
    'We firmly believe that the sapling of today will become a huge tree which will act as an umbrella to protect a lot of differently abled children. For that purpose, our institution needs finance. We are requesting you to take the necessary steps for providing finance to our institution. An early action will be highly appreciated.',
  secretary_name: 'Samir Sengupta',
  secretary_role: 'Secretary, "MOHOR"',
  secretary_image: '/images/Grandfather%20Holding%20Toddler%20Cutout.png',
  updates_subtitle: 'FROM MOHOR',
  updates_title: 'Latest Updates',
  donations_title: 'How we spend your donations and where it goes',
  donations_desc:
    'Every donation to MOHOR goes directly towards therapeutic materials, clinical diagnostics, nutrition, and student sponsorships.',
  cta_title: 'You can contribute to provide a place for children with special needs!',
  events_title: 'Our Events',
};

function seed(db) {
  const insertSetting = db.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)');
  for (const [k, v] of Object.entries(DEFAULT_SETTINGS)) insertSetting.run(k, v);

  const count = (t) => db.prepare(`SELECT COUNT(*) AS c FROM ${t}`).get().c;

  if (count('updates') === 0) {
    const ins = db.prepare(
      'INSERT INTO updates (title, summary, image, date_label, sort_order) VALUES (?, ?, ?, ?, ?)'
    );
    [
      ['Growing together through joyful learning', 'A glimpse of the everyday moments, activities, and connections that make the MOHOR community special.', '/images/saurav-ganguly/IMG_7652.JPG', 'Sample update · October 2026'],
      ['Making every day a chance to explore', 'Creative activities help children discover new interests, build confidence, and celebrate each step forward.', '/images/saurav-ganguly/IMG_7653.JPG', 'Sample update · October 2026'],
      ['Community, care, and new possibilities', 'Our students, families, and team share experiences that bring learning and support beyond the classroom.', '/images/saurav-ganguly/IMG_7657.JPG', 'Sample update · September 2026'],
      ['Small steps make a big difference', 'We are proud of the curiosity, creativity, and determination our children bring to each new day.', '/images/saurav-ganguly/IMG_7621.JPG', 'Sample update · September 2026'],
      ['Celebrating the people who make MOHOR', 'Meet the caring community of children, families, educators, and supporters growing together at MOHOR.', '/images/saurav-ganguly/IMG_7884.JPG', 'Sample update · August 2026'],
      ['Sharing smiles and building friendships', 'Take a look at more snapshots from our community and the moments we are happy to share.', '/images/saurav-ganguly/IMG_7889.JPG', 'Sample update · August 2026'],
    ].forEach((r, i) => ins.run(...r, i));
  }

  if (count('events') === 0) {
    const ins = db.prepare('INSERT INTO events (title, event_date) VALUES (?, ?)');
    const year = new Date().getFullYear() + 1;
    ins.run('A day with our wonderful children', `${year}-06-13`);
    ins.run('Seminar: Caring for children with autism', `${year}-06-25`);
  }

  if (count('stories') === 0) {
    db.prepare(
      'INSERT INTO stories (title, description, image, image_alt, sort_order) VALUES (?, ?, ?, ?, 0)'
    ).run(
      "Poetry and Purpose: Gayatri's Aspiring Future",
      'Akshaya Patra supports Gayatri from Hami with daily meals, helping her stay focused on studies and dream of becoming a bank manager and poet.',
      '/images/saurav-ganguly/IMG_7652.JPG',
      'A student and caregivers sharing a moment at a MOHOR community event'
    );
  }

  if (count('allocations') === 0) {
    const ins = db.prepare('INSERT INTO allocations (label, percent, sort_order) VALUES (?, ?, ?)');
    [['Child care home', 40], ['Cleanliness program', 35], ['Helping people', 10], ['Excursions', 10], ['Feeding the poor', 5]]
      .forEach(([l, p], i) => ins.run(l, p, i));
  }
}

export function getDb() {
  if (!globalForDb.__mohorDb) globalForDb.__mohorDb = createDb();
  return globalForDb.__mohorDb;
}

export function getSettings() {
  const rows = getDb().prepare('SELECT key, value FROM settings').all();
  const s = { ...DEFAULT_SETTINGS };
  for (const r of rows) s[r.key] = r.value;
  return s;
}

export function setSettings(obj) {
  const db = getDb();
  const stmt = db.prepare(
    'INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value'
  );
  const tx = db.transaction((entries) => {
    for (const [k, v] of entries) if (k in DEFAULT_SETTINGS) stmt.run(k, String(v));
  });
  tx(Object.entries(obj));
}

export { DEFAULT_SETTINGS };
