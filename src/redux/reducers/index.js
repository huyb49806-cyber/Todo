import { combineReducers } from 'redux';
import todosReducer from './todosReducer';
import filterReducer from './filterReducer';
import editingReducer from './editingReducer';
import paginationReducer from './paginationReducer';

const rootReducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer,
  editing: editingReducer,
  pagination: paginationReducer
});

export default rootReducer;