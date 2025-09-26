// --- Pagination Component ---
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const pageNumbers: (number | string)[] = [];

  const siblingCount = 1; // how many pages to show around current

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 || 
      i === totalPages || 
      (i >= currentPage - siblingCount && i <= currentPage + siblingCount)
    ) {
      pageNumbers.push(i);
    } else if (
      pageNumbers[pageNumbers.length - 1] !== "..."
    ) {
      pageNumbers.push("...");
    }
  }

  return (
    <div className="flex justify-center mt-6 gap-2">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        className="px-3 py-1 rounded-4xl"
      >
        &lt;
      </button>

      {pageNumbers.map((num, idx) =>
        num === "..." ? (
          <span key={idx} className="px-3 py-1">
            ...
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => onPageChange(Number(num))}
            className={`px-3 py-1 rounded-4xl ${
              currentPage === num ? "bg-teal-600 text-white" : "bg-gray-200"
            }`}
          >
            {num}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        className="px-3 py-1 rounded-4xl"
      >
        &gt;
      </button>
    </div>
  );
};
 
export default Pagination;