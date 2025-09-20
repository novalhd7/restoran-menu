<p align="center">
  <a href="https://laravel.com" target="_blank">
    <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo">
  </a>
</p>

<h1 align="center">🍽️ Restoran Menu App</h1>

<p align="center">
Aplikasi Point of Sale sederhana untuk restoran dengan <b>Laravel 12 (Backend API)</b> + <b>React Vite (Frontend)</b>.
</p>

<p align="center">
<a href="https://github.com/username/restoran-menu/actions"><img src="https://img.shields.io/github/actions/workflow/status/username/restoran-menu/laravel.yml?branch=main" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
</p>

---

## 🚀 Tech Stack
- **Backend**: Laravel 12, Sanctum (API Token), DomPDF (Receipt PDF)
- **Frontend**: React + Vite, Axios, Material UI
- **Database**: MySQL / MariaDB
- **Auth**: Role-based (Pelayan, Kasir)

---

## 📂 Struktur Repo
restoran-menu/
├── backend/ # Laravel API
└── frontend/ # React Vite frontend

---

## ⚙️ Setup 

### 1. Clone & Install
```bash
git clone https://github.com/username/restoran-menu.git
cd restoran-menu/backend

composer install
2. Konfigurasi Environment
bash
Salin kode
cp .env.example .env
Edit .env sesuai DB lokal:

makefile
Salin kode
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=restoran_menu
DB_USERNAME=root
DB_PASSWORD=
3. Generate App Key
bash
Salin kode
php artisan key:generate
4. Install Sanctum & DomPDF
bash
Salin kode
composer require laravel/sanctum
composer require barryvdh/laravel-dompdf
php artisan vendor:publish --provider="Laravel\\Sanctum\\SanctumServiceProvider"
5. Migrasi Database & Seeder
bash
Salin kode
php artisan migrate --seed
Seeder menambahkan:

10 meja (Meja 1 → Meja 10)

User Pelayan (pelayan@example.com / password)

User Kasir (kasir@example.com / password)

6. Jalankan Backend
bash
Salin kode
php artisan serve --port=8000
👉 API base URL: http://localhost:8000/api

⚙️ Setup Frontend
1. Install Project
bash
Salin kode
cd ../frontend
npm install
npm install axios @mui/material @emotion/react @emotion/styled @mui/icons-material
2. Konfigurasi API URL
Buat file .env di folder frontend:

bash
Salin kode
VITE_API_BASE_URL=http://localhost:8000/api
3. Jalankan Dev Server
bash
Salin kode
npm run dev
👉 Frontend URL default: http://localhost:5173

🔑 Default Login
Role	Email	Password
Pelayan	pelayan@example.com	password
Kasir	kasir@example.com	password

📌 Fitur Utama
✅ Login (role: Pelayan, Kasir)

✅ List Meja (status kosong / terisi)

✅ CRUD Makanan

✅ Open Order (buka pesanan di meja kosong)

✅ Tambah item ke pesanan

✅ Tutup Order (hanya Kasir via Policy)

✅ Generate Receipt (PDF)

