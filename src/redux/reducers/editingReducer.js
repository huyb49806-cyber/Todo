import * as types from '../constants';

const initialState={
  editingId: null
};

export default function editingReducer(state = initialState, action){
  switch (action.type) {
    case types.SET_EDITING_ID:
      return{ 
        ...state,
        editingId: action.payload
      };
    case types.CANCEL_EDITING:
      return{
        ...state,
        editingId: null 
      };
    default:
      return state;
  }
}