/* Yılbaşı Yarışı güncelleme görevlisi: sayfayı önce sunucudan ister (önbelleği atlar),
   internet yoksa son kopyayı gösterir. Böylece yeni sürüm kimse dokunmadan gelir. */
const KOPYA = 'yy-sayfa';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.mode !== 'navigate') return;
  e.respondWith(
    fetch(r.url, { cache: 'no-store', credentials: 'same-origin' })
      .then(res => { if (res.ok) { const k = res.clone(); caches.open(KOPYA).then(c => c.put('./', k)); } return res; })
      .catch(() => caches.match('./'))
  );
});
