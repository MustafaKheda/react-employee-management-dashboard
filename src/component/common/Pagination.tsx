interface PaginationProps {
  currentPage: number;
  totalItems: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (size: number) => void;
  rowsPerPageOptions?: number[];
}

export default function Pagination({
  currentPage,
  totalItems,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [5,10, 20, 50],
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / rowsPerPage);

//   if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-[#E5E7EB] bg-white">
      {/* Rows per page */}
      <div className="flex items-center gap-2 text-sm text-[#374151]">
        <span>Rows per page:</span>
        <select
          value={rowsPerPage}
          onChange={e => onRowsPerPageChange(Number(e.target.value))}
          className="border border-[#D1D5DB] rounded px-2 py-1"
        >
          {rowsPerPageOptions.map(size => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-1">
        {/* Prev */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="w-8 h-8 flex items-center justify-center border rounded
                     disabled:opacity-40"
        >
          ‹
        </button>

        {/* Page Numbers */}
        {pages.map(page => {
          const showEllipsis =
            page === 4 && currentPage < totalPages - 2;

          if (
            page > 3 &&
            page < totalPages - 2 &&
            page !== currentPage
          ) {
            return showEllipsis ? (
              <span
                key={page}
                className="px-2 text-gray-400"
              >
                …
              </span>
            ) : null;
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 flex items-center justify-center rounded border text-sm font-semibold
                ${
                  currentPage === page
                    ? "bg-[#22B8A7] text-white"
                    : "border-[#D1D5DB]"
                }`}
            >
              {page}
            </button>
          );
        })}

        {/* Next */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="w-8 h-8 flex items-center justify-center border rounded
                     disabled:opacity-40"
        >
          ›
        </button>
      </div>
    </div>
  );
}
