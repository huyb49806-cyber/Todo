import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider, useTheme } from './context/Theme';
import { logout, checkAuth } from './redux/actions'

import TodoListData from './pages/TodoListData';
import AddTodoPage from './pages/AddTodoPage';
import EditTodoPage from './pages/EditTodoPage';
import LoginPage from './pages/LoginPage';
import './App.css';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector(state => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch])
  const go = () => {
    navigate("/add");
  };
  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  return (
    <div className={`todoapp theme-${theme}`}>
      {isAuthenticated && (
        <nav style={{ padding: 10, borderBottom: '1px solid #ddd', marginBottom: 20 }}>
          <Link to="/" style={{ marginRight: 10 }}>Home List</Link>
          <button onClick={go}>Add New</button>
          <button onClick={toggleTheme} style={{ float: 'right' }}>
            Theme: {theme}
          </button>
          <button onClick={handleLogout} >Log out</button>
        </nav>
      )}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute><TodoListData /></PrivateRoute>} />
        <Route path="/add" element={<PrivateRoute><AddTodoPage /></PrivateRoute>} />
        <Route path="/edit/:id" element={<PrivateRoute><EditTodoPage /></PrivateRoute>} />
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