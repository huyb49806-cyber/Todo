import React, { useState, useRef } from 'react';

function TodoHeader({ onSave }){
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedText = text.trim();
    if (!trimmedText) return;
    onSave(trimmedText);
    setText('');
    if(inputRef.current) inputRef.current.focus();
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className="new-todo"
          placeholder="Nhập công việc cần làm"
          value={text}
          onChange={handleChange}
          autoFocus
        />
      </form>
    </header>
  );
}

export default TodoHeader;