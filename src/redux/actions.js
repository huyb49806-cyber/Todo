import * as types from './constants';

export const addTodo = (text) => ({
  type: types.ADD_TODO,
  payload: {
    id: Date.now(),
    text,
    completed: false
  }
});

export const deleteTodo = (id) => ({
  type: types.DELETE_TODO,
  payload: id
});

export const toggleTodo = (id) => ({
  type: types.TOGGLE_TODO,
  payload: id
});

export const startEditTodo = (id) => ({
  type: types.START_EDIT_TODO,
  payload: id
});

export const cancelEditTodo = () => ({
  type: types.CANCEL_EDIT_TODO
});

export const saveEditTodo = (id, text) => ({
  type: types.SAVE_EDIT_TODO,
  payload: { id, text }
});

export const clearCompleted = () => ({
  type: types.CLEAR_COMPLETED
});

export const setFilter = (filterType) => ({
  type: types.SET_FILTER,
  payload: filterType
});