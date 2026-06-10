// Build-time prerenderer: snapshots every route of the SPA into static HTML
// so search engines and AI crawlers receive full content without executing JS.
// Also generates sitemap.xml and the GitHub Pages 404.html SPA fallback.
//
// Usage: node scripts/prerender.mjs   (run after `vite build`)

import { createServer } from 'node:http';
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const SITE_URL = 'https://emperorspices.com';
const PORT = 4173;

// ---- Collect routes ----
const blogData = readFileSync(join(__dirname, '..', 'src', 'data', 'blogData.js'), 'utf-8');
const slugs = [...blogData.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);

const STATIC_ROUTES = ['/', '/about', '/products', '/export', '/knowledge', '/contact'];
const BLOG_ROUTES = slugs.map((s) => `/knowledge/${s}`);
const ALL_ROUTES = [...STATIC_ROUTES, ...BLOG_ROUTES];

// ---- Tiny static file server with SPA fallback ----
const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.mp4': 'video/mp4', '.ico': 'image/x-icon',
  '.gz': 'application/gzip', '.br': 'application/octet-stream', '.txt': 'text/plain', '.md': 'text/markdown',
};

const server = createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, `http://localhost:${PORT}`).pathname);
  let filePath = join(DIST, urlPath);
  if (!existsSync(filePath) || urlPath === '/') filePath = join(DIST, 'index.html');
  try {
    const data = readFileSync(filePath.endsWith('/') ? join(filePath, 'index.html') : filePath);
    res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(readFileSync(join(DIST, 'index.html')));
  }
});

const snapshot = async (page, route) => {
  await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle2', timeout: 90000 });
  // Give React effects (Seo head updates, content render) time to settle.
  await new Promise((r) => setTimeout(r, 1500));

  await page.evaluate(() => {
    // Animations (GSAP scroll-triggered) leave below-fold elements at opacity 0
    // in the snapshot; normalize so the static HTML is fully visible.
    document.querySelectorAll('[style]').forEach((el) => {
      if (el.style.opacity === '0') el.style.opacity = '1';
      if (el.style.visibility === 'hidden') el.style.visibility = 'visible';
    });
    // Drop the preloader if present.
    document.querySelector('.preloader')?.remove();
  });

  const html = await page.content();
  return html.startsWith('<!DOCTYPE') ? html : `<!DOCTYPE html>${html}`;
};

const main = async () => {
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`Serving dist/ on :${PORT} — prerendering ${ALL_ROUTES.length} routes`);

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 900 });

  let ok = 0;
  for (const route of ALL_ROUTES) {
    try {
      const html = await snapshot(page, route);
      const outDir = route === '/' ? DIST : join(DIST, route.slice(1));
      mkdirSync(outDir, { recursive: true });
      writeFileSync(join(outDir, 'index.html'), html);
      ok += 1;
      console.log(`✓ ${route}`);
    } catch (err) {
      console.error(`✗ ${route}: ${err.message}`);
    }
  }

  await browser.close();
  server.close();

  // ---- sitemap.xml ----
  const today = new Date().toISOString().slice(0, 10);
  const urlXml = ALL_ROUTES.map((r) => {
    const isPost = r.startsWith('/knowledge/');
    const priority = r === '/' ? '1.0' : isPost ? '0.7' : '0.9';
    return `  <url>\n    <loc>${SITE_URL}${r === '/' ? '/' : `${r}/`}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
  }).join('\n');
  writeFileSync(
    join(DIST, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlXml}\n</urlset>\n`
  );
  console.log('✓ sitemap.xml');

  // ---- GitHub Pages SPA fallback for unknown URLs ----
  copyFileSync(join(DIST, 'index.html'), join(DIST, '404.html'));
  console.log('✓ 404.html');

  console.log(`\nPrerendered ${ok}/${ALL_ROUTES.length} routes.`);
  if (ok < ALL_ROUTES.length) process.exit(1);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
