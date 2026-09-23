/**
 * Loads KEY=VALUE pairs from env files into process.env (existing vars win).
 * - <project>/.env           — local development (gitignored)
 * - <project>/resend.env     — written on the VPS by scripts/deploy.mjs
 * Imported first by index.js so other modules see the values at import time.
 */
import { readFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

for (const file of ['.env', 'resend.env']) {
  const path = join(root, file);
  if (!existsSync(path)) continue;
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^(['"])(.*)\1$/, '$2');
  }
}
