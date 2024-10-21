import { Header } from "~/modules/shared/presentation/components/header";
import { useState } from "react";
import "./styles.css";
import { useUsers } from "../../infrastructure/hooks";

export const UserList = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { users, totalPages, currentPage, isLoading, isError } = useUsers(
    page,
    limit
  );

  const handleEdit = (id: string) => {
    console.log(`Edit user with id ${id}`);
  };

  const handleDelete = (id: string) => {
    console.log(`Delete user with id ${id}`);
  };

  if (isLoading || isError)
    return <ErrorOrLoading isError={isError} isLoading={isLoading} />;

  return (
    <>
      <Header />
      <main className="user-list-container">
        <h1>Listado de Usuarios</h1>
        <table className="user-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="action-button edit"
                    onClick={() => handleEdit(user._id)}
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
            ))}
          </tbody>
        </table>
        <div className="pagination-controls">
          <button
            className="pagination-button"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            className="pagination-button"
            onClick={() =>
              setPage((prev) => (prev < totalPages ? prev + 1 : prev))
            }
            disabled={page >= totalPages}
          >
            Siguiente
          </button>
        </div>
      </main>
    </>
  );
};

const ErrorOrLoading = ({
  isError,
  isLoading,
}: {
  isError: boolean;
  isLoading: boolean;
}) => {
  return (
    <>
      <Header />
      <div className="user-list-container">
        {isError && <h1>Error al cargar los usuarios</h1>}
        {isLoading && <h1>Cargando...</h1>}
      </div>
    </>
  );
};
