import React, { useCallback, useEffect, useOptimistic } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectPaginatedTodos } from '../redux/selectors';
import {
  fetchData, setPage, setFilter, clearCompleted
} from '../redux/actions';
import TodoItem from '../components/TodoItem';
import TodoFooter from '../components/Footer';
import Pagination from '../components/Pagination';


export default function TodoListData() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.todos.isLoading);
  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch]);

  const { visibleTodos, totalPages, currentPage } = useSelector(selectPaginatedTodos);
  const filter = useSelector(state => state.filter);

  const allTodos = useSelector(state => state.todos.items);
  const activeCount = allTodos.filter(t => !t.completed).length;
  const completedCount = allTodos.length - activeCount;

  const handlePageChange = useCallback((page) => dispatch(setPage(page)), [dispatch]);
  const handleFilterChange = useCallback((f) => dispatch(setFilter(f)), [dispatch]);
  const handleClearCompleted = useCallback(() => dispatch(clearCompleted()), [dispatch]);

  return (
    <div>
      {isLoading ? (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      ) : (
        <section className="main" style={{ borderTop: 'none' }}>
          <ul className="todo-list">
            {visibleTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                isEditingItem={false}
              />
            ))}
          </ul>
        </section>
      )}


      <Pagination
        page={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <TodoFooter
        activeCount={activeCount}
        completedCount={completedCount}
        filter={filter}
        onFilterChange={handleFilterChange}
        onClearCompleted={handleClearCompleted}
      />
    </div>
  );
}