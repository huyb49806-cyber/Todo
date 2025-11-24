import React, { useState, useContext } from 'react';
import { produce } from 'immer';
import './App.css';
import TodoHeader from './components/Header';
import TodoFooter from './components/Footer';
import TodoList from './components/TodoList';

const Filter = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed'
};

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState(Filter.ALL);

  // Thêm công việc mới
  const handleAddTodo = (text) => {
    setTodos(
      produce((draft) => {
        draft.unshift({
          id: Date.now(),
          text: text,
          completed: false
        });
      })
    );
  };

  const handleToggleTodo = (index) => {
    setTodos(
      produce((draft) => {
        // Truy cập trực tiếp qua index, không cần find()
        if (draft[index]) {
          draft[index].completed = !draft[index].completed;
        }
      })
    );
  };

  // Xóa công việc
  const handleDeleteTodo = (index) => {
    setTodos(
      produce((draft) => {
        if (index !== undefined) {
          draft.splice(index, 1);
        }
      })
    );
  };

  // Xóa các mục đã hoàn thành
  const handleClearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((t) => !t.completed));
  };

  // Lọc danh sách
  const getFilteredTodos = () => {
    const todosWithFilter = todos.map((todo, index) => ({ ...todo, originalIndex: index }));
    if (filter === Filter.ACTIVE) return todosWithFilter.filter((t) => !t.completed);
    if (filter === Filter.COMPLETED) return todosWithFilter.filter((t) => t.completed);
    return todosWithFilter;
  };

  const filteredTodos = getFilteredTodos();

  return (
    <div className="todoapp">
      <TodoHeader onSave={handleAddTodo} />
      {todos.length > 0 && (
        <TodoList
          todos={filteredTodos}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
        />
      )}

      {todos.length > 0 && (
        <TodoFooter
          todos={todos}
          filter={filter}
          onFilterChange={setFilter}
          onClearCompleted={handleClearCompleted}
        />
      )}
    </div>
  );
}

export default App;