const CDN_URL = 'https://cdn.jsdelivr.net/gh/un-zynq/g1/1/';

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Controleer of het verzoek naar hetzelfde domein gaat (relatieve paden)
  // En zorg dat we de service worker zelf niet omleiden (om loops te voorkomen)
  if (url.origin === self.location.origin && !url.pathname.includes('sw.js')) {
    
    // Maak de nieuwe URL: CDN + het pad van het verzoek
    // url.pathname bevat al de eerste slash, dus we halen die weg indien nodig
    const newUrl = CDN_URL + url.pathname.replace(/^\//, '');

    event.respondWith(
      fetch(newUrl, {
        mode: 'cors',
        credentials: 'omit'
      })
    );
  }
});
