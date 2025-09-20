import React, { useState } from 'react';
import { login } from '../services/auth';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const nav = useNavigate();

  const submit = async (e)=>{
    e.preventDefault();
    try{
      await login(email,password);
      nav('/dashboard');
    }catch(err){
  alert(err.response?.data?.message || err.message || 'Login gagal');
  console.log(err); // lihat detail error di browser console
    }

  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
