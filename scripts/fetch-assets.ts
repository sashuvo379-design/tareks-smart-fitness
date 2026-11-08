import fs from 'fs';
import path from 'path';
import {
  SEED_WALLETS,
  SEED_MACHINERY,
  SEED_TRAINERS,
  SEED_BLOG_POSTS,
} from '../src/lib/seed-data';

const PUBLIC_DIR = path.join(process.cwd(), 'public', 'assets');

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Verified high-resolution men's leather wallet & cardholder photographs (Unsplash Free License)
const WALLET_PHOTO_URLS = [
  'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=85', // Rich brown full-grain bifold
  'https://images.unsplash.com/photo-1614267118647-20c5ffa6a6e4?auto=format&fit=crop&w=900&q=85', // Open black leather bifold with cards
  'https://images.unsplash.com/photo-1620109176813-e91290f6c795?auto=format&fit=crop&w=900&q=85', // Saddle cognac bifold on black leather
  'https://images.unsplash.com/photo-1703355685738-23256fc1d9ca?auto=format&fit=crop&w=900&q=85', // Minimalist stitched slim cardholder
  'https://images.unsplash.com/photo-1614330315526-166f2d71e544?auto=format&fit=crop&w=900&q=85', // Standing cognac clasp wallet & cards
  'https://images.unsplash.com/photo-1606503825008-909a67e63c3d?auto=format&fit=crop&w=900&q=85', // Matte espresso bifold with metal crest
  'https://images.unsplash.com/photo-1614330316567-11d8e572db16?auto=format&fit=crop&w=900&q=85', // Open brown leather wallet interior
];

// Verified high-resolution commercial gym machinery photographs by category
const MACHINERY_PHOTO_BY_CATEGORY: Record<string, string[]> = {
  Racks: [
    'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=85',
  ],
  Treadmills: [
    'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=900&q=85',
  ],
  'Cable Machines': [
    'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=900&q=85',
  ],
  Cardio: [
    'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=900&q=85',
  ],
  Benches: [
    'https://images.unsplash.com/photo-1637666062717-1c6bcfa4a4df?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=900&q=85',
  ],
  'Barbells & Plates': [
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=85',
  ],
  'Full Home-Gym Bundles': [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1637666062717-1c6bcfa4a4df?auto=format&fit=crop&w=900&q=85',
  ],
};

const TRAINER_PHOTO_URLS = [
  'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=700&q=85',
  'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=700&q=85',
  'https://images.unsplash.com/photo-1583454155184-870a1f63aebc?auto=format&fit=crop&w=700&q=85',
  'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=700&q=85',
  'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=700&q=85',
  'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=700&q=85',
];

const BLOG_PHOTO_URLS = [
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1620109176813-e91290f6c795?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1614267118647-20c5ffa6a6e4?auto=format&fit=crop&w=1200&q=85',
];

const urlCache = new Map<string, Buffer>();

async function downloadBuffer(url: string): Promise<Buffer> {
  if (urlCache.has(url)) {
    return urlCache.get(url)!;
  }
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  urlCache.set(url, buf);
  return buf;
}

function wrapPhotoInSvg(buf: Buffer, width = 900, height = 675): string {
  const b64 = buf.toString('base64');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <image href="data:image/jpeg;base64,${b64}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice"/>
</svg>`;
}

async function run() {
  ensureDir(path.join(PUBLIC_DIR, 'wallets'));
  ensureDir(path.join(PUBLIC_DIR, 'machinery'));
  ensureDir(path.join(PUBLIC_DIR, 'trainers'));
  ensureDir(path.join(PUBLIC_DIR, 'blog'));
  ensureDir(path.join(PUBLIC_DIR, 'gym'));

  // Clean up temporary sample files if present
  for (const sub of ['wallets', 'machinery']) {
    const dir = path.join(PUBLIC_DIR, sub);
    for (const f of fs.readdirSync(dir)) {
      if (f.startsWith('sample-') || f.startsWith('w7') || f.startsWith('m1')) {
        fs.unlinkSync(path.join(dir, f));
      }
    }
  }

  console.log('Downloading high-resolution wallet photography...');
  for (let i = 0; i < SEED_WALLETS.length; i++) {
    const w = SEED_WALLETS[i];
    const url = WALLET_PHOTO_URLS[i % WALLET_PHOTO_URLS.length];
    const buf = await downloadBuffer(url);
    const baseRel = w.image.replace(/\.(svg|jpg|webp)$/, '');
    fs.writeFileSync(path.join(process.cwd(), 'public', `${baseRel}.jpg`), buf);
    fs.writeFileSync(path.join(process.cwd(), 'public', `${baseRel}.svg`), wrapPhotoInSvg(buf, 900, 675));
  }

  console.log('Downloading high-resolution gym machinery photography...');
  const catCounters: Record<string, number> = {};
  for (let i = 0; i < SEED_MACHINERY.length; i++) {
    const m = SEED_MACHINERY[i];
    const pool = MACHINERY_PHOTO_BY_CATEGORY[m.category] || MACHINERY_PHOTO_BY_CATEGORY.Racks;
    const idx = catCounters[m.category] || 0;
    catCounters[m.category] = idx + 1;
    const url = pool[idx % pool.length];
    const buf = await downloadBuffer(url);
    const baseRel = m.image.replace(/\.(svg|jpg|webp)$/, '');
    fs.writeFileSync(path.join(process.cwd(), 'public', `${baseRel}.jpg`), buf);
    fs.writeFileSync(path.join(process.cwd(), 'public', `${baseRel}.svg`), wrapPhotoInSvg(buf, 900, 675));
  }

  console.log('Downloading high-resolution trainer photography...');
  for (let i = 0; i < SEED_TRAINERS.length; i++) {
    const t = SEED_TRAINERS[i];
    if (t.avatar.includes('akash') || t.avatar.includes('tarek')) continue; // Preserve uploaded real trainer photos
    const url = TRAINER_PHOTO_URLS[i % TRAINER_PHOTO_URLS.length];
    const buf = await downloadBuffer(url);
    const baseRel = t.avatar.replace(/\.(svg|jpg|webp)$/, '');
    fs.writeFileSync(path.join(process.cwd(), 'public', `${baseRel}.jpg`), buf);
    fs.writeFileSync(path.join(process.cwd(), 'public', `${baseRel}.svg`), wrapPhotoInSvg(buf, 700, 800));
  }

  console.log('Downloading high-resolution blog photography...');
  for (let i = 0; i < SEED_BLOG_POSTS.length; i++) {
    const b = SEED_BLOG_POSTS[i];
    const url = BLOG_PHOTO_URLS[i % BLOG_PHOTO_URLS.length];
    const buf = await downloadBuffer(url);
    const baseRel = b.coverImage.replace(/\.(svg|jpg|webp)$/, '');
    fs.writeFileSync(path.join(process.cwd(), 'public', `${baseRel}.jpg`), buf);
    fs.writeFileSync(path.join(process.cwd(), 'public', `${baseRel}.svg`), wrapPhotoInSvg(buf, 1200, 630));
  }

  // Hero Fallback Poster
  const heroBuf = await downloadBuffer(
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85'
  );
  fs.writeFileSync(path.join(PUBLIC_DIR, 'gym', 'hero-poster.jpg'), heroBuf);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'gym', 'hero-poster.svg'), wrapPhotoInSvg(heroBuf, 1200, 800));

  console.log('✅ All realistic high-resolution product, trainer, blog, and gym photographs saved to /public/assets!');
}

run();
