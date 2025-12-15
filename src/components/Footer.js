import React, { memo } from 'react';
// import Pagination from './Pagination';

function TodoFooter({ 
  activeCount, 
  completedCount, 
  filter, 
  onFilterChange, 
  onClearCompleted,
  // page,
  // totalPages,
  // onPageChange
}) {
  
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount}</strong> {activeCount === 1 ? 'item' : 'items'} left
      </span>

      <ul className="filters">
        <li>
          <button
            className={filter === 'all' ? 'selected' : ''}
            onClick={() => onFilterChange('all')}
          >All</button>
        </li>
        <li>
          <button
            className={filter === 'active' ? 'selected' : ''}
            onClick={() => onFilterChange('active')}
          >Active</button>
        </li>
        <li>
          <button
            className={filter === 'completed' ? 'selected' : ''}
            onClick={() => onFilterChange('completed')}
          >Completed</button>
        </li>
      </ul>
      
      {/* <Pagination 
        page={page} 
        totalPages={totalPages} 
        onPageChange={onPageChange} 
      /> */}

      <div style={{ minWidth: '100px', textAlign: 'right' }}>
        {completedCount > 0 && (
            <button className="clear-completed" onClick={onClearCompleted}>
            Clear completed
            </button>
        )}
      </div>
    </footer>
  );
}

export default memo(TodoFooter);