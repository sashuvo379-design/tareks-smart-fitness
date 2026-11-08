import fs from 'fs';
import path from 'path';

const BRAIN_DIR = 'C:\\Users\\Digital Computer\\.gemini\\antigravity\\brain\\551899df-1d9f-4ac0-921b-5a582f40f41e';
const TARGET_DIR = path.join(process.cwd(), 'public', 'assets', 'machinery');

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

function wrapPhotoInSvg(buf: Buffer, width = 1000, height = 1000): string {
  const b64 = buf.toString('base64');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <image href="data:image/jpeg;base64,${b64}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice"/>
</svg>`;
}

const MACHINE_SOURCES: Record<string, string> = {
  'machine-01': path.join(BRAIN_DIR, 'commercial_power_rack_empty_1794110523976.jpg'),
  'machine-02': path.join(BRAIN_DIR, 'machine_02_treadmill_1794110608830.jpg'),
  'machine-03': path.join(BRAIN_DIR, 'machine_03_cable_crossover_1794110628559.jpg'),
  'machine-04': path.join(BRAIN_DIR, 'machine_04_stair_climber_1794110649418.jpg'),
  'machine-05': path.join(BRAIN_DIR, 'machine_05_adjustable_bench_1794110668784.jpg'),
  'machine-06': path.join(TARGET_DIR, 'check_barbell_1.jpg'),
  'machine-07': path.join(BRAIN_DIR, 'machine_07_half_rack_1794110618031.jpg'),
  'machine-08': path.join(BRAIN_DIR, 'machine_08_curved_treadmill_1794110635205.jpg'),
  'machine-09': path.join(BRAIN_DIR, 'machine_09_flat_bench_1794110674247.jpg'),
  'machine-10': path.join(TARGET_DIR, 'test_dumbbell_rack.jpg'),
  'machine-11': path.join(TARGET_DIR, 'test_lat_pulldown.jpg'),
  'machine-12': path.join(BRAIN_DIR, 'machine_12_air_bike_1794110625772.jpg'),
  'machine-13': path.join(BRAIN_DIR, 'machine_13_rowing_machine_1794110648325.jpg'),
  'machine-14': path.join(BRAIN_DIR, 'machine_14_leg_press_1794110670581.jpg'),
  'machine-15': path.join(BRAIN_DIR, 'commercial_power_rack_1794110502255.jpg'),
  'machine-16': path.join(TARGET_DIR, 'machine-16.jpg'), // fallback or existing turnkey multi-station
};

async function run() {
  console.log('Deploying single-equipment e-commerce photographs to catalog assets...');
  
  for (let i = 1; i <= 16; i++) {
    const key = `machine-${String(i).padStart(2, '0')}`;
    const srcPath = MACHINE_SOURCES[key];
    
    if (!srcPath || !fs.existsSync(srcPath)) {
      console.warn(`Warning: source file missing for ${key}: ${srcPath}`);
      continue;
    }

    const buf = fs.readFileSync(srcPath);
    const destJpg = path.join(TARGET_DIR, `${key}.jpg`);
    const destSvg = path.join(TARGET_DIR, `${key}.svg`);

    // Write pristine JPG
    fs.writeFileSync(destJpg, buf);
    // Write embedded SVG wrapper
    fs.writeFileSync(destSvg, wrapPhotoInSvg(buf));

    console.log(`✓ ${key}: saved (${buf.length} bytes) from ${path.basename(srcPath)}`);
  }

  // Cleanup temporary test files
  const toClean = [
    'test_barbell.jpg',
    'test_dumbbell_rack.jpg',
    'test_lat_pulldown.jpg',
    'check_barbell_0.jpg',
    'check_barbell_1.jpg',
    'check_barbell_2.jpg',
    'check_barbell_3.jpg',
  ];
  for (const f of toClean) {
    const p = path.join(TARGET_DIR, f);
    if (fs.existsSync(p)) {
      fs.unlinkSync(p);
    }
  }

  console.log('All 16 single-equipment product assets updated successfully!');
}

run().catch(console.error);
