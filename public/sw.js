// Khosha Systems — Push Notification Service Worker

self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Khoshà Systems';
  const options = {
    body: data.body || 'You have a new update.',
    icon: data.icon || '/logo.png',
    badge: '/icon-192.png',
    image: data.image || undefined,
    data: { url: data.url || 'https://khoshasystems.com' },
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || 'https://khoshasystems.com';
  event.waitUntil(clients.openWindow(url));
});
