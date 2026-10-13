const CACHE = 'pixel-wallet-v5'; // ต้องเปลี่ยนเลขทุกครั้งที่แก้ไฟล์ในแอป ไม่งั้นเครื่องที่ติดตั้งแล้วจะไม่เห็นเวอร์ชันใหม่ (cache-first) — และต้องแก้ป้าย vN ใน index.html ให้เป็นเลขเดียวกัน
const ASSETS = ['./', './index.html', './manifest.json', './icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('./index.html')))
  );
});
