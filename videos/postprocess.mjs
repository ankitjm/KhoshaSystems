/**
 * Post-processing module using ffmpeg for video compression,
 * format conversion, and thumbnail extraction.
 *
 * Uses @ffmpeg-installer/ffmpeg for a bundled static binary,
 * falling back to system ffmpeg if available.
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import fs from "node:fs";

const execFileAsync = promisify(execFile);

function getFfmpegPath() {
  try {
    const installer = await import("@ffmpeg-installer/ffmpeg");
    if (fs.existsSync(installer.path)) return installer.path;
  } catch {}
  return "ffmpeg";
}

let _ffmpegPath;

async function ffmpeg() {
  if (!_ffmpegPath) {
    try {
      const { default: installer } = await import("@ffmpeg-installer/ffmpeg");
      if (fs.existsSync(installer.path)) {
        _ffmpegPath = installer.path;
      }
    } catch {
      _ffmpegPath = "ffmpeg";
    }
  }
  return _ffmpegPath;
}

async function run(args) {
  const bin = await ffmpeg();
  console.log(`  ffmpeg ${args.join(" ")}`);
  const { stdout, stderr } = await execFileAsync(bin, args, {
    timeout: 300_000,
  });
  return { stdout, stderr };
}

/**
 * Compress an MP4 file for web delivery.
 * Targets ~2 Mbps for 720p, ~4 Mbps for 1080p.
 */
export async function compressMP4(inputPath, outputPath, opts = {}) {
  const { crf = "23", preset = "medium", maxrate = "2M" } = opts;
  await run([
    "-i", inputPath,
    "-c:v", "libx264",
    "-crf", crf,
    "-preset", preset,
    "-maxrate", maxrate,
    "-bufsize", `${parseInt(maxrate) * 2}M`,
    "-movflags", "+faststart",
    "-y", outputPath,
  ]);
  return outputPath;
}

/**
 * Convert MP4 to WebM (VP9) for broader browser support.
 */
export async function convertToWebM(inputPath, outputPath, opts = {}) {
  const { crf = "30", speed = "2" } = opts;
  await run([
    "-i", inputPath,
    "-c:v", "libvpx-vp9",
    "-crf", crf,
    "-b:v", "0",
    "-cpu-used", speed,
    "-row-mt", "1",
    "-y", outputPath,
  ]);
  return outputPath;
}

/**
 * Extract a thumbnail at a given timestamp.
 */
export async function extractThumbnail(inputPath, outputPath, opts = {}) {
  const { timestamp = "00:00:02", width = 1280 } = opts;
  await run([
    "-i", inputPath,
    "-ss", timestamp,
    "-vframes", "1",
    "-vf", `scale=${width}:-1`,
    "-y", outputPath,
  ]);
  return outputPath;
}

/**
 * Run the full post-processing pipeline on a rendered video.
 * Returns paths to all generated files.
 */
export async function postprocess(inputPath, outputDir) {
  const baseName = path.basename(inputPath, path.extname(inputPath));

  const compressedPath = path.join(outputDir, `${baseName}-compressed.mp4`);
  const webmPath = path.join(outputDir, `${baseName}.webm`);
  const thumbPath = path.join(outputDir, `${baseName}-thumb.jpg`);

  fs.mkdirSync(outputDir, { recursive: true });

  console.log(`\nPost-processing: ${baseName}`);

  console.log("  Compressing MP4...");
  await compressMP4(inputPath, compressedPath);

  console.log("  Converting to WebM...");
  await convertToWebM(inputPath, webmPath);

  console.log("  Extracting thumbnail...");
  await extractThumbnail(inputPath, thumbPath);

  const stats = {
    compressed: fs.statSync(compressedPath).size,
    webm: fs.statSync(webmPath).size,
    original: fs.statSync(inputPath).size,
  };

  console.log(
    `  Done: MP4 ${(stats.original / 1e6).toFixed(1)}MB → ${(stats.compressed / 1e6).toFixed(1)}MB | WebM ${(stats.webm / 1e6).toFixed(1)}MB`,
  );

  return {
    compressed: compressedPath,
    webm: webmPath,
    thumbnail: thumbPath,
    stats,
  };
}
