// service-worker.js
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("app-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/static/css/global.css",
        // Añade aquí otros archivos estáticos que desees cachear,
        // como los íconos o imágenes necesarias.
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Si hay una respuesta en caché, úsala; de lo contrario, intenta obtenerla de la red
      return (
        cachedResponse ||
        fetch(event.request).catch(() =>
          event.request.destination === "image"
            ? caches.match("/offline.png")
            : new Response("No hay conexión a Internet", {
                status: 503,
                statusText: "Service Unavailable",
                headers: { "Content-Type": "text/plain" },
              })
        )
      );
    })
  );
});
