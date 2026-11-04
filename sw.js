/* Service worker của Thành Phố Lặng: lưu sẵn toàn bộ game để chơi khi không có mạng.
   Mỗi lần sửa game, hãy tăng số phiên bản bên dưới để điện thoại tải bản mới. */
const VERSION = 'tpl-v2';
const FONT_CACHE = 'tpl-fonts';
const FILES = [
  './', './index.html', './thanh-pho-lang.html',
  './phong-can.html', './hanh-lang-den.html', './phong-ngap-nuoc.html',
  './bon-canh-cua.html', './van-bai-long-tin.html', './thap-trung-tam.html',
  './manifest.json',
  './icons/icon-192.png', './icons/icon-512.png',
  './icons/maskable-192.png', './icons/maskable-512.png',
  './icons/apple-touch-icon.png', './icons/favicon-32.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== FONT_CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Phông chữ Google: dùng bản đã lưu, đồng thời cập nhật ngầm
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(FONT_CACHE).then(async c => {
      const hit = await c.match(req);
      const net = fetch(req).then(r => { if (r.ok || r.type === 'opaque') c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }

  if (url.origin !== self.location.origin) return;

  // File của game: ưu tiên bản đã lưu. Bỏ qua ?d=..&c=.. (tiến trình người chơi) khi tìm
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(r => {
      if (r.ok) caches.open(VERSION).then(c => c.put(req, r.clone()));
      return r;
    }))
  );
});
