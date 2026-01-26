import React, { useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTodo } from '../redux/actions';

export default function AddTodoPage() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading=useSelector(state=>state.todos.isLoading);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      if (text.trim() && !isLoading) {
        await dispatch(addTodo(text.trim()));
        navigate('/');    //đổi url /add về path / tương ứng comp TodoListData
      }
    }
    catch{
      alert("Thêm mới thất bại:v");
    }
  };

  // const location = useLocation();
  // console.log('Current URL Path:', location.pathname);

  return (
    <div className="header">
      <h1>Add New</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
          disabled={isLoading}
        />
        <div style={{ marginTop: 20 }}>
          <button 
            type="submit" 
            className="page-btn"
            disabled={isLoading}
            style={{
              opacity: isLoading ? 0.5 : 1,
              cursor: isLoading ? 'not-allowed':'pointer'
            }}
          >
            {isLoading? 'Adding...':'Add Todo'}
          </button>
          <button 
            type="button" 
            className="page-btn" 
            onClick={() => navigate('/')} 
            style={{marginLeft: 10}}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}