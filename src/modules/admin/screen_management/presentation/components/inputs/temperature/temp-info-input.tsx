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
  const { screenData, addComponent, removeComponent } = useScreenContext();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleAddComponent = (type: ComponentType) => {
    addComponent(type);
    setDropdownVisible(false);
  };

  const isComponentAdded = (type: string) =>
    screenData.components.some((component) => component.type === type);

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
        {screenData.components.map((component) => (
          <div key={component.id}>
            {component.type === "temperature" ? (
              <CardTemperature />
            ) : (
              <Card icon={component.type} />
            )}
            <DeleteSectionButton
              onClick={() => removeComponent(component.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TempInfoInput;
