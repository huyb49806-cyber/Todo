import axios from 'axios';
import * as types from './constants';

axios.defaults.withCredentials = true;

const users_api_url = 'http://localhost:8000/users';
const login_api_url = 'http://localhost:8000/login';
const register_api_url= 'http://localhost:8000/register';
const logout_api_url = 'http://localhost:8000/logout';
const check_auth_url = 'http://localhost:8000/check-auth';
const api_url='http://localhost:8000/todos';

export const register =(user,nav)=>async(dispatch)=>{
  dispatch({type:types.REGISTER_REQUEST});
  try{
    await axios.post(register_api_url,user)
    alert("dag ki tcong! Vui long dn");
    nav('/login');
    dispatch({type:types.REGISTER_SUCCESS});
  }catch(err){
    alert(err.response?.data?.error||"dki tbai")
  }
}

export const fetchData = ()=>{
  return async (dispatch,getState)=>{
    try{
      const {pagination}=getState().todos;
      const params = {
        _page: pagination._page,
        _limit: pagination._limit,
        _sort: 'id',
        _order: 'desc'
      };
      const response=await axios.get(api_url,{params});
      const totalRows = response.headers['x-total-count'];
      dispatch({
        type: types.FETCH_TODOS_SUCCESS,
        payload: {
          data: response.data,
          pagination: {
             _totalRows: parseInt(totalRows),
             _page: pagination._page,
             _limit: pagination._limit
          }
        }
      });
      return response;
    }
    catch(err){
      console.error("loi tai ds",err);
      throw err;
    }
  };
};

export const addTodo = (text) => {
  return async (dispatch,getState)=>{
    try{
      const newTodo={
        id:Date.now().toString(), //vi json-sv hd tot hon voi id dang chuoi
        text: text,
        completed: false,
      };
      const response=await axios.post(api_url, newTodo);
      dispatch({
        type:types.ADD_TODO_SUCCESS,
        payload:response.data
      });
      return await dispatch(setPage(1));
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

export const setPage = (page) => {
  return async(dispatch)=>{
    dispatch({
      type: types.SET_PAGE,
      payload: page
    })
    return await dispatch(fetchData);
  }
};

export const checkAuth = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(check_auth_url);
            dispatch({
                type: types.LOGIN_SUCCESS,
                payload: response.data
            });
            return response.data;
        } catch (error) {
            dispatch({
                type: types.LOGIN_FAILURE,
                payload: null 
            });
            throw error;
        }
    }
}

export const login = (username, password, navigate) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(login_api_url, {email: username, password });
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: response.data 
      });
      if (navigate) navigate('/');
      return response.data;
    } catch (error){
      dispatch({
        type: types.LOGIN_FAILURE,
        payload: "Sai tên đăng nhập hoặc mật khẩu"
      });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
        await axios.post(logout_api_url); 
        
        dispatch({ type: types.LOGOUT });
    } catch (e) {
        console.error("Lỗi logout", e);
    }
  };
};