import React, { useState, useRef, useEffect, memo } from 'react';

function TodoHeader({ onSave, onCancel, editingTodo }) {
  const [text, setText] = useState('');
  const inputRef = useRef(null);
  useEffect(() => {
    if (editingTodo) {
      setText(editingTodo.text);
      inputRef.current.focus();
    } else {
      setText('');
    }
  }, [editingTodo]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedText = text.trim();
    if (!trimmedText) return;
    onSave(trimmedText);
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
        onCancel(); 
        setText('');
    }
  }

  const isEditing = !!editingTodo;

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className="new-todo"
          placeholder={isEditing ? "Đang sửa... (Enter: Lưu, Esc: Hủy)" : "Nhập công việc cần làm"}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoFocus
          style={isEditing ? { borderColor: '#af5b5e', boxShadow: '0 0 5px rgba(175, 47, 47, 0.2)' } : {}}
        />
      </form>
    </header>
  );
}

export default memo(TodoHeader);