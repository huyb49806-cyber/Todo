import React, { useState, useCallback, useMemo } from 'react';
import { produce } from 'immer';
import './App.css';
import TodoHeader from './components/Header';
import TodoFooter from './components/Footer';
import TodoList from './components/TodoList';
import { ThemeProvider, useTheme } from './context/Theme';

const Filter = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed'
};

// const PAGE_SIZE = 8;

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState(Filter.ALL);
  // const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState(null);

  const { theme, toggleTheme } = useTheme();

  const editingTodo = useMemo(() => {
    return editingId ? todos.find(t => t.id === editingId) : null;
  }, [todos, editingId]);


//nếu bỏ hét các useCallback với deps rỗng thì nó tạo ra func mới, memo sẽ k ngăn đc rerender
  const handleStartEdit = useCallback((todo) => {
    setEditingId(todo.id);
  }, []);
  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
  }, []);

  const handleSave = useCallback((text) => {
    if (editingId) {
      setTodos(produce((draft) => {
        const index = draft.findIndex(t => t.id === editingId);
        draft[index].text = text;
      }));
      setEditingId(null);
    }
    else {
      setTodos(produce((draft) => {
        draft.unshift({ id: Date.now(), text, completed: false });
      }));
      // setPage(1);
    }
  }, [editingId]);

  const handleToggleTodo = useCallback((index) => {
    setTodos(produce((draft) => {
      draft[index].completed = !draft[index].completed;
    }));
  }, []);

  const handleDeleteTodo = useCallback((index) => {
    setTodos(produce((draft) => {
      draft.splice(index, 1);
    }));
    // setPage(prev => prev); 
  }, [editingId]);

  const handleClearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(t => !t.completed));
    // setPage(1);
  }, []);

  const filteredList = useMemo(() =>
    filter === Filter.ACTIVE
      ? todos.filter(t => !t.completed)
      : filter === Filter.COMPLETED
        ? todos.filter(t => t.completed)
        : todos
    , [todos, filter]);

  // const totalPages = Math.ceil(filteredList.length / PAGE_SIZE);
  // const validPage = Math.min(page, totalPages);

  // if (page !== validPage) setPage(validPage); 

  // const pagedTodos = useMemo(() => {
  //   const start = (validPage - 1) * PAGE_SIZE;
  //   return filteredList.slice(start, start + PAGE_SIZE);
  // }, [filteredList, validPage]);

  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.length - activeCount;

  return (
    <div className={`todoapp theme-${theme}`}>
      <button onClick={toggleTheme} style={{ float: 'right', margin: '10px' }}>
        Thay đổi màu: {theme}
      </button>
      <TodoHeader
        onSave={handleSave}
        onCancel={handleCancelEdit}
        editingTodo={editingTodo}
      />

      {todos.length > 0 && (
        <section className="main">
          <TodoList
            todos={filteredList}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
            onEdit={handleStartEdit}
            editingId={editingId}
          />
        </section>
      )}

      {todos.length > 0 && (
        <TodoFooter
          activeCount={activeCount}
          completedCount={completedCount}
          filter={filter}
          onFilterChange={setFilter}
          onClearCompleted={handleClearCompleted}
        // page={validPage}
        // totalPages={totalPages}
        // onPageChange={setPage}
        />
      )}
    </div>
  );
}

export default function VirtualApp() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  )
};