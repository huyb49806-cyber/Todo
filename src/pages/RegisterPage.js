import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../redux/actions';
import {useNavigate, Link} from 'react-router-dom';

const RegisterPage=()=>{
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [name,setName]=useState('');
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!email||!password||!name){
        alert("Vlong nhập đủ thông tin");
        return;
    }
    dispatch(register({email,password,name},navigate));
  };

  return (
    <div style={{padding:'50px',textAlign:'center'}}>
      <h2>Đăng Ký Tài Khoản</h2>
      <form onSubmit={handleSubmit} style={{display:'inline-block',textAlign:'left',width:'300px'}}>
        <div style={{marginBottom:10}}>
          <label>Email: </label>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} style={{width: '100%'}} />
        </div>
        <div style={{marginBottom:10}}>
          <label>Tên hiển thị: </label>
          <input type="text" value={name} onChange={(e)=>setName(e.target.value)} style={{width: '100%'}} />
        </div>
        <div style={{marginBottom:10}}>
          <label>Mật khẩu: </label>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} style={{width: '100%'}} />
        </div>
        <button type="submit" style={{width: '100%'}}>Đăng ký</button>
        <p style={{marginTop: 10}}>
            Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;