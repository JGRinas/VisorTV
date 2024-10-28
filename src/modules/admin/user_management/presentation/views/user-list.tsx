import { Header } from "~/modules/shared/presentation/components/header";
import { useState } from "react";
import "./styles.css";
import {
  useDeleteUser,
  useEditUser,
  useUsers,
  useRegisterUser,
} from "../../infrastructure/hooks";
import { IUser } from "../../domain/dtos/response";
import { ErrorOrLoading } from "../components/error-or-loading";
import { UserTable } from "../components/user-table";
import { PaginationControls } from "../components/pagination-control";
import {
  IEditUserRequestDTO,
  IRegisterUserDTO,
} from "../../domain/dtos/request";

export const UserList = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { users, totalPages, currentPage, isLoading, isError } = useUsers(
    page,
    limit
  );

  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: editUser } = useEditUser();
  const { mutate: registerUser } = useRegisterUser();

  const handleEdit = (id: string, updatedUser: IEditUserRequestDTO) => {
    editUser({ id, payload: updatedUser });
  };

  const handleDelete = (id: string) => {
    deleteUser(id);
  };

  const handleAddUser = (newUser: IRegisterUserDTO) => {
    registerUser(newUser);
  };

  if (isLoading || isError)
    return <ErrorOrLoading isError={isError} isLoading={isLoading} />;

  return (
    <>
      <Header />
      <main className="user-list-container">
        <h1>Listado de Usuarios</h1>
        <UserTable
          users={users as unknown as IUser[]}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleAddUser={handleAddUser}
        />
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          setPage={setPage}
        />
      </main>
    </>
  );
};
