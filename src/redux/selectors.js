import { createSelector } from 'reselect';
import { FILTER_TYPES } from './constants';

const selectTodoItems = state => state.todos.items;
const selectFilter = state => state.filter;
const selectPagination = state => state.pagination;
const selectEditingId = state => state.editing.editingId;

export const selectFilteredTodos = createSelector(
  [selectTodoItems, selectFilter],
  (todos, filter) => {
    switch (filter) {
      case FILTER_TYPES.ACTIVE:
        return todos.filter(t => !t.completed);
      case FILTER_TYPES.COMPLETED:
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  }
);

export const selectPaginatedTodos = createSelector(
  [selectFilteredTodos, selectPagination],
  (filteredTodos, pagination) => {
    const { currentPage, itemsPerPage } = pagination;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    return {
      visibleTodos: filteredTodos.slice(startIndex, endIndex),
      totalPages: Math.ceil(filteredTodos.length / itemsPerPage),
      currentPage,
      totalItems: filteredTodos.length
    };
  }
);

export const selectEditingTodo = createSelector(
  [selectTodoItems, selectEditingId],
  (todos, editingId) => todos.find(t => t.id == editingId)
);