import * as types from '../constants';
import { produce } from 'immer'

const initialState = {
  items: [],
  pagination:{
    _page: 1,
    _limit: 5,
    _totalRows:0
  },
  error: null
};

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_TODOS_SUCCESS:
      return{
        ...state,//state ở mỗi nhánh reducer chỉ là 1 phần do reducer đó quản lí, kp cả state trong store
        items: action.payload.data,
        pagination:{
          ...state.pagination,
          ...action.payload.pagination
        }
      }

    case types.SET_PAGE:
      return{
        ...state,
        pagination:{
          ...state.pagination,
          _page: action.payload
        }
      }
    
    case types.SET_FILTER:
      return{
        ...state,
        pagination:{
          ...state.pagination,
          _page: 1
        }
      }

    case types.DELETE_TODO:
      return{
        ...state,
        items: state.items.filter(todo=>todo.id!==action.payload)
      };

    case types.TOGGLE_TODO:
      return produce(state, draft => {
        const todo = draft.items.find(t => t.id === action.payload);
        todo.completed = !todo.completed;
    });

    case types.SAVE_EDITING:
      return{
        ...state,
        items: state.items.map(todo=>todo.id===action.payload.id?{...todo,text:action.payload.text}:todo)
      }

    case types.CLEAR_COMPLETED:
      return {
        ...state,
        items: state.items.filter(todo => !todo.completed)
      };

    default:
      return state;
  }
}