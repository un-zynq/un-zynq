// sw.js
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Haal de 'target' op uit de URL van de Service Worker zelf
  const swUrl = new URL(self.location.href);
  const targetDest = swUrl.searchParams.get('target');

  if (targetDest && url.origin === self.location.origin) {
    if (url.pathname.includes('sw.js')) return;

    // Bouw de nieuwe URL
    const cleanPath = url.pathname.replace(/^\//, '');
    const newUrl = targetDest + cleanPath;

    event.respondWith(
      fetch(newUrl, { mode: 'cors' })
    );
  }
});
