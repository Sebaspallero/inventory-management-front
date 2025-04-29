interface PaginationControllerProps {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    data: any
  }
  
  const PaginationController = ({ data, page, setPage }: PaginationControllerProps) => {
    return (
      <div className="flex gap-2">
        <button
          disabled={page === 0}
          onClick={() => setPage(prev => Math.max(prev - 1, 0))}
          className={page === 0 ? "px-3 py-1 border rounded text-sm text-gray-400 bg-gray-50" : "cursor-pointer px-3 py-1 border rounded text-sm bg-white"}>
          Anterior
        </button>
  
        <span className="px-3 py-1 border rounded text-sm bg-blue-50 text-blue-600">
          {page + 1}
        </span>
  
        <button
          disabled={data && page >= data.totalPages - 1}
          onClick={() => setPage(prev => prev + 1)}
          className={data && page >= data.totalPages - 1 ? "px-3 py-1 border rounded text-sm text-gray-400 bg-gray-50" : "cursor-pointer px-3 py-1 border rounded text-sm bg-white"}>
          Siguiente
        </button>
      </div>
    );
  };
  
  export default PaginationController;
  