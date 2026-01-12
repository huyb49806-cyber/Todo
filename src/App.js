import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/Theme'; // Giữ nguyên của bạn
import TodoListData from './pages/TodoListData';
import AddTodoPage from './pages/AddTodoPage';
import EditTodoPage from './pages/EditTodoPage';
import './App.css';

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const navigate= useNavigate();
  const go=()=>{
    navigate("/add");
  };
  
  return (
    <div className={`todoapp theme-${theme}`}>
      <nav style={{ padding: 10, borderBottom: '1px solid #ddd', marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 10 }}>Home List</Link>
        <button onClick={go}>Add New</button>
        {/* <Link to="/add">Add New Todo</Link> */}
        <button onClick={toggleTheme} style={{ float: 'right' }}>
           Theme: {theme}
        </button>
      </nav>

      <Routes>
        <Route path="/" element={<TodoListData />} />
        <Route path="/add" element={<AddTodoPage />} />
        <Route path="/edit/:id" element={<EditTodoPage />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}