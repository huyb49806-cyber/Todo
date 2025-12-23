import React, { useState, useCallback, useMemo } from 'react';
import { produce } from 'immer';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import TodoHeader from './components/Header';
import TodoFooter from './components/Footer';
import TodoList from './components/TodoList';
import { ThemeProvider, useTheme } from './context/Theme';

import {
  addTodo,
  deleteTodo,
  toggleTodo,
  startEditTodo,
  cancelEditTodo,
  saveEditTodo,
  clearCompleted,
  setFilter,
  toggleTheme
} from './redux/actions';

import { FILTER_TYPES } from './redux/constants';

export default function App() {
  const todos = useSelector(state=>state.todos.items);
  const editingId = useSelector(state => state.todos.editingId); 
  const filter = useSelector(state => state.filter);

  const dispatch=useDispatch();

  const { theme, toggleTheme } = useTheme();

  const editingTodo = useMemo(() => {
    return editingId ? todos.find(t => t.id === editingId) : null;
  }, [todos, editingId]);

  const filteredList = useMemo(() => {
    switch (filter) {
      case FILTER_TYPES.ACTIVE:
        return todos.filter(t => !t.completed);
      case FILTER_TYPES.COMPLETED:
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.length - activeCount;

//nếu bỏ hét các useCallback với deps rỗng thì nó tạo ra func mới, memo sẽ k ngăn đc rerender
  const handleCancelEdit = useCallback(() => {
    dispatch(cancelEditTodo());
  }, [dispatch]);

  const handleStartEdit = useCallback((todo) => {
    dispatch(startEditTodo(todo.id));
  }, [dispatch]);

  const handleSave = useCallback((text) => {
    if (editingId) {
      dispatch(saveEditTodo(editingId, text));
    } else {
      dispatch(addTodo(text));
    }
  }, [dispatch, editingId]);

  const handleToggleTodo = useCallback((id) => {
    dispatch(toggleTodo(id));
  }, [dispatch]);

  const handleDeleteTodo = useCallback((id) => {
    dispatch(deleteTodo(id));
  }, [dispatch]);

  const handleClearCompleted = useCallback(() => {
    dispatch(clearCompleted());
  }, [dispatch]);

  const handleFilterChange = useCallback((newFilter) => {
    dispatch(setFilter(newFilter));
  }, [dispatch]);

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
          onFilterChange={handleFilterChange}
          onClearCompleted={handleClearCompleted}
        />
      )}
    </div>
  );
}