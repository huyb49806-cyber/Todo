import {useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchData, setPage, setFilter, clearCompleted
} from '../redux/actions';
import TodoItem from '../components/TodoItem';
import TodoFooter from '../components/Footer';
import Pagination from '../components/Pagination';
import UserManagement from '../components/Admin';


export default function TodoListData() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {items,pagination} = useSelector(state => state.todos);
  const filter = useSelector(state => state.filter);
  const totalPages=pagination?Math.ceil(pagination._totalRows/pagination._limit):0;
  const {user}=useSelector(state=>state.auth);

  const loadData = useCallback(async () => {
      setIsLoading(true);
      try {
        await dispatch(fetchData());
      } catch (err) {
        alert("Lỗi tải dữ liệu");
      } finally {
        setIsLoading(false);
      }
  }, [dispatch]);
  useEffect(() => {
    loadData();
  }, [pagination?._page,filter,loadData]);//khi data lớn thì lọc, sort, phân trang phải do bên server đảm nhận
  const activeCount = items.filter(t => !t.completed).length;
  const completedCount = items.length - activeCount;

  const handlePageChange = useCallback((f) => {
    dispatch(setPage(f));
  }, []);
  const handleFilterChange = useCallback((f) => dispatch(setFilter(f)), []);
  const handleClearCompleted = useCallback(() => dispatch(clearCompleted()), []);

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
            {items.map(todo => (
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
        page={pagination._page}
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
      {user?.role=='ADMIN'&&(
        <UserManagement/>
      )}
    </div>
  );
}