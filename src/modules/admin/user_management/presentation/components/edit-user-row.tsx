import { useState } from "react";
import { IUser } from "../../domain/dtos/response";
import { IEditUserRequestDTO } from "../../domain/dtos/request";
import { ERoleDTO } from "~/modules/auth/domain/dtos/request";

interface EditUserRowProps {
  user: IUser;
  setEditRowId: (id: string | null) => void;
  handleEdit: (id: string, updatedUser: IEditUserRequestDTO) => void;
}

export const EditUserRow = ({
  user,
  setEditRowId,
  handleEdit,
}: EditUserRowProps) => {
  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [role, setRole] = useState<ERoleDTO>(user.role);

  const onSave = () => {
    handleEdit(user._id, { name, role });
    setEditRowId(null);
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
      </td>
      <td>{user.email}</td>
      <td>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as ERoleDTO)}
        >
          <option value={ERoleDTO.ADMIN}>Admin</option>
          <option value={ERoleDTO.OPERATOR}>Operator</option>
        </select>
      </td>
      <td>
        <button className="action-button save" onClick={onSave}>
          Guardar
        </button>
        <button
          className="action-button cancel"
          onClick={() => setEditRowId(null)}
        >
          Cancelar
        </button>
      </td>
    </tr>
  );
};
