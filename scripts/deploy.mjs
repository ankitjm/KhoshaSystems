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

  // Upload all server/ files (index.js, brevo.js, etc.)
  const serverFiles = getAllFiles(join(PROJECT_ROOT, 'server'));
  for (const file of serverFiles) {
    // Skip database files and node_modules
    if (file.remote.endsWith('.db') || file.remote.includes('node_modules')) continue;
    const remotePath = posix.join(REMOTE_BASE, 'server', file.remote.replace(/\\/g, '/'));
    await sftpWriteFile(sftp, remotePath, file.local);
  }
  console.log(`  server: ${serverFiles.length} files uploaded`);

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

  // Verify basic health
  await new Promise(r => setTimeout(r, 2000));
  const apiCheck = await exec(conn, `curl -sk -o /dev/null -w "%{http_code}" https://khoshasystems.com/api/push/vapid-key`);
  const siteCheck = await exec(conn, `curl -sk -o /dev/null -w "%{http_code}" https://khoshasystems.com/`);
  console.log(`\nAPI: ${apiCheck.stdout.trim()}, Site: ${siteCheck.stdout.trim()}`);

  // Fix Nginx: security headers must be in a snippet included by each location block
  // (Nginx's add_header in a location block overrides server-level add_header)
  const securitySnippet = `
# Security headers snippet — include in every location that uses add_header
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://analytics.google.com https://region1.google-analytics.com https://generativelanguage.googleapis.com https://api.emailjs.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self'" always;
`;
  await exec(conn, 'mkdir -p /etc/nginx/snippets');
  await exec(conn, `cat > /etc/nginx/snippets/security-headers.conf << 'EOF'
${securitySnippet}
EOF`);

  // Update khosha-systems.conf to use the snippet in all location blocks
  // Use exec with a single command to avoid JS template literal $ conflicts
  const remoteBase = REMOTE_BASE;
  await exec(conn, `cat > /root/Production/nginx/sites/khosha-systems.conf << 'NGINX_EOF'
server {
    server_name khoshasystems.com;
    server_tokens off;

    access_log /root/Production/logs/apps/khosha-systems-access.log;
    error_log  /root/Production/logs/apps/khosha-systems-error.log warn;

    include /etc/nginx/snippets/security-headers.conf;

    location /api/ {
        proxy_pass http://127.0.0.1:3007;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        include /etc/nginx/snippets/security-headers.conf;
    }

    location /assets/ {
        alias REMOTE_BASE_PLACEHOLDER/dist/assets/;
        expires 1y;
        add_header Cache-Control "public, immutable";
        include /etc/nginx/snippets/security-headers.conf;
        access_log off;
    }

    location /images/ {
        alias REMOTE_BASE_PLACEHOLDER/dist/images/;
        expires 7d;
        add_header Cache-Control "public, immutable";
        include /etc/nginx/snippets/security-headers.conf;
        access_log off;
    }

    location = /sw.js {
        alias REMOTE_BASE_PLACEHOLDER/dist/sw.js;
        add_header Cache-Control "no-cache";
        include /etc/nginx/snippets/security-headers.conf;
    }

    error_page 404 /404.html;

    location = /404.html {
        root REMOTE_BASE_PLACEHOLDER/dist;
        internal;
        add_header Cache-Control "no-cache";
        include /etc/nginx/snippets/security-headers.conf;
    }

    location / {
        root REMOTE_BASE_PLACEHOLDER/dist;
        try_files $uri $uri/index.html $uri/ =404;
        add_header Cache-Control "no-cache";
        include /etc/nginx/snippets/security-headers.conf;
    }

    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/khosha.tech/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/khosha.tech/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}
server {
    if ($host = khoshasystems.com) {
        return 301 https://$host$request_uri;
    }

    listen 80;
    server_name khoshasystems.com;
    return 404;
}
server {
    listen 80;
    listen 443 ssl;
    server_name www.khoshasystems.com;
    server_tokens off;

    ssl_certificate /etc/letsencrypt/live/khosha.tech/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/khosha.tech/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    return 301 https://khoshasystems.com$request_uri;
}
NGINX_EOF`);
  // Replace placeholder with actual path
  await exec(conn, `sed -i 's|REMOTE_BASE_PLACEHOLDER|${remoteBase}|g' /root/Production/nginx/sites/khosha-systems.conf`);

  const nginxTest = await exec(conn, 'nginx -t 2>&1; echo "EXIT:$?"');
  if ((nginxTest.stderr + nginxTest.stdout).includes('successful') || nginxTest.stdout.includes('EXIT:0')) {
    await exec(conn, 'systemctl reload nginx');
    console.log('  Nginx config updated with security headers snippet');
  } else {
    console.log('  WARNING: Nginx config test failed:', nginxTest.stderr);
  }

  // === Post-Deploy SEO Verification ===
  console.log('\n=== SEO Verification ===');
  const issues = [];

  // 1. Key pages return 200
  const keyPages = ['/', '/products', '/services', '/contact', '/blog', '/vancouver',
    '/products/retaileros', '/products/real-estate-crm', '/products/visitor-management'];
  for (const page of keyPages) {
    const r = await exec(conn, `curl -sk -o /dev/null -w "%{http_code}" https://khoshasystems.com${page}`);
    const code = r.stdout.trim();
    if (code !== '200') issues.push(`Page ${page} returned ${code} (expected 200)`);
  }
  console.log(`  Pages checked: ${keyPages.length} ${issues.length === 0 ? '✓' : '✗'}`);

  // 2. Canonical URL — no www
  const homeHtml = await exec(conn, `curl -sk https://khoshasystems.com/`);
  if (homeHtml.stdout.includes('www.khoshasystems.com')) {
    issues.push('Homepage HTML still contains www.khoshasystems.com references');
  }
  const canonical = homeHtml.stdout.match(/rel="canonical"[^>]*href="([^"]+)"/);
  if (canonical && canonical[1].includes('www.')) {
    issues.push(`Canonical URL uses www: ${canonical[1]}`);
  }
  console.log(`  Canonical check: ${canonical ? canonical[1] : 'not found'}`);

  // 3. www → non-www redirect
  const wwwCheck = await exec(conn, `curl -skI https://www.khoshasystems.com/ | head -3`);
  if (!wwwCheck.stdout.includes('301')) {
    issues.push('www.khoshasystems.com does not 301 redirect to non-www');
  }
  console.log(`  www redirect: ${wwwCheck.stdout.includes('301') ? '301 ✓' : 'MISSING ✗'}`);

  // 4. Sitemap accessible and valid
  const sitemapCheck = await exec(conn, `curl -sk -o /dev/null -w "%{http_code}" https://khoshasystems.com/sitemap.xml`);
  const sitemapUrls = await exec(conn, `curl -sk https://khoshasystems.com/sitemap.xml | grep -c "<loc>"`);
  if (sitemapCheck.stdout.trim() !== '200') issues.push('sitemap.xml not accessible');
  const sitemapWww = await exec(conn, `curl -sk https://khoshasystems.com/sitemap.xml | grep "www.khoshasystems.com"`);
  if (sitemapWww.stdout.trim()) issues.push('sitemap.xml still has www URLs');
  console.log(`  Sitemap: ${sitemapCheck.stdout.trim()} (${sitemapUrls.stdout.trim()} URLs)`);

  // 5. robots.txt accessible
  const robotsCheck = await exec(conn, `curl -sk -o /dev/null -w "%{http_code}" https://khoshasystems.com/robots.txt`);
  if (robotsCheck.stdout.trim() !== '200') issues.push('robots.txt not accessible');
  console.log(`  robots.txt: ${robotsCheck.stdout.trim()}`);

  // 6. Open Graph tags present
  const ogTitle = homeHtml.stdout.match(/property="og:title"/);
  const ogImage = homeHtml.stdout.match(/property="og:image"/);
  const ogDesc = homeHtml.stdout.match(/property="og:description"/);
  if (!ogTitle) issues.push('Missing og:title meta tag');
  if (!ogImage) issues.push('Missing og:image meta tag');
  if (!ogDesc) issues.push('Missing og:description meta tag');
  console.log(`  OG tags: title=${ogTitle ? '✓' : '✗'} image=${ogImage ? '✓' : '✗'} desc=${ogDesc ? '✓' : '✗'}`);

  // 7. Twitter Card tags
  const twitterCard = homeHtml.stdout.match(/name="twitter:card"/);
  if (!twitterCard) issues.push('Missing twitter:card meta tag');
  console.log(`  Twitter card: ${twitterCard ? '✓' : '✗'}`);

  // 8. Security headers
  const headers = await exec(conn, `curl -skI https://khoshasystems.com/`);
  const requiredHeaders = ['Strict-Transport-Security', 'X-Frame-Options', 'X-Content-Type-Options', 'Content-Security-Policy'];
  for (const h of requiredHeaders) {
    if (!headers.stdout.toLowerCase().includes(h.toLowerCase())) {
      issues.push(`Missing security header: ${h}`);
    }
  }
  // Verify nginx version is hidden
  if (headers.stdout.match(/nginx\/[\d.]/)) {
    issues.push('Nginx version exposed in Server header — add server_tokens off');
  }
  console.log(`  Security headers: ${requiredHeaders.length} checked`);

  // 9. JSON-LD structured data present
  if (!homeHtml.stdout.includes('application/ld+json')) {
    issues.push('No JSON-LD structured data found on homepage');
  }
  console.log(`  JSON-LD: ${homeHtml.stdout.includes('application/ld+json') ? '✓' : '✗'}`);

  // 10. Non-existent URLs return 404 (not soft 404 with 200)
  const notFoundCheck = await exec(conn, `curl -sk -o /dev/null -w "%{http_code}" https://khoshasystems.com/nonexistent-xyz-test`);
  const notFoundCode = notFoundCheck.stdout.trim();
  if (notFoundCode !== '404') issues.push(`Non-existent URL returned ${notFoundCode} instead of 404 (soft 404 SEO issue)`);
  console.log(`  404 status: ${notFoundCode === '404' ? '✓' : '✗ got ' + notFoundCode}`);

  // 11. No hardcoded www API URLs in JS bundles
  const wwwApiCheck = await exec(conn, `grep -rl "www.khoshasystems.com/api" ${REMOTE_BASE}/dist/assets/*.js 2>/dev/null | wc -l`);
  if (parseInt(wwwApiCheck.stdout.trim()) > 0) {
    issues.push('JS bundles still contain hardcoded www.khoshasystems.com/api URLs');
  }
  console.log(`  API URLs clean: ${wwwApiCheck.stdout.trim() === '0' ? '✓' : '✗'}`);

  // Summary
  console.log(`\n=== SEO Verification Summary ===`);
  if (issues.length === 0) {
    console.log('  All checks passed ✓');
  } else {
    console.log(`  ${issues.length} issue(s) found:`);
    issues.forEach(i => console.log(`  ✗ ${i}`));
  }

  conn.end();
  console.log('\nDeploy complete!');

  if (issues.length > 0) {
    console.error(`\nWARNING: ${issues.length} SEO issue(s) detected. Review above.`);
    process.exit(1);
  }
}

deploy().catch(err => {
  console.error('Deploy failed:', err.message);
  process.exit(1);
});
