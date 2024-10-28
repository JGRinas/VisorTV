import { ReactNode } from "react";
import "./styles.css";
import {
  CloudyIcon,
  HumidityIcon,
  LocationIcon,
  PressureIcon,
  VisibilityIcon,
  WindIcon,
} from "~/assets/icons";
import { Text, TextGreen, Title } from "../texts";

const icons = {
  humidity: HumidityIcon,
  location: LocationIcon,
  pressure: PressureIcon,
  visibility: VisibilityIcon,
  wind: WindIcon,
};

interface ICard {
  icon?: keyof typeof icons;
  children?: ReactNode;
}

export const Card = ({ icon, children }: ICard) => {
  const IconComponent = icon ? icons[icon] : null;

  return (
    <div className="card-container">
      {icon && IconComponent && <IconComponent className="card-svg" />}
      {children}
    </div>
  );
};

export const CardTemperature = () => {
  return (
    <Card>
      <div className="card-temperature-container">
        <div className="card-temperature-item">
          <CloudyIcon className="card-temperature-svg" />
          <TextGreen>28°</TextGreen>
        </div>
        <Title>Ligeramente nublado</Title>
        <Text>Actualizado: 17h</Text>
      </div>
    </Card>
  );
};
