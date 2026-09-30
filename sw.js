// Offline shell: the app opens without internet once it has been loaded one time.
// Bump VERSION on every deploy so phones pick up the new files.
const VERSION = 'ritm-2026-09-30-2';
const SHELL = [
  './', './index.html', './app.js', './firebase-config.js', './vendor/firebase.js', './manifest.webmanifest',
  './fonts/fonts.css', './fonts/geologica-cyrillic.woff2', './fonts/geologica-latin.woff2',
  './fonts/onest-cyrillic.woff2', './fonts/onest-latin.woff2',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './icons/favicon-64.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION)
    .then(c => c.addAll(SHELL.map(u => new Request(u, {cache: 'reload'}))))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Same-origin files: answer from the cache at once, refresh the cache in the background.
// Firebase traffic (other origins) is never touched here; Firestore handles its own offline queue.
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;
  e.respondWith((async () => {
    const cache = await caches.open(VERSION);
    const hit = await cache.match(req, {ignoreSearch: true}) || (req.mode === 'navigate' ? await cache.match('./') : undefined);
    const net = fetch(req).then(res => { if (res.ok && res.type === 'basic') cache.put(req, res.clone()); return res; }).catch(() => undefined);
    if (hit) { e.waitUntil(net); return hit; }
    return (await net) || new Response('Нет сети', {status: 503, headers: {'Content-Type': 'text/plain; charset=utf-8'}});
  })());
});
