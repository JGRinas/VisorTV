interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export const PaginationControls = ({
  currentPage,
  totalPages,
  setPage,
}: PaginationProps) => {
  return (
    <div className="pagination-controls">
      <button
        className="pagination-button"
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      <span>
        Página {currentPage} de {totalPages}
      </span>
      <button
        className="pagination-button"
        onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
        disabled={currentPage >= totalPages}
      >
        Siguiente
      </button>
    </div>
  );
};
