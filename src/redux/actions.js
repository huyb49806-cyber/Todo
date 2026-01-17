import axios from 'axios';
import * as types from './constants';

const api_url='http://localhost:8000/todos';

export const fetchData = ()=>{
  return async (dispatch)=>{
    try{
      const response=await axios.get(`${api_url}?_sort=-id`);
      // console.log(response.data);
      dispatch({
        type:types.FETCH_TODOS_SUCCESS,
        payload: response.data
      });
    }
    catch(error){
      console.error("loi tai ds");
    }
  };
};

export const addTodo = (text) => {
  return async (dispatch)=>{
    dispatch({type: types.ADD_TODO_REQUEST});
    try{
      const newTodo={
        id:Date.now().toString(), //vi json-sv hd tot hon voi id dang chuoi
        text: text,
        completed: false
      };
      const response=await axios.post(api_url, newTodo);
      dispatch({
        type:types.ADD_TODO_SUCCESS,
        payload:response.data
      });
      dispatch(setPage(1));
    }
    catch(error){
      console.error("loi them moi");
      dispatch({type: types.ADD_TODO_FAILURE});
      throw error;
    }
  };
};

export const deleteTodo = (id) =>{
  return async (dispatch)=>{
    try{
      await axios.delete(`${api_url}/${id}`);
      dispatch({
        type: types.DELETE_TODO,
        payload:id
      });
    }
    catch(error){
      console.error('loi xoa');
    }
  };
};

//flow optimistic UI: vẽ UI(đổi trạng thái) rồi mới gọi API
export const toggleTodo = (id, currentCpl) => {
  return async (dispatch)=>{
    dispatch({
      type: types.TOGGLE_TODO,
      payload:id
    })
    try{
      const response=await axios.patch(`${api_url}/${id}`,{
        completed: !currentCpl
      });
    }
    catch(error){
      console.error('loi toggle')
      dispatch({type: types.TOGGLE_TODO, payload: id})
      alert("lỗi")
    }
  };
}

export const saveEditTodo = (id, text) => {
  return async (dispatch)=>{
    try{
      await axios.patch(`${api_url}/${id}`,{
        text:text
      })
      dispatch({
        type: types.SAVE_EDIT_TODO,
        payload: { id, text }
      })
    }
    catch(error){
      console.error('loi sua')
    }
  }
};

export const clearCompleted = () => ({
  type: types.CLEAR_COMPLETED
});

export const setFilter = (filterType) => {
  return (dispatch) => {
    dispatch({
      type: types.SET_FILTER,
      payload: filterType
    });
    dispatch(setPage(1));
  }
};

export const setEditingId = (id) => ({
  type: types.SET_EDITING_ID,
  payload: id
});

export const clearEditingId = () => ({
  type: types.CLEAR_EDITING_ID
});

export const setPage = (page) => ({
  type: types.SET_PAGE,
  payload: page
});