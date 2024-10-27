import { IUser } from "../../domain/dtos/response";

interface UserRowProps {
  user: IUser;
  setEditRowId: (id: string | null) => void;
  handleDelete: (id: string) => void;
}

export const UserRow = ({ user, setEditRowId, handleDelete }: UserRowProps) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.surname}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <button
          className="action-button edit"
          onClick={() => setEditRowId(user._id)}
        >
          Editar
        </button>
        <button
          className="action-button delete"
          onClick={() => handleDelete(user._id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};
