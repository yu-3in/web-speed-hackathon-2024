
self.addEventListener('install', (ev) => {
  ev.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (ev) => {
  ev.waitUntil(self.clients.claim());
});
