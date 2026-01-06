import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectPaginatedTodos } from '../redux/selectors';
import { 
  deleteTodo, toggleTodo, setPage, setFilter, clearCompleted, setEditingId 
} from '../redux/actions';
import TodoItem from '../components/TodoItem';
import TodoFooter from '../components/Footer';
import Pagination from '../components/Pagination'; // File Pagination của bạn

export default function TodoListData() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Sử dụng Reselect lấy dữ liệu đã phân trang
  const { visibleTodos, totalPages, currentPage, totalItems } = useSelector(selectPaginatedTodos);
  const filter = useSelector(state => state.filter);
  
  // Tính count cho Footer (Lưu ý: activeCount tính trên toàn bộ list gốc chứ ko phải list phân trang)
  const allTodos = useSelector(state => state.todos.items);
  const activeCount = allTodos.filter(t => !t.completed).length;
  const completedCount = allTodos.length - activeCount;

  const handleToggle = useCallback((id) => dispatch(toggleTodo(id)), [dispatch]);
  const handleDelete = useCallback((id) => dispatch(deleteTodo(id)), [dispatch]);
  
  // Chuyển hướng sang trang Edit
  const handleEdit = useCallback((todo) => {
    dispatch(setEditingId(todo.id)); // Cập nhật vào editingReducer
    navigate(`/edit/${todo.id}`);
  }, [dispatch, navigate]);

  const handlePageChange = useCallback((page) => dispatch(setPage(page)), [dispatch]);
  const handleFilterChange = useCallback((f) => dispatch(setFilter(f)), [dispatch]);
  const handleClearCompleted = useCallback(() => dispatch(clearCompleted()), [dispatch]);

  return (
    <div>
      <section className="main" style={{ borderTop: 'none' }}>
        <ul className="todo-list">
          {visibleTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => handleToggle(todo.id)}
              onDelete={() => handleDelete(todo.id)}
              onEdit={handleEdit}
              isEditingItem={false} // Vì edit giờ ở trang riêng
            />
          ))}
        </ul>
      </section>

      {/* Pagination Control */}
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