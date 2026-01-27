import * as types from '../constants'

const initialState={
    listUsers:[]
};

export const adminReducer=(state=initialState, action)=>{
    switch(action.type){
        case types.ADMIN_GET_USER:
            return{
                ...state,
                listUsers:action.payload
            }
        case types.ADMIN_DELETE_USER:
            return{
                ...state,
                listUsers: state.listUsers.filter(user=>user.id!==action.payload)
            };
        default: 
            return state;
    }
}
