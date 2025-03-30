const Pagination = ({
  totalRecords,
  recordsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  // Hide pagination if only one page
  if (totalPages <= 1) return null;

  // Generate page numbers dynamically
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i <= 3 || i === totalPages) {
      pageNumbers.push(i);
    } else if (i === 4 && totalPages > 4) {
      pageNumbers.push("...");
    }
  }

  return (
    <nav className="d-flex justify-content-center">
      <ul className="pagination gap-2">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link rounded text-dark"
            onClick={() => onPageChange(currentPage - 1)}
          >
            <i className="bi bi-chevron-left me-2"></i>
            Previous
          </button>
        </li>

        {pageNumbers.map((num) => (
          <li
            key={num}
            className={`page-item ${num === currentPage ? "active" : ""}`}
          >
            {num === "..." ? (
              <span className="page-link rounded text-dark">...</span>
            ) : (
              <button
                className="page-link rounded text-dark"
                onClick={() => onPageChange(num)}
              >
                {num}
              </button>
            )}
          </li>
        ))}

        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link rounded text-dark"
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
            <i className="bi bi-chevron-right ms-2"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};
export default Pagination;
