import React, { useCallback, useEffect, useOptimistic } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectPaginatedTodos } from '../redux/selectors';
import {
  fetchData, deleteTodo, toggleTodo, setPage, setFilter, clearCompleted, setEditingId
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

  const navigate = useNavigate();

  const { visibleTodos, totalPages, currentPage } = useSelector(selectPaginatedTodos);
  const filter = useSelector(state => state.filter);

  const allTodos = useSelector(state => state.todos.items);
  const activeCount = allTodos.filter(t => !t.completed).length;
  const completedCount = allTodos.length - activeCount;

  //useOptimistic tạo ra 1 bản sao để cập nhập UI trong lúc chờ server phản hồi
  // const [optimisticTodos, setOptimisticTodo]= useOptimistic(
  //   visibleTodos,
  //   (currentList, todoId)=>{
  //     return currentList.map(t=>t.id===todoId?{...t,completed:!t.completed}:t);
  //   }
  // )

  const handleToggle = useCallback((id) => {
    const todo = allTodos.find(t => t.id === id);
    // setOptimisticTodo(id);
    dispatch(toggleTodo(id, todo.completed))
  }, [dispatch, allTodos]);
  const handleDelete = useCallback((id) => dispatch(deleteTodo(id)), [dispatch]);

  const handleEdit = useCallback((todo) => {
    dispatch(setEditingId(todo.id));
    navigate(`/edit/${todo.id}`);
  }, [dispatch, navigate]);

  const handlePageChange = useCallback((page) => dispatch(setPage(page)), [dispatch]);
  const handleFilterChange = useCallback((f) => dispatch(setFilter(f)), [dispatch]);
  const handleClearCompleted = useCallback(() => dispatch(clearCompleted()), [dispatch]);

  return (
    <div>
      {true ? (
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
                onToggle={() => handleToggle(todo.id)}
                onDelete={() => handleDelete(todo.id)}
                onEdit={handleEdit}
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