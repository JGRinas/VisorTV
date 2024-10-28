import { useState } from "react";
import "./styles.css";
import { useScreenContext } from "../../../../infrastructure/provider";
import { useUsers } from "~/modules/admin/user_management/infrastructure/hooks";
import DeleteSectionButton, {
  SectionButton,
} from "../../buttons/delete-section-button";

const OperatorDropdown = () => {
  const { screenData, addOperator, removeOperator } = useScreenContext();
  const { users, isLoading } = useUsers();

  // Controla el operador seleccionado en el dropdown
  const [selectedOperator, setSelectedOperator] = useState("");

  const handleAddOperator = () => {
    if (selectedOperator) {
      addOperator(selectedOperator);
      setSelectedOperator(""); // Restablece el valor del dropdown después de seleccionar
    }
  };

  return (
    <div className="operator-dropdown">
      <div className="dropdown-operator">
        <select
          value={selectedOperator}
          onChange={(e) => setSelectedOperator(e.target.value)}
          className="dropdown-select"
        >
          <option value="">-- Selecciona un operador --</option>
          {isLoading ? (
            <option>Cargando...</option>
          ) : (
            // Filtrar operadores ya asignados
            users
              ?.filter(
                (user) => !screenData.assignedOperators.includes(user._id)
              )
              .map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name} {user.surname}
                </option>
              ))
          )}
        </select>
        <SectionButton onClick={handleAddOperator} text="Agregar Operador" />
      </div>

      {/* Mostrar operadores seleccionados con opción de eliminar */}
      {!!screenData.assignedOperators.length && (
        <div className="assigned-operators-list">
          <ul>
            {screenData.assignedOperators.map((operatorId) => {
              const operator = users?.find((user) => user._id === operatorId);
              return operator ? (
                <li key={operatorId} className="assigned-operator-item">
                  {operator.name} {operator.surname}
                  <DeleteSectionButton
                    onClick={() => removeOperator(operatorId)}
                  />
                </li>
              ) : null;
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OperatorDropdown;
