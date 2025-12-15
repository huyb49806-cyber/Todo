import React, { memo } from 'react';

function TodoItem({ todo, onToggle, onDelete, onEdit, isEditingItem }) {
  
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
          onChange={onToggle}
        />
        <label onDoubleClick={() => onEdit(todo)}>
            {todo.text}
        </label>
        <button
          className="destroy"
          onClick={onDelete}
        ></button>
      </div>
    </li>
  );
}

export default TodoItem;