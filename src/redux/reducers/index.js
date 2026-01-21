import { combineReducers } from 'redux';
import todosReducer from './todosReducer';
import filterReducer from './filterReducer';
import editingReducer from './editingReducer';
import paginationReducer from './paginationReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  todos: todosReducer,
  filter: filterReducer,
  editing: editingReducer,
  pagination: paginationReducer
});

export default rootReducer;