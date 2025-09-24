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
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(()=>{ fetchData(); fetchMakanans(); },[]);

  async function fetchData(){ 
    try{
      const res = await api.get(`/orders/${id}`); 
      setOrder(res.data);
    }catch(err){
      console.error(err);
    }
  }

  async function fetchMakanans(){ 
    try{
      const res = await api.get('/makanan'); 
      setMakanans(res.data);
    }catch(err){
      console.error(err);
    }
  }

  async function addItem(){
    if(!selected) return;
    setLoadingAdd(true);
    try{
      await api.post(`/orders/${id}/items`, { makanan_id: selected, qty: Number(qty) });
      await fetchData();
      setSelected('');
      setQty(1);
    }catch(err){
      console.error(err);
    }finally{
      setLoadingAdd(false);
    }
  }

  async function closeOrder(){
    if(!window.confirm('Yakin ingin menutup order ini?')) return;
    setClosing(true);
    try{
      await api.post(`/orders/${id}/close`);
      nav('/daftar-meja');
    }catch(err){
      console.error(err);
      setClosing(false);
    }
  }

  if(!order) return <div className="od-loading">Loading...</div>;

  return (
    <div className="od-container">
      <style>{`
        .od-container {
          max-width: 1100px;
          margin: 24px auto;
          padding: 20px;
          font-family: "Poppins", sans-serif;
          color: #333;
        }
        .od-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 2px solid #f0f0f0;
        }
        .od-title { font-size: 22px; font-weight: 700; margin: 0; }
        .od-title span { color: #2563eb; }
        .od-sub { margin-top: 6px; font-size: 14px; color: #666; }
        .od-actions .od-link {
          background: #2563eb; color: #fff; padding: 10px 16px;
          border-radius: 8px; text-decoration: none; font-weight: 600;
          transition: all 0.3s ease;
        }
        .od-actions .od-link:hover { background: #1d4ed8; }
        .od-card {
          background: #fff; border-radius: 12px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
          padding: 20px; display: grid;
          grid-template-columns: 340px 1fr; gap: 20px;
        }
        .od-form { display: flex; flex-direction: column; gap: 14px; }
        .od-label { display: flex; flex-direction: column; font-size: 14px; font-weight: 500; }
        .od-select, .od-input {
          margin-top: 6px; padding: 10px; border: 1px solid #d1d5db;
          border-radius: 8px; font-size: 14px; transition: all 0.2s ease;
        }
        .od-select:focus, .od-input:focus {
          border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2); outline: none;
        }
        .od-buttons { display: flex; gap: 10px; align-items: center; margin-top: 10px; }
        .btn { padding: 10px 14px; border-radius: 8px; border: none; cursor: pointer; font-weight: 600; transition: all 0.3s ease; }
        .btn.primary { background: #2563eb; color: #fff; }
        .btn.primary:hover:not(:disabled) { background: #1d4ed8; }
        .btn.primary:disabled { opacity: 0.6; cursor: not-allowed; }
        .btn.danger { background: #dc2626; color: #fff; }
        .btn.danger:hover:not(:disabled) { background: #b91c1c; }
        .od-closed { color: #16a34a; font-weight: 700; }
        .od-items { overflow-x: auto; }
        .od-items h3 { margin-bottom: 12px; }
        .od-table { width: 100%; border-collapse: collapse; border-radius: 8px; overflow: hidden; }
        .od-table th, .od-table td { padding: 12px 10px; border-bottom: 1px solid #e5e7eb; text-align: left; }
        .od-table th { background: #f9fafb; font-size: 13px; color: #444; text-transform: uppercase; }
        .od-table tr:hover td { background: #f9fafc; }
        .od-total {
          display: flex; justify-content: space-between; align-items: center;
          padding: 14px 8px; margin-top: 14px; font-size: 16px;
          border-top: 2px solid #f1f5f9; font-weight: 600;
        }
        .od-total strong { font-size: 18px; color: #2563eb; }
        .empty { color: #999; font-style: italic; }
        .od-loading { padding: 50px; text-align: center; font-size: 18px; color: #555; }
        @media (max-width: 900px) { .od-card { grid-template-columns: 1fr; } }
      `}</style>

      <header className="od-header">
        <div>
          <h2 className="od-title">Order <span>#{order.id}</span></h2>
          <p className="od-sub">Meja {order.meja.nomor} • Status: <strong>{order.status}</strong></p>
        </div>
        <div className="od-actions">
          <a
            className="od-link"
            href={`http://localhost:8000/api/orders/${order.id}/receipt?token=${localStorage.getItem('token')}`}
            target="_blank"
            rel="noreferrer"
          >Download Struk (PDF)</a>
        </div>
      </header>

      <section className="od-card">
        <div className="od-form">
          <label className="od-label">
            Pilih Makanan
            <select onChange={e=>setSelected(e.target.value)} value={selected} className="od-select">
              <option value="">-- Pilih --</option>
              {makanans.map(m => (
                <option key={m.id} value={m.id}>{m.nama} — Rp {Number(m.harga).toLocaleString('id-ID')}</option>
              ))}
            </select>
          </label>

          <label className="od-label">
            Jumlah
            <input type="number" className="od-input" value={qty} onChange={e=>setQty(e.target.value)} min="1" />
          </label>

          <div className="od-buttons">
            <button className="btn primary" onClick={addItem} disabled={!selected || loadingAdd}>
              {loadingAdd ? 'Menambahkan...' : 'Tambah'}
            </button>
            {order.status === 'open' ? (
              <button className="btn danger" onClick={closeOrder} disabled={closing}>
                {closing ? 'Menutup...' : 'Tutup Order'}
              </button>
            ) : (
              <span className="od-closed">✅ Order sudah ditutup</span>
            )}
          </div>
        </div>

        <div className="od-items">
          <h3>Items</h3>
          {order.items.length === 0 ? (
            <p className="empty">Belum ada item.</p>
          ) : (
            <table className="od-table">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Qty</th>
                  <th>Harga</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map(it => (
                  <tr key={it.id}>
                    <td>{it.makanan.nama}</td>
                    <td>{it.qty}</td>
                    <td>Rp {Number(it.makanan.harga).toLocaleString('id-ID')}</td>
                    <td>Rp {Number(it.subtotal).toLocaleString('id-ID')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="od-total">
            <span>Total</span>
            <strong>Rp {Number(order.total).toLocaleString('id-ID')}</strong>
          </div>
        </div>
      </section>
    </div>
  );
}
