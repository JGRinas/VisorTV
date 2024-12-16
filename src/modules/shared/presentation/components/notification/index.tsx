import React, { useEffect, useState } from "react";

interface ServiceWorkerEvent {
  type: "CACHE_RESPONSE" | "NETWORK_ERROR" | "SYNC_ATTEMPT" | "DATA_LOADED";
  url?: string;
}

const Notification: React.FC = () => {
  const [notifications, setNotifications] = useState<string[]>([]);

  const addNotification = (message: string) => {
    setNotifications((prev) => [...prev, message]);
  };

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => console.log("Service Worker registrado"))
        .catch((error) =>
          console.log("Error al registrar el Service Worker:", error)
        );

      navigator.serviceWorker.addEventListener("message", (event) => {
        const data: ServiceWorkerEvent = event.data;
        console.log(data.type);
        switch (data.type) {
          case "CACHE_RESPONSE":
            addNotification(`Datos cargados desde la caché: ${data.url}`);
            break;
          case "NETWORK_ERROR":
            addNotification(`Error de red al intentar acceder: ${data.url}`);
            break;
          case "DATA_LOADED":
            addNotification(
              `Datos cargados correctamente desde la API: ${data.url}`
            );
            break;
          case "SYNC_ATTEMPT":
            addNotification("Intentando sincronizar datos...");
            break;
          default:
            break;
        }
      });
    }

    const handleOnline = () =>
      addNotification("Datos cargados correctamente desde la API");
    const handleOffline = () =>
      addNotification(
        "Error de red al intentar acceder: https://visor-tv-back.vercel.app/. Datos cargados desde la caché:"
      );

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    if (!navigator.onLine) {
      addNotification("Sin conexión a internet");
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!notifications.length) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: "300px",
        maxHeight: "300px",
        overflowY: "auto",
        backgroundColor: "black",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        zIndex: 1000,
      }}
    >
      <ul>
        {notifications.map((notification, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            {notification}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
