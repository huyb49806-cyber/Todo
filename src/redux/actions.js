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

export const setEditingId = (id) => ({
  type: types.SET_EDITING_ID,
  payload: id
});

export const clearEditingId = () => ({
  type: types.CLEAR_EDITING_ID
});

export const setPage = (page) => ({
  type: types.SET_PAGE,
  payload: page
});