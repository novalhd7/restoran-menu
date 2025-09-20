import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function MakananCrud() {
  const [makanans, setMakanans] = useState([]);
  const [nama, setNama] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [harga, setHarga] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchMakanans();
  }, []);

  async function fetchMakanans() {
    const res = await api.get("/makanan");
    setMakanans(res.data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!nama || !harga) return alert("Nama dan harga wajib diisi!");

    const data = { nama, keterangan, harga };

    if (editId) {
      // Update
      await api.put(`/makanan/${editId}`, data);
    } else {
      // Create
      await api.post("/makanan", data);
    }

    resetForm();
    fetchMakanans();
  }

  function resetForm() {
    setEditId(null);
    setNama("");
    setKeterangan("");
    setHarga("");
  }

  async function handleEdit(makanan) {
    setEditId(makanan.id);
    setNama(makanan.nama);
    setKeterangan(makanan.keterangan || "");
    setHarga(makanan.harga);
  }

  async function handleDelete(id) {
    if (window.confirm("Yakin ingin hapus makanan ini?")) {
      await api.delete(`/makanan/${id}`);
      fetchMakanans();
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>CRUD Makanan</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Nama makanan"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Keterangan"
          value={keterangan}
          onChange={(e) => setKeterangan(e.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Harga"
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
          required
          style={styles.input}
        />
        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.submitButton}>
            {editId ? "Update" : "Tambah"}
          </button>
          {editId && (
            <button type="button" onClick={resetForm} style={styles.cancelButton}>
              Batal
            </button>
          )}
        </div>
      </form>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Nama</th>
            <th style={styles.th}>Keterangan</th>
            <th style={styles.th}>Harga</th>
            <th style={styles.th}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {makanans.map((m) => (
            <tr key={m.id} style={styles.tr}>
              <td style={styles.td}>{m.id}</td>
              <td style={styles.td}>{m.nama}</td>
              <td style={styles.td}>{m.keterangan}</td>
              <td style={styles.td}>{parseFloat(m.harga).toLocaleString()}</td>
              <td style={styles.td}>
                <button onClick={() => handleEdit(m)} style={styles.editButton}>
                  Edit
                </button>{" "}
                <button onClick={() => handleDelete(m.id)} style={styles.deleteButton}>
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 800,
    margin: "40px auto",
    padding: 20,
    borderRadius: 8,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 30,
    justifyContent: "center",
  },
  input: {
    flex: "1 1 200px",
    padding: "10px",
    fontSize: 16,
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  buttonGroup: {
    display: "flex",
    gap: 10,
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#2196f3",
    border: "none",
    borderRadius: 6,
    color: "white",
    padding: "10px 20px",
    fontSize: 16,
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(33, 150, 243, 0.5)",
    transition: "background-color 0.3s ease",
  },
  cancelButton: {
    backgroundColor: "#f44336",
    border: "none",
    borderRadius: 6,
    color: "white",
    padding: "10px 20px",
    fontSize: 16,
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(244, 67, 54, 0.5)",
    transition: "background-color 0.3s ease",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    borderBottom: "2px solid #ddd",
    padding: "12px 8px",
    textAlign: "left",
    backgroundColor: "#f5f5f5",
    color: "#555",
  },
  tr: {
    borderBottom: "1px solid #eee",
  },
  td: {
    padding: "10px 8px",
    verticalAlign: "middle",
    color: "#444",
  },
  editButton: {
    backgroundColor: "#4caf50",
    border: "none",
    borderRadius: 4,
    color: "white",
    padding: "6px 12px",
    fontSize: 14,
    cursor: "pointer",
    marginRight: 6,
    transition: "background-color 0.3s ease",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    border: "none",
    borderRadius: 4,
    color: "white",
    padding: "6px 12px",
    fontSize: 14,
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};