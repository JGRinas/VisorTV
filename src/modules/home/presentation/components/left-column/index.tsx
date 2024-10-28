import { useHomeContext } from "~/modules/home/infrastructure/provider";
import {
  Card,
  CardTemperature,
} from "../../../../shared/presentation/components/cards";
import { Text, Title } from "../../../../shared/presentation/components/texts";
import "./styles.css";
import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData } from "~/modules/home/infrastructure/weatherService";

export const LeftColumn = () => {
  const { screenData } = useHomeContext();
  const weatherComponent = screenData?.components.find(
    (component) => component.type === "weather"
  );

  const defaultLocation = { country: "Argentina", province: "Corrientes" };

  const {
    data: weatherData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["weatherData", defaultLocation],
    queryFn: () => fetchWeatherData(defaultLocation),

    enabled: !!weatherComponent,
    refetchOnWindowFocus: false,
  });

  const weatherInfo = {
    location: defaultLocation,
    temperature: "Cargando...",
    condition: "Cargando...",
    lastUpdated: "--",
    humidity: "--",
    pressure: "--",
    wind: "--",
    visibility: "--",
    ...weatherData, // Sobrescribe con los datos reales si existen
  };

  if (isError) {
    return <div>Error al cargar el clima</div>;
  }

  return (
    <div className="left-panel">
      <div className="components-container">
        {weatherComponent?.weatherItems.includes("location") && (
          <Card icon="location">
            <Title>{`${weatherInfo.location.province}, ${weatherInfo.location.country}`}</Title>
          </Card>
        )}
        {weatherComponent?.weatherItems.includes("temperature") && (
          <CardTemperature
            degrees={weatherInfo.temperature}
            title={weatherInfo.condition}
            icon={weatherInfo.icon}
          />
        )}
        {weatherComponent?.weatherItems.includes("humidity") && (
          <Card icon="humidity">
            <Title>Humedad:</Title>
            <Text>{weatherInfo.humidity}</Text>
          </Card>
        )}
        {weatherComponent?.weatherItems.includes("pressure") && (
          <Card icon="pressure">
            <Title>Presión:</Title>
            <Text>{weatherInfo.pressure}</Text>
          </Card>
        )}
        {weatherComponent?.weatherItems.includes("wind") && (
          <Card icon="wind">
            <Title>Viento:</Title>
            <Text>{weatherInfo.wind}</Text>
          </Card>
        )}
        {weatherComponent?.weatherItems.includes("visibility") && (
          <Card icon="visibility">
            <Title>Visibilidad:</Title>
            <Text>{weatherInfo.visibility}</Text>
          </Card>
        )}
      </div>
    </div>
  );
};
