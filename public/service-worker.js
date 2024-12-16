self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("app-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/static/css/global.css",
        "/offline.png",
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Publicar evento DATA_LOADED cuando los datos se cargan correctamente
        self.clients.matchAll().then((clients) => {
          clients.forEach((client) => {
            client.postMessage({
              type: "DATA_LOADED",
              url: event.request.url,
            });
          });
        });

        return response;
      })
      .catch(() => {
        // Publicar NETWORK_ERROR si falla la red
        self.clients.matchAll().then((clients) => {
          clients.forEach((client) => {
            client.postMessage({
              type: "NETWORK_ERROR",
              url: event.request.url,
            });
          });
        });

        // Servir desde la caché si hay un recurso disponible
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            self.clients.matchAll().then((clients) => {
              clients.forEach((client) => {
                client.postMessage({
                  type: "CACHE_RESPONSE",
                  url: event.request.url,
                });
              });
            });
          }

          return (
            cachedResponse ||
            new Response("No hay conexión a Internet", {
              status: 503,
              statusText: "Service Unavailable",
              headers: { "Content-Type": "text/plain" },
            })
          );
        });
      })
  );
});

self.addEventListener("sync", (event) => {
  if (event.tag === "sync-data") {
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        client.postMessage({
          type: "SYNC_ATTEMPT",
        });
      });
    });
  }
});
