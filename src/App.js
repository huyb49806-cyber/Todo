import React, { useState, useCallback, useMemo } from 'react';
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

const PAGE_SIZE = 8;

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState(Filter.ALL);
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState(null);

  const editingTodo = useMemo(() => {
    return editingId ? todos.find(t => t.id === editingId) : null;
  }, [todos, editingId]);

  const handleSave = useCallback((text) => {
    if (editingId) {
      setTodos(produce((draft) => {
          const index = draft.findIndex(t => t.id === editingId);
          if (index !== -1) {
             draft[index].text = text;
          }
      }));
      setEditingId(null);
    } else {
      setTodos(produce((draft) => {
          draft.unshift({ id: Date.now(), text, completed: false });
      }));
      setPage(1);
    }
  }, [editingId]);

  const handleToggleTodo = useCallback((id) => {
    setTodos(produce((draft) => {
        const index = draft.findIndex(t => t.id === id);
        if (index !== -1) draft[index].completed = !draft[index].completed;
    }));
  }, []);

  const handleDeleteTodo = useCallback((id) => {
    setTodos(produce((draft) => {
        const index = draft.findIndex(t => t.id === id);
        if (index !== -1) draft.splice(index, 1);
    }));
    
    if (editingId === id) setEditingId(null);
    setPage(prev => prev); 
  }, [editingId]);

  const handleClearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(t => !t.completed));
    setPage(1);
    setEditingId(null);
  }, []);

  const handleStartEdit = useCallback((todo) => {
    setEditingId(todo.id);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
  }, []);

  const filteredList = useMemo(() => {
    if (filter === Filter.ACTIVE) return todos.filter(t => !t.completed);
    if (filter === Filter.COMPLETED) return todos.filter(t => t.completed);
    return todos;
  }, [todos, filter]);

  const totalPages = Math.ceil(filteredList.length / PAGE_SIZE) || 1;
  const validPage = Math.min(page, totalPages) > 0 ? Math.min(page, totalPages) : 1;
  
  if (page !== validPage) setPage(validPage); 

  const pagedTodos = useMemo(() => {
    const start = (validPage - 1) * PAGE_SIZE;
    return filteredList.slice(start, start + PAGE_SIZE);
  }, [filteredList, validPage]);

  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.length - activeCount;

  return (
    <div className="todoapp">
      <TodoHeader 
        onSave={handleSave} 
        onCancel={handleCancelEdit}
        editingTodo={editingTodo}
      />
      
      {todos.length > 0 && (
        <section className="main">
          <TodoList
            todos={pagedTodos}
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
          page={validPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}

export default App;