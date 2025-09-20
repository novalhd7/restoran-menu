// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import OrderDetail from './pages/OrderDetail'
import MakananCrud from './pages/MakananCrud'   // ⬅️ import halaman baru
import './index.css'
import DaftarMeja from './pages/Daftarmeja'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/orders/:id" element={<OrderDetail />} />
      <Route path="/makanan" element={<MakananCrud />} />
       <Route path="/daftar-meja" element={<DaftarMeja/>} />
    </Routes>
  </BrowserRouter>
)
