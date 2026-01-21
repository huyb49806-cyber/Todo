import * as types from '../constants';

const initialState = {
  user: null,    
  isAuthenticated: false,
  loading: true,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload
      };
    case types.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null
      };
    default:
      return state;
  }
};

export default authReducer;