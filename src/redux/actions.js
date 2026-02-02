import axios from 'axios';
import * as types from './constants';

axios.defaults.withCredentials = true;

const users_api_url = 'http://localhost:8000/users';
const login_api_url = 'http://localhost:8000/login';
const register_api_url= 'http://localhost:8000/register';
const logout_api_url = 'http://localhost:8000/logout';
const check_auth_url = 'http://localhost:8000/check-auth';
const api_url='http://localhost:8000/todos';


export const fetchData=()=>{
  return async(dispatch,getState)=>{
    try{
      const {pagination}=getState().todos;
      const filter=getState().filter;
      // console.log(filter);
      // console.log(pagination);
      const params={
        _page: pagination._page,
        _limit: pagination._limit,
        _sort: 'id',
        _order: 'desc',
      }
      switch(filter){
        case 'active':
          params.completed= false;
          break;
        case 'completed':
          params.completed= true;
          break;
      }
      const response=await axios.get(api_url,{params});
      // console.log(response);
      // console.log(response.headers['x-total-count']);
      const totalRows=response.headers['x-total-count'];
      dispatch({
        type: types.FETCH_TODOS_SUCCESS,
        payload:{
          data: response.data,
          pagination:{
            _totalRows: parseInt(totalRows),
            _page: pagination._page,
            _limit: pagination._limit
          }
        }
      });
      return response.data;
    }catch(error){
      throw error;
    }
  }
}

export const addTodo=(text)=>{
  return async(dispatch,getState)=>{
    try{
      const newTodo={
        id:Date.now().toString(),
        text: text,
        completed: false
      }
      const {pagination}=getState().todos;
      await axios.post(api_url,newTodo);
      dispatch(setPage(1));
    }catch(error){
      throw error;
    }
  }
}

export const setFilter=(filterTypes)=>(dispatch)=>{
  dispatch({
    type: types.SET_FILTER,
    payload: filterTypes
  });
  // dispatch(setPage(1));
}
//không setpage ở đây vì filter và page thay đổi làm useEffect chạy->callApi GET gây rerender 2 lần
//cross-reducer-handling do action đc dispatch thì mọi reducer đều nhận được action

export const setPage=(page)=>{
  return{
    type: types.SET_PAGE,
    payload: page
  }
};

export const deleteTodo=(id)=>{
  return async (dispatch)=>{
    dispatch({
      type: types.DELETE_TODO,
      payload: id
    });
    try{
      await axios.delete(`${api_url}/${id}`);
    }catch(error){
      console.log('lỗi xóa');
      throw error;
    }
  }
}

//flow optimistic UI: vẽ UI(đổi trạng thái) rồi mới gọi API
export const toggleTodo=(id, currentCompleteStatus)=>{
  return async (dispatch)=>{
    dispatch({
      type: types.TOGGLE_TODO,
      payload:id
    })
    try{
      const response=await axios.patch(`${api_url}/${id}`,{
        completed: !currentCompleteStatus
      });
      // console.log(response);
    }
    catch(error){
      console.error('lỗi toggle')
      dispatch({type: types.TOGGLE_TODO, payload: id})
      throw error;
    }
  };
}

export const setEditingId=(id)=>({
  type: types.SET_EDITING_ID,
  payload: id
})

export const saveEditing=(text,id)=>{
  return async (dispatch)=>{
    try{
      await axios.patch(`${api_url}/${id}`,{
        text:text
      });
      dispatch({
        type:types.SAVE_EDITING,
        payload:{text,id}
      })
    }catch(error){
      throw error;
    }
  }
}

export const cancelEditing=()=>({
  type:types.CANCEL_EDITING
})

export const clearCompleted = () => ({
  type: types.CLEAR_COMPLETED
});

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

export const login = (email, password, navigate) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(login_api_url, {email: email, password });
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
      throw error;
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

export const getallUsers=()=>async(dispatch)=>{
  try{
    const response=await axios.get(users_api_url);
    // console.log(response);
    dispatch({
      type: 'types.ADMIN_GET_USER',
      payload: response.data
    });
  }catch(error){
    alert("không phải admin")
  }
};

export const deleteUser=(userId)=>async(dispatch)=>{
  try{
    await axios.delete(`${users_api_url}/${userId}`);
    dispatch({
      type:'types.ADMIN_DELETE_USER',
      payload: userId
    })
  }catch{
    alert("lỗi xóa");
  }
}

export const register =(user,nav)=>async(dispatch)=>{
  try{
    await axios.post(register_api_url,user)
    alert("dag ki tcong! Vui long dn");
    nav('/login');
    dispatch({type:types.REGISTER_SUCCESS});
  }catch(err){
    alert(err.response?.data?.error||"dki tbai")
  }
}