import * as types from '../constants';

const initialState = {
  items: [],
  editingId: null
};

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_TODO:
      return {
        ...state,
        items: [action.payload, ...state.items]
      };

    case types.DELETE_TODO:
      return {
        ...state,
        items: state.items.filter(todo => todo.id !== action.payload)
      };

    case types.TOGGLE_TODO:
      return {
        ...state,
        items: state.items.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };

    case types.START_EDIT_TODO:
      return {
        ...state,
        editingId: action.payload
      };

    case types.CANCEL_EDIT_TODO:
      return {
        ...state,
        editingId: null
      };

    case types.SAVE_EDIT_TODO:
      return {
        ...state,
        editingId: null,
        items: state.items.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        )
      };

    case types.CLEAR_COMPLETED:
      return {
        ...state,
        items: state.items.filter(todo => !todo.completed)
      };

    default:
      return state;
  }
}