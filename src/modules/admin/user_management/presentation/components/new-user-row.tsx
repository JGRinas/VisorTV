import { useState } from "react";
import { IRegisterUserDTO } from "../../domain/dtos/request";

interface NewUserRowProps {
  handleAddUser: (newUser: IRegisterUserDTO) => void;
  setIsAddingNewUser: (isAdding: boolean) => void;
}
export const NewUserRow = ({
  handleAddUser,
  setIsAddingNewUser,
}: NewUserRowProps) => {
  const [newUser, setNewUser] = useState<IRegisterUserDTO>({
    surname: "",
    name: "",
    email: "",
    role: "operator",
    password: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: keyof IRegisterUserDTO
  ) => {
    setNewUser((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const handleSave = () => {
    handleAddUser(newUser);
    setIsAddingNewUser(false);
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          placeholder="Nombre"
          value={newUser.name}
          onChange={(e) => handleInputChange(e, "name")}
        />
      </td>
      <td>
        <input
          type="text"
          placeholder="Apellido"
          value={newUser.surname}
          onChange={(e) => handleInputChange(e, "surname")}
        />
      </td>
      <td>
        <input
          type="email"
          placeholder="Correo"
          value={newUser.email}
          onChange={(e) => handleInputChange(e, "email")}
        />
      </td>
      <td>
        <select
          value={newUser.role}
          onChange={(e) => handleInputChange(e, "role")}
        >
          <option value="admin">Admin</option>
          <option value="operator">Operator</option>
        </select>
      </td>
      <td>
        <button className="action-button save" onClick={handleSave}>
          Guardar
        </button>
        <button
          className="action-button cancel"
          onClick={() => setIsAddingNewUser(false)}
        >
          Cancelar
        </button>
      </td>
    </tr>
  );
};
