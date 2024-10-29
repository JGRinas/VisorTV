import {
  Card,
  CardTemperature,
} from "../../../../shared/presentation/components/cards";
import { Text, Title } from "../../../../shared/presentation/components/texts";
import "./styles.css";
import { useWeatherData } from "~/modules/home/infrastructure/hooks/useWeatherData";

export const LeftColumn = () => {
  const { weatherInfo, weatherComponent } = useWeatherData();

  return (
    <div className="left-panel-home">
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
        {weatherComponent?.weatherItems.includes("wind") &&
          weatherInfo.wind && (
            <Card icon="wind">
              <Title>Viento:</Title>
              {/* Formatea la velocidad y la dirección del viento */}
              <Text>{`${weatherInfo.wind} km/h, Dirección: ${weatherInfo.wind.deg}°`}</Text>
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
