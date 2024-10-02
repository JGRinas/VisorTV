import { Card, CardTemperature } from "../cards";
import { Text, Title } from "../texts";
import "./styles.css";

export const LeftColumn = () => {
  return (
    <div className="left-column">
      <Card icon="location">
        <Title>Corrientes, Corrientes</Title>
      </Card>
      <CardTemperature />
      <Card icon="humidity">
        <Title>Humedad:</Title>
        <Text>38%</Text>
      </Card>
      <Card icon="pressure">
        <Title>Presión: :</Title>
        <Text>1010.2 hPa</Text>
      </Card>
      <Card icon="wind">
        <Title>Viento:</Title>
        <Text>Sur a 14km/h</Text>
      </Card>
      <Card icon="visibility">
        <Title>Visibilidad:</Title>
        <Text>10km</Text>
      </Card>
    </div>
  );
};
