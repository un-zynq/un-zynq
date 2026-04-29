const TARGET_DEST = 'https://cdn.jsdelivr.net/gh/un-zynq/g1/1/';

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Alleen verzoeken naar hetzelfde domein als waar de HTML draait omleiden
  if (url.origin === self.location.origin) {
    // Voorkom oneindige loop voor de SW zelf
    if (url.pathname.includes('sw.js')) return;

    const cleanPath = url.pathname.replace(/^\//, '');
    const newUrl = TARGET_DEST + cleanPath;

    event.respondWith(
      fetch(newUrl, {
        mode: 'cors'
      })
    );
  }
});
