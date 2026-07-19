const CACHE_NAME = 'radar-ingresos-v1';
const ASSETS = [
  'app.html',
  'app_style.css',
  'app_dashboard.js',
  'manifest.json',
  'logo_icon.png',
  'logo_icon_512.png'
];

// Install Service Worker
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching files...');
      return cache.addAll(ASSETS);
    })
  );
});

// Activate Service Worker
self.addEventListener('activate', (e) => {
  console.log('[Service Worker] Activated');
});

// Cache first, fall back to network
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});