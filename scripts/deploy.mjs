#!/usr/bin/env node
/**
 * Deploy script for khoshasystems.com
 * Uploads dist/, server/, and package.json to production VPS via SSH (ssh2).
 * Usage: node scripts/deploy.mjs
 */

import { Client } from 'ssh2';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative, posix } from 'path';

const HOST = process.env.DEPLOY_HOST || '147.93.111.188';
const USERNAME = process.env.DEPLOY_USER || 'root';
const PASSWORD = process.env.DEPLOY_PASS || 'Kh0shaSystem&';
const REMOTE_BASE = '/var/www/khoshasystems';

const PROJECT_ROOT = join(import.meta.dirname, '..');

function getAllFiles(dir, base = dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getAllFiles(full, base));
    } else {
      results.push({ local: full, remote: relative(base, full) });
    }
  }
  return results;
}

function exec(conn, cmd) {
  return new Promise((resolve, reject) => {
    conn.exec(cmd, (err, stream) => {
      if (err) return reject(err);
      let stdout = '', stderr = '';
      stream.on('data', d => stdout += d);
      stream.stderr.on('data', d => stderr += d);
      stream.on('close', (code) => resolve({ stdout, stderr, code }));
    });
  });
}

function sftpConnect(conn) {
  return new Promise((resolve, reject) => {
    conn.sftp((err, sftp) => err ? reject(err) : resolve(sftp));
  });
}

function sftpMkdir(sftp, path) {
  return new Promise((resolve) => {
    sftp.mkdir(path, (err) => resolve());
  });
}

function sftpWriteFile(sftp, remotePath, localPath) {
  return new Promise((resolve, reject) => {
    const data = readFileSync(localPath);
    sftp.writeFile(remotePath, data, (err) => err ? reject(err) : resolve());
  });
}

async function mkdirpRemote(sftp, remotePath) {
  const parts = remotePath.split('/').filter(Boolean);
  let current = '';
  for (const part of parts) {
    current += '/' + part;
    await sftpMkdir(sftp, current);
  }
}

async function deploy() {
  const conn = new Client();

  await new Promise((resolve, reject) => {
    conn.on('ready', resolve);
    conn.on('error', reject);
    conn.connect({ host: HOST, port: 22, username: USERNAME, password: PASSWORD });
  });

  console.log('Connected to', HOST);

  // Clean old dist (preserve server/kosha.db and node_modules)
  console.log('\n=== Cleaning old dist ===');
  await exec(conn, `rm -rf ${REMOTE_BASE}/dist`);
  console.log('  Old dist removed');

  // Create directories and upload files
  console.log('\n=== Uploading files ===');
  const sftp = await sftpConnect(conn);
  await mkdirpRemote(sftp, REMOTE_BASE);
  await mkdirpRemote(sftp, `${REMOTE_BASE}/dist`);
  await mkdirpRemote(sftp, `${REMOTE_BASE}/server`);

  // Upload dist/
  const distFiles = getAllFiles(join(PROJECT_ROOT, 'dist'));
  let uploaded = 0;
  for (const file of distFiles) {
    const remotePath = posix.join(REMOTE_BASE, 'dist', file.remote.replace(/\\/g, '/'));
    const remoteDir = posix.dirname(remotePath);
    await mkdirpRemote(sftp, remoteDir);
    await sftpWriteFile(sftp, remotePath, file.local);
    uploaded++;
    if (uploaded % 20 === 0) console.log(`  dist: ${uploaded}/${distFiles.length}`);
  }
  console.log(`  dist: ${uploaded}/${distFiles.length} files uploaded`);

  // Upload server/index.js
  await sftpWriteFile(sftp, `${REMOTE_BASE}/server/index.js`, join(PROJECT_ROOT, 'server', 'index.js'));
  console.log('  server/index.js uploaded');

  // Upload production package.json
  const pkg = JSON.parse(readFileSync(join(PROJECT_ROOT, 'package.json'), 'utf8'));
  const prodPkg = {
    name: pkg.name,
    type: 'module',
    scripts: { start: 'node server/index.js' },
    dependencies: {
      'better-sqlite3': pkg.dependencies['better-sqlite3'],
      'cors': pkg.dependencies['cors'],
      'express': pkg.dependencies['express'],
      'web-push': pkg.dependencies['web-push'],
    }
  };
  await new Promise((resolve, reject) => {
    sftp.writeFile(`${REMOTE_BASE}/package.json`, JSON.stringify(prodPkg, null, 2), err => err ? reject(err) : resolve());
  });
  console.log('  package.json uploaded');
  sftp.end();

  // Install deps and restart
  console.log('\n=== Installing deps ===');
  const installResult = await exec(conn, `cd ${REMOTE_BASE} && npm install --omit=dev 2>&1`);
  console.log(installResult.stdout.trim().split('\n').slice(-3).join('\n'));

  console.log('\n=== Restarting app ===');
  await exec(conn, `cd ${REMOTE_BASE} && pm2 restart khosha-api 2>/dev/null || pm2 start server/index.js --name khosha-api`);
  await exec(conn, 'pm2 save');

  // Verify
  await new Promise(r => setTimeout(r, 2000));
  const apiCheck = await exec(conn, `curl -sk -o /dev/null -w "%{http_code}" https://khoshasystems.com/api/push/vapid-key`);
  const siteCheck = await exec(conn, `curl -sk -o /dev/null -w "%{http_code}" https://khoshasystems.com/`);
  console.log(`\nAPI: ${apiCheck.stdout.trim()}, Site: ${siteCheck.stdout.trim()}`);

  conn.end();
  console.log('Deploy complete!');
}

deploy().catch(err => {
  console.error('Deploy failed:', err.message);
  process.exit(1);
});
