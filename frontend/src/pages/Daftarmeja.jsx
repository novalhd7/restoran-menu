import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../css/DaftarMeja.css'; // import css custom

export default function DaftarMeja() {
  const [meja, setMeja] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    async function fetchMeja() {
      try {
        const res = await api.get('/meja');
        setMeja(res.data);
      } catch (err) {
        console.error('Gagal ambil meja:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchMeja();
  }, []);

  async function openOrder(mejaId) {
    try {
      const res = await api.post('/orders/open', { meja_id: mejaId });
      nav(`/orders/${res.data.id}`);
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal buka order');
    }
  }

  if (loading) return <p className="loading-text">Loading daftar meja...</p>;

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">🍽️ RestoApp</div>
        <ul className="navbar-links">
          <li onClick={() => nav('/dashboard')}>🏠 Home</li>
          <li onClick={() => nav('/daftar-meja')}>📋 Daftar Meja</li>
        </ul>
      </nav>

      <div className="dashboard-container">
        <h3 className="page-title">Daftar Meja</h3>
        <div className="meja-grid">
          {meja.length === 0 ? (
            <p className="empty-text">Tidak ada meja tersedia.</p>
          ) : (
            meja.map((m) => {
              const openOrder = m.orders?.[0]; // hanya order open
              return (
                <div
                  key={m.id}
                  className={`meja-card ${m.status === 'kosong' ? 'kosong' : 'terisi'}`}
                >
                  <h4>Meja {m.nomor}</h4>
                  <p>Status: <b>{m.status}</b></p>
                  {openOrder ? (
                    <button className="btn btn-view" onClick={() => nav(`/orders/${openOrder.id}`)}>
                      🔍 Lihat Order
                    </button>
                  ) : (
                    <button className="btn btn-open" onClick={() => openOrder(m.id)}>
                      ➕ Buka Order
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
