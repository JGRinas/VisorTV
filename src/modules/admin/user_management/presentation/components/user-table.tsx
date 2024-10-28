import { useState } from "react";
import { IUser } from "../../domain/dtos/response";
import { UserRow } from "./user-row";
import { EditUserRow } from "./edit-user-row";
import { NewUserRow } from "./new-user-row";
import {
  IEditUserRequestDTO,
  IRegisterUserDTO,
} from "../../domain/dtos/request";

interface UserTableProps {
  users: IUser[];
  handleEdit: (id: string, updatedUser: IEditUserRequestDTO) => void;
  handleDelete: (id: string) => void;
  handleAddUser: (newUser: IRegisterUserDTO) => void;
}

export const UserTable = ({
  users,
  handleEdit,
  handleDelete,
  handleAddUser,
}: UserTableProps) => {
  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [isAddingNewUser, setIsAddingNewUser] = useState(false);

  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Correo</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) =>
          user._id === editRowId ? (
            <EditUserRow
              key={user._id}
              user={user}
              setEditRowId={setEditRowId}
              handleEdit={handleEdit}
            />
          ) : (
            <UserRow
              key={user._id}
              user={user}
              setEditRowId={setEditRowId}
              handleDelete={handleDelete}
            />
          )
        )}
        {isAddingNewUser ? (
          <NewUserRow
            handleAddUser={handleAddUser}
            setIsAddingNewUser={setIsAddingNewUser}
          />
        ) : (
          <tr>
            <td colSpan={4}>
              <button
                className="action-button add"
                onClick={() => setIsAddingNewUser(true)}
              >
                + Agregar Usuario
              </button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
