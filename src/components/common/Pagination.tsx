import React from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const MAX_PAGE_BUTTONS = 5;

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= MAX_PAGE_BUTTONS) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first and last
      const showLeftEllipsis = currentPage > 3;
      const showRightEllipsis = currentPage < totalPages - 2;

      pages.push(1);

      if (showLeftEllipsis) {
        pages.push("...");
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (showRightEllipsis) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav aria-label="Page navigation" className="mt-4 mx-1">
      <ul className="pagination justify-content-center">
        {/* First Page Button - hidden on smaller screens */}
        <li
          className={`page-item ${currentPage === 1 ? "disabled" : ""} d-none d-sm-block`}
        >
          <button
            className={`page-link px-2 px-sm-3 mx-1 mx-sm-2 ${
              currentPage === 1
                ? "bg-dark border-secondary text-secondary"
                : "bg-info border-secondary text-white"
            }`}
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
          >
            <FaAngleDoubleLeft size={20} />
          </button>
        </li>

        {/* Previous Page Button */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className={`page-link px-2 px-sm-3 mx-1 mx-sm-2 ${
              currentPage === 1
                ? "bg-dark border-secondary text-secondary"
                : "bg-info border-secondary text-white"
            }`}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaAngleLeft size={20} />
          </button>
        </li>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) =>
          page === "..." ? (
            <li key={`ellipsis-${index}`} className="page-item disabled">
              <span className="page-link mx-1 bg-dark border-secondary text-secondary">
                ...
              </span>
            </li>
          ) : (
            <li
              key={page}
              className={`page-item ${page === currentPage ? "active" : ""}`}
            >
              <button
                className={`page-link px-2 px-sm-3 mx-1 mx-sm-2 ${
                  page === currentPage
                    ? "bg-info border-info text-white"
                    : "bg-dark border-secondary text-secondary"
                }`}
                onClick={() => onPageChange(page as number)}
              >
                {page}
              </button>
            </li>
          )
        )}

        {/* Next Page Button */}
        <li
          className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
        >
          <button
            className={`page-link px-2 px-sm-3 mx-1 mx-sm-2 ${
              currentPage === totalPages
                ? "bg-dark border-secondary text-secondary"
                : "bg-info border-secondary text-white"
            }`}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FaAngleRight size={20} />
          </button>
        </li>

        {/* Last Page Button - hidden on smaller screens */}
        <li
          className={`page-item ${currentPage === totalPages ? "disabled" : ""} d-none d-sm-block`}
        >
          <button
            className={`page-link px-2 px-sm-3 mx-1 mx-sm-2 ${
              currentPage === totalPages
                ? "bg-dark border-secondary text-secondary"
                : "bg-info border-secondary text-white"
            }`}
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            <FaAngleDoubleRight size={20} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
