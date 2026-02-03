import * as types from '../constants';

const initialState=types.FILTER_TYPES.ALL;

export default function filterReducer(state=initialState,action){
  switch(action.type){
    case types.SET_FILTER:
      return action.payload;
    default:
      return state;
  }
}