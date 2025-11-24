import React from 'react';

function TodoItem({ todo,index, onToggle, onDelete }) {
  const liClassName = todo.completed ? 'completed' : '';
  return (
    <li className={liClassName}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(index)}
        />
        <label>{todo.text}</label>
        <button
          className="destroy"
          onClick={() => onDelete(index)}
        ></button>
      </div>
    </li>
  );
}

export default TodoItem;