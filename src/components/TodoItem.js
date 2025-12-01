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
          onChange={() => onToggle(todo.id)}
        />
        {/* Chỉ gọi hàm onEdit, App sẽ lo phần còn lại */}
        <label onDoubleClick={() => onEdit(todo)}>
            {todo.text}
        </label>
        <button
          className="destroy"
          onClick={() => onDelete(todo.id)}
        ></button>
      </div>
    </li>
  );
}

export default memo(TodoItem);