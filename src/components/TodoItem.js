import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleTodo, deleteTodo, setEditingId } from '../redux/actions';

function TodoItem({ todo, isEditingItem }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id, todo.completed))
    .then()
    .catch((error)=>{
      alert('lỗi xóa');
    })
  };

  const handleDelete=()=>{
    dispatch(deleteTodo(todo.id))
    .then()
    .catch((error)=>{
      alert('lỗi xóa do '+error.message);
    })
  }

  const handleEdit = () => {
    dispatch(setEditingId(todo.id));
    navigate(`/edit/${todo.id}`);
  };
  
  const liClassName = `
    ${todo.completed ? 'completed' : ''} 
    ${isEditingItem ? 'editing' : ''}
  `;

  return (
    <li className={liClassName.trim()}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
        />
        <label onDoubleClick={handleEdit}>
            {todo.text}
        </label>
        <button
          className="destroy"
          onClick={handleDelete}
        ></button>
      </div>
    </li>
  );
}

export default TodoItem;