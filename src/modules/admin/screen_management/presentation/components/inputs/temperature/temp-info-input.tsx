import { useState } from "react";
import "./styles.css";
import {
  ComponentType,
  useScreenContext,
} from "../../../../infrastructure/provider";
import {
  Card,
  CardTemperature,
} from "~/modules/shared/presentation/components/cards";
import AddSectionButton from "../../buttons/add-section-button";
import DeleteSectionButton from "../../buttons/delete-section-button";

const availableComponents: { type: ComponentType; label: string }[] = [
  { type: "location", label: "Ubicación" },
  { type: "temperature", label: "Temperatura" },
  { type: "humidity", label: "Humedad" },
  { type: "pressure", label: "Presión" },
  { type: "wind", label: "Viento" },
  { type: "visibility", label: "Visibilidad" },
];

const TempInfoInput = () => {
  const { screenData, removeWeatherItem, addWeatherItem } = useScreenContext();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleAddComponent = (type: ComponentType) => {
    addWeatherItem(type);
    setDropdownVisible(false);
  };

  const isComponentAdded = (type: string) =>
    screenData.weatherItems.some((component) => component === type);

  return (
    <div className="left-panel">
      <AddSectionButton
        onClick={() => {
          console.log("hola");
          setDropdownVisible((prev) => !prev);
        }}
      />
      {dropdownVisible && (
        <div className="dropdown-container">
          {availableComponents.map(
            (component) =>
              !isComponentAdded(component.type) && (
                <button
                  key={component.type}
                  onClick={() => handleAddComponent(component.type)}
                  className="dropdown-item"
                >
                  {component.label}
                </button>
              )
          )}
        </div>
      )}

      <div className="components-container">
        {screenData.weatherItems.map((item) => (
          <div key={item}>
            {item === "temperature" ? (
              <CardTemperature />
            ) : (
              <Card icon={item} />
            )}
            <DeleteSectionButton
              onClick={() => {
                removeWeatherItem(item);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TempInfoInput;
