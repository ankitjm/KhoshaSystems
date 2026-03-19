import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imgDir = process.argv[2];
const files = fs.readdirSync(imgDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));

console.log(`Processing ${files.length} images...`);

for (const file of files) {
  const src = path.join(imgDir, file);
  const ext = path.extname(file);
  const name = path.basename(file, ext);
  
  // Optimize original format (resize + compress)
  const optimizedPath = path.join(imgDir, `${name}${ext}`);
  const webpPath = path.join(imgDir, `${name}.webp`);
  
  try {
    const img = sharp(src);
    const meta = await img.metadata();
    console.log(`${file}: ${meta.width}x${meta.height}, ${(fs.statSync(src).size / 1024).toFixed(0)}KB`);
    
    // Create optimized original (resize to max 1920w, compress)
    if (ext === '.jpg' || ext === '.jpeg') {
      await sharp(src)
        .resize(1920, null, { withoutEnlargement: true })
        .jpeg({ quality: 75, progressive: true })
        .toFile(optimizedPath + '.opt');
    } else {
      await sharp(src)
        .resize(1920, null, { withoutEnlargement: true })
        .png({ quality: 80, compressionLevel: 9 })
        .toFile(optimizedPath + '.opt');
    }
    
    // Create WebP version
    await sharp(src)
      .resize(1920, null, { withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(webpPath);
    
    // Replace original with optimized
    fs.renameSync(optimizedPath + '.opt', optimizedPath);
    
    const newSize = fs.statSync(optimizedPath).size;
    const webpSize = fs.statSync(webpPath).size;
    console.log(`  -> ${ext}: ${(newSize / 1024).toFixed(0)}KB, webp: ${(webpSize / 1024).toFixed(0)}KB`);
  } catch (e) {
    console.error(`  FAILED: ${e.message}`);
  }
}
