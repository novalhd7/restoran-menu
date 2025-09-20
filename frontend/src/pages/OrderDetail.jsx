// src/pages/OrderDetail.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

export default function OrderDetail(){
  const { id } = useParams();
  const nav = useNavigate();
  const [order,setOrder] = useState(null);
  const [makanans,setMakanans] = useState([]);
  const [selected, setSelected] = useState('');
  const [qty,setQty] = useState(1);

  useEffect(()=>{ fetchData(); fetchMakanans(); },[]);

  async function fetchData(){ 
    const res = await api.get(`/orders/${id}`); 
    setOrder(res.data); 
  }

  async function fetchMakanans(){ 
    const res = await api.get('/makanan'); 
    setMakanans(res.data); 
  }

  async function addItem(){
    await api.post(`/orders/${id}/items`, { makanan_id: selected, qty });
    await fetchData();
  }

  async function closeOrder(){
    await api.post(`/orders/${id}/close`);
    nav('/daftar-meja'); // redirect ke daftar meja agar status meja otomatis update
  }

  if(!order) return <div>Loading...</div>;

  return (
    <div>
      <h2>Order #{order.id} - Meja {order.meja.nomor}</h2>
      <div>
        <select onChange={e=>setSelected(e.target.value)} value={selected}>
          <option value="">Pilih makanan</option>
          {makanans.map(m => <option key={m.id} value={m.id}>{m.nama} - {m.harga}</option>)}
        </select>
        <input type="number" value={qty} onChange={e=>setQty(e.target.value)} min="1" />
        <button onClick={addItem}>Tambah</button>
      </div>

      <h3>Items</h3>
      <ul>
        {order.items.map(it => (
          <li key={it.id}>{it.makanan.nama} x{it.qty} = {it.subtotal}</li>
        ))}
      </ul>

      <p>Total: {order.total}</p>
      {order.status === 'open' ? (
        <button onClick={closeOrder}>Tutup Order</button>
      ) : (
        <p style={{color:"green"}}>✅ Order sudah ditutup</p>
      )}
      <a href={`http://localhost:8000/api/orders/${order.id}/receipt`} target="_blank" rel="noreferrer">Download Struk (PDF)</a>
    </div>
  );
}
