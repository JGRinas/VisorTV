import "./styles/global.css";
import { MainRoutes } from "./routes/main-routes";
import { useEffect } from "react";
import { Workbox } from "workbox-window";

const App = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const wb = new Workbox("/service-worker.js"); // Asegúrate de que esta ruta es correcta
      wb.register()
        .then((registration) => console.log("Service Worker registrado"))
        .catch((error) =>
          console.log("Error al registrar el Service Worker:", error)
        );
    }
  }, []);

  return <MainRoutes />;
};

export default App;
