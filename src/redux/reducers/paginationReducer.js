import * as types from '../constants';

const initialState = {
  currentPage: 1,
  itemsPerPage: 5
};

export default function paginationReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_PAGE:
      return { ...state, currentPage: action.payload };
    case types.SET_FILTER:
      return { ...state, currentPage: 1 };
    default:
      return state;
  }
}