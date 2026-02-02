import React, {useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {useParams,useNavigate} from 'react-router-dom';
import { saveEditing, cancelEditing, setEditingId } from '../redux/actions';
import { selectEditingTodo } from '../redux/selectors';

export default function EditTodoPage() {
  const {id} = useParams();
  const dispatch= useDispatch();
  const navigate = useNavigate();
  // console.log('URL Params:', id);

  useEffect(() => {
    dispatch(setEditingId(id));
    return () => dispatch(cancelEditing());
  }, [id, dispatch]);

  const todo = useSelector(selectEditingTodo);
  const [text,setText]=useState('');

  useEffect(() => {
    setText(todo.text);
  }, [todo]);

  const handleSave=(e)=>{
    e.preventDefault();
    if (text.trim()){
      dispatch(saveEditing(text.trim(),todo.id));
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