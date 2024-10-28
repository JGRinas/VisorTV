import { IScreenPayload } from "../../domain/dtos/request";
import { ScreenData } from "../provider";

export function adaptScreenDataToBackend(
  screenData: ScreenData
): IScreenPayload {
  return {
    name: screenData.name,
    assignedOperators: screenData.assignedOperators,
    components: [
      ...screenData.carouselItems.map((item) => ({
        type: "carousel",
        imageUrl: item.imageUrl,
      })),
      ...(screenData.isCameraVisible ? [{ type: "camera" }] : []),
      ...(screenData.staticInfoContent
        ? [{ type: "static_info", content: screenData.staticInfoContent }]
        : []),
      ...(screenData.weatherItems.length > 0
        ? [
            {
              type: "weather",
              weatherItems: screenData.weatherItems,
              location: { country: "Argentina", province: "Corrientes" },
            },
          ]
        : []),
    ],
  };
}
