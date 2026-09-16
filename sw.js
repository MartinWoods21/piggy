/* Piggy — service worker.
   Strategia: dokument z sieci (żeby aktualizacje docierały od razu),
   cache wyłącznie jako zapas na brak zasięgu. Reszta plików cache-first. */
const VERSION = 'v4';
const CACHE   = 'piggy-' + VERSION;
const ASSETS  = [
  './', './index.html', './manifest.webmanifest', './pig-success.webp',
  './icon-32.png', './icon-180.png', './icon-192.png', './icon-512.png', './icon-maskable-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Fonty Google — cache-first, żeby typografia działała bez sieci.
  if (url.hostname.endsWith('googleapis.com') || url.hostname.endsWith('gstatic.com')) {
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
        return res;
      }).catch(() => hit))
    );
    return;
  }

  if (url.origin !== location.origin) return;

  // Sam dokument — sieć najpierw. Inaczej aktualizacja apki nigdy by do niej nie dotarła.
  //
  // cache:'no-store' jest tu kluczowe: zwykłe fetch(req) pyta najpierw cache HTTP
  // przeglądarki, a ten (przez Cache-Control: max-age=600 z GitHub Pages) potrafi
  // przez 10 minut oddawać starą stronę. Wtedy "sieć najpierw" jest fikcją.
  if (req.mode === 'navigate' || req.destination === 'document') {
    e.respondWith(
      fetch(req.url, { cache: 'no-store', credentials: 'same-origin' }).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put('./index.html', copy));
        return res;
      }).catch(() => caches.match('./index.html').then(r => r || caches.match('./')))
    );
    return;
  }

  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy));
      return res;
    }))
  );
});
