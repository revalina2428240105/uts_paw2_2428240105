@'
# RESTful API Persewaan Aula

## Identitas Mahasiswa
- Nama: Reva Lina
- NPM: 2428240105
- Topik: Persewaan Aula

## Deskripsi
RESTful API untuk mengelola data aula dan pemesanan aula menggunakan Node.js, Express.js, MongoDB, dan Mongoose.

## Desain Data Model

### 1. Kontak (Embedding)
Data kontak berupa telepon dan email disimpan langsung di dalam dokumen pemesanan karena selalu digunakan bersama data pemesanan dan tidak memerlukan collection tersendiri.

### 2. Aula (Referencing)
Data aula disimpan dalam collection tersendiri karena satu aula dapat digunakan oleh banyak pemesanan. Dengan referencing, data aula tidak perlu disimpan berulang kali.

## Daftar Endpoint

### Aula
| Method | Endpoint | Keterangan |
|---|---|---|
| GET | /aula | Menampilkan semua data aula |
| POST | /aula | Menambahkan data aula |

### Pemesanan
| Method | Endpoint | Keterangan |
|---|---|---|
| GET | /pemesanan | Menampilkan semua pemesanan |
| POST | /pemesanan | Menambahkan pemesanan |
| GET | /pemesanan/:id | Menampilkan detail pemesanan |

## Fitur API
- Filter berdasarkan jenis acara dan aula.
- Sorting berdasarkan jumlah tamu.
- Pagination menggunakan page dan limit.
- Projection menggunakan fields.
- Populate data aula menggunakan Mongoose.
- Validasi data dan penanganan duplikasi kode pemesanan.

## Teknologi
- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- cors
- Postman

## Cara Menjalankan Project

1. Clone repository.
2. Masuk ke folder project.
3. Instal dependency:

   npm install

4. Buat file .env di folder utama dengan konfigurasi:

   DB_URI=connection_string_mongodb
   PORT=4000

5. Jalankan aplikasi:

   node app.js

6. Akses API melalui:

   http://localhost:4000

## Keamanan
File .env tidak boleh diunggah ke repository publik karena berisi konfigurasi koneksi database. Gunakan .env.example sebagai contoh konfigurasi tanpa informasi rahasia.
'@ | Set-Content -Encoding UTF8 README.md