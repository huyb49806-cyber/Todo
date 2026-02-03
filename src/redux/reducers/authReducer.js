import * as types from '../constants';

const initialState={
  isAuthenticated: false,
  user: null
  
};

const authReducer=(state=initialState,action)=>{
  switch (action.type){
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case types.LOGIN_FAILURE:
      return{
        ...state,
        isAuthenticated: false,
      };
    case types.LOGOUT:
      return{
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

export default authReducer;