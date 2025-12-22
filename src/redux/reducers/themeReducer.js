import * as types from '../constants';

const initialState = 'light';

export default function themeReducer(state = initialState, action) {
  switch (action.type) {
    case types.TOGGLE_THEME:
      return state === 'light' ? 'dark' : 'light';
    default:
      return state;
  }
}