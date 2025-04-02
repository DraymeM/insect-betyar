import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaArrowLeft />
          </button>
        </li>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <li
              key={page}
              className={`page-item ${page === currentPage ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </button>
            </li>
          )
        )}

        <li
          className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
        >
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FaArrowRight />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
