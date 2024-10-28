import { IScreen } from "../../domain/dtos/response";
import { ScreenData, ComponentType } from "../provider";

export function adaptBackendDataToScreenData(screen?: IScreen): ScreenData {
  if (!screen)
    return {
      isCameraVisible: false,
      name: "",
      assignedOperators: [],
      components: [],
      carouselItems: [],
      staticInfoContent: "",
      weatherItems: [], // Añadimos weatherItems aquí también
    };

  // Mapear los componentes desde el backend a los tipos que necesita el front
  const adaptedComponents = screen.components.map((component) => {
    switch (component.type) {
      case "weather":
        return {
          id: component._id,
          type: "weather" as ComponentType,
          weatherItems: component.weatherItems,
        };
      case "carousel":
        return {
          id: component._id,
          type: "carousel",
          imageUrl: component.imageUrl,
        };
      case "camera":
        return { id: component._id, type: "camera" };
      case "static_info":
        return {
          id: component._id,
          type: "static_info",
          content: component.content,
        };
      default:
        throw new Error(`Unknown component type: ${component.type}`);
    }
  });

  // Extraer los elementos del carrusel si existen dentro de los componentes
  const carouselItems = adaptedComponents
    .filter((component) => component.type === "carousel" && component.imageUrl)
    .map((component) => ({ id: component.id, imageUrl: component.imageUrl! }));

  // Determinar si la cámara está visible
  const isCameraVisible = adaptedComponents.some(
    (component) => component.type === "camera"
  );

  // Extraer el contenido estático si existe
  const staticInfoComponent = adaptedComponents.find(
    (component) => component.type === "static_info"
  );
  const staticInfoContent = staticInfoComponent?.content || "";

  // Extraer los elementos de clima seleccionados si existen
  const weatherItems = adaptedComponents
    .filter((component) => component.type === "weather")
    .flatMap((component) => component.weatherItems || []);

  // Retornar los datos adaptados para el estado inicial de screenData
  return {
    name: screen.name,
    components: adaptedComponents,
    carouselItems,
    isCameraVisible,
    staticInfoContent,
    assignedOperators: screen.assignedOperators,
    weatherItems, // Añadimos weatherItems al estado inicial
  };
}
