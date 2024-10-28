import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData } from "~/modules/home/infrastructure/weatherService";
import { useHomeContext } from "../provider";

export const useWeatherData = () => {
  const { screenData } = useHomeContext();

  const weatherComponent = screenData?.components.find(
    (component) => component.type === "weather"
  );

  const defaultLocation = { country: "Argentina", province: "Corrientes" };

  const getWeatherDataFromLocalStorage = () => {
    const storedData = localStorage.getItem("weatherData");
    return storedData ? JSON.parse(storedData) : null;
  };

  const { data: weatherData, isError } = useQuery({
    queryKey: ["weatherData", defaultLocation],
    queryFn: () => fetchWeatherData(defaultLocation),
    enabled: !!weatherComponent,
    refetchOnWindowFocus: false,
    initialData: getWeatherDataFromLocalStorage(),
  });
  // Asegura que `weatherInfo` tome los datos del `localStorage` si hay un error
  const weatherInfo = isError
    ? getWeatherDataFromLocalStorage()
    : {
        temperature: "Cargando...",
        condition: "Cargando...",
        lastUpdated: "--",
        humidity: "--",
        pressure: "--",
        wind: "--",
        visibility: "--",
        ...weatherData,
        location: weatherData?.location || defaultLocation,
      };

  return { weatherInfo, isError, weatherComponent };
};
