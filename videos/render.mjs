#!/usr/bin/env node
/**
 * Render pipeline for Remotion video compositions.
 *
 * Usage:
 *   node videos/render.mjs                              # render all compositions with defaults
 *   node videos/render.mjs --config videos/configs/demo.json  # render from JSON config
 *   node videos/render.mjs --composition ProductDemo    # render a single composition
 *   node videos/render.mjs --skip-postprocess            # skip ffmpeg post-processing
 */
import { bundle } from "@remotion/bundler";
import { renderMedia, getCompositions } from "@remotion/renderer";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, "output");

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    config: null,
    composition: null,
    skipPostprocess: false,
    outputDir: OUTPUT_DIR,
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--config" && args[i + 1]) {
      opts.config = path.resolve(args[++i]);
    } else if (args[i] === "--composition" && args[i + 1]) {
      opts.composition = args[++i];
    } else if (args[i] === "--skip-postprocess") {
      opts.skipPostprocess = true;
    } else if (args[i] === "--output-dir" && args[i + 1]) {
      opts.outputDir = path.resolve(args[++i]);
    }
  }
  return opts;
}

async function loadConfig(configPath) {
  const raw = fs.readFileSync(configPath, "utf-8");
  return JSON.parse(raw);
}

async function renderComposition(bundled, comp, inputProps, outputDir) {
  const outputPath = path.join(outputDir, `${comp.id}.mp4`);

  console.log(`\nRendering: ${comp.id} (${comp.width}x${comp.height}, ${comp.durationInFrames / comp.fps}s)`);

  await renderMedia({
    composition: comp,
    serveUrl: bundled,
    codec: "h264",
    outputLocation: outputPath,
    inputProps,
  });

  console.log(`  Output: ${outputPath}`);
  return outputPath;
}

async function main() {
  const opts = parseArgs();
  fs.mkdirSync(opts.outputDir, { recursive: true });

  console.log("Bundling Remotion project...");
  const entryPoint = path.join(__dirname, "index.ts");
  const bundled = await bundle({
    entryPoint,
    webpackOverride: (config) => config,
  });
  console.log("Bundle complete.\n");

  // Load compositions
  const compositions = await getCompositions(bundled);
  console.log(`Found ${compositions.length} composition(s): ${compositions.map((c) => c.id).join(", ")}`);

  // Determine what to render
  let renderTargets;

  if (opts.config) {
    const config = await loadConfig(opts.config);
    renderTargets = (Array.isArray(config) ? config : [config]).map((entry) => {
      const comp = compositions.find((c) => c.id === entry.compositionId);
      if (!comp) {
        console.error(`Composition "${entry.compositionId}" not found. Skipping.`);
        return null;
      }
      return { comp, props: entry.props || {} };
    }).filter(Boolean);
  } else if (opts.composition) {
    const comp = compositions.find((c) => c.id === opts.composition);
    if (!comp) {
      console.error(`Composition "${opts.composition}" not found.`);
      console.error(`Available: ${compositions.map((c) => c.id).join(", ")}`);
      process.exit(1);
    }
    renderTargets = [{ comp, props: {} }];
  } else {
    renderTargets = compositions.map((comp) => ({ comp, props: {} }));
  }

  // Render each target
  const rendered = [];
  for (const { comp, props } of renderTargets) {
    const outputPath = await renderComposition(bundled, comp, props, opts.outputDir);
    rendered.push({ id: comp.id, path: outputPath });
  }

  // Post-process
  if (!opts.skipPostprocess && rendered.length > 0) {
    console.log("\n--- Post-processing ---");
    try {
      const { postprocess } = await import("./postprocess.mjs");
      for (const { id, path: videoPath } of rendered) {
        await postprocess(videoPath, opts.outputDir);
      }
    } catch (err) {
      console.warn(`\nPost-processing skipped: ${err.message}`);
      console.warn("Install ffmpeg or @ffmpeg-installer/ffmpeg for compression and WebM conversion.");
    }
  }

  console.log("\n=== Render complete ===");
  for (const { id, path: p } of rendered) {
    console.log(`  ${id}: ${p}`);
  }
}

main().catch((err) => {
  console.error("Render failed:", err);
  process.exit(1);
});
