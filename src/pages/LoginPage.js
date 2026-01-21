import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!username || !password) {
        alert("Vui lòng nhập đủ thông tin");
        return;
    }
    dispatch(login(username, password, navigate));
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>Đăng Nhập</h2>
      <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left' }}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={{ marginBottom: 10 }}>
          <label>Username: </label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        
        <div style={{ marginBottom: 10 }}>
          <label>Password: </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Đang kiểm tra...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;