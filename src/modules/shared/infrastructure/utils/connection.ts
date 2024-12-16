import eventBus from "./event-bus";

// Función para detectar cambios en el estado de conexión
function monitorConnection() {
  const notifyConnectionChange = () => {
    const isOnline = navigator.onLine;
    const event = isOnline ? "online" : "offline";
    // Publicar evento en el bus
    eventBus.next({ type: event, isOnline });
  };

  // Detectar cambios en tiempo real
  window.addEventListener("online", () => console.log("Conexión restaurada"));
  window.addEventListener("offline", () =>
    console.log("Sin conexión a internet")
  );

  // Notificar el estado actual al iniciar
  notifyConnectionChange();
}

export default monitorConnection;
