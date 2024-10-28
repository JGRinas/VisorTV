interface ErrorOrLoadingProps {
  isError: boolean;
  isLoading: boolean;
}

export const ErrorOrLoading = ({ isError, isLoading }: ErrorOrLoadingProps) => {
  return (
    <div className="user-list-container">
      {isError && <h1>Error al cargar los usuarios</h1>}
      {isLoading && <h1>Cargando...</h1>}
    </div>
  );
};
