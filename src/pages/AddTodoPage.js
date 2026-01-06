import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTodo } from '../redux/actions';

export default function AddTodoPage() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text.trim()));
      navigate('/');
    }
  };

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
        />
        <div style={{ marginTop: 20 }}>
          <button type="submit" className="page-btn">Add Todo</button>
          <button type="button" className="page-btn" onClick={() => navigate('/')} style={{marginLeft: 10}}>Cancel</button>
        </div>
      </form>
    </div>
  );
}