// One-time in-place compression of oversized images in public/.
// PNGs: palette quantization (TinyPNG-style) + resize to max 1920px wide.
// JPEGs: mozjpeg quality 80 + same resize cap.
// Only touches files larger than the threshold; originals recoverable via git.
//
// Usage: node scripts/compress-images.mjs

import { readdirSync, statSync, renameSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, '..', 'public');
const THRESHOLD = 300 * 1024; // 300KB
const MAX_WIDTH = 1920;

const walk = (dir, out = []) => {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (['.png', '.jpg', '.jpeg'].includes(extname(p).toLowerCase()) && st.size > THRESHOLD) {
      out.push({ path: p, size: st.size });
    }
  }
  return out;
};

const files = walk(PUBLIC);
let before = 0;
let after = 0;

for (const f of files) {
  try {
    const img = sharp(f.path);
    const meta = await img.metadata();
    const isPng = extname(f.path).toLowerCase() === '.png';
    let pipeline = sharp(f.path);
    if (meta.width > MAX_WIDTH) pipeline = pipeline.resize({ width: MAX_WIDTH });
    pipeline = isPng
      ? pipeline.png({ palette: true, quality: 90, compressionLevel: 9 })
      : pipeline.jpeg({ quality: 80, mozjpeg: true });

    const tmp = `${f.path}.tmp`;
    await pipeline.toFile(tmp);
    const newSize = statSync(tmp).size;
    if (newSize < f.size) {
      renameSync(tmp, f.path);
      before += f.size;
      after += newSize;
    } else {
      // Compression didn't help; keep original.
      const { unlinkSync } = await import('node:fs');
      unlinkSync(tmp);
    }
  } catch (err) {
    console.error(`skip ${f.path}: ${err.message}`);
  }
}

console.log(`Compressed ${files.length} candidates`);
console.log(`Before: ${(before / 1024 / 1024).toFixed(1)} MB → After: ${(after / 1024 / 1024).toFixed(1)} MB (saved ${(100 * (1 - after / Math.max(before, 1))).toFixed(0)}%)`);
