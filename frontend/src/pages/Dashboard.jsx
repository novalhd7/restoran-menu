import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Dashboard() {
  const nav = useNavigate();
  const [user, setUser ] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser () {
      try {
        const res = await api.get('/user');
        setUser (res.data);
      } catch (err) {
        console.error('Gagal ambil user:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser ();
  }, []);

  // Fungsi logout
  async function handleLogout() {
    try {
      // Contoh: panggil API logout jika ada
      await api.post('/logout');
    } catch (err) {
      console.error('Logout gagal:', err);
    }
    // Hapus token/session di localStorage atau cookie jika ada
    localStorage.removeItem('token'); // sesuaikan dengan implementasi kamu
    // Redirect ke halaman login
    nav('/');
  }

  if (loading) return <p style={styles.loading}>Loading...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        {user
          ? `Selamat datang ${user.role === 'pelayan' ? 'Pelayan' : 'Kasir'}`
          : 'Selamat datang di Dashboard'}
      </h2>

      <div style={styles.buttonGroup}>
        <button
          style={styles.button}
          onClick={() => nav('/daftar-meja')}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1976d2')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#2196f3')}
        >
          Daftar Meja
        </button>
        <button
          style={styles.button}
          onClick={() => nav('/makanan')}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1976d2')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#2196f3')}
        >
          Tambah Makanan
        </button>
        <button
          style={{ ...styles.button, backgroundColor: '#f44336' }}
          onClick={handleLogout}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#d32f2f')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#f44336')}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 400,
    margin: '40px auto',
    padding: 20,
    borderRadius: 8,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    textAlign: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    marginBottom: 30,
    color: '#333',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: 20,
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#2196f3',
    border: 'none',
    borderRadius: 6,
    color: 'white',
    padding: '12px 24px',
    fontSize: 16,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    boxShadow: '0 2px 6px rgba(33, 150, 243, 0.4)',
  },
  loading: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#666',
  },
};