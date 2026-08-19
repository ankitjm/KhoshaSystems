import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const SRC = path.join(root, 'public/images/home-duct-tape-section.png');
const OUT_DIR = path.join(root, 'public/images');
const BG = '#faf6f1';

async function maskRounded(buf, w, h, radiusPct, feather) {
  const r = Math.min(Math.max(Math.round(Math.min(w, h) * radiusPct), 6), 40);
  const mask = Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
       <defs>
         <filter id="f" x="-20%" y="-20%" width="140%" height="140%">
           <feGaussianBlur stdDeviation="${feather}"/>
         </filter>
       </defs>
       <rect x="${feather}" y="${feather}" width="${w - 2 * feather}" height="${h - 2 * feather}"
             rx="${r}" ry="${r}" fill="#fff" filter="url(#f)"/>
     </svg>`
  );
  return sharp(buf)
    .ensureAlpha()
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();
}

// Deskew + tight extract + mask, for the 3 brand-mark cards that are rotated in the source.
async function extractRotatedCard({ name, cx, cy, angle, superSize, cropW, cropH, radiusPct, feather, offsetX = 0, offsetY = 0 }) {
  const superBuf = await sharp(SRC)
    .extract({ left: Math.round(cx - superSize / 2), top: Math.round(cy - superSize / 2), width: superSize, height: superSize })
    .toBuffer();

  const deskewed = sharp(superBuf).rotate(-angle, { background: BG });
  const deskewedBuf = await deskewed.toBuffer();
  const meta = await sharp(deskewedBuf).metadata();

  const tightBuf = await sharp(deskewedBuf)
    .extract({
      left: Math.round((meta.width - cropW) / 2) + offsetX,
      top: Math.round((meta.height - cropH) / 2) + offsetY,
      width: cropW,
      height: cropH,
    })
    .toBuffer();

  const masked = await maskRounded(tightBuf, cropW, cropH, radiusPct, feather);
  await sharp(masked).webp({ quality: 92, alphaQuality: 100 }).toFile(path.join(OUT_DIR, `${name}.webp`));
  console.log(name, cropW, cropH);
}

// Mask an existing (already axis-aligned, angle ~0) crop file in place -> new masked webp.
async function maskExisting({ inFile, outName, radiusPct, feather }) {
  const buf = await sharp(path.join(OUT_DIR, inFile)).toBuffer();
  const meta = await sharp(buf).metadata();
  const masked = await maskRounded(buf, meta.width, meta.height, radiusPct, feather);
  await sharp(masked).webp({ quality: 92, alphaQuality: 100 }).toFile(path.join(OUT_DIR, `${outName}.webp`));
  console.log(outName, meta.width, meta.height);
}

// Plain axis-aligned re-crop straight from the source, for panel icons (no deskew needed).
async function extractFlat({ name, left, top, width, height, radiusPct, feather }) {
  const buf = await sharp(SRC).extract({ left, top, width, height }).toBuffer();
  const masked = await maskRounded(buf, width, height, radiusPct, feather);
  await sharp(masked).webp({ quality: 92, alphaQuality: 100 }).toFile(path.join(OUT_DIR, `${name}.webp`));
  console.log(name, width, height);
}

const mode = process.argv[2];

if (mode === 'rotated') {
  await extractRotatedCard({ name: 'philosophy-chaos-note-spreadsheets-v2', cx: 185, cy: 163, angle: -9, superSize: 260, cropW: 170, cropH: 118, radiusPct: 0.075, feather: 1.2 });
  await extractRotatedCard({ name: 'philosophy-chaos-note-crm-v2', cx: 130, cy: 299, angle: -3.7, superSize: 260, cropW: 155, cropH: 115, radiusPct: 0.075, feather: 1.2 });
  await extractRotatedCard({ name: 'philosophy-chaos-note-slack-v2', cx: 320, cy: 305, angle: 0, superSize: 280, cropW: 196, cropH: 148, radiusPct: 0.075, feather: 1.2 });
}

if (mode === 'panel-icons') {
  // team-workspace: re-cropped taller (to include all 3 avatar rows) and narrower on the right (excludes a stray hub-connector dot).
  await extractFlat({ name: 'philosophy-icon-team-workspace-v2', left: 765, top: 449, width: 195, height: 128, radiusPct: 0.035, feather: 1.5 });
  // customer-experience: re-cropped narrower on the left (excludes stray hub-connector dots bleeding in).
  await extractFlat({ name: 'philosophy-icon-customer-experience-v2', left: 1225, top: 470, width: 252, height: 140, radiusPct: 0.035, feather: 1.5 });
}

if (mode === 'mask') {
  await maskExisting({ inFile: 'philosophy-hub-badge.webp', outName: 'philosophy-hub-badge-v2', radiusPct: 0.22, feather: 1.4 });
  await maskExisting({ inFile: 'philosophy-icon-unified-data.webp', outName: 'philosophy-icon-unified-data-v2', radiusPct: 0.035, feather: 1.5 });
  await maskExisting({ inFile: 'philosophy-icon-automation-flows.webp', outName: 'philosophy-icon-automation-flows-v2', radiusPct: 0.035, feather: 1.5 });
}
