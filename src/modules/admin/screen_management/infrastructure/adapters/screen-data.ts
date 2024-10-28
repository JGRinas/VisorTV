import { IComponentPayload, IScreenPayload } from "../../domain/dtos/request";
import { ScreenData } from "../provider";

export function adaptScreenDataToBackend(
  screenData: ScreenData
): IScreenPayload {
  const adaptedComponents: IComponentPayload[] = screenData.components.map(
    (component: any) => {
      switch (component.type) {
        case "location":
        case "temperature":
        case "humidity":
        case "pressure":
        case "wind":
        case "visibility":
          return {
            type: "weather",
            location: {
              country: "Argentina",
              province: "Corrientes",
            },
          };
        case "carousel":
          return {
            type: "carousel",
            imageUrl: component.imageUrl,
          };
        case "camera":
          return {
            type: "camera",
          };
        case "static_info":
          return {
            type: "static_info",
            content: component.content,
          };
        default:
          throw new Error(`Unknown component type: ${component.type}`);
      }
    }
  );

  return {
    name: screenData.name,
    assignedOperators: screenData.assignedOperators,
    components: adaptedComponents,
  };
}
