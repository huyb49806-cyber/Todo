import React, { memo } from 'react';

function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button 
        onClick={() => onPageChange(page - 1)} 
        disabled={page === 1}
        className="page-btn"
      >
        &laquo;
      </button>
      
      <span className="page-info">
        {page} / {totalPages}
      </span>
      
      <button 
        onClick={() => onPageChange(page + 1)} 
        disabled={page === totalPages}
        className="page-btn"
      >
        &raquo;
      </button>
    </div>
  );
}

export default memo(Pagination);