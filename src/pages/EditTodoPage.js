import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { saveEditTodo, clearEditingId, setEditingId } from '../redux/actions';
import { selectEditingTodo } from '../redux/selectors';

export default function EditTodoPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  console.group(`--- Edit Page Mounted for ID: ${id} ---`);
  console.log('1. URL Params object:', params);
  console.groupEnd();

  useEffect(() => {
    dispatch(setEditingId(id));
    return () => dispatch(clearEditingId());
  }, [id, dispatch]);

  const todo = useSelector(selectEditingTodo);
  const [text, setText] = useState('');

  useEffect(() => {
    if (todo) setText(todo.text);
  }, [todo]);

  const handleSave = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(saveEditTodo(todo.id, text.trim()));
      navigate('/');
    }
  };

  return (
    <div className="header">
      <h1>Edit Item</h1>
      <form onSubmit={handleSave}>
        <input
          className="new-todo"
          style={{ borderColor: '#af5b5e' }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />
        <div style={{ marginTop: 20 }}>
          <button type="submit" className="page-btn">Save</button>
          <button type="button" className="page-btn" onClick={() => navigate('/')} style={{marginLeft: 10}}>Cancel</button>
        </div>
      </form>
    </div>
  );
}