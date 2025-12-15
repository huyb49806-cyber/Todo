import React, { memo } from 'react';
import TodoItem from './TodoItem';
import { useVirtualScroll } from '../hooks/useVirtualScroll';

function TodoList({ todos, onToggle, onDelete, onEdit, editingId }) {
  const { containerRef, startIndex, endIndex, totalHeight, offsetY, containerHeight } = useVirtualScroll(todos.length);
  const visibleTodos = todos.slice(startIndex, endIndex);
  return (
    <div
      ref={containerRef}
      className="main-scroll-container"
      style={{
        height: containerHeight,
        overflowY: "auto",
        position: "relative",
        borderTop: "1px solid #e6e6e6"
      }}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        <ul
          className="todo-list"
          style={{
            position: "absolute",
            top: offsetY,
            left: 0,
            right: 0,
            padding: 0,
            margin: 0
          }}
        >
          {visibleTodos.map((todo, visibleIndex) => {
            const fullIndex=startIndex + visibleIndex;
            return(
              <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => onToggle(fullIndex)}
              onDelete={() => onDelete(fullIndex)}
              onEdit={onEdit}
              isEditingItem={todo.id === editingId}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default memo(TodoList);